const MIN_REWARD = 2.50;
const DAILY_GOAL = 50.00;
const PLATFORM_FEE_RATE = 0.20;
const PAGE_SIZE = 20;
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
            </div>
          </div>`, 503);
      }

      await ensureSchema(env.DB);
      await expireMissions(env.DB);

      if (request.method === "POST") {
        const origin = request.headers.get("origin");
        if (origin && origin !== url.origin) {
          return page("Ação bloqueada", messageCard("Origem inválida.", true), 403);
        }
      }

      const user = await currentUser(request, env.DB);
      const path = url.pathname;

      if (request.method === "GET" && path === "/login") {
        if (user && !user.is_blocked) return redirect("/", request);
        return renderAuth("login", url);
      }

      if (request.method === "GET" && path === "/register") {
        if (user && !user.is_blocked) return redirect("/", request);
        return renderAuth("register", url);
      }

      if (request.method === "POST" && path === "/register") {
        return await handleRegister(request, env.DB);
      }

      if (request.method === "POST" && path === "/login") {
        return await handleLogin(request, env.DB);
      }

      if (request.method === "POST" && path === "/logout") {
        return await handleLogout(request, env.DB);
      }

      if (!user) return redirect("/login", request);

      if (user.is_blocked) {
        return page("Conta suspensa", `
          <div class="auth-wrap"><div class="auth-card">
            <div class="brand big">BERN <b>NEXUS</b></div>
            <h1>Conta suspensa</h1>
            <p class="muted">Seu acesso foi bloqueado pelo administrador.</p>
            <form method="post" action="/logout"><button class="btn secondary wide">Sair</button></form>
          </div></div>`, 403);
      }

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

      const cancel = path.match(/^\/submissions\/(\d+)\/cancel$/);
      if (request.method === "POST" && cancel) {
        return await handleCancelSubmission(request, env.DB, user, Number(cancel[1]));
      }

      const review = path.match(/^\/submissions\/(\d+)\/(approve|reject)$/);
      if (request.method === "POST" && review) {
        return await handleReview(request, env.DB, user, Number(review[1]), review[2]);
      }

      const toggle = path.match(/^\/missions\/(\d+)\/(open|close)$/);
      if (request.method === "POST" && toggle) {
        return await handleMissionStatus(request, env.DB, user, Number(toggle[1]), toggle[2] === "open" ? "open" : "closed");
      }

      if (request.method === "POST" && path === "/admin/claim") {
        return await handleAdminClaim(request, env.DB, user);
      }

      const adminUser = path.match(/^\/admin\/users\/(\d+)\/(block|unblock|credit)$/);
      if (request.method === "POST" && adminUser) {
        return await handleAdminUserAction(request, env.DB, user, Number(adminUser[1]), adminUser[2]);
      }

      const adminMission = path.match(/^\/admin\/missions\/(\d+)\/close$/);
      if (request.method === "POST" && adminMission) {
        return await handleAdminMissionClose(request, env.DB, user, Number(adminMission[1]));
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
            <a class="btn primary wide linkbtn" href="/">Voltar</a>
          </div>
        </div>`, 500);
    }
  }
};

async function ensureSchema(db) {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const statements = [
        `CREATE TABLE IF NOT EXISTS nexus_users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          password_salt TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'worker',
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS nexus_sessions (
          token TEXT PRIMARY KEY,
          user_id INTEGER NOT NULL,
          expires_at TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS nexus_missions (
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
        `CREATE TABLE IF NOT EXISTS nexus_submissions (
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
        `CREATE TABLE IF NOT EXISTS nexus_wallet_ledger (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          amount REAL NOT NULL,
          type TEXT NOT NULL,
          source_ref TEXT UNIQUE,
          description TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS nexus_client_wallet (
          user_id INTEGER PRIMARY KEY,
          available REAL NOT NULL DEFAULT 0,
          reserved REAL NOT NULL DEFAULT 0,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS nexus_client_ledger (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          delta_available REAL NOT NULL DEFAULT 0,
          delta_reserved REAL NOT NULL DEFAULT 0,
          type TEXT NOT NULL,
          source_ref TEXT UNIQUE,
          description TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS nexus_platform_ledger (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          amount REAL NOT NULL,
          mission_id INTEGER,
          submission_id INTEGER,
          source_ref TEXT UNIQUE,
          description TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE INDEX IF NOT EXISTS idx_nexus_missions_status ON nexus_missions(status, created_at)`,
        `CREATE INDEX IF NOT EXISTS idx_nexus_submissions_worker ON nexus_submissions(worker_id, created_at)`,
        `CREATE INDEX IF NOT EXISTS idx_nexus_submissions_mission ON nexus_submissions(mission_id, status)`,
        `CREATE INDEX IF NOT EXISTS idx_nexus_wallet_user ON nexus_wallet_ledger(user_id, created_at)`,
        `CREATE INDEX IF NOT EXISTS idx_nexus_client_ledger_user ON nexus_client_ledger(user_id, created_at)`
      ];
      await db.batch(statements.map(sql => db.prepare(sql)));

      await ensureColumn(db, "nexus_users", "is_admin", "INTEGER NOT NULL DEFAULT 0");
      await ensureColumn(db, "nexus_users", "is_blocked", "INTEGER NOT NULL DEFAULT 0");
      await ensureColumn(db, "nexus_missions", "deadline", "TEXT");
      await ensureColumn(db, "nexus_missions", "estimated_minutes", "INTEGER NOT NULL DEFAULT 5");
      await ensureColumn(db, "nexus_missions", "fee_rate", "REAL NOT NULL DEFAULT 0.20");
      await ensureColumn(db, "nexus_missions", "final_cost", "REAL NOT NULL DEFAULT 0");
      await ensureColumn(db, "nexus_missions", "reserved_remaining", "REAL NOT NULL DEFAULT 0");
      await ensureColumn(db, "nexus_missions", "funded", "INTEGER NOT NULL DEFAULT 0");

      // Missões antigas da v0.3 não tinham reserva financeira; fechamos só essas.
      await db.prepare("UPDATE nexus_missions SET status='closed' WHERE funded=0 AND status='open'").run();

      // Garante carteira para contratantes antigos.
      await db.prepare(`
        INSERT OR IGNORE INTO nexus_client_wallet(user_id,available,reserved)
        SELECT id,0,0 FROM nexus_users WHERE role IN ('client','both')
      `).run();

      return true;
    })().catch(err => {
      schemaPromise = null;
      throw err;
    });
  }
  return schemaPromise;
}

async function ensureColumn(db, table, column, definition) {
  const rows = await db.prepare(`PRAGMA table_info(${table})`).all();
  const exists = (rows.results || []).some(r => String(r.name) === column);
  if (!exists) await db.prepare(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`).run();
}

async function ensureClientWallet(db, userId) {
  await db.prepare("INSERT OR IGNORE INTO nexus_client_wallet(user_id,available,reserved) VALUES(?,0,0)").bind(userId).run();
}

function roundMoney(v) {
  return Math.round((Number(v) + Number.EPSILON) * 100) / 100;
}

function perSlotCost(reward, feeRate = PLATFORM_FEE_RATE) {
  return roundMoney(Number(reward) * (1 + Number(feeRate)));
}

function finalMissionCost(reward, slots, feeRate = PLATFORM_FEE_RATE) {
  return roundMoney(perSlotCost(reward, feeRate) * Number(slots));
}

function todayDate() {
  return new Date().toISOString().slice(0,10);
}

function datePlusDays(days) {
  const d = new Date(Date.now() + days * 86400000);
  return d.toISOString().slice(0,10);
}

function deadlineLabel(deadline) {
  if (!deadline) return "Sem prazo";
  const today = new Date(todayDate() + "T00:00:00Z");
  const d = new Date(String(deadline).slice(0,10) + "T00:00:00Z");
  const days = Math.ceil((d - today) / 86400000);
  if (days < 0) return "Prazo encerrado";
  if (days === 0) return "Encerra hoje";
  if (days === 1) return "1 dia restante";
  return `${days} dias restantes`;
}

async function expireMissions(db) {
  const rows = await db.prepare(`
    SELECT id,client_id FROM nexus_missions
    WHERE funded=1 AND status='open' AND deadline IS NOT NULL AND date(deadline)<date('now')
    LIMIT 20
  `).all();
  for (const m of (rows.results || [])) {
    try { await closeMissionFunds(db, Number(m.id), Number(m.client_id), "Prazo encerrado"); } catch {}
  }
}

async function closeMissionFunds(db, missionId, clientId, reason = "Missão fechada") {
  const m = await db.prepare("SELECT * FROM nexus_missions WHERE id=? AND client_id=? LIMIT 1").bind(missionId,clientId).first();
  if (!m) return false;
  if (m.status === "closed") return true;

  await ensureClientWallet(db, clientId);
  const active = await db.prepare(`
    SELECT COUNT(*) c FROM nexus_submissions
    WHERE mission_id=? AND status IN ('started','submitted')
  `).bind(missionId).first();

  const slotCost = perSlotCost(m.reward, m.fee_rate);
  const keep = roundMoney(Number(active?.c || 0) * slotCost);
  const current = roundMoney(Number(m.reserved_remaining || 0));
  const release = roundMoney(Math.max(0, current - keep));

  const statements = [
    db.prepare("UPDATE nexus_missions SET status='closed',reserved_remaining=? WHERE id=?").bind(Math.min(current,keep),missionId)
  ];

  if (release > 0) {
    statements.push(
      db.prepare(`
        UPDATE nexus_client_wallet
        SET available=available+?, reserved=MAX(0,reserved-?), updated_at=CURRENT_TIMESTAMP
        WHERE user_id=?
      `).bind(release,release,clientId),
      db.prepare(`
        INSERT INTO nexus_client_ledger(user_id,delta_available,delta_reserved,type,source_ref,description)
        VALUES(?,?,?,'mission_release',?,?)
      `).bind(clientId,release,-release,`release:${missionId}:${Date.now()}:${randomHex(3)}`,`${reason}: saldo não utilizado liberado`)
    );
  }

  await db.batch(statements);
  return true;
}

async function reopenMissionFunds(db, missionId, clientId) {
  const m = await db.prepare("SELECT * FROM nexus_missions WHERE id=? AND client_id=? LIMIT 1").bind(missionId,clientId).first();
  if (!m) return {ok:false,message:"Missão não encontrada."};
  if (m.deadline && String(m.deadline).slice(0,10) < todayDate()) return {ok:false,message:"O prazo dessa missão já terminou."};
  if (m.status === "open") return {ok:true};

  const approved = await db.prepare("SELECT COUNT(*) c FROM nexus_submissions WHERE mission_id=? AND status='approved'").bind(missionId).first();
  const desired = roundMoney(Math.max(0, Number(m.slots) - Number(approved?.c || 0)) * perSlotCost(m.reward,m.fee_rate));
  const current = roundMoney(Number(m.reserved_remaining || 0));
  const needed = roundMoney(Math.max(0, desired - current));

  await ensureClientWallet(db, clientId);
  if (needed > 0) {
    const r = await db.prepare(`
      UPDATE nexus_client_wallet SET available=available-?,reserved=reserved+?,updated_at=CURRENT_TIMESTAMP
      WHERE user_id=? AND available>=?
    `).bind(needed,needed,clientId,needed).run();
    if (!r.meta?.changes) return {ok:false,message:`Saldo insuficiente para reabrir. Necessário: ${brl(needed)}.`};

    await db.prepare(`
      INSERT INTO nexus_client_ledger(user_id,delta_available,delta_reserved,type,source_ref,description)
      VALUES(?,?,?,'mission_rereserve',?,?)
    `).bind(clientId,-needed,needed,`reopen:${missionId}:${Date.now()}`,`Reserva para reabrir missão #${missionId}`).run();
  }

  await db.prepare("UPDATE nexus_missions SET status='open',reserved_remaining=? WHERE id=?").bind(desired,missionId).run();
  return {ok:true};
}

