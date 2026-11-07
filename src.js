const MIN_REWARD = 2.50;
const DAILY_GOAL = 50.00;
const MAX_IMAGE_CHARS = 200000;
const SESSION_DAYS = 30;

let schemaPromise = null;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {
      if (!env.DB) {
        return page("Banco não conectado", `
          <div class="auth-wrap">
            <div class="auth-card">
              <div class="brand big">BERN <b>NEXUS</b></div>
              <h1>Falta conectar o D1</h1>
              <p class="muted">Este Worker precisa do binding <b>DB</b> apontando para seu banco D1.</p>
              <div class="notice">No seu painel Cloudflare: Worker → Settings → Bindings → D1 database → variável <b>DB</b>.</div>
            </div>
          </div>`, 503);
      }

      await ensureSchema(env.DB);

      if (request.method === "POST") {
        const origin = request.headers.get("origin");
        if (origin && origin !== url.origin) {
          return page("Ação bloqueada", messageCard("Origem inválida.", true), 403);
        }
      }

      const user = await currentUser(request, env.DB);
      const path = url.pathname;

      if (request.method === "GET" && path === "/login") {
        if (user) return redirect("/", request);
        return renderAuth("login", url);
      }

      if (request.method === "GET" && path === "/register") {
        if (user) return redirect("/", request);
        return renderAuth("register", url);
      }

      if (request.method === "POST" && path === "/register") {
        if (user) return redirect("/", request);
        return await handleRegister(request, env.DB);
      }

      if (request.method === "POST" && path === "/login") {
        if (user) return redirect("/", request);
        return await handleLogin(request, env.DB);
      }

      if (request.method === "POST" && path === "/logout") {
        return await handleLogout(request, env.DB);
      }

      if (!user) return redirect("/login", request);

      if (request.method === "POST" && path === "/missions/create") {
        return await handleCreateMission(request, env.DB, user);
      }

      const start = path.match(/^\/missions\/(\d+)\/start$/);
      if (request.method === "POST" && start) {
        return await handleStartMission(request, env.DB, user, Number(start[1]));
      }

      const submit = path.match(/^\/submissions\/(\d+)\/submit$/);
      if (request.method === "POST" && submit) {
        return await handleSubmitWork(request, env.DB, user, Number(submit[1]));
      }

      const review = path.match(/^\/submissions\/(\d+)\/(approve|reject)$/);
      if (request.method === "POST" && review) {
        return await handleReview(request, env.DB, user, Number(review[1]), review[2]);
      }

      const toggle = path.match(/^\/missions\/(\d+)\/(open|close)$/);
      if (request.method === "POST" && toggle) {
        return await handleMissionStatus(request, env.DB, user, Number(toggle[1]), toggle[2] === "open" ? "open" : "closed");
      }

      if (request.method === "GET" && path === "/") {
        return await renderDashboard(request, env.DB, user, url);
      }

      return redirect("/", request);
    } catch (e) {
      console.error("BERN NEXUS ERROR", e);
      return page("Erro", `
        <div class="auth-wrap">
          <div class="auth-card">
            <div class="brand big">BERN <b>NEXUS</b></div>
            <h1>Algo deu errado</h1>
            <p class="muted">${esc(String(e?.message || e))}</p>
            <a class="btn primary wide linkbtn" href="/">Voltar ao início</a>
          </div>
        </div>`, 500);
    }
  }
};

