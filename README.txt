BERN NEXUS — Worker MVP v0.1

OBJETIVO
Ver o produto funcionando imediatamente em um Cloudflare Worker, antes de conectar banco, Pix ou autenticação.

COMO PUBLICAR PELO PAINEL CLOUDFLARE
1. Acesse Cloudflare > Workers & Pages.
2. Crie um Worker novo.
3. Abra "Edit Code".
4. Apague o conteúdo de exemplo.
5. Cole todo o conteúdo de bern-nexus-worker-v0.1.js.
6. Clique em Deploy.
7. Abra a URL *.workers.dev.

O QUE FUNCIONA NESTA DEMO
- Feed de missões.
- Filtro por categoria.
- Abrir e aceitar missão.
- Enviar resposta.
- Saldo de demonstração aumenta ao concluir.
- Criar uma nova missão.
- Carteira visual.
- Perfil/reputação visual.
- Dados persistem apenas no localStorage daquele navegador.

O QUE AINDA NÃO É REAL
- Login / CPF.
- D1.
- Aprovação por contratante/admin.
- Pix.
- Pagamentos.
- Antifraude.
- Upload de comprovantes.
- Termos e moderação.

PRÓXIMA VERSÃO
Worker + D1:
users
missions
submissions
wallet_ledger
withdrawals

IMPORTANTE
Esta é uma prova visual/funcional. Não use para processar dinheiro real.
