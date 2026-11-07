# BERN NEXUS v0.3.4 — Tabelas isoladas no D1

Corrige o erro:

    D1_ERROR: table users has no column named password_salt

## Causa

O binding DB está ligado ao banco `bern-global-db`, que já possuía uma tabela `users`
de outro projeto. `CREATE TABLE IF NOT EXISTS users` não altera a estrutura de uma
tabela já existente, então o Bern Nexus acabava tentando usar a tabela antiga.

## Correção

O Bern Nexus agora usa tabelas próprias:

- nexus_users
- nexus_sessions
- nexus_missions
- nexus_submissions
- nexus_wallet_ledger

Isso permite usar o mesmo D1 sem mexer nas tabelas existentes do Bern Global.

## O que fazer

Substitua apenas:
- src.js
- package.json

NÃO substitua seu wrangler.jsonc.

Depois faça commit/push. O Worker criará automaticamente as novas tabelas na
primeira requisição.

## Observação

Dados de tentativas anteriores salvos nas tabelas antigas não são reutilizados.
Como o cadastro anterior estava falhando, o esperado é criar contas novas após
o deploy da v0.3.4.
