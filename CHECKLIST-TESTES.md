# CHECKLIST DE TESTES — BERN NEXUS v0.5

## A. Segurança / acesso

[ ] Cadastro exige senha de no mínimo 8 caracteres.
[ ] Várias tentativas erradas de login acionam rate limit.
[ ] Trabalhador não acessa telas de contratante pela URL.
[ ] Contratante não acessa “Minhas missões” de trabalhador.
[ ] Somente o e-mail definido em ADMIN_EMAIL ganha Admin.
[ ] Não existe botão público para ativar Admin.
[ ] ALLOW_ADMIN_CREDIT está false/ausente para produção.

## B. PIX contratante — Sandbox

[ ] Criar cobrança PIX.
[ ] QR Code aparece.
[ ] Copia-e-cola funciona.
[ ] Antes do pagamento, saldo NÃO aumenta.
[ ] Após PAYMENT_RECEIVED/CONFIRMED e validação no Asaas, saldo aumenta uma vez.
[ ] Reenviar o mesmo Webhook não aumenta o saldo novamente.
[ ] Duplo clique para gerar PIX não cria cobranças duplicadas iguais em poucos segundos.
[ ] Admin → Reconciliação encontra pagamento pago caso o Webhook tenha falhado.
[ ] PAYMENT_REFUNDED reverte o saldo uma única vez.
[ ] PAYMENT_PARTIALLY_REFUNDED coloca a conta em revisão e impede novas missões.

## C. Missões / concorrência

[ ] Publicar missão reserva o custo final uma única vez.
[ ] Recarregar/repostar o mesmo formulário não duplica missão nem reserva.
[ ] Saldo insuficiente bloqueia publicação.
[ ] Várias pessoas tentando a última vaga não excedem o limite.
[ ] Aprovar o mesmo envio duas vezes não duplica recompensa.
[ ] Duplo clique em Aprovar não duplica taxa Nexus.
[ ] Rejeitar envio em missão fechada devolve apenas a reserva correta.
[ ] Fechar missão libera somente reserva não comprometida.
[ ] Reabrir missão exige saldo suficiente.
[ ] Missão vencida fecha/libera corretamente.

## D. Saques

[ ] Trabalhador sem saldo não solicita saque.
[ ] Saque mínimo é R$ 10.
[ ] Ao solicitar, o saldo fica reservado imediatamente.
[ ] Solicitação repetida recente é bloqueada.
[ ] Admin aprova.
[ ] Rejeitar devolve o saldo uma única vez.
[ ] Marcar pago só funciona depois de aprovado.
[ ] Atualizar/repetir a ação não gera nova movimentação.

## E. Interface

[ ] LP funciona em desktop.
[ ] LP funciona em celular.
[ ] Barra fixa mobile não cobre conteúdo.
[ ] Perfil do contratante mostra saldo e PIX.
[ ] Perfil do trabalhador mostra disponível, em análise, reservado e histórico.
[ ] Admin mostra depósitos e saques.
[ ] Cards e formulários não transbordam em tela pequena.

## F. Antes da produção

[ ] GitHub privado.
[ ] ASAAS_API_KEY somente em Secret.
[ ] ASAAS_WEBHOOK_TOKEN somente em Secret.
[ ] ADMIN_EMAIL correto.
[ ] ASAAS_ENV=production somente após Sandbox.
[ ] ALLOW_ADMIN_CREDIT=false.
[ ] Backup/export do D1 antes da virada.