async function getWorkerWallet(db, userId) {
  const [available,pending,total,today,entries] = await Promise.all([
    db.prepare("SELECT COALESCE(SUM(amount),0) v FROM nexus_wallet_ledger WHERE user_id=?").bind(userId).first(),
    db.prepare(`
      SELECT COALESCE(SUM(m.reward),0) v
      FROM nexus_submissions s JOIN nexus_missions m ON m.id=s.mission_id
      WHERE s.worker_id=? AND s.status='submitted'
    `).bind(userId).first(),
    db.prepare("SELECT COALESCE(SUM(amount),0) v FROM nexus_wallet_ledger WHERE user_id=? AND type='mission_reward'").bind(userId).first(),
    db.prepare(`
      SELECT COALESCE(SUM(amount),0) v FROM nexus_wallet_ledger
      WHERE user_id=? AND type='mission_reward' AND date(created_at,'-3 hours')=date('now','-3 hours')
    `).bind(userId).first(),
    db.prepare(`
      SELECT amount,type,description,created_at FROM nexus_wallet_ledger
      WHERE user_id=? ORDER BY created_at DESC LIMIT 20
    `).bind(userId).all()
  ]);
  return {
    available:Number(available?.v||0),
    pending:Number(pending?.v||0),
    total:Number(total?.v||0),
    today:Number(today?.v||0),
    entries:entries.results||[]
  };
}

async function getClientWallet(db, userId) {
  await ensureClientWallet(db,userId);
  const [wallet,spent,entries] = await Promise.all([
    db.prepare("SELECT available,reserved FROM nexus_client_wallet WHERE user_id=?").bind(userId).first(),
    db.prepare(`
      SELECT COALESCE(SUM(m.reward*(1+m.fee_rate)),0) v
      FROM nexus_submissions s JOIN nexus_missions m ON m.id=s.mission_id
      WHERE m.client_id=? AND s.status='approved'
    `).bind(userId).first(),
    db.prepare(`
      SELECT delta_available,delta_reserved,type,description,created_at
      FROM nexus_client_ledger WHERE user_id=? ORDER BY created_at DESC LIMIT 20
    `).bind(userId).all()
  ]);
  return {
    available:Number(wallet?.available||0),
    reserved:Number(wallet?.reserved||0),
    spent:roundMoney(Number(spent?.v||0)),
    entries:entries.results||[]
  };
}

async function getReputation(db, user) {
  const result = {worker:null,client:null};
  if (canWorker(user)) {
    const r = await db.prepare(`
      SELECT
        SUM(CASE WHEN status='approved' THEN 1 ELSE 0 END) approved,
        SUM(CASE WHEN status='rejected' THEN 1 ELSE 0 END) rejected,
        SUM(CASE WHEN status='submitted' THEN 1 ELSE 0 END) pending,
        COUNT(*) total
      FROM nexus_submissions WHERE worker_id=?
    `).bind(user.id).first();
    const approved=Number(r?.approved||0), rejected=Number(r?.rejected||0);
    result.worker={approved,rejected,pending:Number(r?.pending||0),total:Number(r?.total||0),rate:(approved+rejected)?Math.round(approved/(approved+rejected)*100):100};
  }
  if (canClient(user)) {
    const r = await db.prepare(`
      SELECT
        (SELECT COUNT(*) FROM nexus_missions WHERE client_id=?) missions,
        SUM(CASE WHEN s.status='approved' THEN 1 ELSE 0 END) approved,
        SUM(CASE WHEN s.status='rejected' THEN 1 ELSE 0 END) rejected
      FROM nexus_missions m LEFT JOIN nexus_submissions s ON s.mission_id=m.id
      WHERE m.client_id=?
    `).bind(user.id,user.id).first();
    const approved=Number(r?.approved||0), rejected=Number(r?.rejected||0);
    result.client={missions:Number(r?.missions||0),approved,rejected,rate:(approved+rejected)?Math.round(approved/(approved+rejected)*100):100};
  }
  return result;
}

function feedOptions(url) {
  const category = ["Pesquisa","Teste","Opinião","Levantamento"].includes(url.searchParams.get("category")) ? url.searchParams.get("category") : "";
  const sort = ["recent","highest","deadline","vacancies"].includes(url.searchParams.get("sort")) ? url.searchParams.get("sort") : "recent";
  const mode = url.searchParams.get("mode") === "list" ? "list" : "cards";
  const page = Math.max(1,Math.min(500,Number(url.searchParams.get("page")||1)));
  return {
    q:clean(url.searchParams.get("q")||"",80),
    category,sort,mode,page,
    newonly:url.searchParams.get("newonly")==="1"
  };
}

async function getFeedData(db, user, url) {
  const o = feedOptions(url);
  let where = `
    m.status='open' AND m.funded=1
    AND (m.deadline IS NULL OR date(m.deadline)>=date('now'))
    AND m.client_id<>?
    AND (SELECT COUNT(*) FROM nexus_submissions sx WHERE sx.mission_id=m.id AND sx.status IN ('started','submitted','approved')) < m.slots
  `;
  const binds=[user.id];

  if (o.category) { where += " AND m.category=?"; binds.push(o.category); }
  if (o.q) {
    where += " AND (lower(m.title) LIKE ? OR lower(m.description) LIKE ? OR lower(m.instructions) LIKE ? OR lower(u.name) LIKE ?)";
    const q=`%${o.q.toLowerCase()}%`; binds.push(q,q,q,q);
  }
  if (o.newonly) {
    where += " AND NOT EXISTS(SELECT 1 FROM nexus_submissions sn WHERE sn.mission_id=m.id AND sn.worker_id=?)";
    binds.push(user.id);
  }

  const order = o.sort==="highest" ? "m.reward DESC,m.created_at DESC"
    : o.sort==="deadline" ? "date(m.deadline) ASC,m.created_at DESC"
    : o.sort==="vacancies" ? `(m.slots-(SELECT COUNT(*) FROM nexus_submissions sv WHERE sv.mission_id=m.id AND sv.status IN ('started','submitted','approved'))) DESC,m.created_at DESC`
    : "m.created_at DESC";

  const count = await db.prepare(`
    SELECT COUNT(*) c FROM nexus_missions m JOIN nexus_users u ON u.id=m.client_id WHERE ${where}
  `).bind(...binds).first();

  const offset=(o.page-1)*PAGE_SIZE;
  const rows=await db.prepare(`
    SELECT m.*,u.name client_name,
      (SELECT COUNT(*) FROM nexus_submissions s WHERE s.mission_id=m.id AND s.status IN ('started','submitted','approved')) occupied,
      (SELECT COUNT(*) FROM nexus_missions cm WHERE cm.client_id=m.client_id) client_missions,
      (SELECT COUNT(*) FROM nexus_submissions ca JOIN nexus_missions mm ON mm.id=ca.mission_id WHERE mm.client_id=m.client_id AND ca.status='approved') client_approved
    FROM nexus_missions m JOIN nexus_users u ON u.id=m.client_id
    WHERE ${where}
    ORDER BY ${order}
    LIMIT ? OFFSET ?
  `).bind(...binds,PAGE_SIZE,offset).all();

  return {missions:rows.results||[],total:Number(count?.c||0),opts:o,pages:Math.max(1,Math.ceil(Number(count?.c||0)/PAGE_SIZE))};
}

async function getMySubmissions(db,userId,url) {
  const allowed=["all","started","submitted","approved","rejected"];
  const filter=allowed.includes(url.searchParams.get("status"))?url.searchParams.get("status"):"all";
  let sql=`
    SELECT s.*,m.title,m.category,m.reward,m.description,m.image_data,m.deadline,m.estimated_minutes
    FROM nexus_submissions s JOIN nexus_missions m ON m.id=s.mission_id
    WHERE s.worker_id=?`;
  const binds=[userId];
  if(filter!=="all"){sql+=" AND s.status=?";binds.push(filter);}
  sql+=" ORDER BY s.created_at DESC LIMIT 100";
  const rows=await db.prepare(sql).bind(...binds).all();
  return {submissions:rows.results||[],filter};
}

async function getClientData(db,userId) {
  const [missions,subs]=await Promise.all([
    db.prepare(`
      SELECT m.*,
        (SELECT COUNT(*) FROM nexus_submissions s WHERE s.mission_id=m.id) submissions_count,
        (SELECT COUNT(*) FROM nexus_submissions s WHERE s.mission_id=m.id AND s.status='approved') approved_count,
        (SELECT COUNT(*) FROM nexus_submissions s WHERE s.mission_id=m.id AND s.status='submitted') pending_count
      FROM nexus_missions m WHERE m.client_id=? ORDER BY m.created_at DESC LIMIT 100
    `).bind(userId).all(),
    db.prepare(`
      SELECT s.*,w.name worker_name,m.title,m.reward,m.client_id,m.status mission_status
      FROM nexus_submissions s
      JOIN nexus_missions m ON m.id=s.mission_id
      JOIN nexus_users w ON w.id=s.worker_id
      WHERE m.client_id=?
      ORDER BY CASE s.status WHEN 'submitted' THEN 0 ELSE 1 END,s.created_at DESC
      LIMIT 150
    `).bind(userId).all()
  ]);
  return {missions:missions.results||[],subs:subs.results||[]};
}

async function getAdminData(db) {
  const [users,missions,stats,platform] = await Promise.all([
    db.prepare(`
      SELECT u.id,u.name,u.email,u.role,u.is_admin,u.is_blocked,u.created_at,
             COALESCE(c.available,0) client_available,COALESCE(c.reserved,0) client_reserved
      FROM nexus_users u LEFT JOIN nexus_client_wallet c ON c.user_id=u.id
      ORDER BY u.created_at DESC LIMIT 100
    `).all(),
    db.prepare(`
      SELECT m.id,m.title,m.status,m.reward,m.slots,m.final_cost,m.deadline,u.name client_name
      FROM nexus_missions m LEFT JOIN nexus_users u ON u.id=m.client_id
      ORDER BY m.created_at DESC LIMIT 100
    `).all(),
    db.prepare(`
      SELECT
        (SELECT COUNT(*) FROM nexus_users) users,
        (SELECT COUNT(*) FROM nexus_missions WHERE status='open' AND funded=1) open_missions,
        (SELECT COUNT(*) FROM nexus_submissions WHERE status='submitted') pending_reviews,
        (SELECT COALESCE(SUM(reserved),0) FROM nexus_client_wallet) total_reserved
    `).first(),
    db.prepare("SELECT COALESCE(SUM(amount),0) v FROM nexus_platform_ledger").first()
  ]);
  return {users:users.results||[],missions:missions.results||[],stats:stats||{},platform:Number(platform?.v||0)};
}