async function ensureSchema(db) {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const statements = [
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          password_salt TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'worker',
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS sessions (
          token TEXT PRIMARY KEY,
          user_id INTEGER NOT NULL,
          expires_at TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS missions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          client_id INTEGER,
          title TEXT NOT NULL,
          category TEXT NOT NULL,
          description TEXT NOT NULL,
          instructions TEXT NOT NULL,
          reward REAL NOT NULL,
          slots INTEGER NOT NULL,
          image_data TEXT,
          status TEXT NOT NULL DEFAULT 'open',
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS submissions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          mission_id INTEGER NOT NULL,
          worker_id INTEGER NOT NULL,
          status TEXT NOT NULL DEFAULT 'started',
          answer TEXT,
          proof_image TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          submitted_at TEXT,
          reviewed_at TEXT,
          UNIQUE(mission_id, worker_id)
        )`,
        `CREATE TABLE IF NOT EXISTS wallet_ledger (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          amount REAL NOT NULL,
          type TEXT NOT NULL,
          source_ref TEXT UNIQUE,
          description TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE INDEX IF NOT EXISTS idx_missions_status ON missions(status, created_at)`,
        `CREATE INDEX IF NOT EXISTS idx_submissions_worker ON submissions(worker_id, created_at)`,
        `CREATE INDEX IF NOT EXISTS idx_submissions_mission ON submissions(mission_id, status)`,
        `CREATE INDEX IF NOT EXISTS idx_wallet_user ON wallet_ledger(user_id, created_at)`
      ];
      await db.batch(statements.map(sql => db.prepare(sql)));
      return true;
    })().catch(err => {
      schemaPromise = null;
      throw err;
    });
  }
  return schemaPromise;
}

async function handleRegister(request, db) {
  const f = await request.formData();
  const name = clean(f.get("name"), 80);
  const email = clean(f.get("email"), 160).toLowerCase();
  const password = String(f.get("password") || "");
  const role = ["worker","client","both"].includes(String(f.get("role"))) ? String(f.get("role")) : "worker";

  if (name.length < 2) return redirect("/register?err=" + enc("Informe seu nome."), request);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return redirect("/register?err=" + enc("E-mail inválido."), request);
  if (password.length < 6) return redirect("/register?err=" + enc("A senha precisa ter pelo menos 6 caracteres."), request);

  const exists = await db.prepare("SELECT id FROM users WHERE email=? LIMIT 1").bind(email).first();
  if (exists) return redirect("/login?err=" + enc("Esse e-mail já está cadastrado."), request);

  const salt = randomHex(16);
  const hash = await hashPassword(password, salt);
  const r = await db.prepare(
    "INSERT INTO users(name,email,password_hash,password_salt,role) VALUES(?,?,?,?,?)"
  ).bind(name,email,hash,salt,role).run();

  const userId = Number(r.meta?.last_row_id || 0);
  if (!userId) throw new Error("Não foi possível criar o usuário.");

  const token = await createSession(db, userId);
  return redirect("/?msg=" + enc("Conta criada. Bem-vindo ao Bern Nexus!"), request, sessionCookie(token));
}

async function handleLogin(request, db) {
  const f = await request.formData();
  const email = clean(f.get("email"), 160).toLowerCase();
  const password = String(f.get("password") || "");
  const row = await db.prepare("SELECT * FROM users WHERE email=? LIMIT 1").bind(email).first();
  if (!row) return redirect("/login?err=" + enc("E-mail ou senha incorretos."), request);

  const hash = await hashPassword(password, row.password_salt);
  if (!safeEqual(hash, row.password_hash)) {
    return redirect("/login?err=" + enc("E-mail ou senha incorretos."), request);
  }

  const token = await createSession(db, row.id);
  return redirect("/?msg=" + enc("Login realizado."), request, sessionCookie(token));
}

async function handleLogout(request, db) {
  const token = getCookie(request, "bn_session");
  if (token) await db.prepare("DELETE FROM sessions WHERE token=?").bind(token).run();
  return redirect("/login?msg=" + enc("Você saiu da conta."), request, expiredCookie());
}

async function handleCreateMission(request, db, user) {
  if (!canClient(user)) return redirect("/?view=create&err=" + enc("Seu perfil não pode publicar missões."), request);

  const f = await request.formData();
  const title = clean(f.get("title"), 100);
  const category = ["Pesquisa","Teste","Opinião","Levantamento"].includes(String(f.get("category"))) ? String(f.get("category")) : "Pesquisa";
  const description = clean(f.get("description"), 500);
  const instructions = clean(f.get("instructions"), 1500);
  const reward = Number(String(f.get("reward") || "0").replace(",", "."));
  const slots = Math.floor(Number(f.get("slots")));
  const image = String(f.get("image_data") || "");

  if (title.length < 5 || description.length < 10 || instructions.length < 10) {
    return redirect("/?view=create&err=" + enc("Preencha título, descrição e instruções com mais detalhes."), request);
  }
  if (!Number.isFinite(reward) || reward < MIN_REWARD || reward > 500) {
    return redirect("/?view=create&err=" + enc("A recompensa mínima é R$ 2,50."), request);
  }
  if (!Number.isInteger(slots) || slots < 1 || slots > 500) {
    return redirect("/?view=create&err=" + enc("Informe entre 1 e 500 vagas."), request);
  }
  if (image && (!image.startsWith("data:image/jpeg;base64,") || image.length > MAX_IMAGE_CHARS)) {
    return redirect("/?view=create&err=" + enc("A imagem ficou grande demais. Escolha outra imagem."), request);
  }

  await db.prepare(`
    INSERT INTO missions(client_id,title,category,description,instructions,reward,slots,image_data,status)
    VALUES(?,?,?,?,?,?,?,?, 'open')
  `).bind(user.id,title,category,description,instructions,reward,slots,image || null).run();

  return redirect("/?view=client&msg=" + enc("Missão publicada com sucesso."), request);
}

async function handleStartMission(request, db, user, missionId) {
  if (!canWorker(user)) return redirect("/?err=" + enc("Seu perfil não pode executar missões."), request);

  const mission = await db.prepare("SELECT * FROM missions WHERE id=? LIMIT 1").bind(missionId).first();
  if (!mission || mission.status !== "open") return redirect("/?err=" + enc("Missão indisponível."), request);
  if (Number(mission.client_id) === Number(user.id)) return redirect("/?err=" + enc("Você não pode executar sua própria missão."), request);

  const occupied = await db.prepare(
    "SELECT COUNT(*) c FROM submissions WHERE mission_id=? AND status IN ('started','submitted','approved')"
  ).bind(missionId).first();

  if (Number(occupied?.c || 0) >= Number(mission.slots)) {
    return redirect("/?err=" + enc("As vagas desta missão acabaram."), request);
  }

  const already = await db.prepare(
    "SELECT id,status FROM submissions WHERE mission_id=? AND worker_id=? LIMIT 1"
  ).bind(missionId,user.id).first();

  if (already) {
    return redirect("/?view=mine&msg=" + enc("Você já iniciou essa missão."), request);
  }

  await db.prepare(
    "INSERT INTO submissions(mission_id,worker_id,status) VALUES(?,?,'started')"
  ).bind(missionId,user.id).run();

  return redirect("/?view=mine&msg=" + enc("Missão aceita. Agora envie o trabalho."), request);
}

async function handleSubmitWork(request, db, user, submissionId) {
  if (!canWorker(user)) return redirect("/?view=mine&err=" + enc("Perfil sem acesso."), request);

  const f = await request.formData();
  const answer = clean(f.get("answer"), 3000);
  const proof = String(f.get("proof_image") || "");

  if (answer.length < 3) return redirect("/?view=mine&err=" + enc("Descreva o trabalho realizado."), request);
  if (proof && (!proof.startsWith("data:image/jpeg;base64,") || proof.length > MAX_IMAGE_CHARS)) {
    return redirect("/?view=mine&err=" + enc("O comprovante ficou grande demais."), request);
  }

  const r = await db.prepare(`
    UPDATE submissions
    SET answer=?, proof_image=?, status='submitted', submitted_at=CURRENT_TIMESTAMP
    WHERE id=? AND worker_id=? AND status='started'
  `).bind(answer, proof || null, submissionId, user.id).run();

  if (!r.meta?.changes) return redirect("/?view=mine&err=" + enc("Essa missão não pode mais ser enviada."), request);
  return redirect("/?view=mine&msg=" + enc("Trabalho enviado para aprovação."), request);
}

async function handleReview(request, db, user, submissionId, action) {
  if (!canClient(user)) return redirect("/?view=client&err=" + enc("Perfil sem acesso."), request);

  const s = await db.prepare(`
    SELECT s.id,s.worker_id,s.status,m.reward,m.client_id,m.title
    FROM submissions s JOIN missions m ON m.id=s.mission_id
    WHERE s.id=? AND m.client_id=? LIMIT 1
  `).bind(submissionId,user.id).first();

  if (!s) return redirect("/?view=client&err=" + enc("Envio não encontrado."), request);
  if (s.status !== "submitted") return redirect("/?view=client&err=" + enc("Esse envio já foi revisado."), request);

  if (action === "reject") {
    await db.prepare(
      "UPDATE submissions SET status='rejected',reviewed_at=CURRENT_TIMESTAMP WHERE id=? AND status='submitted'"
    ).bind(submissionId).run();
    return redirect("/?view=client&msg=" + enc("Trabalho rejeitado."), request);
  }

  await db.batch([
    db.prepare(`
      INSERT OR IGNORE INTO wallet_ledger(user_id,amount,type,source_ref,description)
      VALUES(?,?,'mission_reward',?,?)
    `).bind(s.worker_id,Number(s.reward),`submission:${submissionId}`,`Missão aprovada: ${clean(s.title,100)}`),
    db.prepare(
      "UPDATE submissions SET status='approved',reviewed_at=CURRENT_TIMESTAMP WHERE id=? AND status='submitted'"
    ).bind(submissionId)
  ]);

  return redirect("/?view=client&msg=" + enc("Trabalho aprovado e recompensa creditada."), request);
}

async function handleMissionStatus(request, db, user, missionId, status) {
  if (!canClient(user)) return redirect("/?view=client&err=" + enc("Perfil sem acesso."), request);
  await db.prepare("UPDATE missions SET status=? WHERE id=? AND client_id=?").bind(status,missionId,user.id).run();
  return redirect("/?view=client&msg=" + enc(status === "open" ? "Missão reaberta." : "Missão fechada."), request);
}

async function renderDashboard(request, db, user, url) {
  const view = ["home","mine","create","client","profile"].includes(url.searchParams.get("view"))
    ? url.searchParams.get("view") : "home";

  const msg = url.searchParams.get("msg") || "";
  const err = url.searchParams.get("err") || "";

  const [wallet, today, missions, mine, clientMissions, clientSubs] = await Promise.all([
    db.prepare("SELECT COALESCE(SUM(amount),0) v FROM wallet_ledger WHERE user_id=?").bind(user.id).first(),
    db.prepare(`
      SELECT COALESCE(SUM(amount),0) v FROM wallet_ledger
      WHERE user_id=? AND date(created_at,'-3 hours')=date('now','-3 hours')
    `).bind(user.id).first(),
    db.prepare(`
      SELECT m.*, u.name client_name,
        (SELECT COUNT(*) FROM submissions s WHERE s.mission_id=m.id AND s.status IN ('started','submitted','approved')) occupied
      FROM missions m LEFT JOIN users u ON u.id=m.client_id
      WHERE m.status='open'
      ORDER BY m.created_at DESC LIMIT 100
    `).all(),
    canWorker(user) ? db.prepare(`
      SELECT s.*,m.title,m.category,m.reward,m.description,m.image_data
      FROM submissions s JOIN missions m ON m.id=s.mission_id
      WHERE s.worker_id=? ORDER BY s.created_at DESC
    `).bind(user.id).all() : Promise.resolve({results:[]}),
    canClient(user) ? db.prepare(`
      SELECT m.*,
        (SELECT COUNT(*) FROM submissions s WHERE s.mission_id=m.id) submissions_count,
        (SELECT COUNT(*) FROM submissions s WHERE s.mission_id=m.id AND s.status='approved') approved_count
      FROM missions m WHERE m.client_id=? ORDER BY m.created_at DESC
    `).bind(user.id).all() : Promise.resolve({results:[]}),
    canClient(user) ? db.prepare(`
      SELECT s.*,w.name worker_name,m.title,m.reward,m.client_id
      FROM submissions s
      JOIN missions m ON m.id=s.mission_id
      JOIN users w ON w.id=s.worker_id
      WHERE m.client_id=?
      ORDER BY CASE s.status WHEN 'submitted' THEN 0 ELSE 1 END, s.created_at DESC
    `).bind(user.id).all() : Promise.resolve({results:[]})
  ]);

  const balance = Number(wallet?.v || 0);
  const earnedToday = Number(today?.v || 0);
  const progress = Math.min(100, Math.max(0, earnedToday / DAILY_GOAL * 100));

  const body = `
    <div class="app">
      <header>
        <div class="toprow">
          <a class="brand" href="/">BERN <b>NEXUS</b></a>
          <span class="pill">${roleLabel(user.role)}</span>
        </div>
      </header>

      <main>
        ${msg ? `<div class="flash ok">${esc(msg)}</div>` : ""}
        ${err ? `<div class="flash err">${esc(err)}</div>` : ""}

        ${view === "home" ? renderHome(user, missions.results || [], earnedToday, progress) : ""}
        ${view === "mine" ? renderMine(user, mine.results || []) : ""}
        ${view === "create" ? renderCreate(user) : ""}
        ${view === "client" ? renderClient(user, clientMissions.results || [], clientSubs.results || []) : ""}
        ${view === "profile" ? renderProfile(user, balance, earnedToday) : ""}
      </main>

      ${renderNav(view, user)}
    </div>
  `;

  return page("BERN NEXUS", body);
}

function renderHome(user, missions, earnedToday, progress) {
  const available = missions.filter(m =>
    Number(m.client_id) !== Number(user.id) &&
    Number(m.occupied || 0) < Number(m.slots)
  );

  return `
    <section class="hero">
      <h1>Ganhe fazendo<br>pequenas missões.</h1>
      <p class="muted">Pesquisas, testes e tarefas digitais rápidas feitas por pessoas reais.</p>
    </section>

    <section class="goal">
      <div class="goalrow">
        <div>
          <small>Ganhos aprovados hoje</small>
          <div class="money">${brl(earnedToday)}</div>
        </div>
        <div class="goalright">
          <small>Meta visual</small>
          <b>R$ 50/dia</b>
        </div>
      </div>
      <div class="bar"><i style="width:${progress}%"></i></div>
      <div class="goaltext">${earnedToday >= DAILY_GOAL ? "Meta atingida hoje." : `${brl(DAILY_GOAL-earnedToday)} para chegar à meta visual.`}</div>
    </section>

    <div class="notice">A meta de R$ 50/dia não é garantia de renda. Ela depende da quantidade de missões disponíveis e da aprovação dos trabalhos.</div>

    <div class="section-title"><h2>Missões disponíveis</h2><span>${available.length}</span></div>
    <div class="grid">
      ${available.length ? available.map(m => missionCard(m, user)).join("") : `<div class="empty">Nenhuma missão disponível agora.</div>`}
    </div>
  `;
}

function missionCard(m, user) {
  const left = Math.max(0, Number(m.slots)-Number(m.occupied||0));
  return `
    <article class="card">
      ${m.image_data ? `<img class="cardimg" src="${m.image_data}" alt="">` : ""}
      <div class="cardbody">
        <div class="meta"><span class="tag">${esc(m.category).toUpperCase()}</span><span class="reward">${brl(m.reward)}</span></div>
        <h3>${esc(m.title)}</h3>
        <p>${esc(m.description)}</p>
        <div class="instruction"><b>O que fazer:</b><br>${esc(m.instructions)}</div>
        <div class="stats"><span>👤 ${esc(m.client_name || "Contratante")}</span><span>🎯 ${left} vagas</span></div>
        ${canWorker(user) ? `
          <form method="post" action="/missions/${m.id}/start">
            <button class="btn primary wide">Fazer missão</button>
          </form>` : `<div class="notice">Seu perfil é apenas de contratante.</div>`}
      </div>
    </article>
  `;
}

function renderMine(user, subs) {
  if (!canWorker(user)) return denied("Seu perfil não está habilitado para executar missões.");
  return `
    <section class="hero"><h1>Minhas missões</h1><p class="muted">Envie seu trabalho e acompanhe a aprovação.</p></section>
    <div class="grid">
      ${subs.length ? subs.map(s => `
        <article class="card">
          ${s.image_data ? `<img class="cardimg" src="${s.image_data}" alt="">` : ""}
          <div class="cardbody">
            <div class="meta">
              <span class="status ${esc(s.status)}">${statusText(s.status)}</span>
              <span class="reward">${brl(s.reward)}</span>
            </div>
            <h3>${esc(s.title)}</h3>
            <p>${esc(s.description)}</p>
            ${s.status === "started" ? `
              <form method="post" action="/submissions/${s.id}/submit" class="image-form">
                <label>Descreva o trabalho realizado</label>
                <textarea class="field" name="answer" required minlength="3" placeholder="Digite sua resposta, resultado ou comprovação..."></textarea>
                <label>Imagem de comprovante (opcional)</label>
                <input class="field image-input" type="file" accept="image/jpeg,image/png,image/webp">
                <input type="hidden" name="proof_image" class="image-data">
                <img class="preview" alt="">
                <button class="btn primary wide">Enviar para aprovação</button>
              </form>
            ` : `
              ${s.answer ? `<div class="answer"><b>Sua resposta:</b><br>${esc(s.answer)}</div>` : ""}
              ${s.proof_image ? `<img class="proof" src="${s.proof_image}" alt="">` : ""}
            `}
          </div>
        </article>
      `).join("") : `<div class="empty">Você ainda não iniciou nenhuma missão.</div>`}
    </div>
  `;
}

function renderCreate(user) {
  if (!canClient(user)) return denied("Seu perfil foi criado apenas para realizar missões.");
  return `
    <section class="hero"><h1>Publicar missão</h1><p class="muted">Crie uma pequena tarefa para pessoas reais realizarem.</p></section>

    <form class="panel image-form" method="post" action="/missions/create">
      <label>Título</label>
      <input class="field" name="title" required minlength="5" maxlength="100" placeholder="Ex.: Teste minha página e diga o que ficou confuso">

      <label>Categoria</label>
      <select class="field" name="category">
        <option>Pesquisa</option><option>Teste</option><option>Opinião</option><option>Levantamento</option>
      </select>

      <label>Descrição curta</label>
      <textarea class="field" name="description" required minlength="10" maxlength="500" placeholder="Explique o objetivo da missão."></textarea>

      <label>Instruções</label>
      <textarea class="field" name="instructions" required minlength="10" maxlength="1500" placeholder="Passo a passo do que a pessoa deve fazer."></textarea>

      <div class="row">
        <div>
          <label>Recompensa por pessoa</label>
          <input class="field reward-input" name="reward" type="number" min="2.50" max="500" step="0.50" value="2.50" required>
        </div>
        <div>
          <label>Vagas</label>
          <input class="field slots-input" name="slots" type="number" min="1" max="500" value="10" required>
        </div>
      </div>

      <label>Imagem do card (opcional)</label>
      <input class="field image-input" type="file" accept="image/jpeg,image/png,image/webp">
      <input type="hidden" name="image_data" class="image-data">
      <img class="preview" alt="">

      <div class="notice budget">Orçamento demonstrativo: R$ 25,00. Ainda não existe cobrança real.</div>
      <div class="notice">Valor mínimo por pessoa: <b>R$ 2,50</b>. Não publique curtidas, seguidores ou avaliações pagas.</div>

      <button class="btn primary wide">Publicar missão</button>
    </form>
  `;
}

function renderClient(user, missions, subs) {
  if (!canClient(user)) return denied("Seu perfil não possui acesso de contratante.");

  return `
    <section class="hero"><h1>Painel do contratante</h1><p class="muted">Gerencie missões e aprove os trabalhos recebidos.</p></section>

    <div class="section-title"><h2>Suas missões</h2><span>${missions.length}</span></div>
    <div class="grid">
      ${missions.length ? missions.map(m => `
        <article class="card">
          ${m.image_data ? `<img class="cardimg" src="${m.image_data}" alt="">` : ""}
          <div class="cardbody">
            <div class="meta"><span class="tag">${esc(m.category).toUpperCase()}</span><span class="reward">${brl(m.reward)}</span></div>
            <h3>${esc(m.title)}</h3>
            <div class="stats"><span>${Number(m.submissions_count||0)} participações</span><span>${Number(m.approved_count||0)} aprovadas</span><span>${esc(m.status)}</span></div>
            <form method="post" action="/missions/${m.id}/${m.status === "open" ? "close" : "open"}">
              <button class="btn secondary wide">${m.status === "open" ? "Fechar missão" : "Reabrir missão"}</button>
            </form>
          </div>
        </article>
      `).join("") : `<div class="empty">Você ainda não publicou nenhuma missão.</div>`}
    </div>

    <div class="section-title spaced"><h2>Trabalhos recebidos</h2><span>${subs.length}</span></div>
    <div class="grid">
      ${subs.length ? subs.map(s => `
        <article class="card">
          <div class="cardbody">
            <div class="meta"><span class="status ${esc(s.status)}">${statusText(s.status)}</span><span class="reward">${brl(s.reward)}</span></div>
            <h3>${esc(s.title)}</h3>
            <p><b>${esc(s.worker_name)}</b></p>
            ${s.answer ? `<div class="answer">${esc(s.answer)}</div>` : `<p class="muted">Ainda não enviou a resposta.</p>`}
            ${s.proof_image ? `<img class="proof" src="${s.proof_image}" alt="">` : ""}
            ${s.status === "submitted" ? `
              <div class="row">
                <form method="post" action="/submissions/${s.id}/reject"><button class="btn danger wide">Rejeitar</button></form>
                <form method="post" action="/submissions/${s.id}/approve"><button class="btn primary wide">Aprovar</button></form>
              </div>
            ` : ""}
          </div>
        </article>
      `).join("") : `<div class="empty">Nenhum trabalho recebido ainda.</div>`}
    </div>
  `;
}

function renderProfile(user, balance, today) {
  return `
    <section class="hero"><h1>Perfil</h1></section>
    <div class="panel">
      <div class="userline">
        <div class="avatar">👤</div>
        <div><b>${esc(user.name)}</b><div class="muted small">${esc(user.email)}</div></div>
      </div>
      <hr>
      <small>Saldo aprovado</small>
      <div class="money">${brl(balance)}</div>
      <p class="muted">Hoje: ${brl(today)}</p>
      <div class="notice">O saldo nesta versão é interno para testar o fluxo. Ainda não existe saque Pix real.</div>
      <form method="post" action="/logout"><button class="btn secondary wide">Sair</button></form>
    </div>
  `;
}

function renderNav(view, user) {
  return `
    <nav class="nav">
      <a class="${view==="home"?"active":""}" href="/?view=home"><strong>⌂</strong>Início</a>
      <a class="${view==="mine"?"active":""}" href="/?view=mine"><strong>✓</strong>Minhas</a>
      <a class="${view==="create"?"active":""}" href="/?view=create"><strong>＋</strong>Publicar</a>
      <a class="${view==="client"?"active":""}" href="/?view=client"><strong>▣</strong>Contratante</a>
      <a class="${view==="profile"?"active":""}" href="/?view=profile"><strong>●</strong>Perfil</a>
    </nav>
  `;
}

function renderAuth(mode, url) {
  const msg = url.searchParams.get("msg") || "";
  const err = url.searchParams.get("err") || "";
  const register = mode === "register";

  return page("BERN NEXUS", `
    <div class="auth-wrap">
      <div class="auth-card">
        <div class="brand big">BERN <b>NEXUS</b></div>
        ${msg ? `<div class="flash ok">${esc(msg)}</div>` : ""}
        ${err ? `<div class="flash err">${esc(err)}</div>` : ""}

        <h1>${register ? "Criar conta" : "Entrar"}</h1>
        <p class="muted">${register ? "Escolha como você quer usar a plataforma." : "Acesse sua conta do Bern Nexus."}</p>

        <form method="post" action="${register ? "/register" : "/login"}">
          ${register ? `
            <label>Nome</label>
            <input class="field" name="name" required minlength="2" maxlength="80">
          ` : ""}
          <label>E-mail</label>
          <input class="field" name="email" type="email" required>
          <label>Senha</label>
          <input class="field" name="password" type="password" required minlength="6">
          ${register ? `
            <label>Como quer usar o Nexus?</label>
            <select class="field" name="role">
              <option value="worker">Quero ganhar fazendo missões</option>
              <option value="client">Quero publicar missões</option>
              <option value="both">Quero fazer os dois</option>
            </select>
          ` : ""}
          <button class="btn primary wide">${register ? "Criar conta" : "Entrar"}</button>
        </form>

        <a class="switch" href="${register ? "/login" : "/register"}">${register ? "Já tenho conta" : "Criar minha conta"}</a>
      </div>
    </div>
  `);
}

async function currentUser(request, db) {
  const token = getCookie(request, "bn_session");
  if (!token) return null;
  return await db.prepare(`
    SELECT u.id,u.name,u.email,u.role,u.created_at
    FROM sessions s JOIN users u ON u.id=s.user_id
    WHERE s.token=? AND s.expires_at>CURRENT_TIMESTAMP
    LIMIT 1
  `).bind(token).first();
}

async function createSession(db, userId) {
  const token = randomHex(32);
  const expires = new Date(Date.now() + SESSION_DAYS * 86400000).toISOString().replace("T"," ").replace("Z","");
  await db.prepare("INSERT INTO sessions(token,user_id,expires_at) VALUES(?,?,?)").bind(token,userId,expires).run();
  return token;
}

function sessionCookie(token) {
  return `bn_session=${token}; Path=/; Max-Age=${SESSION_DAYS*86400}; HttpOnly; Secure; SameSite=Lax`;
}
function expiredCookie() {
  return "bn_session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax";
}

function redirect(path, request, cookie = "") {
  const url = new URL(path, request.url);
  const headers = { location: url.toString() };
  if (cookie) headers["set-cookie"] = cookie;
  return new Response(null, { status: 303, headers });
}

function canWorker(u) { return u && (u.role === "worker" || u.role === "both"); }
function canClient(u) { return u && (u.role === "client" || u.role === "both"); }

function roleLabel(role) {
  return role === "worker" ? "TRABALHADOR" : role === "client" ? "CONTRATANTE" : "TRABALHADOR + CONTRATANTE";
}
function statusText(s) {
  return ({started:"Em andamento",submitted:"Em análise",approved:"Aprovada",rejected:"Rejeitada"})[s] || s;
}
function denied(text) {
  return `<section class="hero"><h1>Acesso limitado</h1></section><div class="notice">${esc(text)}</div>`;
}
function messageCard(text, error=false) {
  return `<div class="auth-wrap"><div class="auth-card"><div class="flash ${error?"err":"ok"}">${esc(text)}</div></div></div>`;
}
function brl(v) {
  return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(Number(v||0));
}
function enc(s) { return encodeURIComponent(s); }
function clean(v,max) { return String(v ?? "").replace(/\u0000/g,"").trim().slice(0,max); }
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
function getCookie(request,name) {
  const raw = request.headers.get("cookie") || "";
  for (const part of raw.split(";")) {
    const [k,...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return "";
}
function randomHex(bytes) {
  const a = new Uint8Array(bytes);
  crypto.getRandomValues(a);
  return [...a].map(x => x.toString(16).padStart(2,"0")).join("");
}
async function hashPassword(password,saltHex) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw",enc.encode(password),"PBKDF2",false,["deriveBits"]);
  const salt = Uint8Array.from(saltHex.match(/.{1,2}/g).map(x => parseInt(x,16)));
  const bits = await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt,iterations:100000},key,256);
  return [...new Uint8Array(bits)].map(x => x.toString(16).padStart(2,"0")).join("");
}
function safeEqual(a,b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let x = 0;
  for (let i=0;i<a.length;i++) x |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return x === 0;
}

function page(title, body, status=200) {
  return new Response(`<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#07111f">
<title>${esc(title)}</title>
<style>
*{box-sizing:border-box}html{background:#07111f}body{margin:0;background:#07111f;color:#edf5ff;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}
button,input,textarea,select{font:inherit}.app{max-width:620px;margin:auto;min-height:100vh;background:linear-gradient(180deg,#0b1727,#07111f 38%);padding-bottom:92px}
header{position:sticky;top:0;z-index:20;padding:17px;background:rgba(7,17,31,.95);backdrop-filter:blur(12px);border-bottom:1px solid #173149}.toprow{display:flex;justify-content:space-between;align-items:center;gap:12px}
.brand{font-weight:950;letter-spacing:.4px;color:#fff;text-decoration:none}.brand b{color:#50e3a4}.brand.big{font-size:24px;margin-bottom:20px}.pill{font-size:10px;border:1px solid #2a4259;border-radius:999px;padding:6px 8px;color:#9fb5c8}
main{padding:16px}.hero h1{font-size:28px;line-height:1.08;margin:5px 0 7px}.hero p{margin-top:0}.muted{color:#91a6b9}.small,small{font-size:12px;color:#91a6b9}
.goal{background:linear-gradient(135deg,#12364b,#0b2537);border:1px solid #24506b;border-radius:20px;padding:17px;margin:14px 0}.goalrow{display:flex;justify-content:space-between;gap:12px;align-items:end}.goalright{text-align:right}.money{font-size:29px;font-weight:950;margin-top:4px}.bar{height:9px;background:#07131f;border-radius:99px;overflow:hidden;margin-top:12px}.bar i{display:block;height:100%;background:#50e3a4;border-radius:99px}.goaltext{font-size:12px;color:#9db1c3;margin-top:8px}
.notice{padding:11px 12px;border:1px solid #5c4c2f;background:#2a2316;color:#f0d494;border-radius:13px;font-size:12px;line-height:1.45;margin:12px 0}.flash{padding:11px 12px;border-radius:13px;margin-bottom:12px;font-size:13px}.flash.ok{background:#123329;border:1px solid #28694f;color:#8ff2c5}.flash.err{background:#351b25;border:1px solid #6f3043;color:#ffb4c4}
.section-title{display:flex;justify-content:space-between;align-items:center;margin:18px 0 10px}.section-title.spaced{margin-top:28px}.section-title h2{margin:0;font-size:18px}.section-title span{font-size:12px;color:#8fa5b8}
.grid{display:grid;gap:12px}.card{background:#0d1b2a;border:1px solid #20384e;border-radius:19px;overflow:hidden}.cardimg{width:100%;max-height:240px;object-fit:cover;background:#091521;display:block}.cardbody{padding:15px}.meta{display:flex;justify-content:space-between;gap:8px;align-items:center;margin-bottom:9px}.tag{font-size:10px;font-weight:900;background:#15344a;color:#9fdcff;padding:5px 7px;border-radius:999px}.reward{font-size:18px;font-weight:950;color:#58edac}.card h3{margin:0 0 7px;font-size:17px}.card p{font-size:13px;line-height:1.45;color:#9cb0c2}.instruction,.answer{font-size:12px;line-height:1.45;background:#081521;border:1px solid #1e354b;border-radius:12px;padding:10px;margin:10px 0;color:#bfd0df}.stats{font-size:11px;color:#819aae;display:flex;gap:12px;flex-wrap:wrap;margin:12px 0}
.btn{border:0;border-radius:12px;padding:11px 13px;font-weight:900;cursor:pointer}.primary{background:#50e3a4;color:#062117}.secondary{background:#12263a;color:#e6f1fc;border:1px solid #29435b}.danger{background:#3b1b25;color:#ffd7e2;border:1px solid #6c3042}.wide{width:100%}.linkbtn{display:block;text-align:center;text-decoration:none;margin-top:12px}.row{display:grid;grid-template-columns:1fr 1fr;gap:9px}.row form{margin:0}
.panel{background:#0d1b2a;border:1px solid #20384e;border-radius:19px;padding:16px}label{display:block;font-size:12px;color:#9bb0c3;margin:12px 0 6px}.field{width:100%;border:1px solid #294159;background:#081521;color:#edf5ff;border-radius:12px;padding:11px 12px;outline:none}.field:focus{border-color:#50e3a4}textarea.field{min-height:95px;resize:vertical}.preview,.proof{display:none;width:100%;max-height:240px;object-fit:cover;border-radius:13px;margin:10px 0}.proof{display:block}
.nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:min(620px,100%);display:grid;grid-template-columns:repeat(5,1fr);background:rgba(7,17,31,.98);border-top:1px solid #193248;padding:8px 6px max(8px,env(safe-area-inset-bottom));z-index:30}.nav a{color:#829aae;text-decoration:none;text-align:center;font-size:10px;padding:5px}.nav strong{display:block;font-size:18px}.nav a.active{color:#50e3a4}
.auth-wrap{min-height:100vh;display:grid;place-items:center;padding:20px}.auth-card{width:min(430px,100%);background:#0d1b2a;border:1px solid #20384e;border-radius:22px;padding:20px}.auth-card h1{margin-bottom:6px}.auth-card form .btn{margin-top:15px}.switch{display:block;color:#50e3a4;text-decoration:none;margin-top:14px;font-size:13px}
.userline{display:flex;gap:12px;align-items:center}.avatar{width:52px;height:52px;border-radius:16px;background:#17364d;display:grid;place-items:center;font-size:23px}.panel hr{border:0;border-top:1px solid #20384e;margin:18px 0}.empty{text-align:center;padding:30px 12px;color:#839bae}.status{font-size:11px;font-weight:900;text-transform:uppercase}.started{color:#8bcaff}.submitted{color:#ffc978}.approved{color:#55e9aa}.rejected{color:#ff8fa9}
@media(min-width:760px){body{padding:18px 0}.app{border:1px solid #173149;border-radius:28px;overflow:hidden;min-height:calc(100vh - 36px)}.nav{bottom:18px;border-radius:0 0 28px 28px}}
</style>
</head>
<body>
${body}
<script>
(function(){
  const forms=document.querySelectorAll(".image-form");
  forms.forEach(form=>{
    const input=form.querySelector(".image-input");
    const hidden=form.querySelector(".image-data");
    const preview=form.querySelector(".preview");
    if(input){
      input.addEventListener("change",async()=>{
        if(!input.files||!input.files[0]){hidden.value="";preview.style.display="none";return}
        try{
          const data=await compressImage(input.files[0]);
          hidden.value=data;
          preview.src=data;
          preview.style.display="block";
        }catch(e){
          alert(e.message);
          input.value="";
          hidden.value="";
          preview.style.display="none";
        }
      });
    }
  });

  document.querySelectorAll(".reward-input,.slots-input").forEach(el=>{
    el.addEventListener("input",()=>{
      const form=el.closest("form");
      const reward=Number(form.querySelector(".reward-input")?.value||0);
      const slots=Number(form.querySelector(".slots-input")?.value||0);
      const budget=form.querySelector(".budget");
      if(budget) budget.textContent="Orçamento demonstrativo: "+new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(reward*slots)+". Ainda não existe cobrança real.";
    });
  });

  async function compressImage(file){
    if(file.size>8*1024*1024) throw new Error("Escolha uma imagem de até 8 MB.");
    const bmp=await createImageBitmap(file);
    const max=900;
    let w=bmp.width,h=bmp.height;
    if(Math.max(w,h)>max){
      const k=max/Math.max(w,h);
      w=Math.round(w*k);h=Math.round(h*k);
    }
    const c=document.createElement("canvas");
    c.width=w;c.height=h;
    c.getContext("2d").drawImage(bmp,0,0,w,h);
    let q=.76,data="";
    for(let i=0;i<8;i++){
      data=c.toDataURL("image/jpeg",q);
      if(data.length<=190000) break;
      q-=.08;
    }
    if(data.length>200000) throw new Error("Não consegui reduzir a imagem. Escolha uma imagem menor.");
    return data;
  }
})();
</script>
</body></html>`, {
    status,
    headers: {
      "content-type":"text/html; charset=UTF-8",
      "cache-control":"no-store",
      "x-content-type-options":"nosniff",
      "referrer-policy":"same-origin",
      "content-security-policy":"default-src 'self'; img-src 'self' data:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"
    }
  });
}
