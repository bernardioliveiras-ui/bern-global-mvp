# BERN NEXUS v0.5.2 — Responsividade PC + Mobile

Correções desta versão:
- Header público agora ocupa 100% da largura da tela.
- Conteúdo do header continua alinhado ao grid central de 1180 px.
- Seção final Home Office foi refeita como grid contido.
- Nenhum card de vantagem usa posição absoluta no desktop.
- No celular, TODOS os painéis flutuantes passam a ser blocos normais empilhados.
- Cards não escapam pela esquerda, direita ou parte inferior.
- Seção final empilha antes (1120 px) para não ficar comprimida em notebooks.
- Cards de categoria mantêm altura e alinhamento consistentes.
- Tablet usa 2 colunas; celular usa 1 coluna.
- Títulos ganham escala específica para telas muito estreitas.
- Header móvel mostra somente navegação essencial.
- Portal logado também recebeu alinhamento de sidebar/conteúdo e bloqueio de overflow horizontal.

Não altera:
- Asaas / PIX
- Secrets e Variables
- banco D1
- regras financeiras
- segurança da v0.5

Suba somente:
- src.js
- package.json

NÃO substitua o wrangler.jsonc.