function queryUrl(opts, changes={}) {
  const p=new URLSearchParams();
  p.set("view","home");
  const merged={...opts,...changes};
  if(merged.q)p.set("q",merged.q);
  if(merged.category)p.set("category",merged.category);
  if(merged.sort&&merged.sort!=="recent")p.set("sort",merged.sort);
  if(merged.mode&&merged.mode!=="cards")p.set("mode",merged.mode);
  if(merged.newonly)p.set("newonly","1");
  if(merged.page&&merged.page>1)p.set("page",String(merged.page));
  return "/?"+p.toString();
}

async function handleRegister(request, db) {
  const f = await request.formData();
  const name = clean(f.get("name"),80);
  const email = clean(f.get("email"),160).toLowerCase();
  const password = String(f.get("password")||"");
  const role = ["worker","client","both"].includes(String(f.get("role"))) ? String(f.get("role")) : "worker";

  if(name.length<2) return redirect("/register?err="+enc("Informe seu nome."),request);
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return redirect("/register?err="+enc("E-mail inválido."),request);
  if(password.length<6) return redirect("/register?err="+enc("A senha precisa ter pelo menos 6 caracteres."),request);

  const exists=await db.prepare("SELECT id FROM nexus_users WHERE email=? LIMIT 1").bind(email).first();
  if(exists) return redirect("/login?err="+enc("Esse e-mail já está cadastrado."),request);

  const salt=randomHex(16);
  const hash=await hashPassword(password,salt);
  const r=await db.prepare("INSERT INTO nexus_users(name,email,password_hash,password_salt,role) VALUES(?,?,?,?,?)")
    .bind(name,email,hash,salt,role).run();
  const userId=Number(r.meta?.last_row_id||0);
  if(!userId) throw new Error("Não foi possível criar o usuário.");

  if(role==="client"||role==="both") await ensureClientWallet(db,userId);
  return redirect("/login?msg="+enc("Conta criada com sucesso. Agora entre com seu e-mail e senha."),request);
}

async function handleLogin(request, db) {
  const f=await request.formData();
  const email=clean(f.get("email"),160).toLowerCase();
  const password=String(f.get("password")||"");
  const row=await db.prepare("SELECT * FROM nexus_users WHERE email=? LIMIT 1").bind(email).first();
  if(!row) return redirect("/login?err="+enc("E-mail ou senha incorretos."),request);
  if(Number(row.is_blocked||0)===1) return redirect("/login?err="+enc("Esta conta está suspensa."),request);

  const hash=await hashPassword(password,row.password_salt);
  if(!safeEqual(hash,row.password_hash)) return redirect("/login?err="+enc("E-mail ou senha incorretos."),request);

  const token=await createSession(db,row.id);
  return redirect("/?msg="+enc("Login realizado."),request,sessionCookie(token));
}

async function handleLogout(request, db) {
  const token = getCookie(request, "bn_session");
  if (token) await db.prepare("DELETE FROM nexus_sessions WHERE token=?").bind(token).run();
  return redirect("/login?msg=" + enc("Você saiu da conta."), request, expiredCookie());
}

async function handleCreateMission(request, db, user) {
  if(!canClient(user)) return redirect("/?view=create&err="+enc("Seu perfil não pode publicar missões."),request);

  const f=await request.formData();
  const title=clean(f.get("title"),100);
  const category=["Pesquisa","Teste","Opinião","Levantamento"].includes(String(f.get("category")))?String(f.get("category")):"Pesquisa";
  const description=clean(f.get("description"),500);
  const instructions=clean(f.get("instructions"),1500);
  const reward=Number(String(f.get("reward")||"0").replace(",","."));
  const slots=Math.floor(Number(f.get("slots")));
  const estimated=Math.floor(Number(f.get("estimated_minutes")||5));
  const deadline=clean(f.get("deadline"),10);
  const image=String(f.get("image_data")||"");

  if(title.length<5||description.length<10||instructions.length<10) return redirect("/?view=create&err="+enc("Preencha título, descrição e instruções com mais detalhes."),request);
  if(!Number.isFinite(reward)||reward<MIN_REWARD||reward>500) return redirect("/?view=create&err="+enc("A recompensa mínima é R$ 2,50."),request);
  if(!Number.isInteger(slots)||slots<1||slots>500) return redirect("/?view=create&err="+enc("Informe entre 1 e 500 vagas."),request);
  if(!Number.isInteger(estimated)||estimated<1||estimated>180) return redirect("/?view=create&err="+enc("O tempo estimado deve ficar entre 1 e 180 minutos."),request);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(deadline)||deadline<todayDate()) return redirect("/?view=create&err="+enc("Escolha um prazo válido."),request);
  if(image&&(!image.startsWith("data:image/jpeg;base64,")||image.length>MAX_IMAGE_CHARS)) return redirect("/?view=create&err="+enc("A imagem ficou grande demais."),request);

  const total=finalMissionCost(reward,slots,PLATFORM_FEE_RATE);
  await ensureClientWallet(db,user.id);

  const reserve=await db.prepare(`
    UPDATE nexus_client_wallet
    SET available=available-?,reserved=reserved+?,updated_at=CURRENT_TIMESTAMP
    WHERE user_id=? AND available>=?
  `).bind(total,total,user.id,total).run();

  if(!reserve.meta?.changes) {
    const w=await db.prepare("SELECT available FROM nexus_client_wallet WHERE user_id=?").bind(user.id).first();
    return redirect("/?view=create&err="+enc(`Saldo insuficiente. Custo final: ${brl(total)}. Saldo disponível: ${brl(w?.available||0)}.`),request);
  }

  try {
    const r=await db.prepare(`
      INSERT INTO nexus_missions(
        client_id,title,category,description,instructions,reward,slots,image_data,status,
        deadline,estimated_minutes,fee_rate,final_cost,reserved_remaining,funded
      ) VALUES(?,?,?,?,?,?,?,?,'open',?,?,?,?,?,1)
    `).bind(user.id,title,category,description,instructions,reward,slots,image||null,deadline,estimated,PLATFORM_FEE_RATE,total,total).run();
    const missionId=Number(r.meta?.last_row_id||0);
    await db.prepare(`
      INSERT INTO nexus_client_ledger(user_id,delta_available,delta_reserved,type,source_ref,description)
      VALUES(?,?,?,'mission_reserve',?,?)
    `).bind(user.id,-total,total,`reserve:${missionId}:${Date.now()}`,`Custo final reservado: ${title}`).run();
  } catch(e) {
    await db.prepare("UPDATE nexus_client_wallet SET available=available+?,reserved=MAX(0,reserved-?) WHERE user_id=?").bind(total,total,user.id).run();
    throw e;
  }

  return redirect("/?view=client&msg="+enc(`Missão publicada. Custo final reservado: ${brl(total)}.`),request);
}

async function handleStartMission(request, db, user, missionId) {
  if(!canWorker(user)) return redirect("/?err="+enc("Seu perfil não pode executar missões."),request);

  const mission=await db.prepare("SELECT * FROM nexus_missions WHERE id=? LIMIT 1").bind(missionId).first();
  if(!mission||mission.status!=="open"||Number(mission.funded||0)!==1) return redirect("/?err="+enc("Missão indisponível."),request);
  if(mission.deadline&&String(mission.deadline).slice(0,10)<todayDate()) return redirect("/?err="+enc("O prazo dessa missão terminou."),request);
  if(Number(mission.client_id)===Number(user.id)) return redirect("/?err="+enc("Você não pode executar sua própria missão."),request);

  const occupied=await db.prepare("SELECT COUNT(*) c FROM nexus_submissions WHERE mission_id=? AND status IN ('started','submitted','approved')").bind(missionId).first();
  if(Number(occupied?.c||0)>=Number(mission.slots)) return redirect("/?err="+enc("As vagas desta missão acabaram."),request);

  const already=await db.prepare("SELECT id,status FROM nexus_submissions WHERE mission_id=? AND worker_id=? LIMIT 1").bind(missionId,user.id).first();
  if(already) return redirect("/?view=mine&msg="+enc("Você já participou dessa missão."),request);

  await db.prepare("INSERT INTO nexus_submissions(mission_id,worker_id,status) VALUES(?,?,'started')").bind(missionId,user.id).run();
  return redirect("/?view=mine&msg="+enc("Missão aceita. Agora envie o trabalho."),request);
}

