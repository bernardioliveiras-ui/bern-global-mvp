# CONFIGURAÇÃO ASAAS + CLOUDFLARE — BERN NEXUS v0.5

Comece pelo ambiente SANDBOX.

## 1. Variáveis / Secrets do Worker

No Cloudflare Worker, configure em Runtime variables / Secrets:

### ADMIN_EMAIL
O e-mail exato da SUA conta Bern Nexus que será Admin.

Exemplo:
    ADMIN_EMAIL=seu-email@dominio.com

Quando `ADMIN_EMAIL` estiver configurado, ele vira a fonte de verdade do Admin.
Contas que tenham recebido Admin por versões antigas deixam de ser Admin se o e-mail não coincidir.

### ASAAS_ENV
Para testar:
    ASAAS_ENV=sandbox

Quando estiver pronto:
    ASAAS_ENV=production

### ASAAS_API_KEY
Secret privado da API do Asaas.

NUNCA coloque no `src.js`, GitHub ou variável pública.

Via Wrangler:
    npx wrangler secret put ASAAS_API_KEY

### ASAAS_WEBHOOK_TOKEN
Crie um token aleatório separado da API key (32 a 255 caracteres).

Via Wrangler:
    npx wrangler secret put ASAAS_WEBHOOK_TOKEN

O mesmo valor precisa ser informado no Webhook do Asaas.

### ALLOW_ADMIN_CREDIT
Para produção, deixe ausente ou:
    ALLOW_ADMIN_CREDIT=false

Somente para testes internos, se quiser continuar usando crédito manual:
    ALLOW_ADMIN_CREDIT=true

---

## 2. Webhook no Asaas

URL:
    https://SEU-WORKER.workers.dev/webhooks/asaas

ou, se tiver domínio próprio:
    https://seudominio.com/webhooks/asaas

Configure o token de autenticação do Webhook com o mesmo valor de `ASAAS_WEBHOOK_TOKEN`.

Eventos recomendados:
- PAYMENT_RECEIVED
- PAYMENT_CONFIRMED
- PAYMENT_REFUNDED
- PAYMENT_PARTIALLY_REFUNDED
- PAYMENT_CHARGEBACK_REQUESTED

O Nexus persiste o ID único de cada evento e não reaplica a mesma movimentação financeira.

---

## 3. Fluxo do contratante

1. Entre como Contratante.
2. Perfil / Carteira.
3. Informe o valor que deseja adicionar.
4. Informe CPF/CNPJ apenas para criação/localização do cliente no Asaas.
5. Gere a cobrança PIX.
6. Pague no Sandbox/ambiente escolhido.
7. O Webhook chega ao Nexus.
8. O Nexus consulta o próprio Asaas e só então libera o saldo.

O CPF/CNPJ NÃO é salvo no D1 pelo Nexus.
O Nexus guarda apenas o ID de cliente do Asaas.

---

## 4. Fluxo de saque do trabalhador

1. Trabalhador solicita saque.
2. O valor sai do saldo disponível e fica reservado.
3. Admin revisa no painel.
4. Admin aprova.
5. Faça o PIX manualmente para a chave exibida.
6. Só depois clique em “Marcar pago”.

Nesta v0.5 NÃO existe transferência automática de saque pelo Asaas.

---

## 5. Chave PIX no Asaas

É recomendado cadastrar uma chave PIX na conta Asaas para operação de cobranças PIX.

---

## 6. Produção

Só mude para `ASAAS_ENV=production` depois de:
- completar todos os testes do checklist;
- confirmar Webhook no Sandbox;
- testar repetição de Webhook;
- testar estorno;
- verificar o e-mail Admin;
- desativar `ALLOW_ADMIN_CREDIT`;
- confirmar que Secrets não estão no GitHub.
