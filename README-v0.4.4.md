# BERN NEXUS v0.4.4 — Identidade oficial + hardening

IDENTIDADE
- Logo real do leão enviado pelo proprietário.
- Favicon usando o leão real.
- Dourado principal: #BC913C
- Dourado claro: #E0B55A
- Dourado escuro: #86672A
- Branco: #FFFFFF
- Off-white: #F7F6F1
- Cinza do leão: #BBB9B6
- Preto: #0A0A0A
- Paleta aplicada em LP, login/cadastro, trabalhador, contratante e Admin.

SEGURANÇA / HARDENING
- POST exige origem same-origin.
- Rate limit em cadastro por IP/e-mail.
- Rate limit em login por IP e e-mail.
- Login usa hash falso quando o e-mail não existe para reduzir enumeração por tempo.
- Senha mínima para novos cadastros: 8 caracteres.
- Logs de auditoria para login, cadastro e ações críticas de Admin.
- Ativação do primeiro Admin restrita à primeira conta criada.
- CSP com nonce para JavaScript inline.
- X-Frame-Options DENY.
- X-Content-Type-Options nosniff.
- HSTS.
- Permissions-Policy restritiva.
- COOP/CORP.
- Referrer-Policy.
- Cache desativado em páginas autenticadas/HTML.

IMPORTANTE
Nenhum site público pode ser tornado 100% impossível de copiar visualmente.
Para proteger o negócio:
1. mantenha o repositório GitHub PRIVADO;
2. não publique tokens/secrets;
3. registre marca/domínio quando validar;
4. lógica sensível continua no Worker/D1, não no navegador;
5. considere Turnstile em login/cadastro para proteção anti-bot adicional.

SUBA SOMENTE:
- src.js
- package.json

NÃO substitua wrangler.jsonc.
