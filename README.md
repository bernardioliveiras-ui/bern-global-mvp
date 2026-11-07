# BERN NEXUS v0.3 — Multiusuário sem API no frontend

Esta versão remove a arquitetura `/api/*`.

## Como funciona

- O navegador envia formulários HTML normais.
- O Worker recebe os POSTs.
- O Worker lê/grava diretamente no D1 via `env.DB`.
- Login usa cookie de sessão HttpOnly.
- Não há `fetch()` para API no frontend.
- O próprio Worker cria as tabelas com `CREATE TABLE IF NOT EXISTS` no primeiro uso.
- Não depende de migrations no comando de deploy.

## Perfis

- Trabalhador: executa missões.
- Contratante: publica e aprova missões.
- Os dois: faz as duas coisas.

## Funcionalidades

- Cadastro e login multiusuário.
- Missões online compartilhadas entre usuários.
- Valor mínimo de R$ 2,50.
- Meta visual de R$ 50/dia.
- 1 imagem por missão.
- Imagem opcional como comprovante.
- Aprovar/rejeitar trabalho.
- Saldo interno do trabalhador.
- Fechar/reabrir missão.
- Sem R2.
- Sem Pix real nesta versão.

## IMPORTANTE — não substitua seu wrangler.jsonc

Seu Worker já possui o binding:

    DB -> bern-global-db

Mantenha o `wrangler.jsonc` que já está funcionando na sua conta.

Substitua apenas:

- `src.js`
- `package.json`
- opcionalmente `README.md`

O deploy agora é somente:

    npm run deploy

que executa:

    wrangler deploy

Não há migration no deploy.

## Teste

1. Faça deploy.
2. Abra o Worker.
3. Crie conta como contratante.
4. Publique uma missão.
5. Abra aba anônima.
6. Crie conta como trabalhador.
7. Aceite e envie a missão.
8. Volte ao contratante e aprove.
9. O saldo do trabalhador será creditado.

## Sobre as imagens

As imagens são comprimidas no navegador para cerca de 200 KB e salvas como texto no D1.
É proposital para evitar R2 no MVP.

## Observação

Essa arquitetura ainda usa o D1, porque multiusuário precisa de um armazenamento central.
O que foi removido foi a camada de API JSON no frontend.
