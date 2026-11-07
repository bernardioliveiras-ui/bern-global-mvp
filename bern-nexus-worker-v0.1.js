export default {
  async fetch(request, env, ctx) {
    return new Response(APP_HTML, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "no-store"
      }
    });
  }
};

const APP_HTML = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  <meta name="theme-color" content="#07111f" />
  <title>Bern Nexus · MVP</title>
  <style>
    *{box-sizing:border-box} body{margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#07111f;color:#edf4ff}
    button,input,textarea,select{font:inherit} button{cursor:pointer}
    .shell{max-width:520px;margin:0 auto;min-height:100vh;background:linear-gradient(180deg,#0b1727 0,#07111f 38%);padding-bottom:92px}
    .top{padding:24px 18px 12px;position:sticky;top:0;background:linear-gradient(180deg,rgba(7,17,31,.98),rgba(7,17,31,.88));backdrop-filter:blur(12px);z-index:20}
    .brand{display:flex;align-items:center;justify-content:space-between;gap:12px}.logo{font-weight:900;letter-spacing:.4px;font-size:21px}.logo b{color:#53e6a8}
    .demo{font-size:11px;padding:7px 9px;border:1px solid #29435d;border-radius:999px;color:#9eb3c8;background:#0c1b2c}
    .hero{padding:12px 18px 10px}.hero h1{margin:5px 0 7px;font-size:29px;line-height:1.05}.hero p{margin:0;color:#9fb0c3;line-height:1.45}
    .wallet{margin:12px 18px 16px;padding:18px;border-radius:22px;background:linear-gradient(135deg,#14354b,#0c2436);border:1px solid #21455e;box-shadow:0 18px 45px rgba(0,0,0,.22)}
    .wallet small{color:#9eb5c7}.money{font-size:31px;font-weight:900;margin:4px 0 12px}.wallet-row{display:flex;justify-content:space-between;align-items:center;gap:12px}
    .primary,.secondary,.danger{border:0;border-radius:13px;padding:12px 14px;font-weight:800}.primary{background:#53e6a8;color:#042117}.secondary{background:#122438;color:#dceafd;border:1px solid #294158}.danger{background:#391c25;color:#ffdbe4;border:1px solid #6b2b3c}
    .tabs{display:flex;gap:8px;padding:0 18px 14px;overflow:auto}.tab{white-space:nowrap;border:1px solid #273c53;background:#0d1c2d;color:#aebed0;border-radius:999px;padding:9px 12px}.tab.active{background:#eaf7f2;color:#061911;border-color:#eaf7f2;font-weight:800}
    .section{padding:0 18px}.section-title{display:flex;align-items:center;justify-content:space-between;margin:4px 0 12px}.section-title h2{font-size:18px;margin:0}.section-title span{font-size:12px;color:#8da2b8}
    .list{display:grid;gap:12px}.card{background:#0d1b2a;border:1px solid #20364d;border-radius:19px;padding:16px;box-shadow:0 8px 26px rgba(0,0,0,.18)}
    .meta{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px}.tag{font-size:11px;font-weight:900;padding:6px 8px;border-radius:999px;background:#15334a;color:#9ed9ff}.reward{font-size:18px;font-weight:900;color:#68efb5}
    .card h3{font-size:17px;margin:0 0 7px;line-height:1.25}.card p{font-size:13px;line-height:1.45;color:#9eb0c1;margin:0 0 13px}.stats{display:flex;gap:11px;flex-wrap:wrap;color:#8198ad;font-size:12px;margin-bottom:13px}
    .card-actions{display:flex;gap:8px}.card-actions button{flex:1}
    .empty{text-align:center;padding:34px 15px;color:#88a0b6}
    .nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:min(520px,100%);display:grid;grid-template-columns:repeat(5,1fr);padding:9px 8px max(9px,env(safe-area-inset-bottom));background:rgba(7,17,31,.97);border-top:1px solid #1c3246;backdrop-filter:blur(14px);z-index:30}
    .nav button{border:0;background:transparent;color:#8299af;font-size:11px;padding:6px 2px}.nav button strong{display:block;font-size:19px;margin-bottom:2px}.nav button.active{color:#57e9ac}
    .screen{display:none}.screen.active{display:block}
    .fab{width:54px;height:54px;border-radius:18px;background:#53e6a8!important;color:#062017!important;margin:-19px auto 0;box-shadow:0 8px 28px rgba(83,230,168,.25);font-size:27px!important;font-weight:900}
    .modal{position:fixed;inset:0;background:rgba(0,0,0,.62);display:none;align-items:flex-end;z-index:60}.modal.open{display:flex}.sheet{width:min(520px,100%);max-height:88vh;overflow:auto;margin:0 auto;background:#0b1726;border:1px solid #25405a;border-radius:25px 25px 0 0;padding:20px 18px 28px}
    .sheet h2{margin:0 0 7px}.sheet p{color:#9cb0c3;line-height:1.45}.close{float:right;background:#13263a;color:#dce8f6;border:0;border-radius:12px;padding:8px 11px}
    label{display:block;color:#9eb1c4;font-size:12px;margin:14px 0 6px}.field{width:100%;background:#081421;border:1px solid #263d54;color:#eef6ff;border-radius:13px;padding:12px 13px;outline:none}.field:focus{border-color:#53e6a8}
    textarea.field{min-height:96px;resize:vertical}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}.submit{width:100%;margin-top:16px}
    .notice{margin:12px 18px;padding:12px 13px;border:1px solid #6b5530;background:#2c2415;color:#f5d697;border-radius:14px;font-size:12px;line-height:1.4}
    .wallet-card{padding:18px;margin-bottom:12px;border-radius:18px;background:#0d1b2a;border:1px solid #20364d}.wallet-card b{font-size:24px}
    .profile{padding:20px 18px}.profile-box{background:#0d1b2a;border:1px solid #20364d;border-radius:20px;padding:18px}.avatar{width:55px;height:55px;border-radius:18px;display:grid;place-items:center;background:#15344a;font-size:24px}
    .row{display:flex;align-items:center;gap:12px}.muted{color:#8fa4b8}.ok{color:#68efb5}
    @media(min-width:700px){body{padding:20px 0}.shell{border:1px solid #193047;border-radius:28px;overflow:hidden;min-height:calc(100vh - 40px)}.nav{bottom:20px;border-radius:0 0 28px 28px}}
  </style>
</head>
<body>
<div class="shell">
  <header class="top">
    <div class="brand">
      <div class="logo">BERN <b>NEXUS</b></div>
      <div class="demo">MVP · DEMO LOCAL</div>
    </div>
  </header>

  <main>
    <section id="home" class="screen active">
      <div class="hero">
        <h1>Ganhe fazendo<br>pequenas missões.</h1>
        <p>Pesquisas, testes e tarefas digitais rápidas feitas por pessoas reais.</p>
      </div>
      <div class="wallet">
        <small>Seu saldo de demonstração</small>
        <div class="money" id="balanceHome">R$ 12,50</div>
        <div class="wallet-row">
          <small><span class="ok">●</span> 3 missões concluídas</small>
          <button class="secondary" onclick="go('wallet')">Carteira</button>
        </div>
      </div>
      <div class="tabs" id="categoryTabs">
        <button class="tab active" data-cat="Todas">Todas</button>
        <button class="tab" data-cat="Pesquisa">🔎 Pesquisa</button>
        <button class="tab" data-cat="Teste">🧪 Teste</button>
        <button class="tab" data-cat="Opinião">💬 Opinião</button>
      </div>
      <div class="section">
        <div class="section-title"><h2>Missões disponíveis</h2><span id="missionCount"></span></div>
        <div id="missions" class="list"></div>
      </div>
    </section>

    <section id="missionsScreen" class="screen">
      <div class="hero"><h1>Minhas missões</h1><p>Acompanhe o que você aceitou e concluiu.</p></div>
      <div class="section"><div id="myMissions" class="list"></div></div>
    </section>

    <section id="create" class="screen">
      <div class="hero"><h1>Criar uma missão</h1><p>Publique uma pequena tarefa para pessoas reais executarem.</p></div>
      <div class="notice">Nesta v0.1 não existe cobrança real. A publicação serve apenas para validar o fluxo e o visual.</div>
      <div class="section">
        <div class="card">
          <label>Título da missão</label>
          <input id="newTitle" class="field" placeholder="Ex.: Teste minha página de vendas">
          <label>Categoria</label>
          <select id="newCategory" class="field"><option>Pesquisa</option><option>Teste</option><option>Opinião</option></select>
          <div class="grid2">
            <div><label>Recompensa por pessoa</label><input id="newReward" class="field" type="number" step="0.10" min="0.50" value="2.00"></div>
            <div><label>Quantidade de vagas</label><input id="newSlots" class="field" type="number" min="1" value="10"></div>
          </div>
          <label>Instruções</label>
          <textarea id="newInstructions" class="field" placeholder="Explique exatamente o que a pessoa deve fazer..."></textarea>
          <button class="primary submit" onclick="createMission()">Publicar missão de demonstração</button>
        </div>
      </div>
    </section>

    <section id="wallet" class="screen">
      <div class="hero"><h1>Carteira</h1><p>Saldo ganho nas missões aprovadas.</p></div>
      <div class="section">
        <div class="wallet-card"><div class="muted">Disponível</div><b id="balanceWallet">R$ 12,50</b></div>
        <div class="wallet-card"><div class="muted">Em análise</div><b>R$ 0,00</b></div>
        <button class="primary" style="width:100%" onclick="alert('Na versão real, aqui entra a solicitação de saque Pix.')">Solicitar saque Pix</button>
        <div class="notice" style="margin:14px 0">Demo: nenhum pagamento ou Pix real é realizado nesta versão.</div>
      </div>
    </section>

    <section id="profile" class="screen">
      <div class="profile">
        <h1>Perfil</h1>
        <div class="profile-box">
          <div class="row"><div class="avatar">👤</div><div><b>Usuário de teste</b><div class="muted">Nível inicial</div></div></div>
          <hr style="border:0;border-top:1px solid #20364d;margin:18px 0">
          <div class="muted">⭐ Reputação</div><p><b>4,9 / 5,0</b></p>
          <div class="muted">✅ Taxa de aprovação</div><p><b>100%</b></p>
          <button class="danger" onclick="resetDemo()">Reiniciar demonstração</button>
        </div>
      </div>
    </section>
  </main>
</div>

<nav class="nav">
  <button class="active" data-screen="home" onclick="go('home',this)"><strong>⌂</strong>Início</button>
  <button data-screen="missionsScreen" onclick="go('missionsScreen',this)"><strong>✓</strong>Missões</button>
  <button class="fab" data-screen="create" onclick="go('create',this)">+</button>
  <button data-screen="wallet" onclick="go('wallet',this)"><strong>◈</strong>Carteira</button>
  <button data-screen="profile" onclick="go('profile',this)"><strong>●</strong>Perfil</button>
</nav>

<div id="missionModal" class="modal" onclick="if(event.target===this) closeModal()">
  <div class="sheet">
    <button class="close" onclick="closeModal()">✕</button>
    <div id="missionDetail"></div>
  </div>
</div>

<script>
const seed = [
  {id:1,category:'Pesquisa',title:'Encontre 5 restaurantes com delivery',description:'Pesquise cinco restaurantes da sua região que tenham Instagram e WhatsApp público.',reward:3,slots:12,time:'~5 min',instructions:'Envie o nome e o link público de 5 restaurantes diferentes.'},
  {id:2,category:'Teste',title:'Teste uma página de vendas',description:'Acesse uma página fictícia e diga se você encontraria facilmente o botão de orçamento.',reward:4,slots:8,time:'~8 min',instructions:'Abra a página indicada, navegue por até 3 minutos e descreva o que ficou confuso.'},
  {id:3,category:'Opinião',title:'Escolha entre duas embalagens',description:'Veja duas propostas de embalagem e diga qual parece mais confiável para você.',reward:1.5,slots:40,time:'~2 min',instructions:'Escolha A ou B e explique sua escolha em uma frase.'},
  {id:4,category:'Pesquisa',title:'Compare preços em 3 lojas',description:'Encontre o preço público de um mesmo item em três lojas online.',reward:2.5,slots:18,time:'~5 min',instructions:'Envie preço e link público das três lojas.'}
];

const state = {
  get missions(){ return JSON.parse(localStorage.getItem('bn_missions')||'null') || seed; },
  set missions(v){ localStorage.setItem('bn_missions',JSON.stringify(v)); },
  get accepted(){ return JSON.parse(localStorage.getItem('bn_accepted')||'[]'); },
  set accepted(v){ localStorage.setItem('bn_accepted',JSON.stringify(v)); },
  get completed(){ return JSON.parse(localStorage.getItem('bn_completed')||'[]'); },
  set completed(v){ localStorage.setItem('bn_completed',JSON.stringify(v)); },
  get balance(){ return Number(localStorage.getItem('bn_balance')||12.50); },
  set balance(v){ localStorage.setItem('bn_balance',String(v)); }
};

let activeCategory='Todas';

function brl(v){return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v)}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}

function render(){
  const missions=state.missions;
  const filtered=activeCategory==='Todas'?missions:missions.filter(m=>m.category===activeCategory);
  document.getElementById('missionCount').textContent=filtered.length+' disponíveis';
  document.getElementById('missions').innerHTML=filtered.map(card).join('') || '<div class="empty">Nenhuma missão nesta categoria.</div>';
  const my=missions.filter(m=>state.accepted.includes(m.id)||state.completed.includes(m.id));
  document.getElementById('myMissions').innerHTML=my.length?my.map(m=>{
    const done=state.completed.includes(m.id);
    return \`<div class="card"><div class="meta"><span class="tag">\${done?'CONCLUÍDA':'EM ANDAMENTO'}</span><span class="reward">\${brl(m.reward)}</span></div><h3>\${esc(m.title)}</h3><p>\${done?'Recompensa adicionada ao saldo da demonstração.':'Abra a missão e envie sua resposta.'}</p><button class="\${done?'secondary':'primary'}" style="width:100%" onclick="openMission(\${m.id})">\${done?'Ver missão':'Continuar missão'}</button></div>\`
  }).join(''):'<div class="empty">Você ainda não aceitou nenhuma missão.</div>';
  document.getElementById('balanceHome').textContent=brl(state.balance);
  document.getElementById('balanceWallet').textContent=brl(state.balance);
}

function card(m){
  const accepted=state.accepted.includes(m.id), done=state.completed.includes(m.id);
  return \`<article class="card">
    <div class="meta"><span class="tag">\${esc(m.category).toUpperCase()}</span><span class="reward">\${brl(m.reward)}</span></div>
    <h3>\${esc(m.title)}</h3><p>\${esc(m.description)}</p>
    <div class="stats"><span>⏱ \${esc(m.time||'~5 min')}</span><span>👥 \${m.slots} vagas</span></div>
    <div class="card-actions"><button class="\${done?'secondary':'primary'}" onclick="openMission(\${m.id})">\${done?'Concluída':accepted?'Continuar':'Fazer missão'}</button></div>
  </article>\`;
}

function openMission(id){
  const m=state.missions.find(x=>x.id===id); if(!m)return;
  const accepted=state.accepted.includes(id), done=state.completed.includes(id);
  let action='';
  if(done){
    action='<div class="notice" style="margin:16px 0 0">✅ Missão concluída nesta demonstração.</div>';
  } else if(!accepted){
    action=\`<button class="primary submit" onclick="acceptMission(\${id})">Aceitar missão</button>\`;
  } else {
    action=\`<label>Sua resposta / comprovação</label><textarea id="answer" class="field" placeholder="Digite aqui o resultado da tarefa..."></textarea><button class="primary submit" onclick="submitMission(\${id})">Enviar para aprovação</button>\`;
  }
  document.getElementById('missionDetail').innerHTML=\`
    <span class="tag">\${esc(m.category).toUpperCase()}</span>
    <h2 style="margin-top:12px">\${esc(m.title)}</h2>
    <div class="reward">\${brl(m.reward)}</div>
    <p>\${esc(m.description)}</p>
    <h3>O que fazer</h3><p>\${esc(m.instructions)}</p>
    <div class="stats"><span>⏱ \${esc(m.time||'~5 min')}</span><span>👥 \${m.slots} vagas</span></div>
    \${action}\`;
  document.getElementById('missionModal').classList.add('open');
}

function closeModal(){document.getElementById('missionModal').classList.remove('open')}
function acceptMission(id){
  const a=state.accepted;if(!a.includes(id))a.push(id);state.accepted=a;render();openMission(id);
}
function submitMission(id){
  const value=(document.getElementById('answer')?.value||'').trim();
  if(value.length<3){alert('Digite uma resposta para concluir a demonstração.');return}
  const c=state.completed;if(!c.includes(id)){c.push(id);state.completed=c;const m=state.missions.find(x=>x.id===id);state.balance=state.balance+Number(m.reward||0)}
  render();openMission(id);
}
function createMission(){
  const title=document.getElementById('newTitle').value.trim();
  const instructions=document.getElementById('newInstructions').value.trim();
  const reward=Number(document.getElementById('newReward').value);
  const slots=Math.max(1,Number(document.getElementById('newSlots').value||1));
  const category=document.getElementById('newCategory').value;
  if(!title||!instructions||!reward){alert('Preencha título, instruções e recompensa.');return}
  const arr=state.missions;
  arr.unshift({id:Date.now(),category,title,description:instructions.slice(0,115),reward,slots,time:'~5 min',instructions});
  state.missions=arr;
  document.getElementById('newTitle').value='';document.getElementById('newInstructions').value='';
  render();go('home');alert('Missão criada na demonstração deste navegador.');
}
function go(id,btn){
  document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav button').forEach(x=>x.classList.remove('active'));
  const b=btn||document.querySelector(\`.nav button[data-screen="\${id}"]\`);if(b)b.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});render();
}
function resetDemo(){localStorage.removeItem('bn_missions');localStorage.removeItem('bn_accepted');localStorage.removeItem('bn_completed');localStorage.removeItem('bn_balance');render();go('home');}
document.getElementById('categoryTabs').addEventListener('click',e=>{
  const b=e.target.closest('[data-cat]');if(!b)return;activeCategory=b.dataset.cat;
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');render();
});
render();
</script>
</body>
</html>`;
