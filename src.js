const MIN_REWARD = 2.50;
const DAILY_GOAL = 50.00;
const MAX_IMAGE_CHARS = 200000;
const SESSION_DAYS = 30;
const CATEGORIES = ["Pesquisa", "Teste", "Opinião", "Levantamento"];

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      if (url.pathname.startsWith("/api/")) return await api(request, env, url);
      return html(APP_HTML);
    } catch (err) {
      console.error(err);
      return json({ error: "Erro interno", detail: String(err?.message || err) }, 500);
    }
  }
};

async function api(request, env, url) {
  if (!env.DB) return json({ error: "D1 não configurado. Adicione o binding DB." }, 503);

  const method = request.method.toUpperCase();
  const path = url.pathname;

  if (method === "GET" && path === "/api/health") {
    try {
      const expected = ["users","sessions","missions","submissions","wallet_ledger"];
      const rows = await env.DB.prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
      ).all();
      const tables = (rows.results || []).map(x => x.name);
      const missing = expected.filter(x => !tables.includes(x));
      return json({
        ok: missing.length === 0,
        db_binding: true,
        tables,
        missing_tables: missing,
        message: missing.length
          ? "D1 conectado, mas faltam tabelas. Execute as migrations."
          : "D1 conectado e estrutura principal pronta."
      }, missing.length ? 503 : 200);
    } catch (e) {
      return json({
        ok: false,
        db_binding: true,
        message: "O binding DB existe, mas a consulta de diagnóstico falhou.",
        detail: String(e?.message || e)
      }, 500);
    }
  }

  const user = await currentUser(request, env);

  if (method === "POST" && path === "/api/register") {
    const body = await bodyJson(request);
    const name = clean(body.name, 80);
    const email = clean(body.email, 160).toLowerCase();
    const password = String(body.password || "");
    const role = ["worker","client","both"].includes(body.role) ? body.role : "worker";
    if (name.length < 2) return json({error:"Informe seu nome."}, 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({error:"E-mail inválido."}, 400);
    if (password.length < 6) return json({error:"A senha precisa ter ao menos 6 caracteres."}, 400);
    const exists = await env.DB.prepare("SELECT id FROM users WHERE email=?").bind(email).first();
    if (exists) return json({error:"Este e-mail já está cadastrado."}, 409);

    const salt = randomHex(16);
    const password_hash = await hashPassword(password, salt);
    const r = await env.DB.prepare(
      "INSERT INTO users(name,email,password_hash,password_salt,role) VALUES(?,?,?,?,?)"
    ).bind(name,email,password_hash,salt,role).run();
    const userId = Number(r.meta?.last_row_id || 0);
    if (!userId) throw new Error("Não foi possível obter o ID do usuário criado.");
    return await createSessionResponse(env, userId, { ok:true });
  }

  if (method === "POST" && path === "/api/login") {
    const body = await bodyJson(request);
    const email = clean(body.email,160).toLowerCase();
    const password = String(body.password || "");
    const row = await env.DB.prepare("SELECT * FROM users WHERE email=?").bind(email).first();
    if (!row) return json({error:"E-mail ou senha incorretos."}, 401);
    const candidate = await hashPassword(password, row.password_salt);
    if (!safeEqual(candidate, row.password_hash)) return json({error:"E-mail ou senha incorretos."}, 401);
    return await createSessionResponse(env, row.id, { ok:true });
  }

  if (method === "POST" && path === "/api/logout") {
    const token = getCookie(request, "bn_session");
    if (token) await env.DB.prepare("DELETE FROM sessions WHERE token=?").bind(token).run();
    return json({ok:true}, 200, {"set-cookie": expiredCookie()});
  }

  if (method === "GET" && path === "/api/me") {
    return json({ user: user ? publicUser(user) : null, min_reward: MIN_REWARD, daily_goal: DAILY_GOAL });
  }

  if (!user) return json({error:"Faça login para continuar."}, 401);

  if (method === "GET" && path === "/api/missions") {
    const category = clean(url.searchParams.get("category") || "", 40);
    let sql = `
      SELECT m.id,m.title,m.category,m.description,m.instructions,m.reward,m.slots,m.image_data,m.created_at,
      u.name AS client_name,
      (SELECT COUNT(*) FROM submissions s WHERE s.mission_id=m.id AND s.status IN ('started','submitted','approved')) AS occupied
      FROM missions m LEFT JOIN users u ON u.id=m.client_id
      WHERE m.status='open'`;
    const binds = [];
    if (category && CATEGORIES.includes(category)) { sql += " AND m.category=?"; binds.push(category); }
    sql += " ORDER BY m.created_at DESC LIMIT 100";
    const rows = await env.DB.prepare(sql).bind(...binds).all();
    return json({missions: rows.results || []});
  }

  if (method === "POST" && path === "/api/missions") {
    if (!canClient(user)) return json({error:"Seu perfil não pode publicar missões."}, 403);
    const b = await bodyJson(request);
    const title = clean(b.title,100);
    const category = CATEGORIES.includes(b.category) ? b.category : "Pesquisa";
    const description = clean(b.description,500);
    const instructions = clean(b.instructions,1500);
    const reward = Number(b.reward);
    const slots = Math.floor(Number(b.slots));
    const image = String(b.image_data || "");
    if (title.length < 5 || description.length < 10 || instructions.length < 10) return json({error:"Preencha título, descrição e instruções com mais detalhes."},400);
    if (!Number.isFinite(reward) || reward < MIN_REWARD || reward > 500) return json({error:`A recompensa deve ser entre R$ ${MIN_REWARD.toFixed(2).replace(".",",")} e R$ 500,00.`},400);
    if (!Number.isInteger(slots) || slots < 1 || slots > 500) return json({error:"As vagas devem ficar entre 1 e 500."},400);
    if (image && (!image.startsWith("data:image/jpeg;base64,") && !image.startsWith("data:image/webp;base64,"))) return json({error:"Formato de imagem inválido."},400);
    if (image.length > MAX_IMAGE_CHARS) return json({error:"Imagem muito grande. Use uma imagem menor."},413);

    const row = await env.DB.prepare(`
      INSERT INTO missions(client_id,title,category,description,instructions,reward,slots,image_data,status)
      VALUES(?,?,?,?,?,?,?,?, 'open')
    `).bind(user.id,title,category,description,instructions,reward,slots,image || null).run();
    const missionId = Number(row.meta?.last_row_id || 0);
    if (!missionId) throw new Error("Não foi possível obter o ID da missão criada.");
    return json({ok:true,id:missionId});
  }

  const startMatch = path.match(/^\/api\/missions\/(\d+)\/start$/);
  if (method === "POST" && startMatch) {
    if (!canWorker(user)) return json({error:"Seu perfil não pode executar missões."},403);
    const missionId = Number(startMatch[1]);
    const mission = await env.DB.prepare("SELECT id,client_id,status,slots FROM missions WHERE id=?").bind(missionId).first();
    if (!mission || mission.status !== "open") return json({error:"Missão indisponível."},404);
    if (mission.client_id === user.id) return json({error:"Você não pode executar sua própria missão."},400);

    try {
      const result = await env.DB.prepare(`
        INSERT INTO submissions(mission_id,worker_id,status)
        SELECT ?, ?, 'started'
        WHERE (SELECT COUNT(*) FROM submissions WHERE mission_id=? AND status IN ('started','submitted','approved'))
              < (SELECT slots FROM missions WHERE id=? AND status='open')
      `).bind(missionId,user.id,missionId,missionId).run();
      if (!result.meta?.changes) return json({error:"As vagas desta missão acabaram."},409);
    } catch (e) {
      if (String(e).includes("UNIQUE")) return json({error:"Você já iniciou esta missão."},409);
      throw e;
    }
    const row = await env.DB.prepare("SELECT id FROM submissions WHERE mission_id=? AND worker_id=?").bind(missionId,user.id).first();
    return json({ok:true,submission_id:row.id});
  }

  const submitMatch = path.match(/^\/api\/submissions\/(\d+)\/submit$/);
  if (method === "POST" && submitMatch) {
    const id = Number(submitMatch[1]);
    const b = await bodyJson(request);
    const answer = clean(b.answer,3000);
    const proof = String(b.proof_image || "");
    if (answer.length < 3) return json({error:"Envie uma resposta ou descrição do trabalho."},400);
    if (proof && (!proof.startsWith("data:image/jpeg;base64,") && !proof.startsWith("data:image/webp;base64,"))) return json({error:"Comprovante inválido."},400);
    if (proof.length > MAX_IMAGE_CHARS) return json({error:"Comprovante muito grande."},413);
    const r = await env.DB.prepare(`
      UPDATE submissions SET answer=?, proof_image=?, status='submitted', submitted_at=CURRENT_TIMESTAMP
      WHERE id=? AND worker_id=? AND status='started'
    `).bind(answer,proof || null,id,user.id).run();
    if (!r.meta?.changes) return json({error:"Essa missão não pode mais ser enviada."},409);
    return json({ok:true});
  }

  if (method === "GET" && path === "/api/my-submissions") {
    const rows = await env.DB.prepare(`
      SELECT s.id,s.status,s.answer,s.proof_image,s.created_at,s.submitted_at,s.reviewed_at,
             m.id mission_id,m.title,m.category,m.reward,m.image_data,m.description
      FROM submissions s JOIN missions m ON m.id=s.mission_id
      WHERE s.worker_id=? ORDER BY s.created_at DESC
    `).bind(user.id).all();
    return json({submissions:rows.results || []});
  }

  if (method === "GET" && path === "/api/client/missions") {
    if (!canClient(user)) return json({error:"Perfil sem acesso."},403);
    const rows = await env.DB.prepare(`
      SELECT m.*,
       (SELECT COUNT(*) FROM submissions s WHERE s.mission_id=m.id) submissions_count,
       (SELECT COUNT(*) FROM submissions s WHERE s.mission_id=m.id AND s.status='approved') approved_count
      FROM missions m WHERE m.client_id=? ORDER BY m.created_at DESC
    `).bind(user.id).all();
    return json({missions:rows.results || []});
  }

  if (method === "GET" && path === "/api/client/submissions") {
    if (!canClient(user)) return json({error:"Perfil sem acesso."},403);
    const missionId = Number(url.searchParams.get("mission_id") || 0);
    const rows = await env.DB.prepare(`
      SELECT s.id,s.status,s.answer,s.proof_image,s.submitted_at,s.created_at,
             w.name worker_name,w.email worker_email,
             m.id mission_id,m.title,m.reward
      FROM submissions s
      JOIN missions m ON m.id=s.mission_id
      JOIN users w ON w.id=s.worker_id
      WHERE m.client_id=? AND (?=0 OR m.id=?)
      ORDER BY CASE s.status WHEN 'submitted' THEN 0 ELSE 1 END, s.created_at DESC
    `).bind(user.id,missionId,missionId).all();
    return json({submissions:rows.results || []});
  }

  const reviewMatch = path.match(/^\/api\/submissions\/(\d+)\/review$/);
  if (method === "POST" && reviewMatch) {
    if (!canClient(user)) return json({error:"Perfil sem acesso."},403);
    const sid = Number(reviewMatch[1]);
    const b = await bodyJson(request);
    const action = b.action === "approve" ? "approve" : b.action === "reject" ? "reject" : "";
    if (!action) return json({error:"Ação inválida."},400);
    const s = await env.DB.prepare(`
      SELECT s.id,s.worker_id,s.status,m.reward,m.client_id,m.title
      FROM submissions s JOIN missions m ON m.id=s.mission_id
      WHERE s.id=? AND m.client_id=?
    `).bind(sid,user.id).first();
    if (!s) return json({error:"Envio não encontrado."},404);
    if (s.status !== "submitted") return json({error:"Este envio já foi revisado."},409);

    if (action === "reject") {
      await env.DB.prepare("UPDATE submissions SET status='rejected',reviewed_at=CURRENT_TIMESTAMP WHERE id=? AND status='submitted'").bind(sid).run();
      return json({ok:true});
    }

    await env.DB.batch([
      env.DB.prepare(`
        INSERT OR IGNORE INTO wallet_ledger(user_id,amount,type,source_ref,description)
        VALUES(?,?,'mission_reward',?,?)
      `).bind(s.worker_id,Number(s.reward),`submission:${sid}`,`Missão aprovada: ${clean(s.title,100)}`),
      env.DB.prepare("UPDATE submissions SET status='approved',reviewed_at=CURRENT_TIMESTAMP WHERE id=? AND status='submitted'").bind(sid)
    ]);
    return json({ok:true});
  }

  if (method === "POST" && path === "/api/client/mission-status") {
    if (!canClient(user)) return json({error:"Perfil sem acesso."},403);
    const b = await bodyJson(request);
    const id = Number(b.id);
    const status = b.status === "closed" ? "closed" : b.status === "open" ? "open" : "";
    if (!status) return json({error:"Status inválido."},400);
    const r = await env.DB.prepare("UPDATE missions SET status=? WHERE id=? AND client_id=?").bind(status,id,user.id).run();
    if (!r.meta?.changes) return json({error:"Missão não encontrada."},404);
    return json({ok:true});
  }

  if (method === "GET" && path === "/api/wallet") {
    const sum = await env.DB.prepare("SELECT COALESCE(SUM(amount),0) balance FROM wallet_ledger WHERE user_id=?").bind(user.id).first();
    const today = await env.DB.prepare(`
      SELECT COALESCE(SUM(amount),0) earned_today
      FROM wallet_ledger
      WHERE user_id=? AND date(created_at,'-3 hours')=date('now','-3 hours')
    `).bind(user.id).first();
    const entries = await env.DB.prepare(`
      SELECT id,amount,type,description,created_at FROM wallet_ledger
      WHERE user_id=? ORDER BY created_at DESC LIMIT 50
    `).bind(user.id).all();
    return json({balance:Number(sum.balance||0),earned_today:Number(today.earned_today||0),goal:DAILY_GOAL,entries:entries.results||[]});
  }

  return json({error:"Rota não encontrada."},404);
}

