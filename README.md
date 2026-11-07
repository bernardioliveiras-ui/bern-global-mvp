# BERN NEXUS v0.2 — Worker + D1

MVP online multiusuário.

## O que funciona

- Cadastro e login.
- Perfis: trabalhador, contratante ou os dois.
- Feed de missões.
- Valor mínimo de R$ 2,50 por missão (validado no navegador, API e D1).
- Meta visual de R$ 50/dia (não é garantia de renda).
- Contratante publica missão.
- 1 imagem por missão, comprimida no navegador e salva no D1 (sem R2).
- Trabalhador aceita missão.
- Envia resposta e imagem de comprovante opcional.
- Contratante aprova/rejeita.
- Aprovação credita o saldo interno do trabalhador.
- Carteira/ledger.
- Contratante pode fechar/reabrir missão.

## IMPORTANTE

Ainda NÃO existe dinheiro real:
- sem cobrança do contratante;
- sem Pix;
- sem saque real;
- sem KYC/CPF;
- sem recuperação de senha;
- sem moderação administrativa.

Não publique a plataforma como promessa de "R$ 50 por dia". O R$ 50 é uma meta visual que depende da oferta de missões e da aprovação.

## 1. Crie o banco D1

No terminal autenticado na sua conta Cloudflare:

    npm install
    npx wrangler d1 create bern-nexus-db

O comando mostrará um `database_id`.

## 2. Cole o database_id

Abra `wrangler.jsonc` e troque:

    COLE_AQUI_O_DATABASE_ID_DO_D1

pelo UUID retornado pela Cloudflare.

## 3. Banco + deploy

    npm run deploy

O comando aplica a migration do D1 e depois publica o Worker.

## Git + Cloudflare Builds

Deixe os arquivos na raiz do repositório e use:

- Build command: vazio
- Deploy command: npm run deploy

ANTES do primeiro deploy via Git, o banco D1 precisa existir e o `database_id` correto precisa estar commitado no `wrangler.jsonc`.

## Teste recomendado

1. Crie uma conta "contratante".
2. Publique uma missão de R$ 2,50 com uma imagem.
3. Abra uma janela anônima/incógnita.
4. Crie outra conta "trabalhador".
5. Aceite a missão e envie a resposta.
6. Volte à conta contratante e aprove.
7. Na conta do trabalhador, abra Perfil e veja o saldo.

## Imagens sem R2

A imagem é redimensionada para no máximo 900 px e comprimida como JPEG no navegador.
O app limita a string da imagem a aproximadamente 200 KB.
Isso é adequado para MVP e evita R2, mas não é a arquitetura recomendada para grande escala.
