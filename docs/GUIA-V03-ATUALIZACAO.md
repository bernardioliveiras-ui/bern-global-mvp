# Bern Global v0.3 — atualização do Worker existente (Cloudflare + D1)

Esta versão foi preparada a partir do MVP v0.2. **Não substitua o banco D1 e não recrie as migrações 0001/0002**. Inclui favicon a partir do logo de leão enviado, homepage redesenhada, carrossel das últimas vagas reais, fluxo visual cadastro → checkout e concessão de acessos temporários para testar três perfis.

## 1. Backup e cópia dos arquivos

No PowerShell, com o projeto atual em `C:\Users\hokiz\Documents\GitHub\bern-global-mvp`:

```powershell
cd "C:\Users\hokiz\Documents\GitHub"
Copy-Item .\bern-global-mvp .\bern-global-mvp-backup-v02 -Recurse
```

Descompacte este ZIP numa pasta temporária e copie os arquivos para a pasta do projeto, sem remover `.dev.vars`, `.git`, arquivos privados ou substituir configurações personalizadas sem conferência. O `wrangler.jsonc` deste pacote já aponta para o `bern-global-db` identificado nas mensagens, mas confira novamente no seu computador.

## 2. Migração incremental obrigatória

```powershell
cd "C:\Users\hokiz\Documents\GitHub\bern-global-mvp"
npm.cmd install
npm.cmd run check
npm.cmd test
npx.cmd wrangler d1 migrations list bern-global-db --remote
npx.cmd wrangler d1 migrations apply bern-global-db --remote
npx.cmd wrangler deploy
```

A única migração nova é `0003_demo_access.sql`, que adiciona a identificação de contas de demonstração e um registro administrativo. As tabelas e usuários existentes são preservados. **Faça backup/exportação do D1 antes da migração remota** se o banco já tiver dados relevantes.

## 3. Criar 3 contas DEMO com PowerShell

Primeiro, configure no Worker o segredo `ADMIN_KEY` (se ainda não existir) com uma chave aleatória e longa:

```powershell
npx.cmd wrangler secret put ADMIN_KEY
```

No PowerShell (o comando solicita a chave de forma **oculta**, não precisa digitá-la no histórico do terminal):

```powershell
$BaseUrl = "https://SEU-WORKER.workers.dev"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\New-BernDemoProfiles.ps1 -BaseUrl $BaseUrl
```

O parâmetro `-ExecutionPolicy Bypass` funciona **apenas nesta execução** e não altera a política global do Windows. Use-o somente para o script incluído e revisado no projeto. Se o terminal já tiver `BERN_ADMIN_KEY`, o script usa esse valor sem solicitar novamente.

O script imprime três pares de e-mail/senha provisória, um por perfil: `candidate`, `lawyer` e `company`. Os endereços são de teste (`@bern.invalid`), portanto não enviam e-mails reais. Os três acessos duram 24h e **não criam compras nem simulam pagamentos**. Após entrar, é necessário trocar a senha provisória. Abra o painel de candidato, saia e entre como advogado, depois empresa.

No painel de empresa, é possível preparar perfil e rascunho de vaga, mas publicação pública continua dependendo da verificação administrativa. No painel jurídico, a caixa de solicitações permanece desativada enquanto `ENABLE_LEGAL_REQUESTS=false`.

**Segurança:** não use `@bern.invalid` para clientes, não compartilhe a chave administrativa e não habilite solicitações jurídicas só para visualizar o painel. O endpoint demo só aceita contas desse domínio reservado e exige `ADMIN_KEY` válida.

## 4. Carrossel de vagas recentes

A API `GET /api/latest-jobs` lê diretamente do banco e mistura, pela data real, vagas do JobBot ativas e recentes com publicações de empresas verificadas e com plano ativo. Não há vagas fictícias pré-carregadas. A faixa rola automaticamente (respeitando redução de movimento) e pode ser controlada manualmente. **Se `job_sources=0` e `jobs=0`, não aparecerão cards reais**; é necessário cadastrar e executar fontes verificadas para alimentar o catálogo.

## 5. Fluxo de checkout

Criar a conta agora apresenta a etapa 'Pagamento' e um botão que inicia o checkout InfinitePay via `/api/checkout`, no papel escolhido pelo usuário. **Sem `INFINITEPAY_API_KEY` válida, o checkout avisará que não está configurado.** O retorno do navegador jamais ativa a assinatura sozinho; o servidor continua verificando pedido, valor e pagamento com a InfinitePay.

## 6. Pendente antes de comercializar

Verificação de e-mail e recuperação automática de senha, mecanismo de confirmação assíncrona/reconciliação de pagamentos, Turnstile/WAF, validação completa LGPD/GDPR e revisão regulatória do diretório jurídico. Esta versão é de **testes**, não uma autorização para iniciar vendas.