function canWorker(u){ return u && (u.role === "worker" || u.role === "both"); }
function canClient(u){ return u && (u.role === "client" || u.role === "both"); }
function publicUser(u){ return {id:u.id,name:u.name,email:u.email,role:u.role,created_at:u.created_at}; }

async function currentUser(request, env) {
  const token = getCookie(request,"bn_session");
  if (!token) return null;
  return await env.DB.prepare(`
    SELECT u.id,u.name,u.email,u.role,u.created_at
    FROM sessions s JOIN users u ON u.id=s.user_id
    WHERE s.token=? AND s.expires_at > CURRENT_TIMESTAMP
  `).bind(token).first();
}

async function createSessionResponse(env,userId,payload) {
  const token = randomHex(32);
  await env.DB.prepare("DELETE FROM sessions WHERE user_id=? AND expires_at <= CURRENT_TIMESTAMP").bind(userId).run();
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400000)
    .toISOString().replace("T"," ").replace("Z","");
  await env.DB.prepare(`
    INSERT INTO sessions(token,user_id,expires_at)
    VALUES(?,?,?)
  `).bind(token,userId,expiresAt).run();
  return json(payload,200,{"set-cookie":sessionCookie(token)});
}

function sessionCookie(token){ return `bn_session=${token}; Path=/; Max-Age=${SESSION_DAYS*86400}; HttpOnly; Secure; SameSite=Lax`; }
function expiredCookie(){ return "bn_session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax"; }
function getCookie(request,name){
  const raw=request.headers.get("cookie")||"";
  for(const part of raw.split(";")){const [k,...v]=part.trim().split("=");if(k===name)return v.join("=");}
  return "";
}
async function bodyJson(request){ try{return await request.json()}catch{return {}} }
function clean(v,max){ return String(v??"").replace(/\u0000/g,"").trim().slice(0,max); }
function randomHex(bytes){ const a=new Uint8Array(bytes);crypto.getRandomValues(a);return [...a].map(x=>x.toString(16).padStart(2,"0")).join(""); }
async function hashPassword(password,saltHex){
  const enc=new TextEncoder();
  const key=await crypto.subtle.importKey("raw",enc.encode(password),"PBKDF2",false,["deriveBits"]);
  const salt=Uint8Array.from(saltHex.match(/.{1,2}/g).map(x=>parseInt(x,16)));
  const bits=await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt,iterations:100000},key,256);
  return [...new Uint8Array(bits)].map(x=>x.toString(16).padStart(2,"0")).join("");
}
function safeEqual(a,b){
  if(typeof a!=="string"||typeof b!=="string"||a.length!==b.length)return false;
  let x=0;for(let i=0;i<a.length;i++)x|=a.charCodeAt(i)^b.charCodeAt(i);return x===0;
}
function json(data,status=200,headers={}){
  return new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=UTF-8","cache-control":"no-store",...headers}});
}
function html(s){ return new Response(s,{headers:{"content-type":"text/html; charset=UTF-8","cache-control":"no-store"}}); }

