# BERN NEXUS v0.5.1 — Layout corrigido

Esta versão NÃO altera Secrets, variáveis, Asaas nem banco.

Correções principais:
- CSS do portal e CSS da landing page foram isolados.
- `header` e `main` do portal não interferem mais na LP.
- removido padding global que criava margem/deslocamento na LP no desktop.
- sidebar agora só aparece a partir de 900 px.
- tablet usa conteúdo em largura total + navegação inferior.
- cards deixam de virar duas colunas cedo demais.
- métricas ficam 2x2 em tablet e 1 coluna em celular.
- PIX/carteira/Admin não espremem em telas menores.
- tabelas administrativas mantêm scroll horizontal interno.
- cards flutuantes da LP viram cards empilhados no celular em vez de se sobrepor.
- seção Home Office não usa posições absolutas no mobile.
- CTAs e hero da LP foram normalizados para 320 px+.
- cabeçalho e badges foram compactados no celular.
- conteúdo não cria mais scroll horizontal acidental.

Suba somente:
- src.js
- package.json

NÃO altere wrangler.jsonc nem as variáveis/Secrets que você já criou.
