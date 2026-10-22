import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../src/index.js';
const env={DB:{},ASSETS:{fetch:async ()=>new Response('ok',{status:200,headers:{'Content-Type':'text/plain'}})}};
test('resposta HTML tem cabecalhos defensivos',async()=>{
  const r=await handler.fetch(new Request('https://bern.example/'),env);
  assert.equal(r.status,200);
  assert.match(r.headers.get('Content-Security-Policy'),/frame-ancestors 'none'/);
  assert.equal(r.headers.get('X-Frame-Options'),'DENY');
  assert.match(r.headers.get('Strict-Transport-Security'),/max-age=/);
});
test('requisição cross-origin não faz escrita',async()=>{
  const r=await handler.fetch(new Request('https://bern.example/api/signup',{method:'POST',headers:{Origin:'https://evil.example','Content-Type':'application/json'},body:'{}'}),env);
  assert.equal(r.status,403);
});
test('escrita sem Origin não é permitida ao usuário',async()=>{
  const r=await handler.fetch(new Request('https://bern.example/api/signup',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'}),env);
  assert.equal(r.status,403);
});
test('dados de candidatos exigem autenticação',async()=>{
  const r=await handler.fetch(new Request('https://bern.example/api/company/applications'),env);
  assert.equal(r.status,401);
});

test('acesso demo exige chave administrativa',async()=>{
  const r=await handler.fetch(new Request('https://bern.example/api/admin/demo-access',{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({email:'pessoa@bern.invalid',purpose:'visual-testing'})
  }),env);
  assert.equal(r.status,403);
});

test('acesso demo nao pode ser concedido a email de cliente real',async()=>{
  const envWithKey={...env,ADMIN_KEY:'SEGREDO_LOCAL_DE_TESTE'};
  const r=await handler.fetch(new Request('https://bern.example/api/admin/demo-access',{
    method:'POST',headers:{'Content-Type':'application/json','X-Admin-Key':'SEGREDO_LOCAL_DE_TESTE'},
    body:JSON.stringify({email:'cliente@empresa.com',purpose:'visual-testing'})
  }),envWithKey);
  assert.equal(r.status,403);
});

test('endpoint publico de vagas recentes usa banco e nao gera vagas ficticias',async()=>{
  let sql='';
  const mockDb={prepare(statement){sql=statement;return {all:async()=>({results:[]})};}};
  const r=await handler.fetch(new Request('https://bern.example/api/latest-jobs'),{...env,DB:mockDb});
  assert.equal(r.status,200);
  assert.deepEqual((await r.json()).jobs,[]);
  assert.match(sql,/company_jobs/);
  assert.match(sql,/last_seen_at/);
});