const APP_HTML = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#07111f"><title>BERN NEXUS</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#07111f;color:#edf5ff;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}
button,input,textarea,select{font:inherit}button{cursor:pointer}.app{max-width:620px;margin:auto;min-height:100vh;background:linear-gradient(180deg,#0b1727,#07111f 38%);padding-bottom:92px}
header{position:sticky;top:0;z-index:20;padding:17px;background:rgba(7,17,31,.94);backdrop-filter:blur(12px);border-bottom:1px solid #162d42}.brand{font-weight:950;letter-spacing:.4px}.brand b{color:#51e5a5}.toprow{display:flex;justify-content:space-between;align-items:center}.pill{font-size:11px;border:1px solid #2a4159;border-radius:999px;padding:6px 9px;color:#9fb3c7}
main{padding:16px}.hero h1{font-size:27px;line-height:1.08;margin:5px 0}.muted{color:#8fa5ba}.small{font-size:12px}.notice{padding:11px 12px;border:1px solid #5d4b2d;background:#2b2315;color:#f1d393;border-radius:13px;font-size:12px;line-height:1.4;margin:12px 0}
.goal{background:linear-gradient(135deg,#12364b,#0b2537);border:1px solid #23506b;border-radius:20px;padding:17px;margin:14px 0}.goalrow{display:flex;justify-content:space-between;gap:12px;align-items:flex-end}.money{font-size:28px;font-weight:950}.bar{height:9px;background:#07131f;border-radius:99px;overflow:hidden;margin-top:12px}.bar i{display:block;height:100%;background:#51e5a5;border-radius:99px}
.tabs{display:flex;gap:7px;overflow:auto;padding:4px 0 13px}.tab{white-space:nowrap;border:1px solid #294057;background:#0d1b2b;color:#acc0d2;padding:8px 11px;border-radius:999px}.tab.active{background:#ecfaf4;color:#071a12;font-weight:850}
.grid{display:grid;gap:12px}.card{background:#0d1b2a;border:1px solid #20384e;border-radius:19px;overflow:hidden}.cardbody{padding:15px}.cardimg{width:100%;max-height:230px;object-fit:cover;display:block;background:#0a1521}.meta{display:flex;justify-content:space-between;gap:8px;align-items:center;margin-bottom:9px}.tag{font-size:10px;font-weight:900;background:#15344a;color:#9fdcff;padding:5px 7px;border-radius:999px}.reward{font-weight:950;color:#58edac;font-size:18px}.card h3{margin:0 0 7px;font-size:17px}.card p{margin:0 0 12px;color:#9cb0c2;line-height:1.4;font-size:13px}.stats{font-size:11px;color:#8199ae;display:flex;gap:12px;flex-wrap:wrap;margin-bottom:12px}
.btn{border:0;border-radius:12px;padding:11px 13px;font-weight:900}.primary{background:#50e3a4;color:#062117}.secondary{background:#12263a;color:#e6f1fc;border:1px solid #29435b}.danger{background:#3b1b25;color:#ffd7e2;border:1px solid #6c3042}.wide{width:100%}.row{display:flex;gap:8px}.row>*{flex:1}
.panel{background:#0d1b2a;border:1px solid #20384e;border-radius:19px;padding:16px;margin-bottom:12px}label{display:block;font-size:12px;color:#9bb0c3;margin:12px 0 6px}.field{width:100%;border:1px solid #294159;background:#081521;color:#edf5ff;border-radius:12px;padding:11px 12px;outline:none}.field:focus{border-color:#50e3a4}textarea.field{min-height:92px;resize:vertical}
.preview{width:100%;max-height:240px;object-fit:cover;border-radius:14px;margin-top:10px;display:none}.nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:min(620px,100%);display:grid;grid-template-columns:repeat(5,1fr);background:rgba(7,17,31,.98);border-top:1px solid #193248;padding:8px 6px max(8px,env(safe-area-inset-bottom));z-index:30}.nav button{border:0;background:transparent;color:#829aae;font-size:10px;padding:5px}.nav strong{display:block;font-size:18px}.nav .active{color:#50e3a4}.screen{display:none}.screen.active{display:block}
.auth{padding:30px 17px}.authbox{background:#0d1b2a;border:1px solid #20384e;border-radius:22px;padding:18px}.switch{background:none;border:0;color:#63efb4;padding:10px 0}.hidden{display:none!important}
.modal{position:fixed;inset:0;background:#000a;display:none;align-items:flex-end;z-index:50}.modal.open{display:flex}.sheet{max-height:90vh;overflow:auto;width:min(620px,100%);margin:auto;background:#0b1726;border:1px solid #29445e;border-radius:24px 24px 0 0;padding:18px}.close{float:right;border:0;background:#14283c;color:white;border-radius:10px;padding:7px 10px}
.avatar{width:50px;height:50px;display:grid;place-items:center;border-radius:16px;background:#17364d;font-size:22px}.userline{display:flex;gap:12px;align-items:center}.empty{text-align:center;padding:28px 12px;color:#8299ae}.status{font-size:11px;font-weight:900;text-transform:uppercase}.submitted{color:#ffc978}.approved{color:#55e9aa}.rejected{color:#ff8fa9}.started{color:#8bcaff}
@media(min-width:760px){body{padding:18px 0}.app{border:1px solid #173149;border-radius:28px;overflow:hidden;min-height:calc(100vh - 36px)}.nav{bottom:18px;border-radius:0 0 28px 28px}}
</style>
</head>
<body>
<div id="authView" class="auth">
  <div style="max-width:440px;margin:auto">
    <div class="brand" style="font-size:23px;margin-bottom:18px">BERN <b>NEXUS</b></div>
    <div class="authbox">
      <div id="loginBox">
        <h2>Entrar</h2><p class="muted">Acesse suas missões ou publique pequenos trabalhos.</p>
        <label>E-mail</label><input id="loginEmail" class="field" type="email">
        <label>Senha</label><input id="loginPass" class="field" type="password">
        <button class="btn primary wide" style="margin-top:14px" onclick="login()">Entrar</button>
        <button class="switch" onclick="showRegister(true)">Criar minha conta</button>
      </div>
      <div id="registerBox" class="hidden">
        <h2>Criar conta</h2>
        <label>Nome</label><input id="regName" class="field">
        <label>E-mail</label><input id="regEmail" class="field" type="email">
        <label>Senha</label><input id="regPass" class="field" type="password" placeholder="mínimo 6 caracteres">
        <label>Como você quer usar o Nexus?</label>
        <select id="regRole" class="field"><option value="worker">Quero ganhar fazendo missões</option><option value="client">Quero publicar missões</option><option value="both">Quero fazer os dois</option></select>
        <button class="btn primary wide" style="margin-top:14px" onclick="register()">Criar conta</button>
        <button class="switch" onclick="showRegister(false)">Já tenho conta</button>
      </div>
    </div>
  </div>
</div>

<div id="appView" class="app hidden">
<header><div class="toprow"><div class="brand">BERN <b>NEXUS</b></div><div id="rolePill" class="pill"></div></div></header>
<main>
<section id="home" class="screen active">
  <div class="hero"><h1>Missões rápidas.<br>Dinheiro por trabalho concluído.</h1><p class="muted">Escolha uma tarefa, siga as instruções e envie sua resposta.</p></div>
  <div class="goal">
    <div class="goalrow"><div><div class="small muted">Ganhos aprovados hoje</div><div id="todayMoney" class="money">R$ 0,00</div></div><div style="text-align:right"><div class="small muted">Meta pessoal</div><b>R$ 50/dia</b></div></div>
    <div class="bar"><i id="goalBar" style="width:0%"></i></div><div id="goalText" class="small muted" style="margin-top:8px"></div>
  </div>
  <div class="notice">R$ 50/dia é uma meta visual, não uma promessa de renda. Ela depende de haver missões disponíveis e de os trabalhos serem aprovados.</div>
  <div class="tabs" id="tabs"><button class="tab active" data-cat="">Todas</button><button class="tab" data-cat="Pesquisa">🔎 Pesquisa</button><button class="tab" data-cat="Teste">🧪 Teste</button><button class="tab" data-cat="Opinião">💬 Opinião</button><button class="tab" data-cat="Levantamento">📋 Levantamento</button></div>
  <div class="grid" id="missionList"></div>
</section>

<section id="mine" class="screen">
  <div class="hero"><h1>Minhas missões</h1><p class="muted">Acompanhe tarefas iniciadas, enviadas e aprovadas.</p></div>
  <div class="grid" id="mySubmissionList"></div>
</section>

<section id="create" class="screen">
  <div class="hero"><h1>Publicar missão</h1><p class="muted">Crie uma pequena tarefa para pessoas reais realizarem.</p></div>
  <div id="createDenied" class="notice hidden">Seu perfil foi criado apenas para executar missões. Crie outra conta como contratante ou perfil “os dois” para publicar.</div>
  <div id="createPanel" class="panel">
    <label>Título</label><input id="mTitle" class="field" placeholder="Ex.: Teste minha página e diga o que ficou confuso">
    <label>Categoria</label><select id="mCategory" class="field"><option>Pesquisa</option><option>Teste</option><option>Opinião</option><option>Levantamento</option></select>
    <label>Descrição curta</label><textarea id="mDesc" class="field" placeholder="Explique o objetivo da missão."></textarea>
    <label>Instruções</label><textarea id="mInstructions" class="field" placeholder="Passo a passo do que a pessoa deve fazer."></textarea>
    <div class="row"><div><label>Recompensa por pessoa</label><input id="mReward" class="field" type="number" min="2.50" step="0.50" value="2.50"></div><div><label>Vagas</label><input id="mSlots" class="field" type="number" min="1" max="500" value="10"></div></div>
    <label>Imagem do card (opcional)</label><input id="mImage" class="field" type="file" accept="image/jpeg,image/png,image/webp" onchange="previewMissionImage(this)">
    <img id="mPreview" class="preview">
    <div id="budgetText" class="notice">Orçamento demonstrativo: R$ 25,00. Ainda não existe cobrança real nesta v0.2.</div>
    <div class="notice">Não publique missões de curtidas, seguidores, avaliações pagas ou outras formas de engajamento artificial.</div>
    <button class="btn primary wide" onclick="createMission()">Publicar missão</button>
  </div>
</section>

<section id="client" class="screen">
  <div class="hero"><h1>Painel do contratante</h1><p class="muted">Veja suas missões e aprove trabalhos enviados.</p></div>
  <div id="clientDenied" class="notice hidden">Seu perfil não possui acesso de contratante.</div>
  <div id="clientContent"><div class="grid" id="clientMissionList"></div><h2 style="margin-top:22px">Trabalhos recebidos</h2><div class="grid" id="clientSubmissionList"></div></div>
</section>

<section id="profile" class="screen">
  <div class="hero"><h1>Perfil</h1></div>
  <div class="panel"><div class="userline"><div class="avatar">👤</div><div><b id="profileName"></b><div id="profileEmail" class="muted small"></div></div></div>
  <hr style="border:0;border-top:1px solid #21384e;margin:17px 0">
  <div class="small muted">Saldo aprovado</div><div id="balanceMoney" class="money">R$ 0,00</div>
  <button class="btn secondary wide" onclick="logout()">Sair</button></div>
</section>
</main>

<nav class="nav">
<button data-screen="home" class="active" onclick="go('home',this)"><strong>⌂</strong>Início</button>
<button data-screen="mine" onclick="go('mine',this)"><strong>✓</strong>Minhas</button>
<button data-screen="create" onclick="go('create',this)"><strong>＋</strong>Publicar</button>
<button data-screen="client" onclick="go('client',this)"><strong>▣</strong>Contratante</button>
<button data-screen="profile" onclick="go('profile',this)"><strong>●</strong>Perfil</button>
</nav>
</div>

<div id="modal" class="modal" onclick="if(event.target===this)closeModal()"><div class="sheet"><button class="close" onclick="closeModal()">✕</button><div id="modalBody"></div></div></div>

<script>
let ME=null, activeCategory="", missionImageData="", proofImageData="";
const money=v=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(Number(v||0));
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
async function api(path,opts={}){
  const r=await fetch(path,{headers:{"content-type":"application/json",...(opts.headers||{})},...opts});
  let d={};try{d=await r.json()}catch{}
  if(!r.ok){
    if(d.error==="Erro interno" && path!=="/api/health"){
      try{
        const hr=await fetch("/api/health",{cache:"no-store"});
        const hd=await hr.json();
        if(!hd.ok) throw new Error((hd.message||"Falha no D1")+(hd.missing_tables?.length?" Faltando: "+hd.missing_tables.join(", "):""));
      }catch(healthErr){
        if(healthErr?.message && healthErr.message!=="Failed to fetch") throw healthErr;
      }
    }
    throw new Error(d.error||"Erro na operação");
  }
  return d;
}
async function boot(){
  try{const d=await api("/api/me");ME=d.user;if(ME){showApp();await refreshAll()}else showAuth()}catch(e){alert(e.message);showAuth()}
}
function showAuth(){document.getElementById("authView").classList.remove("hidden");document.getElementById("appView").classList.add("hidden")}
function showApp(){document.getElementById("authView").classList.add("hidden");document.getElementById("appView").classList.remove("hidden");document.getElementById("profileName").textContent=ME.name;document.getElementById("profileEmail").textContent=ME.email;document.getElementById("rolePill").textContent=ME.role==="worker"?"TRABALHADOR":ME.role==="client"?"CONTRATANTE":"TRABALHADOR + CONTRATANTE";updateRoleUI()}
function showRegister(v){document.getElementById("loginBox").classList.toggle("hidden",v);document.getElementById("registerBox").classList.toggle("hidden",!v)}
async function register(){try{await api("/api/register",{method:"POST",body:JSON.stringify({name:regName.value,email:regEmail.value,password:regPass.value,role:regRole.value})});ME=(await api("/api/me")).user;showApp();await refreshAll()}catch(e){alert(e.message)}}
async function login(){try{await api("/api/login",{method:"POST",body:JSON.stringify({email:loginEmail.value,password:loginPass.value})});ME=(await api("/api/me")).user;showApp();await refreshAll()}catch(e){alert(e.message)}}
async function logout(){await api("/api/logout",{method:"POST",body:"{}"});ME=null;showAuth()}
function canWorker(){return ME&&["worker","both"].includes(ME.role)}function canClient(){return ME&&["client","both"].includes(ME.role)}
function updateRoleUI(){createPanel.classList.toggle("hidden",!canClient());createDenied.classList.toggle("hidden",canClient());clientContent.classList.toggle("hidden",!canClient());clientDenied.classList.toggle("hidden",canClient())}
function go(id,b){document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));document.getElementById(id).classList.add("active");document.querySelectorAll(".nav button").forEach(x=>x.classList.remove("active"));(b||document.querySelector('[data-screen="'+id+'"]'))?.classList.add("active");window.scrollTo({top:0,behavior:"smooth"});if(id==="client")loadClient();if(id==="mine")loadMine();if(id==="home")loadMissions();if(id==="profile")loadWallet()}
async function refreshAll(){await Promise.all([loadMissions(),loadMine(),loadWallet(),canClient()?loadClient():Promise.resolve()])}
tabs.addEventListener("click",e=>{const b=e.target.closest("[data-cat]");if(!b)return;activeCategory=b.dataset.cat;document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");loadMissions()})
async function loadMissions(){if(!ME)return;try{const d=await api("/api/missions"+(activeCategory?"?category="+encodeURIComponent(activeCategory):""));missionList.innerHTML=d.missions.length?d.missions.map(missionCard).join(""):'<div class="empty">Nenhuma missão disponível agora.</div>'}catch(e){missionList.innerHTML='<div class="notice">'+esc(e.message)+'</div>'}}
function missionCard(m){const left=Math.max(0,Number(m.slots)-Number(m.occupied||0));return '<article class="card">'+(m.image_data?'<img class="cardimg" src="'+m.image_data+'">':'')+'<div class="cardbody"><div class="meta"><span class="tag">'+esc(m.category).toUpperCase()+'</span><span class="reward">'+money(m.reward)+'</span></div><h3>'+esc(m.title)+'</h3><p>'+esc(m.description)+'</p><div class="stats"><span>👤 '+esc(m.client_name||"Nexus")+'</span><span>🎯 '+left+' vagas</span></div><button class="btn primary wide" onclick="openMission('+m.id+')">'+(canWorker()?"Fazer missão":"Ver missão")+'</button></div></article>'}
async function openMission(id){try{const d=await api("/api/missions");const m=d.missions.find(x=>Number(x.id)===Number(id));if(!m)return;modalBody.innerHTML=(m.image_data?'<img class="cardimg" style="border-radius:14px" src="'+m.image_data+'">':'')+'<span class="tag">'+esc(m.category).toUpperCase()+'</span><h2>'+esc(m.title)+'</h2><div class="reward">'+money(m.reward)+'</div><p class="muted">'+esc(m.description)+'</p><h3>Instruções</h3><p class="muted">'+esc(m.instructions)+'</p>'+(canWorker()?'<button class="btn primary wide" onclick="startMission('+m.id+')">Aceitar missão</button>':'<div class="notice">Seu perfil não está habilitado para executar missões.</div>');modal.classList.add("open")}catch(e){alert(e.message)}}
function closeModal(){modal.classList.remove("open")}
async function startMission(id){try{const d=await api("/api/missions/"+id+"/start",{method:"POST",body:"{}"});closeModal();await loadMine();openSubmission(d.submission_id)}catch(e){alert(e.message)}}
async function loadMine(){if(!ME)return;try{const d=await api("/api/my-submissions");mySubmissionList.innerHTML=d.submissions.length?d.submissions.map(s=>'<div class="card">'+(s.image_data?'<img class="cardimg" src="'+s.image_data+'">':'')+'<div class="cardbody"><div class="meta"><span class="status '+s.status+'">'+statusText(s.status)+'</span><span class="reward">'+money(s.reward)+'</span></div><h3>'+esc(s.title)+'</h3><p>'+esc(s.description)+'</p><button class="btn '+(s.status==="started"?"primary":"secondary")+' wide" onclick="openSubmission('+s.id+')">'+(s.status==="started"?"Continuar":"Ver envio")+'</button></div></div>').join(""):'<div class="empty">Você ainda não iniciou nenhuma missão.</div>'}catch(e){mySubmissionList.innerHTML='<div class="notice">'+esc(e.message)+'</div>'}}
function statusText(s){return {started:"Em andamento",submitted:"Em análise",approved:"Aprovada",rejected:"Rejeitada"}[s]||s}
async function openSubmission(id){const d=await api("/api/my-submissions");const s=d.submissions.find(x=>Number(x.id)===Number(id));if(!s)return;proofImageData="";modalBody.innerHTML='<span class="status '+s.status+'">'+statusText(s.status)+'</span><h2>'+esc(s.title)+'</h2><div class="reward">'+money(s.reward)+'</div>'+(s.status==="started"?'<label>Sua resposta / trabalho realizado</label><textarea id="answerField" class="field" placeholder="Descreva o resultado..."></textarea><label>Imagem de comprovante (opcional)</label><input id="proofFile" class="field" type="file" accept="image/jpeg,image/png,image/webp" onchange="setProof(this)"><img id="proofPreview" class="preview"><button class="btn primary wide" style="margin-top:14px" onclick="submitWork('+s.id+')">Enviar para aprovação</button>':'<p class="muted">'+esc(s.answer||"")+'</p>'+(s.proof_image?'<img class="cardimg" style="border-radius:14px" src="'+s.proof_image+'">':''));modal.classList.add("open")}
async function setProof(inp){if(!inp.files?.[0])return;try{proofImageData=await compressImage(inp.files[0]);proofPreview.src=proofImageData;proofPreview.style.display="block"}catch(e){alert(e.message);inp.value=""}}
async function submitWork(id){try{await api("/api/submissions/"+id+"/submit",{method:"POST",body:JSON.stringify({answer:answerField.value,proof_image:proofImageData})});closeModal();await Promise.all([loadMine(),loadWallet()]);alert("Trabalho enviado para aprovação.")}catch(e){alert(e.message)}}
mReward.addEventListener("input",budget);mSlots.addEventListener("input",budget);function budget(){const v=Number(mReward.value||0)*Number(mSlots.value||0);budgetText.textContent="Orçamento demonstrativo: "+money(v)+". Ainda não existe cobrança real nesta v0.2."}
async function previewMissionImage(inp){if(!inp.files?.[0])return;try{missionImageData=await compressImage(inp.files[0]);mPreview.src=missionImageData;mPreview.style.display="block"}catch(e){alert(e.message);inp.value="";missionImageData=""}}
async function compressImage(file){
  if(file.size>8*1024*1024)throw new Error("Escolha uma imagem de até 8 MB.");
  const bmp=await createImageBitmap(file);const max=900;let w=bmp.width,h=bmp.height;if(Math.max(w,h)>max){const k=max/Math.max(w,h);w=Math.round(w*k);h=Math.round(h*k)}
  const c=document.createElement("canvas");c.width=w;c.height=h;const x=c.getContext("2d");x.drawImage(bmp,0,0,w,h);
  let q=.76,data="";for(let i=0;i<7;i++){data=c.toDataURL("image/jpeg",q);if(data.length<=190000)break;q-=.09}
  if(data.length>200000)throw new Error("Não consegui comprimir a imagem o suficiente. Escolha uma imagem menor.");
  return data;
}
async function createMission(){try{if(Number(mReward.value)<2.5)throw new Error("O valor mínimo por missão é R$ 2,50.");await api("/api/missions",{method:"POST",body:JSON.stringify({title:mTitle.value,category:mCategory.value,description:mDesc.value,instructions:mInstructions.value,reward:Number(mReward.value),slots:Number(mSlots.value),image_data:missionImageData})});mTitle.value=mDesc.value=mInstructions.value="";mReward.value="2.50";mSlots.value="10";mImage.value="";mPreview.style.display="none";missionImageData="";budget();alert("Missão publicada.");go("client")}catch(e){alert(e.message)}}
async function loadClient(){if(!ME||!canClient())return;try{const [a,b]=await Promise.all([api("/api/client/missions"),api("/api/client/submissions")]);clientMissionList.innerHTML=a.missions.length?a.missions.map(m=>'<div class="card">'+(m.image_data?'<img class="cardimg" src="'+m.image_data+'">':'')+'<div class="cardbody"><div class="meta"><span class="tag">'+esc(m.category).toUpperCase()+'</span><span class="reward">'+money(m.reward)+'</span></div><h3>'+esc(m.title)+'</h3><div class="stats"><span>'+m.submissions_count+' envios</span><span>'+m.approved_count+' aprovados</span><span>'+m.status+'</span></div><button class="btn secondary wide" onclick="toggleMission('+m.id+',\\''+(m.status==="open"?"closed":"open")+'\\')">'+(m.status==="open"?"Fechar missão":"Reabrir missão")+'</button></div></div>').join(""):'<div class="empty">Você ainda não publicou nenhuma missão.</div>';clientSubmissionList.innerHTML=b.submissions.length?b.submissions.map(clientSubmissionCard).join(""):'<div class="empty">Nenhum trabalho recebido.</div>'}catch(e){clientContent.innerHTML='<div class="notice">'+esc(e.message)+'</div>'}}
function clientSubmissionCard(s){return '<div class="card"><div class="cardbody"><div class="meta"><span class="status '+s.status+'">'+statusText(s.status)+'</span><span class="reward">'+money(s.reward)+'</span></div><h3>'+esc(s.title)+'</h3><p><b>'+esc(s.worker_name)+'</b><br>'+esc(s.answer||"Ainda não enviou resposta.")+'</p>'+(s.proof_image?'<img class="cardimg" style="border-radius:12px;margin-bottom:12px" src="'+s.proof_image+'">':'')+(s.status==="submitted"?'<div class="row"><button class="btn danger" onclick="review('+s.id+',\\'reject\\')">Rejeitar</button><button class="btn primary" onclick="review('+s.id+',\\'approve\\')">Aprovar</button></div>':'')+'</div></div>'}
async function review(id,action){if(!confirm(action==="approve"?"Aprovar e creditar a recompensa ao trabalhador?":"Rejeitar este trabalho?"))return;try{await api("/api/submissions/"+id+"/review",{method:"POST",body:JSON.stringify({action})});await loadClient()}catch(e){alert(e.message)}}
async function toggleMission(id,status){try{await api("/api/client/mission-status",{method:"POST",body:JSON.stringify({id,status})});await loadClient();await loadMissions()}catch(e){alert(e.message)}}
async function loadWallet(){if(!ME)return;try{const d=await api("/api/wallet");todayMoney.textContent=money(d.earned_today);balanceMoney.textContent=money(d.balance);const p=Math.min(100,(Number(d.earned_today)/Number(d.goal))*100);goalBar.style.width=p+"%";goalText.textContent=d.earned_today>=d.goal?"Meta atingida hoje.":money(Math.max(0,d.goal-d.earned_today))+" para chegar à meta visual de hoje."}catch(e){}}
boot();
</script>
</body></html>`;
