# BERN NEXUS v0.5.4 — Publicação + Conteúdo pelo Admin

## Conteúdo pelo Admin
Nova área "Conteúdo da plataforma":
- textos principais da LP;
- título/subtítulo do trabalhador;
- título/subtítulo do contratante;
- publicação de missão;
- perfil/carteira.

Campo vazio restaura o padrão.

## Bastidores removidos do público
Não aparecem mais para usuários comuns:
- ADMIN_EMAIL;
- Worker;
- D1;
- Secrets;
- Webhook;
- Sandbox;
- mensagens de configuração do provedor PIX;
- erro bruto do servidor.

Informações operacionais ficam somente no Admin.

## Status de publicação
Admin mostra:
- administrador;
- PIX;
- confirmação automática;
- produção/teste.

## Deploy
Substitua somente:
- src.js
- package.json

Não altere wrangler.jsonc nem Secrets/Variables.