async function handleCancelSubmission(request, db, user, submissionId) {
  if(!canWorker(user)) return redirect("/?view=mine&err="+enc("Perfil sem acesso."),request);
  const s=await db.prepare(`
    SELECT s.id,s.status,s.mission_id,m.client_id,m.status mission_status,m.reward,m.fee_rate,m.reserved_remaining
    FROM nexus_submissions s JOIN nexus_missions m ON m.id=s.mission_id
    WHERE s.id=? AND s.worker_id=? LIMIT 1
  `).bind(submissionId,user.id).first();
  if(!s||s.status!=="started") return redirect("/?view=mine&err="+enc("Essa participação não pode ser cancelada."),request);

  await db.prepare("DELETE FROM nexus_submissions WHERE id=? AND worker_id=? AND status='started'").bind(submissionId,user.id).run();

  if(s.mission_status==="closed") {
    const amount=Math.min(roundMoney(Number(s.reserved_remaining||0)),perSlotCost(s.reward,s.fee_rate));
    if(amount>0) {
      await ensureClientWallet(db,s.client_id);
      await db.batch([
        db.prepare("UPDATE nexus_missions SET reserved_remaining=MAX(0,reserved_remaining-?) WHERE id=?").bind(amount,s.mission_id),
        db.prepare("UPDATE nexus_client_wallet SET available=available+?,reserved=MAX(0,reserved-?),updated_at=CURRENT_TIMESTAMP WHERE user_id=?").bind(amount,amount,s.client_id),
        db.prepare(`
          INSERT INTO nexus_client_ledger(user_id,delta_available,delta_reserved,type,source_ref,description)
          VALUES(?,?,?,'cancel_release',?,?)
        `).bind(s.client_id,amount,-amount,`cancel:${submissionId}:${Date.now()}`,"Participação cancelada: reserva liberada")
      ]);
    }
  }
  return redirect("/?view=mine&msg="+enc("Participação cancelada."),request);
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
    UPDATE nexus_submissions
    SET answer=?, proof_image=?, status='submitted', submitted_at=CURRENT_TIMESTAMP
    WHERE id=? AND worker_id=? AND status='started'
  `).bind(answer, proof || null, submissionId, user.id).run();

  if (!r.meta?.changes) return redirect("/?view=mine&err=" + enc("Essa missão não pode mais ser enviada."), request);
  return redirect("/?view=mine&msg=" + enc("Trabalho enviado para aprovação."), request);
}

async function handleReview(request, db, user, submissionId, action) {
  if(!canClient(user)) return redirect("/?view=client&err="+enc("Perfil sem acesso."),request);

  const s=await db.prepare(`
    SELECT s.id,s.worker_id,s.status,s.mission_id,m.reward,m.client_id,m.title,m.status mission_status,
           m.fee_rate,m.reserved_remaining
    FROM nexus_submissions s JOIN nexus_missions m ON m.id=s.mission_id
    WHERE s.id=? AND m.client_id=? LIMIT 1
  `).bind(submissionId,user.id).first();

  if(!s) return redirect("/?view=client&err="+enc("Envio não encontrado."),request);
  if(s.status!=="submitted") return redirect("/?view=client&err="+enc("Esse envio já foi revisado."),request);

  const cost=perSlotCost(s.reward,s.fee_rate);
  const fee=roundMoney(cost-Number(s.reward));

  if(action==="reject") {
    await db.prepare("UPDATE nexus_submissions SET status='rejected',reviewed_at=CURRENT_TIMESTAMP WHERE id=? AND status='submitted'").bind(submissionId).run();

    // Se a missão já está fechada, essa vaga não será reutilizada e a reserva volta ao contratante.
    if(s.mission_status==="closed") {
      const refund=Math.min(cost,roundMoney(Number(s.reserved_remaining||0)));
      if(refund>0) {
        await ensureClientWallet(db,s.client_id);
        await db.batch([
          db.prepare("UPDATE nexus_missions SET reserved_remaining=MAX(0,reserved_remaining-?) WHERE id=?").bind(refund,s.mission_id),
          db.prepare("UPDATE nexus_client_wallet SET available=available+?,reserved=MAX(0,reserved-?),updated_at=CURRENT_TIMESTAMP WHERE user_id=?").bind(refund,refund,s.client_id),
          db.prepare(`
            INSERT INTO nexus_client_ledger(user_id,delta_available,delta_reserved,type,source_ref,description)
            VALUES(?,?,?,'rejection_release',?,?)
          `).bind(s.client_id,refund,-refund,`reject:${submissionId}:${Date.now()}`,"Trabalho rejeitado em missão fechada: reserva liberada")
        ]);
      }
    }
    return redirect("/?view=client&msg="+enc("Trabalho rejeitado."),request);
  }

  if(Number(s.reserved_remaining||0)+0.001<cost) return redirect("/?view=client&err="+enc("A reserva dessa missão é insuficiente. Verifique o saldo."),request);

  await ensureClientWallet(db,s.client_id);
  await db.batch([
    db.prepare("UPDATE nexus_submissions SET status='approved',reviewed_at=CURRENT_TIMESTAMP WHERE id=? AND status='submitted'").bind(submissionId),
    db.prepare("UPDATE nexus_missions SET reserved_remaining=MAX(0,reserved_remaining-?) WHERE id=?").bind(cost,s.mission_id),
    db.prepare("UPDATE nexus_client_wallet SET reserved=MAX(0,reserved-?),updated_at=CURRENT_TIMESTAMP WHERE user_id=?").bind(cost,s.client_id),
    db.prepare(`
      INSERT OR IGNORE INTO nexus_wallet_ledger(user_id,amount,type,source_ref,description)
      VALUES(?,?,'mission_reward',?,?)
    `).bind(s.worker_id,Number(s.reward),`submission:${submissionId}`,`Missão aprovada: ${clean(s.title,100)}`),
    db.prepare(`
      INSERT OR IGNORE INTO nexus_platform_ledger(amount,mission_id,submission_id,source_ref,description)
      VALUES(?,?,?,?,?)
    `).bind(fee,s.mission_id,submissionId,`fee:${submissionId}`,`Receita Nexus: ${clean(s.title,100)}`),
    db.prepare(`
      INSERT INTO nexus_client_ledger(user_id,delta_available,delta_reserved,type,source_ref,description)
      VALUES(?,0,?,'mission_approved',?,?)
    `).bind(s.client_id,-cost,`approved:${submissionId}:${Date.now()}`,`Trabalho aprovado: ${clean(s.title,100)}`)
  ]);

  return redirect("/?view=client&msg="+enc(`Trabalho aprovado. ${brl(s.reward)} creditados ao trabalhador.`),request);
}

async function handleMissionStatus(request, db, user, missionId, status) {
  if(!canClient(user)) return redirect("/?view=client&err="+enc("Perfil sem acesso."),request);
  if(status==="closed") {
    const ok=await closeMissionFunds(db,missionId,user.id,"Missão fechada pelo contratante");
    return redirect("/?view=client&"+(ok?"msg="+enc("Missão fechada e saldo não utilizado liberado."):"err="+enc("Missão não encontrada.")),request);
  }
  const r=await reopenMissionFunds(db,missionId,user.id);
  return redirect("/?view=client&"+(r.ok?"msg="+enc("Missão reaberta e saldo novamente reservado."):"err="+enc(r.message)),request);
}

async function handleAdminClaim(request, db, user) {
  const c=await db.prepare("SELECT COUNT(*) c FROM nexus_users WHERE is_admin=1").first();
  if(Number(c?.c||0)>0) return redirect("/?view=profile&err="+enc("O administrador inicial já foi configurado."),request);
  await db.prepare("UPDATE nexus_users SET is_admin=1 WHERE id=?").bind(user.id).run();
  return redirect("/?view=admin&msg="+enc("Painel administrativo ativado para sua conta."),request);
}

async function handleAdminUserAction(request, db, user, targetId, action) {
  if(!user.is_admin) return redirect("/?err="+enc("Acesso administrativo necessário."),request);
  const target=await db.prepare("SELECT id,name,role,is_admin FROM nexus_users WHERE id=? LIMIT 1").bind(targetId).first();
  if(!target) return redirect("/?view=admin&err="+enc("Usuário não encontrado."),request);

  if(action==="block"||action==="unblock") {
    if(Number(target.is_admin||0)===1) return redirect("/?view=admin&err="+enc("Não é permitido bloquear um administrador."),request);
    await db.prepare("UPDATE nexus_users SET is_blocked=? WHERE id=?").bind(action==="block"?1:0,targetId).run();
    return redirect("/?view=admin&msg="+enc(action==="block"?"Usuário bloqueado.":"Usuário desbloqueado."),request);
  }

  if(action==="credit") {
    if(!["client","both"].includes(String(target.role))) return redirect("/?view=admin&err="+enc("Saldo de contratante só pode ser adicionado a perfis contratante ou os dois."),request);
    const f=await request.formData();
    const amount=roundMoney(Number(String(f.get("amount")||"0").replace(",",".")));
    if(!Number.isFinite(amount)||amount<MIN_REWARD||amount>100000) return redirect("/?view=admin&err="+enc("Informe um crédito entre R$ 2,50 e R$ 100.000."),request);
    await ensureClientWallet(db,targetId);
    await db.batch([
      db.prepare("UPDATE nexus_client_wallet SET available=available+?,updated_at=CURRENT_TIMESTAMP WHERE user_id=?").bind(amount,targetId),
      db.prepare(`
        INSERT INTO nexus_client_ledger(user_id,delta_available,delta_reserved,type,source_ref,description)
        VALUES(?,?,0,'admin_credit',?,?)
      `).bind(targetId,amount,`credit:${targetId}:${Date.now()}:${randomHex(3)}`,"Crédito interno adicionado pelo administrador")
    ]);
    return redirect("/?view=admin&msg="+enc(`${brl(amount)} adicionados ao saldo interno de ${target.name}.`),request);
  }

  return redirect("/?view=admin&err="+enc("Ação inválida."),request);
}

async function handleAdminMissionClose(request, db, user, missionId) {
  if(!user.is_admin) return redirect("/?err="+enc("Acesso administrativo necessário."),request);
  const m=await db.prepare("SELECT client_id FROM nexus_missions WHERE id=? LIMIT 1").bind(missionId).first();
  if(!m) return redirect("/?view=admin&err="+enc("Missão não encontrada."),request);
  await closeMissionFunds(db,missionId,Number(m.client_id),"Missão encerrada pelo administrador");
  return redirect("/?view=admin&msg="+enc("Missão encerrada pelo administrador."),request);
}

async function renderDashboard(request, db, user, url) {
  if(!user||!user.id) return redirect("/login?err="+enc("Sua sessão não foi carregada. Entre novamente."),request);

  let view=["home","mine","create","client","profile","admin"].includes(url.searchParams.get("view"))?url.searchParams.get("view"):"home";
  if(user.role==="worker"&&["create","client"].includes(view)) return redirect("/?view=home&err="+enc("Essa área é exclusiva para contratantes."),request);
  if(user.role==="client"&&view==="mine") return redirect("/?view=home&err="+enc("Essa área é exclusiva para trabalhadores."),request);
  if(view==="admin"&&!user.is_admin) return redirect("/?view=profile&err="+enc("Acesso administrativo necessário."),request);

  const msg=url.searchParams.get("msg")||"";
  const err=url.searchParams.get("err")||"";
  const reputation=await getReputation(db,user);

  let content="";
  if(view==="home") {
    if(user.role==="client") {
      const [data,wallet]=await Promise.all([getClientData(db,user.id),getClientWallet(db,user.id)]);
      content=renderClientHome(user,data.missions,data.subs,wallet);
    } else {
      const [feed,wallet]=await Promise.all([getFeedData(db,user,url),getWorkerWallet(db,user.id)]);
      content=renderHome(user,feed,wallet);
    }
  } else if(view==="mine") {
    const [mine,wallet]=await Promise.all([getMySubmissions(db,user.id,url),getWorkerWallet(db,user.id)]);
    content=renderMine(user,mine,wallet);
  } else if(view==="create") {
    content=renderCreate(user,await getClientWallet(db,user.id));
  } else if(view==="client") {
    const [data,wallet]=await Promise.all([getClientData(db,user.id),getClientWallet(db,user.id)]);
    content=renderClient(user,data.missions,data.subs,wallet);
  } else if(view==="profile") {
    const workerWallet=canWorker(user)?await getWorkerWallet(db,user.id):null;
    const clientWallet=canClient(user)?await getClientWallet(db,user.id):null;
    const admins=await db.prepare("SELECT COUNT(*) c FROM nexus_users WHERE is_admin=1").first();
    content=renderProfile(user,workerWallet,clientWallet,reputation,Number(admins?.c||0));
  } else if(view==="admin") {
    content=renderAdmin(user,await getAdminData(db));
  }

  const body=`
    <div class="app">
      <header><div class="toprow">
        <a class="brand" href="/">BERN <b>NEXUS</b></a>
        <div class="head-user">
          <span class="head-name">${esc(user.name||"Usuário")}</span>
          ${user.is_admin?`<span class="pill adminpill">ADMIN</span>`:""}
          <span class="pill">${roleLabel(user.role)}</span>
        </div>
      </div></header>
      <main>
        ${msg?`<div class="flash ok">${esc(msg)}</div>`:""}
        ${err?`<div class="flash err">${esc(err)}</div>`:""}
        ${content}
      </main>
      ${renderNav(view,user)}
    </div>`;
  return page("BERN NEXUS",body);
}

function renderHome(user, feed, wallet) {
  const o=feed.opts;
  const progress=Math.min(100,Math.max(0,wallet.today/DAILY_GOAL*100));
  const remaining=Math.max(0,DAILY_GOAL-wallet.today);
  return `
    <section class="home-hero-shell">
      <div class="home-hero-copy">
        <span class="hero-kicker">Painel do trabalhador</span>
        <h1>Ganhe fazendo<br>pequenas missões.</h1>
        <p class="muted">Encontre tarefas rapidamente, filtre melhor e foque nas missões que mais valem a pena para você.</p>

        <div class="hero-mini-stats">
          <div class="hero-mini-card">
            <small>Disponível</small>
            <b>${brl(wallet.available)}</b>
          </div>
          <div class="hero-mini-card">
            <small>Em análise</small>
            <b>${brl(wallet.pending)}</b>
          </div>
          <div class="hero-mini-card">
            <small>Missões encontradas</small>
            <b>${feed.total}</b>
          </div>
        </div>
      </div>

      <section class="goal goal-highlight">
        <div class="goal-topline">
          <span class="goal-badge">${progress >= 100 ? "Meta batida" : "Meta do dia"}</span>
          <span class="goal-percent">${Math.round(progress)}%</span>
        </div>
        <div class="goalrow">
          <div>
            <small>Ganhos aprovados hoje</small>
            <div class="money">${brl(wallet.today)}</div>
          </div>
          <div class="goalright">
            <small>Meta visual</small>
            <b>R$ 50/dia</b>
          </div>
        </div>
        <div class="bar"><i style="width:${progress}%"></i></div>
        <div class="goalfoot">
          <div class="goaltext">${wallet.today>=DAILY_GOAL?"Meta atingida hoje.":`${brl(remaining)} para chegar à meta visual.`}</div>
          <div class="goalhint">${feed.total ? `${feed.total} missão(ões) disponível(is)` : "Aguardando novas missões"}</div>
        </div>
      </section>
    </section>

    <div class="notice notice-home">A meta de R$ 50/dia não é garantia de renda. Ela depende de missões disponíveis e aprovação.</div>

    <form class="filter-panel filter-panel-hero" method="get">
      <input type="hidden" name="view" value="home">
      <input type="hidden" name="mode" value="${esc(o.mode)}">

      <div class="filter-panel-head">
        <div>
          <b>Encontre as melhores tarefas</b>
          <p class="muted">Use a busca, escolha o formato e refine os resultados.</p>
        </div>
        <div class="view-switch">
          <a class="${o.mode==="cards"?"active":""}" href="${queryUrl(o,{mode:"cards",page:1})}">▦ Cards</a>
          <a class="${o.mode==="list"?"active":""}" href="${queryUrl(o,{mode:"list",page:1})}">☷ Lista</a>
        </div>
      </div>

      <div class="filter-search filter-search-wide">
        <label>Buscar missão</label>
        <input class="field search-field" name="q" value="${esc(o.q)}" placeholder="Ex.: landing page, pesquisa, Instagram">
      </div>

      <div class="filter-grid filter-grid-4">
        <div><label>Categoria</label><select class="field" name="category">
          ${option("", "Todas", o.category)}
          ${option("Pesquisa","Pesquisa",o.category)}
          ${option("Teste","Teste",o.category)}
          ${option("Opinião","Opinião",o.category)}
          ${option("Levantamento","Levantamento",o.category)}
        </select></div>
        <div><label>Ordenar</label><select class="field" name="sort">
          ${option("recent","Mais recentes",o.sort)}
          ${option("highest","Maior recompensa",o.sort)}
          ${option("deadline","Menor prazo",o.sort)}
          ${option("vacancies","Mais vagas",o.sort)}
        </select></div>
        <div><label>Participação</label><select class="field" name="newonly">
          <option value="">Todas disponíveis</option>
          <option value="1" ${o.newonly?"selected":""}>Ainda não iniciei</option>
        </select></div>
        <div class="filter-summary-box">
          <small>Resultados</small>
          <b>${feed.total}</b>
          <span>${o.mode === "list" ? "visualização compacta" : "visualização em cards"}</span>
        </div>
      </div>

      <div class="filter-actions">
        <button class="btn primary">Aplicar filtros</button>
        <a class="btn secondary linkbtn nomargin" href="/?view=home">Limpar</a>
      </div>
    </form>

    <div class="toolbar toolbar-home">
      <div><b>${feed.total}</b> missões encontradas</div>
      <div class="toolbar-note">${o.q ? `Busca: "${esc(o.q)}"` : "Veja abaixo as oportunidades disponíveis"}</div>
    </div>

    ${o.mode==="list"
      ? `<div class="mission-list">${feed.missions.length?feed.missions.map(m=>missionListRow(m,user)).join(""):`<div class="empty">Nenhuma missão disponível com esses filtros.</div>`}</div>`
      : `<div class="grid">${feed.missions.length?feed.missions.map(m=>missionCard(m,user)).join(""):`<div class="empty">Nenhuma missão disponível com esses filtros.</div>`}</div>`
    }

    ${renderPagination(feed)}
  `;
}

function renderClientHome(user, missions, subs, wallet) {
  const openCount=missions.filter(m=>m.status==="open").length;
  const waiting=subs.filter(s=>s.status==="submitted").length;
  const approved=subs.filter(s=>s.status==="approved").length;
  return `
    <section class="hero"><h1>Seu painel de missões.</h1><p class="muted">Publique tarefas e acompanhe os trabalhos recebidos.</p></section>

    <div class="metric-grid">
      ${metric("Saldo disponível",brl(wallet.available))}
      ${metric("Saldo reservado",brl(wallet.reserved))}
      ${metric("Missões abertas",openCount)}
      ${metric("Aguardando aprovação",waiting)}
    </div>

    <div class="row action-row">
      <a class="btn primary wide linkbtn nomargin" href="/?view=create">＋ Publicar missão</a>
      <a class="btn secondary wide linkbtn nomargin" href="/?view=client">Ver trabalhos</a>
    </div>

    <div class="section-title"><h2>Suas missões recentes</h2><span>${missions.length}</span></div>
    <div class="grid">
      ${missions.length?missions.slice(0,6).map(m=>clientMissionCard(m)).join(""):`<div class="empty">Você ainda não publicou nenhuma missão.</div>`}
    </div>
  `;
}

function missionCard(m, user) {
  const left=Math.max(0,Number(m.slots)-Number(m.occupied||0));
  return `
    <article class="card">
      ${m.image_data?`<img class="cardimg" src="${m.image_data}" alt="">`:""}
      <div class="cardbody">
        <div class="meta"><span class="tag">${esc(m.category).toUpperCase()}</span><span class="reward">${brl(m.reward)}</span></div>
        <h3>${esc(m.title)}</h3>
        <p>${esc(m.description)}</p>
        <div class="instruction"><b>O que fazer:</b><br>${esc(m.instructions)}</div>
        <div class="stats">
          <span>⏱ ${Number(m.estimated_minutes||5)} min</span>
          <span>🎯 ${left} vagas</span>
          <span>📅 ${esc(deadlineLabel(m.deadline))}</span>
        </div>
        <div class="contractor-line">👤 ${esc(m.client_name||"Contratante")} · ${Number(m.client_approved||0)} trabalhos aprovados</div>
        <form method="post" action="/missions/${m.id}/start"><button class="btn primary wide">Fazer missão · você recebe ${brl(m.reward)}</button></form>
      </div>
    </article>`;
}

function renderMine(user, mine, wallet) {
  if(!canWorker(user)) return denied("Seu perfil não está habilitado para executar missões.");
  const f=mine.filter;
  const tab=(value,label)=>`<a class="${f===value?"active":""}" href="/?view=mine&status=${value}">${label}</a>`;
  return `
    <section class="hero"><h1>Minhas missões</h1><p class="muted">Acompanhe cada etapa sem misturar tarefas em andamento e concluídas.</p></section>

    <div class="metric-grid">
      ${metric("Disponível",brl(wallet.available))}
      ${metric("Em análise",brl(wallet.pending))}
      ${metric("Total ganho",brl(wallet.total))}
    </div>

    <div class="status-tabs">
      ${tab("all","Todas")}${tab("started","Em andamento")}${tab("submitted","Enviadas")}${tab("approved","Aprovadas")}${tab("rejected","Rejeitadas")}
    </div>

    <div class="grid">
      ${mine.submissions.length?mine.submissions.map(s=>`
        <article class="card">
          ${s.image_data?`<img class="cardimg" src="${s.image_data}" alt="">`:""}
          <div class="cardbody">
            <div class="meta"><span class="status ${esc(s.status)}">${statusText(s.status)}</span><span class="reward">${brl(s.reward)}</span></div>
            <h3>${esc(s.title)}</h3>
            <div class="stats"><span>⏱ ${Number(s.estimated_minutes||5)} min</span><span>📅 ${esc(deadlineLabel(s.deadline))}</span></div>
            ${s.status==="started"?`
              <form method="post" action="/submissions/${s.id}/submit" class="image-form">
                <label>Descreva o trabalho realizado</label>
                <textarea class="field" name="answer" required minlength="3" placeholder="Digite sua resposta, resultado ou comprovação..."></textarea>
                <label>Imagem de comprovante (opcional)</label>
                <input class="field image-input" type="file" accept="image/jpeg,image/png,image/webp">
                <input type="hidden" name="proof_image" class="image-data"><img class="preview" alt="">
                <button class="btn primary wide">Enviar para aprovação</button>
              </form>
              <form method="post" action="/submissions/${s.id}/cancel"><button class="btn secondary wide topgap">Cancelar participação</button></form>
            `:`
              ${s.answer?`<div class="answer"><b>Sua resposta:</b><br>${esc(s.answer)}</div>`:""}
              ${s.proof_image?`<img class="proof" src="${s.proof_image}" alt="">`:""}
            `}
          </div>
        </article>`).join(""):`<div class="empty">Nenhuma missão nesta aba.</div>`}
    </div>`;
}

function renderCreate(user, wallet) {
  if(!canClient(user)) return denied("Seu perfil foi criado apenas para realizar missões.");
  const defaultDeadline=datePlusDays(7);
  return `
    <section class="hero"><h1>Publicar missão</h1><p class="muted">Defina a recompensa líquida do trabalhador. Você verá apenas o custo final da missão.</p></section>

    <div class="metric-grid wallet-mini">
      ${metric("Saldo disponível",brl(wallet.available))}
      ${metric("Saldo reservado",brl(wallet.reserved))}
      ${metric("Gasto aprovado",brl(wallet.spent))}
    </div>

    ${wallet.available<MIN_REWARD?`<div class="notice">Seu saldo está zerado. Na v0.4 o administrador adiciona saldo interno pelo painel Admin antes de você publicar.</div>`:""}

    <form class="panel image-form" method="post" action="/missions/create">
      <label>Título</label><input class="field" name="title" required minlength="5" maxlength="100" placeholder="Ex.: Teste minha página e diga o que ficou confuso">
      <label>Categoria</label><select class="field" name="category"><option>Pesquisa</option><option>Teste</option><option>Opinião</option><option>Levantamento</option></select>
      <label>Descrição curta</label><textarea class="field" name="description" required minlength="10" maxlength="500" placeholder="Explique o objetivo da missão."></textarea>
      <label>Instruções</label><textarea class="field" name="instructions" required minlength="10" maxlength="1500" placeholder="Passo a passo do que a pessoa deve fazer."></textarea>

      <div class="form-grid">
        <div><label>Recompensa por pessoa</label><input class="field reward-input" name="reward" type="number" min="2.50" max="500" step="0.50" value="2.50" required></div>
        <div><label>Vagas</label><input class="field slots-input" name="slots" type="number" min="1" max="500" value="10" required></div>
        <div><label>Tempo estimado (min)</label><input class="field" name="estimated_minutes" type="number" min="1" max="180" value="5" required></div>
        <div><label>Prazo</label><input class="field" name="deadline" type="date" min="${todayDate()}" value="${defaultDeadline}" required></div>
      </div>

      <label>Imagem do card (opcional)</label><input class="field image-input" type="file" accept="image/jpeg,image/png,image/webp">
      <input type="hidden" name="image_data" class="image-data"><img class="preview" alt="">

      <div class="final-cost budget">Custo final da missão: ${brl(finalMissionCost(2.50,10))}</div>
      <div class="notice">O trabalhador verá somente a recompensa que recebe. O custo final precisa estar disponível e será reservado quando a missão for publicada.</div>
      <button class="btn primary wide">Publicar e reservar saldo</button>
    </form>`;
}

function renderClient(user, missions, subs, wallet) {
  if(!canClient(user)) return denied("Seu perfil não possui acesso de contratante.");
  return `
    <section class="hero"><h1>Painel do contratante</h1><p class="muted">Gerencie missões, prazos, reservas e aprovações.</p></section>

    <div class="metric-grid">
      ${metric("Saldo disponível",brl(wallet.available))}
      ${metric("Reservado",brl(wallet.reserved))}
      ${metric("Gasto aprovado",brl(wallet.spent))}
      ${metric("Pendentes",subs.filter(s=>s.status==="submitted").length)}
    </div>

    <div class="section-title"><h2>Suas missões</h2><span>${missions.length}</span></div>
    <div class="grid">${missions.length?missions.map(m=>clientMissionCard(m)).join(""):`<div class="empty">Você ainda não publicou nenhuma missão.</div>`}</div>

    <div class="section-title spaced"><h2>Trabalhos recebidos</h2><span>${subs.length}</span></div>
    <div class="grid">
      ${subs.length?subs.map(s=>`
        <article class="card"><div class="cardbody">
          <div class="meta"><span class="status ${esc(s.status)}">${statusText(s.status)}</span><span class="reward">${brl(s.reward)}</span></div>
          <h3>${esc(s.title)}</h3><p><b>${esc(s.worker_name)}</b></p>
          ${s.answer?`<div class="answer">${esc(s.answer)}</div>`:`<p class="muted">Ainda não enviou a resposta.</p>`}
          ${s.proof_image?`<img class="proof" src="${s.proof_image}" alt="">`:""}
          ${s.status==="submitted"?`<div class="row">
            <form method="post" action="/submissions/${s.id}/reject"><button class="btn danger wide">Rejeitar</button></form>
            <form method="post" action="/submissions/${s.id}/approve"><button class="btn primary wide">Aprovar</button></form>
          </div>`:""}
        </div></article>`).join(""):`<div class="empty">Nenhum trabalho recebido ainda.</div>`}
    </div>`;
}

function renderProfile(user, workerWallet, clientWallet, reputation, adminCount) {
  const initials=String(user.name||"U").split(/\s+/).slice(0,2).map(x=>x[0]||"").join("").toUpperCase();
  return `
    <section class="hero"><h1>Perfil e carteira</h1><p class="muted">Acompanhe reputação, saldo e histórico.</p></section>

    <div class="profile-head panel">
      <div class="userline"><div class="avatar initials">${esc(initials)}</div><div>
        <b>${esc(user.name)}</b><div class="muted small">${esc(user.email)}</div>
        <div class="profile-badges">${user.is_admin?`<span class="tag">ADMIN</span>`:""}<span class="tag">${roleLabel(user.role)}</span></div>
      </div></div>
    </div>

    ${workerWallet?`
      <div class="section-title"><h2>Carteira do trabalhador</h2></div>
      <div class="metric-grid">${metric("Disponível",brl(workerWallet.available))}${metric("Em análise",brl(workerWallet.pending))}${metric("Total ganho",brl(workerWallet.total))}${metric("Aprovação",`${reputation.worker?.rate||100}%`)}</div>
      ${renderWorkerHistory(workerWallet.entries)}
    `:""}

    ${clientWallet?`
      <div class="section-title spaced"><h2>Carteira do contratante</h2></div>
      <div class="metric-grid">${metric("Disponível",brl(clientWallet.available))}${metric("Reservado",brl(clientWallet.reserved))}${metric("Gasto aprovado",brl(clientWallet.spent))}${metric("Reputação",`${reputation.client?.rate||100}%`)}</div>
      ${renderClientHistory(clientWallet.entries)}
    `:""}

    <div class="section-title spaced"><h2>Reputação</h2></div>
    <div class="panel reputation">
      ${reputation.worker?`<p><b>Trabalhador:</b> ${reputation.worker.approved} aprovadas · ${reputation.worker.rejected} rejeitadas · ${reputation.worker.rate}% de aprovação</p>`:""}
      ${reputation.client?`<p><b>Contratante:</b> ${reputation.client.missions} missões · ${reputation.client.approved} trabalhos aprovados · ${reputation.client.rate}% de aprovação</p>`:""}
    </div>

    ${adminCount===0&&!user.is_admin?`
      <div class="notice">Primeira configuração: ainda não existe administrador no Bern Nexus.</div>
      <form method="post" action="/admin/claim"><button class="btn primary">Ativar esta conta como administrador</button></form>
    `:""}
    ${user.is_admin?`<a class="btn secondary linkbtn admin-link" href="/?view=admin">Abrir painel Admin</a>`:""}

    <form method="post" action="/logout" class="logoutform"><button class="btn secondary">Sair</button></form>`;
}

function renderNav(view, user) {
  const items=[];
  if(user.role==="worker") {
    items.push(["home","⌂","Missões"],["mine","✓","Minhas"],["profile","●","Perfil"]);
  } else if(user.role==="client") {
    items.push(["home","⌂","Início"],["create","＋","Publicar"],["client","▣","Trabalhos"],["profile","●","Perfil"]);
  } else {
    items.push(["home","⌂","Missões"],["mine","✓","Minhas"],["create","＋","Publicar"],["client","▣","Contratante"],["profile","●","Perfil"]);
  }
  if(user.is_admin) items.push(["admin","⚙","Admin"]);
  return `<nav class="nav" style="--nav-count:${items.length}">${items.map(([id,icon,label])=>`<a class="${view===id?"active":""}" href="/?view=${id}"><strong>${icon}</strong>${label}</a>`).join("")}</nav>`;
}

function option(value,label,current) {
  return `<option value="${esc(value)}" ${String(value)===String(current)?"selected":""}>${esc(label)}</option>`;
}

function metric(label,value) {
  return `<div class="metric-card"><small>${esc(label)}</small><b>${esc(String(value))}</b></div>`;
}

function missionListRow(m,user) {
  const left=Math.max(0,Number(m.slots)-Number(m.occupied||0));
  return `<article class="mission-row">
    <div class="mission-row-main">
      <div class="row-title"><span class="tag">${esc(m.category).toUpperCase()}</span><b>${esc(m.title)}</b></div>
      <div class="row-meta"><span>⏱ ${Number(m.estimated_minutes||5)} min</span><span>🎯 ${left} vagas</span><span>📅 ${esc(deadlineLabel(m.deadline))}</span><span>👤 ${esc(m.client_name||"Contratante")}</span></div>
    </div>
    <div class="mission-row-pay"><span>Você recebe</span><b>${brl(m.reward)}</b>
      <form method="post" action="/missions/${m.id}/start"><button class="btn primary">Fazer</button></form>
    </div>
  </article>`;
}

function renderPagination(feed) {
  if(feed.pages<=1) return "";
  const o=feed.opts;
  return `<div class="pagination">
    ${o.page>1?`<a class="btn secondary linkbtn nomargin" href="${queryUrl(o,{page:o.page-1})}">← Anterior</a>`:`<span></span>`}
    <span>Página ${o.page} de ${feed.pages}</span>
    ${o.page<feed.pages?`<a class="btn secondary linkbtn nomargin" href="${queryUrl(o,{page:o.page+1})}">Próxima →</a>`:`<span></span>`}
  </div>`;
}

function clientMissionCard(m) {
  return `<article class="card">
    ${m.image_data?`<img class="cardimg" src="${m.image_data}" alt="">`:""}
    <div class="cardbody">
      <div class="meta"><span class="tag">${esc(m.category).toUpperCase()}</span><span class="reward">${brl(m.reward)}</span></div>
      <h3>${esc(m.title)}</h3>
      <div class="stats">
        <span>${Number(m.submissions_count||0)} participações</span>
        <span>${Number(m.pending_count||0)} em análise</span>
        <span>${Number(m.approved_count||0)} aprovadas</span>
        <span>📅 ${esc(deadlineLabel(m.deadline))}</span>
      </div>
      <div class="cost-line"><span>Custo final</span><b>${brl(m.final_cost)}</b></div>
      <div class="cost-line"><span>Ainda reservado</span><b>${brl(m.reserved_remaining)}</b></div>
      <form method="post" action="/missions/${m.id}/${m.status==="open"?"close":"open"}">
        <button class="btn secondary wide">${m.status==="open"?"Fechar missão":"Reabrir missão"}</button>
      </form>
    </div></article>`;
}

function renderWorkerHistory(entries) {
  return `<div class="history panel"><h3>Histórico</h3>${entries.length?entries.map(e=>`<div class="history-row"><div><b>${esc(e.description||e.type)}</b><small>${formatDateTime(e.created_at)}</small></div><strong class="${Number(e.amount)>=0?"positive":"negative"}">${brl(e.amount)}</strong></div>`).join(""):`<div class="muted">Nenhuma movimentação ainda.</div>`}</div>`;
}

function renderClientHistory(entries) {
  return `<div class="history panel"><h3>Histórico</h3>${entries.length?entries.map(e=>`<div class="history-row"><div><b>${esc(e.description||e.type)}</b><small>${formatDateTime(e.created_at)}</small></div><div class="ledger-values"><span>Disponível ${signedBrl(e.delta_available)}</span><span>Reservado ${signedBrl(e.delta_reserved)}</span></div></div>`).join(""):`<div class="muted">Nenhuma movimentação ainda.</div>`}</div>`;
}

function renderAdmin(user,data) {
  return `
    <section class="hero"><h1>Admin Bern Nexus</h1><p class="muted">Controle usuários, saldo interno, missões e receita da plataforma.</p></section>
    <div class="metric-grid">
      ${metric("Usuários",Number(data.stats.users||0))}
      ${metric("Missões abertas",Number(data.stats.open_missions||0))}
      ${metric("Aguardando revisão",Number(data.stats.pending_reviews||0))}
      ${metric("Saldo reservado",brl(data.stats.total_reserved||0))}
      ${metric("Receita Nexus",brl(data.platform))}
    </div>

    <div class="section-title spaced"><h2>Usuários</h2><span>${data.users.length}</span></div>
    <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Usuário</th><th>Perfil</th><th>Saldo</th><th>Status</th><th>Ações</th></tr></thead><tbody>
      ${data.users.map(u=>`<tr>
        <td><b>${esc(u.name)}</b><small>${esc(u.email)}</small></td>
        <td>${esc(roleLabel(u.role))}${Number(u.is_admin||0)===1?` · ADMIN`:""}</td>
        <td>${["client","both"].includes(u.role)?`${brl(u.client_available)} disp.<br><small>${brl(u.client_reserved)} reservado</small>`:"—"}</td>
        <td>${Number(u.is_blocked||0)===1?"Bloqueado":"Ativo"}</td>
        <td>
          ${["client","both"].includes(u.role)?`<form class="inline-form" method="post" action="/admin/users/${u.id}/credit"><input class="mini-input" name="amount" type="number" min="2.50" step="0.50" placeholder="R$"><button class="mini-btn">+ saldo</button></form>`:""}
          ${Number(u.is_admin||0)!==1?`<form class="inline-form" method="post" action="/admin/users/${u.id}/${Number(u.is_blocked||0)===1?"unblock":"block"}"><button class="mini-btn ${Number(u.is_blocked||0)===1?"":"danger-mini"}">${Number(u.is_blocked||0)===1?"Desbloquear":"Bloquear"}</button></form>`:""}
        </td>
      </tr>`).join("")}
    </tbody></table></div>

    <div class="section-title spaced"><h2>Missões recentes</h2><span>${data.missions.length}</span></div>
    <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Missão</th><th>Contratante</th><th>Valor</th><th>Prazo</th><th>Status</th><th></th></tr></thead><tbody>
      ${data.missions.map(m=>`<tr><td><b>#${m.id} ${esc(m.title)}</b></td><td>${esc(m.client_name||"—")}</td><td>${brl(m.final_cost)}</td><td>${esc(deadlineLabel(m.deadline))}</td><td>${esc(m.status)}</td><td>${m.status==="open"?`<form method="post" action="/admin/missions/${m.id}/close"><button class="mini-btn danger-mini">Encerrar</button></form>`:""}</td></tr>`).join("")}
    </tbody></table></div>`;
}

function formatDateTime(v) {
  if(!v) return "";
  return String(v).replace("T"," ").slice(0,16);
}
function signedBrl(v) {
  const n=Number(v||0);
  return `${n>=0?"+":""}${brl(n)}`;
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
  const token=getCookie(request,"bn_session");
  if(!token) return null;
  const row=await db.prepare(`
    SELECT u.id,u.name,u.email,u.role,u.created_at,u.is_admin,u.is_blocked
    FROM nexus_sessions s JOIN nexus_users u ON u.id=s.user_id
    WHERE s.token=? AND s.expires_at>CURRENT_TIMESTAMP LIMIT 1
  `).bind(token).first();
  if(!row||!row.id) return null;
  return {
    id:Number(row.id),
    name:String(row.name||"Usuário"),
    email:String(row.email||""),
    role:["worker","client","both"].includes(String(row.role))?String(row.role):"worker",
    is_admin:Number(row.is_admin||0)===1,
    is_blocked:Number(row.is_blocked||0)===1,
    created_at:row.created_at||""
  };
}

async function createSession(db, userId) {
  const token = randomHex(32);
  const expires = new Date(Date.now() + SESSION_DAYS * 86400000).toISOString().replace("T"," ").replace("Z","");
  await db.prepare("INSERT INTO nexus_sessions(token,user_id,expires_at) VALUES(?,?,?)").bind(token,userId,expires).run();
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
  return ({started:"Em andamento",submitted:"Em análise",approved:"Aprovada",rejected:"Rejeitada",cancelled:"Cancelada"})[s] || s;
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
:root{
  --bg:#07111f;
  --panel:#0d1b2a;
  --panel-2:#0a1826;
  --line:#20384e;
  --line-2:#294159;
  --text:#edf5ff;
  --muted:#91a6b9;
  --accent:#50e3a4;
  --accent-dark:#062117;
}
*{box-sizing:border-box}
html{background:var(--bg)}
body{
  margin:0;
  min-width:320px;
  background:
    radial-gradient(circle at 10% 0%,rgba(27,82,103,.18),transparent 34rem),
    var(--bg);
  color:var(--text);
  font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
}
button,input,textarea,select{font:inherit}
button,a,input,textarea,select{-webkit-tap-highlight-color:transparent}
a{color:inherit}

.app{
  width:100%;
  max-width:1180px;
  min-height:100vh;
  margin:0 auto;
  background:linear-gradient(180deg,#0a1726 0%,#07111f 42%);
}
header{
  position:sticky;
  top:0;
  z-index:40;
  min-height:64px;
  padding:14px 18px;
  background:rgba(7,17,31,.94);
  backdrop-filter:blur(14px);
  border-bottom:1px solid #173149;
}
.toprow{
  min-height:36px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:16px;
}
.brand{
  font-weight:950;
  letter-spacing:.5px;
  color:#fff;
  text-decoration:none;
  white-space:nowrap;
}
.brand b{color:var(--accent)}
.brand.big{font-size:24px;margin-bottom:20px}
.head-user{display:flex;align-items:center;gap:10px;min-width:0}
.head-name{
  max-width:180px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  font-size:12px;
  color:#b8c9d8;
}
.pill{
  white-space:nowrap;
  font-size:10px;
  border:1px solid #2a4259;
  border-radius:999px;
  padding:6px 9px;
  color:#9fb5c8;
}
main{
  width:100%;
  min-width:0;
  padding:22px 18px 112px;
}
.hero{
  margin-bottom:16px;
}
.hero h1{
  max-width:760px;
  margin:0 0 8px;
  font-size:clamp(26px,5vw,38px);
  line-height:1.07;
  letter-spacing:-.7px;
}
.hero p{max-width:720px;margin:0}
.muted{color:var(--muted)}
.small,small{font-size:12px;color:var(--muted)}

.goal{
  max-width:820px;
  background:linear-gradient(135deg,#12364b,#0b2537);
  border:1px solid #24506b;
  border-radius:20px;
  padding:18px;
  margin:16px 0;
}
.goalrow{display:flex;justify-content:space-between;gap:16px;align-items:flex-end}
.goalright{text-align:right}
.money{font-size:30px;font-weight:950;margin-top:4px}
.bar{height:9px;background:#07131f;border-radius:99px;overflow:hidden;margin-top:13px}
.bar i{display:block;height:100%;background:var(--accent);border-radius:99px}
.goaltext{font-size:12px;color:#9db1c3;margin-top:8px}

.notice{
  max-width:820px;
  padding:11px 13px;
  border:1px solid #5c4c2f;
  background:#2a2316;
  color:#f0d494;
  border-radius:13px;
  font-size:12px;
  line-height:1.45;
  margin:12px 0;
}
.flash{
  max-width:820px;
  padding:11px 13px;
  border-radius:13px;
  margin-bottom:14px;
  font-size:13px;
}
.flash.ok{background:#123329;border:1px solid #28694f;color:#8ff2c5}
.flash.err{background:#351b25;border:1px solid #6f3043;color:#ffb4c4}

.section-title{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
  margin:22px 0 11px;
}
.section-title.spaced{margin-top:32px}
.section-title h2{margin:0;font-size:19px}
.section-title span{font-size:12px;color:#8fa5b8}

.grid{
  display:grid;
  grid-template-columns:1fr;
  gap:14px;
}
.card{
  min-width:0;
  background:var(--panel);
  border:1px solid var(--line);
  border-radius:19px;
  overflow:hidden;
}
.cardimg{
  width:100%;
  aspect-ratio:16/9;
  max-height:260px;
  object-fit:cover;
  background:#091521;
  display:block;
}
.cardbody{padding:16px}
.meta{
  display:flex;
  justify-content:space-between;
  gap:10px;
  align-items:center;
  margin-bottom:10px;
}
.tag{
  font-size:10px;
  font-weight:900;
  background:#15344a;
  color:#9fdcff;
  padding:5px 8px;
  border-radius:999px;
}
.reward{font-size:18px;font-weight:950;color:#58edac}
.card h3{margin:0 0 7px;font-size:17px;line-height:1.25}
.card p{font-size:13px;line-height:1.48;color:#9cb0c2}
.instruction,.answer{
  font-size:12px;
  line-height:1.48;
  background:#081521;
  border:1px solid #1e354b;
  border-radius:12px;
  padding:11px;
  margin:10px 0;
  color:#bfd0df;
  overflow-wrap:anywhere;
}
.stats{
  font-size:11px;
  color:#819aae;
  display:flex;
  gap:12px;
  flex-wrap:wrap;
  margin:12px 0;
}

.btn{
  min-height:44px;
  border:0;
  border-radius:12px;
  padding:11px 14px;
  font-weight:900;
  cursor:pointer;
}
.primary{background:var(--accent);color:var(--accent-dark)}
.secondary{background:#12263a;color:#e6f1fc;border:1px solid #29435b}
.danger{background:#3b1b25;color:#ffd7e2;border:1px solid #6c3042}
.wide{width:100%}
.linkbtn{display:flex;align-items:center;justify-content:center;text-align:center;text-decoration:none;margin-top:12px}
.row{
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(0,1fr);
  gap:10px;
}
.row form{margin:0;min-width:0}

.panel{
  width:100%;
  max-width:820px;
  background:var(--panel);
  border:1px solid var(--line);
  border-radius:20px;
  padding:18px;
}
label{
  display:block;
  font-size:12px;
  color:#9bb0c3;
  margin:13px 0 6px;
}
.field{
  width:100%;
  min-width:0;
  min-height:44px;
  border:1px solid var(--line-2);
  background:#081521;
  color:var(--text);
  border-radius:12px;
  padding:11px 12px;
  outline:none;
}
.field:focus{border-color:var(--accent);box-shadow:0 0 0 2px rgba(80,227,164,.08)}
textarea.field{min-height:104px;resize:vertical}
.preview,.proof{
  display:none;
  width:100%;
  max-height:280px;
  object-fit:cover;
  border-radius:13px;
  margin:11px 0;
}
.proof{display:block}

.client-summary{
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:11px;
  max-width:820px;
  margin:17px 0;
}
.summary-box{
  min-width:0;
  background:var(--panel);
  border:1px solid var(--line);
  border-radius:15px;
  padding:14px;
}
.summary-box small{display:block;line-height:1.25}
.summary-box b{display:block;font-size:24px;margin-top:5px}
.action-row{max-width:820px;margin:11px 0}
.nomargin{margin-top:0}

.nav{
  position:fixed;
  left:0;
  right:0;
  bottom:0;
  z-index:50;
  display:grid;
  grid-template-columns:repeat(var(--nav-count,5),minmax(0,1fr));
  width:100%;
  max-width:1180px;
  margin:0 auto;
  padding:7px 8px max(8px,env(safe-area-inset-bottom));
  background:rgba(7,17,31,.98);
  border-top:1px solid #193248;
  backdrop-filter:blur(14px);
}
.nav-worker{grid-template-columns:repeat(3,minmax(0,1fr))}
.nav-client{grid-template-columns:repeat(4,minmax(0,1fr))}
.nav a{
  min-width:0;
  min-height:48px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:2px;
  color:#829aae;
  text-decoration:none;
  text-align:center;
  font-size:10px;
  border-radius:11px;
  padding:5px 4px;
}
.nav strong{display:block;font-size:18px;line-height:1}
.nav a.active{color:var(--accent);background:rgba(80,227,164,.07)}

.auth-wrap{
  min-height:100vh;
  display:grid;
  place-items:center;
  padding:24px 16px;
}
.auth-card{
  width:min(430px,100%);
  background:var(--panel);
  border:1px solid var(--line);
  border-radius:22px;
  padding:22px;
}
.auth-card h1{margin-bottom:6px}
.auth-card form .btn{margin-top:16px}
.switch{display:block;color:var(--accent);text-decoration:none;margin-top:14px;font-size:13px}

.userline{display:flex;gap:12px;align-items:center}
.avatar{
  width:52px;height:52px;border-radius:16px;
  background:#17364d;
  display:grid;place-items:center;
  font-size:23px;
}
.panel hr{border:0;border-top:1px solid var(--line);margin:18px 0}
.empty{
  padding:34px 16px;
  text-align:center;
  color:#839bae;
  border:1px dashed #223c53;
  border-radius:16px;
}
.status{font-size:11px;font-weight:900;text-transform:uppercase}
.started{color:#8bcaff}.submitted{color:#ffc978}.approved{color:#55e9aa}.rejected{color:#ff8fa9}


.filter-panel{max-width:1000px;background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:15px;margin:18px 0}
.home-hero-shell{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(320px,.85fr);gap:18px;align-items:stretch;max-width:1000px}
.hero-kicker{display:inline-flex;align-items:center;gap:8px;background:rgba(80,227,164,.08);border:1px solid rgba(80,227,164,.18);color:#88efbc;border-radius:999px;padding:7px 12px;font-size:11px;font-weight:800;letter-spacing:.2px;margin-bottom:12px}
.home-hero-copy{min-width:0;padding-top:4px}
.hero-mini-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:18px;max-width:760px}
.hero-mini-card{min-width:0;background:linear-gradient(180deg,rgba(14,32,49,.95),rgba(10,25,40,.95));border:1px solid #1d3a50;border-radius:16px;padding:14px 14px 13px;box-shadow:0 10px 24px rgba(0,0,0,.12)}
.hero-mini-card small{display:block}
.hero-mini-card b{display:block;font-size:22px;margin-top:5px;color:#f4fbff;overflow-wrap:anywhere}
.goal-highlight{max-width:none;min-width:0;margin:0;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 18px 38px rgba(3,15,25,.18)}
.goal-topline{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:10px}
.goal-badge{display:inline-flex;align-items:center;border:1px solid rgba(80,227,164,.22);background:rgba(80,227,164,.08);color:#8ff1c2;border-radius:999px;padding:6px 10px;font-size:11px;font-weight:800}
.goal-percent{font-size:12px;font-weight:900;color:#c6f7de}
.goalfoot{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-top:8px}
.goalhint{font-size:11px;color:#a7c0d2;text-align:right}
.notice-home{max-width:1000px}
.filter-panel-hero{max-width:1000px;background:linear-gradient(180deg,rgba(13,27,42,.98),rgba(9,22,35,.98));box-shadow:0 10px 28px rgba(0,0,0,.14)}
.filter-panel-head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:12px}
.filter-panel-head b{font-size:18px}
.filter-panel-head p{margin:6px 0 0}
.filter-search-wide{max-width:none}
.search-field{font-size:14px}
.filter-grid-4{grid-template-columns:1.25fr 1fr 1fr minmax(150px,.7fr)}
.filter-summary-box{background:#0b1b2b;border:1px solid #20384e;border-radius:14px;padding:12px 13px;display:flex;flex-direction:column;justify-content:center}
.filter-summary-box small{display:block}
.filter-summary-box b{display:block;font-size:24px;line-height:1.1;margin:4px 0;color:#fff}
.filter-summary-box span{font-size:11px;color:#92a8ba}
.toolbar-home{max-width:1000px}
.toolbar-note{font-size:11px;color:#8ea6b8}

.filter-search{max-width:650px}.filter-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.filter-actions{display:flex;gap:9px;margin-top:12px}.filter-actions .btn{min-width:130px}
.toolbar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:20px 0 11px;color:#9fb2c4;font-size:12px}.view-switch{display:flex;border:1px solid var(--line);border-radius:11px;overflow:hidden}.view-switch a{padding:8px 11px;text-decoration:none}.view-switch a.active{background:#15344a;color:var(--accent)}
.mission-list{display:grid;gap:8px}.mission-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:16px;align-items:center;background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:13px 14px}.mission-row-main{min-width:0}.row-title{display:flex;align-items:center;gap:9px;min-width:0}.row-title b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.row-meta{display:flex;gap:12px;flex-wrap:wrap;color:#819aae;font-size:11px;margin-top:7px}.mission-row-pay{text-align:right;min-width:130px}.mission-row-pay>span{display:block;color:#8fa5b8;font-size:10px}.mission-row-pay>b{display:block;color:var(--accent);font-size:18px;margin:2px 0 6px}.mission-row-pay .btn{min-height:36px;padding:7px 13px}
.pagination{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:10px;margin-top:18px}.pagination>:last-child{justify-self:end}.pagination>span{text-align:center;color:#8fa5b8;font-size:12px}
.metric-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;max-width:1000px;margin:15px 0}.metric-card{min-width:0;background:var(--panel);border:1px solid var(--line);border-radius:15px;padding:13px}.metric-card small{display:block}.metric-card b{display:block;font-size:21px;margin-top:5px;overflow-wrap:anywhere}.wallet-mini{grid-template-columns:repeat(3,minmax(0,1fr));max-width:820px}
.status-tabs{display:flex;gap:7px;overflow:auto;padding:2px 0 14px}.status-tabs a{white-space:nowrap;text-decoration:none;border:1px solid var(--line);border-radius:999px;padding:8px 11px;color:#99adbf;font-size:12px}.status-tabs a.active{background:#15344a;color:var(--accent);border-color:#28516b}
.form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.final-cost{margin:14px 0;background:#123329;border:1px solid #28694f;color:#9af2c9;border-radius:14px;padding:14px;font-size:17px;font-weight:900}
.contractor-line{font-size:11px;color:#849caf;margin:10px 0}.cost-line{display:flex;justify-content:space-between;gap:10px;padding:7px 0;border-top:1px solid #1c3348;font-size:12px}.cost-line b{color:#bcd0e0}.topgap{margin-top:8px}
.profile-head{margin-bottom:14px}.initials{font-weight:950;color:var(--accent)}.profile-badges{display:flex;gap:6px;margin-top:7px}.reputation p{margin:7px 0}.history{margin-top:10px}.history h3{margin-top:0}.history-row{display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-top:1px solid #1c3348}.history-row:first-of-type{border-top:0}.history-row small{display:block;margin-top:3px}.history-row strong.positive{color:var(--accent)}.history-row strong.negative{color:#ff8fa9}.ledger-values{text-align:right;font-size:11px;color:#a7bbcb}.ledger-values span{display:block}.admin-link{max-width:260px}.logoutform{margin-top:16px}
.adminpill{border-color:#66552d;color:#ffd776}.admin-table-wrap{overflow:auto;border:1px solid var(--line);border-radius:15px;max-width:100%}.admin-table{width:100%;border-collapse:collapse;min-width:760px;background:var(--panel)}.admin-table th,.admin-table td{text-align:left;padding:11px;border-bottom:1px solid #1d3449;font-size:12px;vertical-align:top}.admin-table th{color:#8fa5b8;background:#091725}.admin-table td small{display:block;margin-top:3px}.inline-form{display:flex;gap:5px;margin:3px 0}.mini-input{width:85px;background:#081521;border:1px solid var(--line-2);color:white;border-radius:8px;padding:6px}.mini-btn{border:1px solid #31506a;background:#132a3e;color:#dceaf6;border-radius:8px;padding:6px 8px;cursor:pointer;white-space:nowrap}.danger-mini{border-color:#703449;background:#3a1d27;color:#ffd4df}

@media(max-width:520px){
  .head-name{display:none}
  .pill{font-size:9px;padding:5px 7px}
  main{padding:18px 14px 110px}
  header{padding:13px 14px}
  .hero h1{font-size:28px}
  .goal{padding:16px}
  .goalrow{align-items:flex-start}
  .goalright{max-width:115px}
  .row{grid-template-columns:1fr}
  .client-summary{grid-template-columns:1fr}
  .cardbody,.panel{padding:15px}
  .home-hero-shell{grid-template-columns:1fr}
  .hero-mini-stats{grid-template-columns:1fr}
  .goal-topline,.goalfoot{flex-direction:column;align-items:flex-start}
  .filter-panel-head{flex-direction:column}
  .filter-grid,.form-grid,.metric-grid,.wallet-mini,.filter-grid-4{grid-template-columns:1fr}
  .filter-actions{flex-direction:column}
  .mission-row{grid-template-columns:1fr}
  .mission-row-pay{text-align:left;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  .mission-row-pay>b{margin:0}
  .pagination{grid-template-columns:1fr}.pagination>*{justify-self:stretch!important}
  .toolbar{align-items:flex-start;flex-direction:column}
}


@media(max-width:860px){
  .home-hero-shell{grid-template-columns:1fr}
  .filter-grid-4{grid-template-columns:repeat(2,minmax(0,1fr))}
  .goal-highlight{max-width:1000px}
}

@media(min-width:640px){
  .app{
    display:grid;
    grid-template-columns:210px minmax(0,1fr);
    grid-template-rows:auto 1fr;
    min-height:100vh;
    border-left:1px solid #173149;
    border-right:1px solid #173149;
  }
  .app>header{
    grid-column:1/-1;
    grid-row:1;
    padding:15px 24px;
  }
  .app>main{
    grid-column:2;
    grid-row:2;
    min-width:0;
    padding:30px 32px 54px;
  }
  .nav{
    position:sticky;
    top:64px;
    left:auto;
    right:auto;
    bottom:auto;
    grid-column:1;
    grid-row:2;
    align-self:start;
    display:flex;
    flex-direction:column;
    gap:6px;
    width:auto;
    max-width:none;
    min-height:calc(100vh - 64px);
    margin:0;
    padding:22px 12px;
    background:#081522;
    border-top:0;
    border-right:1px solid #173149;
    backdrop-filter:none;
  }
  .nav a{
    min-height:48px;
    flex-direction:row;
    justify-content:flex-start;
    gap:11px;
    padding:10px 12px;
    font-size:12px;
    text-align:left;
  }
  .nav strong{
    width:22px;
    text-align:center;
    font-size:17px;
  }
  .grid{
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
  .panel{
    padding:22px;
  }
}

@media(min-width:980px){
  .app{grid-template-columns:230px minmax(0,1fr)}
  .app>main{padding:34px 42px 64px}
  .grid{gap:16px}
  .hero h1{font-size:40px}
}

@media(min-width:1180px){
  body{padding:18px}
  .app{
    min-height:calc(100vh - 36px);
    border:1px solid #173149;
    border-radius:26px;
    overflow:clip;
  }
  .nav{min-height:calc(100vh - 101px)}
}
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
      if(budget){
        const porPessoa=Math.round(reward*1.20*100)/100;
        const total=Math.round(porPessoa*slots*100)/100;
        budget.textContent="Custo final da missão: "+new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(total);
      }
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
