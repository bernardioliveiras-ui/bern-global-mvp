# BERN NEXUS v0.5 — Financeiro + Asaas + hardening

## O que esta versão adiciona

### PIX para contratantes
- Cobrança PIX via Asaas.
- QR Code dinâmico + copia e cola.
- Saldo só entra no Nexus depois de confirmação no Asaas.
- Webhook idempotente: o mesmo evento pode chegar novamente sem creditar duas vezes.
- Reconciliação manual pelo Admin.
- Estorno completo reverte o crédito uma única vez.
- Estorno parcial/chargeback coloca o depósito em revisão financeira.

### Saque do trabalhador
- Solicitação de saque por PIX.
- Valor fica reservado imediatamente.
- Admin pode aprovar, rejeitar ou marcar como pago.
- Rejeição devolve o saldo uma única vez.
- Nesta versão o pagamento do saque é manual; não há transferência Asaas automática.

### Concorrência / bugs financeiros
- Publicação de missão idempotente por token de formulário.
- Aprovação/rejeição protegidas contra duplo clique e pedidos simultâneos.
- Reserva/liberação de saldo executada em batch transacional no D1.
- Aceite de missão evita exceder o número de vagas em pedidos concorrentes.
- Cobrança PIX evita criar cobranças iguais em sequência.
- Corrigido card duplicando categoria/valor no painel do contratante.
- Pluralização de participação corrigida.

### Admin
- Removido o botão público de “virar Admin”.
- Admin definido por `ADMIN_EMAIL` na configuração privada do Worker.
- Crédito manual do Admin fica desativado por padrão (`ALLOW_ADMIN_CREDIT`).
- Painel Admin mostra depósitos PIX, saques e status do Asaas.

### Segurança
- Sessões novas guardam apenas hash do token no D1.
- Sessões antigas são migradas silenciosamente quando usadas.
- Cookie `__Host-bn_session`, Secure, HttpOnly, SameSite=Lax.
- Login/cadastro com rate limit.
- Webhook Asaas exige token separado.
- CPF/CNPJ usado na criação/localização do cliente Asaas e não persistido no D1.
- Auditoria de ações críticas.
- CSP, HSTS, clickjacking protection e demais headers da v0.4.4 preservados.

## Arquivos para substituir no GitHub

- `src.js`
- `package.json`

NÃO substitua seu `wrangler.jsonc`.

## Antes de produção

Leia `CONFIGURACAO-ASAAS.md` e execute `CHECKLIST-TESTES.md`.

## Importante

Nenhum sistema conectado à internet é “100% impossível de invadir” ou clonar visualmente.
Esta versão reduz riscos conhecidos, mantém lógica financeira no Worker/D1 e evita segredos no Git,
mas produção real ainda exige monitoramento, backups, revisão periódica e teste em Sandbox.
