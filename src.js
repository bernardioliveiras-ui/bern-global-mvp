const MIN_REWARD = 2.50;
const DAILY_GOAL = 50.00;
const MIN_WITHDRAWAL = 10.00;
const PLATFORM_FEE_RATE = 0.20;
const PAGE_SIZE = 20;
const MAX_IMAGE_CHARS = 200000;
const SESSION_DAYS = 30;
const BRAND_LOGO_DATA = "data:image/webp;base64,UklGRkoSAABXRUJQVlA4ID4SAACwSgCdASqQAJAAPjEWiUKiISEUylZQIAMEoA1E4IwJ/r/m21L+ofh/1weJHRHlheM/qf/C+6f3teonzAP0+/4f959W71G+YD9uf2q95j/Fepr0AP6R/t+sO9AD9x/TU/dL4Rf23/aj2k//trKDD/7r+Uvn3+MfSP3P8mf3d6CMSD4/9kvxf9t/bX8ufmD/Q+MfyL1Bfwz+Wf4n8u/yq5DO13oC+z31r/Wfmz/d/TW1QcgD+e/1r/W/mdzYdAD+a/3f/e/4v8jfpf/pv/Z/pfy59t351/i/+3/m/gH/kv9X/1/9z/zH/r/yP//+tP2W/tN7OP7Af/VFspcuWVbjPerF2hp3sGuSTSNx6AmqQJewtcxD6nzrDmrUHMmQoNugEcsoW5Vbei66Fg0nR+b0+c4Vzrl636a4Mwgvoo/97ebv1FulXPGMYPNt/erHeDv48iIAc59UZkKoSiTxqx9q7mRxuf256sBhxneWUt5RrJsyqepz80zaRZuSJC99g8sj9IBZtdLaWB6O4X04SwW+9jquBYHcqc3wFaosrNOcCvRwx5yZxatpSWSiWPkZMA/OmnMop4WThzqngkk5znjth5mKW6E5uqVLm4uwm5RgfzXYhNodgOjc9+CMuhN/TusYVrVYQV5bFRnF+Rx9sxXXw/Avv5x7dfTFAkfz4fp49fWvlLxYcWT8FTNVwqu/oVEa3n84praFtx4k/V+Z6GTSS15T4wOy74VmYtr8C/qsbC74mUSl/aaMrBzpr4q1VYAcf5546ELJxwedUwaIJUlrAt9e7JB1rDzvAytoqnsNA6AA/v7uqp5MSYAsu0WUmi2qNaUp5qTiAlVt5wpFcARC4YJQUuCReDYL1zxvfEZVpl1M9kbgwyQWAqYIdLfCnb0XsFR887kopsTN3XMB3cQtk0YOykxfXzOoX+qlnpnVidDDfQn8Po7eM3eJJQ7iuIEok7p0U9ng7vLye7FbCRWrPe1LyNplqSsdvUYP0yHSAibRtrVk1Rdu6D6ei+n5vRtpgz+BNzjzuB49PslBhluLLpNcYk2n0J8jwiCqLmHr1jf07GvT3k6o4L3J5qa/6Pyp1hr+Am3SYKPk+Y7epeoA3/4YaLLIDS7Sf9/MoBR1n3qyV1fVjKVrziSdA65HQ/k4hukXfAOONhotc4wnjFScesskiitum8Ex+6Qlt2e+GzPa5c732hV+G2ZnUHA0TMPMa8/Q9MQpzRto/97qA65L8YT8WD3bxUzbKgFRO0m5BY6+6HkM4BcpF9BmfMUhjWD+AIPmFUZXlFm5ZNcuMZv2dPm2/fFxEWVjK75g2R09s2SE3l7zoYBWEpWZhsQ9AyNUQ+fIPoYR4DiATQY0eCoTSXNtkZzImu52YxDY+In5fKxZo+eBBIPgypX+HwwiS+//NEiqcTi/KFbT9xWs0WLtNoTREhLlkGd7/yzV8srxaYTV8gJ5wp46SZi93LQeeTZqg+MGg0felj7AR6x3+sOSYMjmFCc2OPVVM/wsLEORD5tpqz/ajJ8ikW1bhA9l4rrEGuhC30+eF4hZ+VRQJX/KkOIw3HnyUe5KZWBEIkfZmy1yeM9bGa0Xvzzi2sxd+H7O4OeksWB87p3/CqrrlMFM6V4O5aasVIZbOklJuHOkwI+6t5OApfImOb8zW3ldOfdh0p8DenYMTnLNwweYDzQLrt3eqMwfs30brc4yWzI/CMtVKS0zpasK6VakONmj9/VgUnAYRomkz/7/ohG2tUzi5wXlmBza5g0/baMJE9d9kl7X2BC99fKVJ2Xisk6+CsD3qUZ9eUSmhzY/gGfg2R4XvwJM5F2ChftE82VDZGqLirB3G5mO+WYNDFVCTt2QQg0I4OfotOoKInF8KW5xTFPv2ErgHEveNmUMCR4mrI4FO/u4gb79l9Q27+FU7ClKtrxz6nvmnRE8ATtLU7KmXBsR6ly4b+MyE5Hnrt4EKdmeHGT2HB1W/dMAzQh1tn+EAvaCz9ej4NLnXNmnxHc3+LfrjBe6FBjAUnna38ZWpviZfpexALfXqe735848n2pr9Zz+PdzBsLCmBGhacLZJGCu2SvQU2HZ538KiPqmPBf+jxrJxej5zASgY7fPkwkOEn5pVdDb2beaIkumvqn263SAlV9Celsyyb+ezQuOKvvgXdlcqmD6JThN12CJCLVUDVJSLPpFyJgNDPH+mM0jT9nDwsziDEeZhpTP3Jb7UJtH8tSY//OJwUVuP1Sg+Kb8Ij6ADsngY0D7a1tWorHDFNbl/EvnyZ8bdSP+Tl4l86LJt/oZm37gl0/CcwD+WMeqB65GWA8PYzvzTuQK+yzshGnoCHpBF5qKrk9r+hGKfQTYvwLukwosNXTsiQwJV9NKGTwl7Rn4cV9t9+amyxEqLBUjsCbC4jsJ5XSA2RivgWb6qzDLlj6vCLhskoPw52gPkV41wxDLS8dNw3FLO7/1q2dNzWOxI5GFv+BUVP+8EEwocOv1glCEe+qOGXWJGfYx5l3d2pTQMRZ+ZfmlHYMFGEFeze2MR6XqVdeFaQBtkAOD2jmGtTYuJQVQ5k0/njagst09rYGs/q0RKIVD1kudr2OULhMMNbE0d16qVdmnPcysMCh+nONVmq52SRZbSMgmrMc9iVOv2kZP2kOkzDrgcEGt7QCN4Fg7Z12gSriMX7XKcFh4/7P4zj86dhNmwRjoEB5Oc4IeUOGoW/4HRlbluh6bJrVA3Sk0m+U1cEJO4gjCn4itMzSASHjPleI+GF+rKMtzIh9ODXh7k3L1i6en44fKa9IQU751DAU+mvDrhZQ1BmCKP9Mcq6EXWvI3AmMU+OFIkRNvrOQBpJpR5YUDqaJFSBCpeEV0rs9FMZBWvmRmbkQlPLIBMrn0EaTRYP1qniEIR3etjPVbls9kinbTYIfiCudetKjMHxBhBeq31R+hAJtNXILtcL7hErS48WNzG1jVFE5fU14P19UB111RSEt+kapS4Z1djzMdumSutxC+QF5JLHZ/wmgWCMjD8WKHcF5avVWJ+5T4UKsb0mBKb7ZbwZVL4nNr308+PRNEjucnmsInmH6Zp5vMn8LzN2N7wFYig+uSGjDeC8X/DAtfZLiJIFZZDoA/fhE1y+m8mtHp0FwMhihdLzapj/8RaPtnWrL3LEo4JDOib74dt9dLWqrw0gpraE43t5b93h6v0uT0qqEP/aesGyMzEwk4DMRnxLlnlQzqaEDNlIpEWW9tjuSvgVclxqRoB9HBVmvqKxRMxoozwUmQFcYdvpqRYo+NIbEV9IT+hZf6BGDMC3djieOTNYsp/lYX1FwLKEe9aRliNFku6V0C05THmFo5oE+RSM0pClspz5fPNsNyFtwAGXquprEGpYXqtYAqbRmneqIwetHmRCekJHuvbX7lk1eZkEa7nq2eQIVUX3MmpbsJbyLmylZcqlvpqkGq7FeoUVLtxVArLfTzgS/RrbC7uPHzx8uhtIEOiJyYrkyEo/ej6+Dz9FlKyQBXSW8RMd5HOBCfUUXmp9sojYeCYTUFCoLfzywUYyiWc5nCFG8FmTD2q60MZijM3r2z3N4f2Z28+IumJgcHihUz3Ckx46fAtUxJBdiNORGCgCLjhlYkm3V5cJrzxPdlHptkKUjVRzaTT0dHeZsiUdPn8kZMa81ognx9Xswpe10L19f3RcmmG8a/qXpFaaSbUlIZaKCa77wiBp/FoXc+WUyG5ra9470ZbFG66ulRN1l2vZmQdVamR6IHRb+eqEFxSbyE5BluTNxTqf8G1wr9Nebqc9ut57E7+L9N3Ep5qSoMcGaKoyX5hmgHEBLJAUL9nSVsT8pmt+cWkVOJGSsQsJOQ3XjACjGUOa7szKo6YUONJPJcbzljjdAsWCuavmN6hq9RB0nZM9QcFVKpsllvd/nF+//hrwljyjC9rcDa36ymd5fUAwmvgPqo/bpEIza3AVNOPslmiJkmnKaiMk5hI/chSLDjlKIJmD7P1cbpb74fpdr+EwiCTtWRiRHo+mamdTq9/IRckrxM3N98m04+LWYei2HRp7NfzrM+awxiP+KNv5MI/fONTrt7+aRx8p4LuSJ7Mp5iBXlH9SA6AkS6tYIbmUPxFoyBvsnpMRQWBpTf6fhoqUjoYfS+J4w4Iom35HaAksiVUoLG/jt7GBXn1VqGrm2QwWVJp72zt0+cr61FXTSjbDAeyrjJsrKA/53I2WnX3mVYRaHRQSQZi+ciquQkn/SAFBt/AT8aobDNeFiw4hUbI64K3TwJKxWsxAVJGQwdbaWhluB3ElbyAI1guvGnqHgI5eFeG7DJBdIzSUssUJaZcFwv3o8AWzJh61eI0W+kzbvV6+h/YnSzLTGgmmdet6KTs/jMvoMYjjM6mAcxupkAiXeECjVR3E43iQRVSz79LIhwu57AXfm+qte5dsQfmB7wHKmQRzC21zHrF2PQi8MDfU/X9BN10fYMQFwnxGHLqbq8iQiNxw7z2S0Tl9pf/wAVmiBQJ8G3kBFLcP6sZKxNHRjV5yzx9xysmP/3xACGUNayZJo3wwlV9Iiey9SsuJuc4bhxfDkKpKbmUl33g9fwvYxzdX/pAEGVnE7yRVlT2NJuU+fqRyh5MQyX0LBSu0dDRJNOWMzQmQMjlxZOkUsV16wfGU3PUWpTX9w/++yf/kLxJacVdL4L4xiTQaWqUvWq5YaCrz+VTv/klW7DCaMEe+khQat6vYWE21noftjdnvOcJB1YSSTP3mH7DtnJfhgPZnQiy4dipDrT1nCIgDPpd/t89LhVIIqElhBUvh6eFLIe66eJAu61XzWwjX+441mdXNw4hO28Hl/o4wJ01/3DaVj0Ny27PEcE2zdYTvTnIuSqXKzoISRb/+ziOpZUnanLhi84htHI6MsezwKv/b5Yd/D5ORcWjK/8oDOVvsfzXpcnRV93vzWrBkLCE9BBzDTU6S+I7Nc6QtW5+OkykULlyP4a/4VZcHECNp4TZIoU6AVDD6OAOgB4LL9ldk8pNMB+cPfw4Ii9PBeku7HnNDgizz9F2vA12ruU19ql/lhtphVkLUt15SnLWqTQqrEkFS5ImiR/qTi4YsEPNr979GRFW30RVao2C6381h4/Z/+SF9MLLpKGd4MXzuzHobe5LOPX5sdkCVSvU1s9SCrgNUGZ3MR5rbA70yAuirX5NhgdKxCdYKTV4ziVwu1wI3IyiVUvX8fNGZyj7FIiewn3WgdjsrwOocltTEQbxV2cACkhvxVr6SlCXG1a8SjrbYvPOw3nKFg3rSkeIjku6XDWBCbxKkhr+sYLkar2HrFeS/RZ+5znOVheY1Ge9RKeeN1VWri3Qn7CAvQZHIqZhm1Ci0fvEZh8w3GzKzRHDy9M0HxrdOQ93WCNa28hDc006VR2lLl32KIab7vvtWMmz5dVhkuZwYvC/edVKuOLpxcmYHMuek6PxaG2Fm/R1s75bS/zHGHviW5le4UYOJQAXN946eftAgH/NK7fWOY9OBuXFoU1ZVk1/TxTZl/+34mYzeHDIb+UbMM8jvIP9F72zyBvH2ovztXhT2DxEpWlD/z7xk3H6wfoyWnafrXoqDjWtex1oesKNla3/+LL5QCZBxSItT/ADLb9vJ8OCGVEOcMQN3LJNgbl1A4ik6WUN81G91YAmJwN7X/dy1rypsZgoBadBotjKcqhfdETqsq72HCfDujBSkWE/IF1pCUS68bcu/JRwVAj3CkTieRv4750mgHFGnAABj9Dxrn6F82mbuLNNo+w+Oz8a561Qjexr9qcqeLkyZplFoWTFxEvqIIVEoEt2i78gVo4bRlST+hEjixZFe8Z0ipXniDS0NcfaeF8fee3JaJjUUBBJh4pbxxA1qbTMTvusVicREDy/0/2iQ/Hb1Of0ZWyWNH/gyhyNvnpRoH1nn8uoQPksP/gSRkbfqNAcuzS/92Z8BhZekH3YrMkc+hah3WaxwLdC3DERZpF1SmWv3d+g+hsnSPqRrdGN6Pq02CLVYtnyvYBQTNC2SFqgvEFOhF/DFDrWWBnDlXQIneHZt0Oy1qCzO7GBWolbOc8cVA8pwVlftYY2nc8+JdvsVPEIVyQogALNTBAk/QiDn7Zc/jotwvQaCw726JWPIXfxtMf6jUoLGwofmrHTs8FK24MpdH9dDJs0d4gKGsLS2ifPIoYAuFJ/Yio5ni0V33NbWIALIXaUU27XyRBSQRl65JwV755Xo0xXrR3I8eAUSlChgFVKaiz0p6/0qC9r7fVVGs4NWCyPL1XwAAAAAA==";
const FAVICON_DATA = "data:image/webp;base64,UklGRpwGAABXRUJQVlA4IJAGAACQHgCdASpAAEAAPj0WiUMiISEY/HW0IAPEsgBkKiEdu98+cONDyg883qA2wHmA6AHoAfrt1gHoAfrB6Zfsc/tf6Q9Yp+G/Jf1f8leRhEL+M/W78R5Cd8fqA9BH+S/2n8wuDmAB+Z/1X/K/mZ/ZucfuQ/9lxm/iHsAfnz/meyX/K/9zyifmv+H/7v+T+AT+T/0n/V/nL/mPBv6Kv7ENdIBY2b7WAXw9/5ASesdNfXNBex+Q96y3gHEYArL4SL13/JUC3IrnOTh0NRHLN8xUJPdcQfrmvfWEDGZuJonXx0zhVk0WplelO+qK3drRo7Ne3kHNuTc5P4ePZc3GefwAAP7//rWYWeWzXbOM8q5F7vvsCFwzx6lS53iZ5l2ppXEBJ+mPQtDtyIQ3LApJThWtW6BPaTy3u2cWyPJ3LVYwZ0zrkHYczsDsswAsGUJ3PDq74nhF/bDbcjHn7f/PrX7EjA3DrUKrq6rflsBE97OsiR5+q/sMlmjEZHMwnftwSa+m8XNvOPP6P5oxhM24hdCI4IzIdStsmFo6bwTU/h1ZTab7GFnk7jioId2g0n7JBXG156AfI1hHh7SsaM6XrxTC0JOLjXy+fte+lquMC1LzmY0o9a+aGL1va8OKTYJkepjNocAFcaFG8rZhKreeREckQ2L8dqXxLE4To5hMst7tjkAKnkb+JWUKrQxSQ0bhq7BMwBEL+rn+yGjSx4IDew+onfh6caM/kHe1mrR2o+aluvzarTkA4vocb3ToM7tk2Gjefn3BCm1KBj+UZIlZMlTdP3gcdJSbBDa/B1wSjUsSMX6LbOGsgyOCu/RVAsLrjGebggjUNTQf0+G0wsFjRqb/vyVBVOa7D2HcfSxhsHyk7Gx6ONylpl0jHMaKiZwn5q9R+g38TXWtYgEprqH53CKz/1KCb+KD2Xuz+174eazT8nfcWWaY/zzJc2yk11lndIOGpnMzqZwEdc5/d+WHRKRve5HHF1YVyXNw1jw79EXi/Lk+WUINSQ/nWxdeGnFoxMQqrWDB1VgnUgF0ET1g4q+KJ/S0dYUAgkk98U33D0HeLgOoNWbqZl2e2gMwOSJeRJvjrP6f7x9YP/vbJkynlvyQgR5nTWRRPp6t5vKsKWQtXOXbUh9P/ZglUJaZNwA707O+QnKXYxxfk6tvh2sY1HahvOG7PwZLWS6HvEJRIX3dLDmsRMmu13bs/7LukpHfuVyCkJNq+vxy00mS/PunmT5e2CJPT8sZIqZPzFqamto+9hoRGlOy7Q2jS4/k27pHDfB0bLmr+/o4GMfK6cQBPm+EtKFDP8/Q14bv+yCryx2i3Yab0txn8rq5Mbj8mcAWXklJvwVsQbKw76GJLq+dbAo/RiGVWvipcvH/xzlIC2mA8xZdvNSQ1u+iIhpGl8GyWlEmgteN1n8EX5sq1D+I75lqs+Pg7Dl91BX+YgeS9DmYXo5kdo6ocrqfNmtH44YX6Y13O+/KvukfE7swWnbCKHx+Qd36fpuOUNDmyfi3B3uDb17q/p3L/yFrgtG44z9JywFsk0EjLUOHlEehNV3wIeg1hNjPj2eehfQ3kypq+yBIXniiMHqHrkOrpMSH18+xo1ioGja5lyCpACjo4xTKeJyfv6I/blZk1hfQ95a4btQQr7oFtF4LUNgWAEzlIj4yQ1weh8cDH+iaFfGdN3QWI5kOaakhITZekRhl5Lq+1gqy3k99MIWLwGq8zAXwYkhPIZ/Vzi/cnPeFb5LH2NWnx55+jnpqkgnP4PptPLK8o812gh3gc8HV6UiNtxa7J+J/LrwzmaBARBPqFlHUc4VATVeB+zYgy7qVfVz734xSLE8hIWDTjX8/hvv+g2mUnZD+UPr/+JnU4DX7zMKef/Knv//4aKojJ8HGBA8WQZ+9Ts6rTlWjnB3QZLSfe8y86Y4DQz7vSoNceBFFvm/3pu60eZwSpd7mxdW1MIgwgRf5f+XEmTZ/u6FNblIvbjOScUX4wezShV8t9RxIKbbtKy97hsyPEXF7qFrmrh4rxq3Vp+roWVtZuObDJYnmkQPOTdhYX5NFkqoJBYGn61HVNENikDPeMH9iRbTKiJAsA/wV26Ci+ndbG9QEhuNAWlBf43NDhnNr0rYXnyUtr7aoWn9Pq929RBy47xYcg9yGziJv8ATxy0leG3Lz/AIm1Wxyh8x5kTtKjBXQSbBPVal57l2IJRxlcIf/4p4ZuUeY2nofDp+8l28+ReS4tpbVFLkKNcMAKV8gAAA=";

let schemaPromise = null;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    try {
      if (!env.DB) {
        return page("Banco não conectado", `
          <div class="auth-wrap">
            <div class="auth-card">
              <div class="brand big auth-brand"><img class="brand-logo-img" src="${BRAND_LOGO_DATA}" alt=""><span>BERN <b>NEXUS</b></span></div>
              <h1>Falta conectar o D1</h1>
              <p class="muted">Este Worker precisa do binding <b>DB</b> apontando para seu banco D1.</p>
            </div>
          </div>`, 503);
      }

      await ensureSchema(env.DB);
      await ensureConfiguredAdmin(env.DB, env);
      await expireMissions(env.DB);

      const path = url.pathname;

      // Webhook externo do Asaas: autenticação própria, sem exigir Origin do navegador.
      if (request.method === "POST" && path === "/webhooks/asaas") {
        return await handleAsaasWebhook(request, env, ctx);
      }

      if (request.method === "POST") {
        const origin = request.headers.get("origin");
        const fetchSite = request.headers.get("sec-fetch-site");
        if (origin !== url.origin || (fetchSite && !["same-origin","none"].includes(fetchSite))) {
          return page("Ação bloqueada", messageCard("Requisição de origem inválida.", true), 403);
        }
      }

      const user = await currentUser(request, env.DB);

      if (request.method === "GET" && path === "/login") {
        if (user && !user.is_blocked) return redirect("/", request);
        return renderAuth("login", url);
      }

      if (request.method === "GET" && path === "/register") {
        if (user && !user.is_blocked) return redirect("/", request);
        return renderAuth("register", url);
      }

      if (request.method === "POST" && path === "/register") {
        return await handleRegister(request, env.DB);
      }

      if (request.method === "POST" && path === "/login") {
        return await handleLogin(request, env.DB);
      }

      if (request.method === "POST" && path === "/logout") {
        return await handleLogout(request, env.DB);
      }

      if (!user) {
        if (request.method === "GET" && path === "/") return renderLanding();
        return redirect("/login", request);
      }

      if (user.is_blocked) {
        return page("Conta suspensa", `
          <div class="auth-wrap"><div class="auth-card">
            <div class="brand big auth-brand"><img class="brand-logo-img" src="${BRAND_LOGO_DATA}" alt=""><span>BERN <b>NEXUS</b></span></div>
            <h1>Conta suspensa</h1>
            <p class="muted">Seu acesso foi bloqueado pelo administrador.</p>
            <form method="post" action="/logout"><button class="btn secondary wide">Sair</button></form>
          </div></div>`, 403);
      }

      if (request.method === "POST" && path === "/missions/create") {
        return await handleCreateMission(request, env.DB, user);
      }

      const start = path.match(/^\/missions\/(\d+)\/start$/);
      if (request.method === "POST" && start) {
        return await handleStartMission(request, env.DB, user, Number(start[1]));
      }

      const submit = path.match(/^\/submissions\/(\d+)\/submit$/);
      if (request.method === "POST" && submit) {
        return await handleSubmitWork(request, env.DB, user, Number(submit[1]));
      }

      const cancel = path.match(/^\/submissions\/(\d+)\/cancel$/);
      if (request.method === "POST" && cancel) {
        return await handleCancelSubmission(request, env.DB, user, Number(cancel[1]));
      }

      const review = path.match(/^\/submissions\/(\d+)\/(approve|reject)$/);
      if (request.method === "POST" && review) {
        return await handleReview(request, env.DB, user, Number(review[1]), review[2]);
      }

      const toggle = path.match(/^\/missions\/(\d+)\/(open|close)$/);
      if (request.method === "POST" && toggle) {
        return await handleMissionStatus(request, env.DB, user, Number(toggle[1]), toggle[2] === "open" ? "open" : "closed");
      }

      if (request.method === "POST" && path === "/wallet/pix/create") {
        return await handleCreatePixDeposit(request, env, user);
      }

      if (request.method === "POST" && path === "/wallet/withdraw/request") {
        return await handleWithdrawalRequest(request, env.DB, user);
      }

      const adminUser = path.match(/^\/admin\/users\/(\d+)\/(block|unblock|credit)$/);
      if (request.method === "POST" && adminUser) {
        return await handleAdminUserAction(request, env, user, Number(adminUser[1]), adminUser[2]);
      }

      const adminMission = path.match(/^\/admin\/missions\/(\d+)\/close$/);
      if (request.method === "POST" && adminMission) {
        return await handleAdminMissionClose(request, env.DB, user, Number(adminMission[1]));
      }

      const adminWithdrawal = path.match(/^\/admin\/withdrawals\/(\d+)\/(approve|reject|paid)$/);
      if (request.method === "POST" && adminWithdrawal) {
        return await handleAdminWithdrawal(request, env.DB, user, Number(adminWithdrawal[1]), adminWithdrawal[2]);
      }

      if (request.method === "POST" && path === "/admin/asaas/reconcile") {
        return await handleAdminAsaasReconcile(request, env, user);
      }

      if (request.method === "GET" && path === "/") {
        return await renderDashboard(request, env, user, url);
      }

      return redirect("/", request);
    } catch (e) {
      console.error("BERN NEXUS ERROR", e);
      return page("Erro", `
        <div class="auth-wrap">
          <div class="auth-card">
            <div class="brand big auth-brand"><img class="brand-logo-img" src="${BRAND_LOGO_DATA}" alt=""><span>BERN <b>NEXUS</b></span></div>
            <h1>Algo deu errado</h1>
            <p class="muted">${esc(String(e?.message || e))}</p>
            <a class="btn primary wide linkbtn" href="/">Voltar</a>
          </div>
        </div>`, 500);
    }
  }
};

async function ensureSchema(db) {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const statements = [
        `CREATE TABLE IF NOT EXISTS nexus_users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          password_salt TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'worker',
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS nexus_sessions (
          token TEXT PRIMARY KEY,
          user_id INTEGER NOT NULL,
          expires_at TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS nexus_missions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          client_id INTEGER,
          title TEXT NOT NULL,
          category TEXT NOT NULL,
          description TEXT NOT NULL,
          instructions TEXT NOT NULL,
          reward REAL NOT NULL,
          slots INTEGER NOT NULL,
          image_data TEXT,
          status TEXT NOT NULL DEFAULT 'open',
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS nexus_submissions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          mission_id INTEGER NOT NULL,
          worker_id INTEGER NOT NULL,
          status TEXT NOT NULL DEFAULT 'started',
          answer TEXT,
          proof_image TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          submitted_at TEXT,
          reviewed_at TEXT,
          UNIQUE(mission_id, worker_id)
        )`,
        `CREATE TABLE IF NOT EXISTS nexus_wallet_ledger (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          amount REAL NOT NULL,
          type TEXT NOT NULL,
          source_ref TEXT UNIQUE,
          description TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS nexus_client_wallet (
          user_id INTEGER PRIMARY KEY,
          available REAL NOT NULL DEFAULT 0,
          reserved REAL NOT NULL DEFAULT 0,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS nexus_client_ledger (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          delta_available REAL NOT NULL DEFAULT 0,
          delta_reserved REAL NOT NULL DEFAULT 0,
          type TEXT NOT NULL,
          source_ref TEXT UNIQUE,
          description TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS nexus_platform_ledger (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          amount REAL NOT NULL,
          mission_id INTEGER,
          submission_id INTEGER,
          source_ref TEXT UNIQUE,
          description TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS nexus_rate_limits (
          bucket TEXT PRIMARY KEY,
          count INTEGER NOT NULL DEFAULT 0,
          reset_at INTEGER NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS nexus_audit_log (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          action TEXT NOT NULL,
          subject TEXT,
          ip_hash TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS nexus_pix_deposits (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          external_ref TEXT NOT NULL UNIQUE,
          asaas_customer_id TEXT,
          asaas_payment_id TEXT UNIQUE,
          amount REAL NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          pix_payload TEXT,
          qr_image TEXT,
          expiration_date TEXT,
          credited_at TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS nexus_asaas_events (
          event_id TEXT PRIMARY KEY,
          event_type TEXT,
          payment_id TEXT,
          payload TEXT,
          status TEXT NOT NULL DEFAULT 'pending',
          error TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          processed_at TEXT
        )`,
        `CREATE TABLE IF NOT EXISTS nexus_withdrawals (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          amount REAL NOT NULL,
          pix_key_type TEXT NOT NULL,
          pix_key TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          request_ref TEXT NOT NULL UNIQUE,
          reviewed_by INTEGER,
          reviewed_at TEXT,
          paid_at TEXT,
          admin_note TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE INDEX IF NOT EXISTS idx_nexus_missions_status ON nexus_missions(status, created_at)`,
        `CREATE INDEX IF NOT EXISTS idx_nexus_submissions_worker ON nexus_submissions(worker_id, created_at)`,
        `CREATE INDEX IF NOT EXISTS idx_nexus_submissions_mission ON nexus_submissions(mission_id, status)`,
        `CREATE INDEX IF NOT EXISTS idx_nexus_wallet_user ON nexus_wallet_ledger(user_id, created_at)`,
        `CREATE INDEX IF NOT EXISTS idx_nexus_client_ledger_user ON nexus_client_ledger(user_id, created_at)`,
        `CREATE INDEX IF NOT EXISTS idx_nexus_audit_created ON nexus_audit_log(created_at)`,
        `CREATE INDEX IF NOT EXISTS idx_nexus_audit_user ON nexus_audit_log(user_id, created_at)`,
        `CREATE INDEX IF NOT EXISTS idx_nexus_pix_user ON nexus_pix_deposits(user_id, created_at)`,
        `CREATE INDEX IF NOT EXISTS idx_nexus_pix_status ON nexus_pix_deposits(status, created_at)`,
        `CREATE INDEX IF NOT EXISTS idx_nexus_withdraw_user ON nexus_withdrawals(user_id, created_at)`,
        `CREATE INDEX IF NOT EXISTS idx_nexus_withdraw_status ON nexus_withdrawals(status, created_at)`
      ];
      await db.batch(statements.map(sql => db.prepare(sql)));

      await ensureColumn(db, "nexus_users", "is_admin", "INTEGER NOT NULL DEFAULT 0");
      await ensureColumn(db, "nexus_users", "is_blocked", "INTEGER NOT NULL DEFAULT 0");
      await ensureColumn(db, "nexus_users", "cpf_cnpj", "TEXT");
      await ensureColumn(db, "nexus_users", "asaas_customer_id", "TEXT");
      await ensureColumn(db, "nexus_missions", "deadline", "TEXT");
      await ensureColumn(db, "nexus_missions", "estimated_minutes", "INTEGER NOT NULL DEFAULT 5");
      await ensureColumn(db, "nexus_missions", "fee_rate", "REAL NOT NULL DEFAULT 0.20");
      await ensureColumn(db, "nexus_missions", "final_cost", "REAL NOT NULL DEFAULT 0");
      await ensureColumn(db, "nexus_missions", "reserved_remaining", "REAL NOT NULL DEFAULT 0");
      await ensureColumn(db, "nexus_missions", "funded", "INTEGER NOT NULL DEFAULT 0");
      await ensureColumn(db, "nexus_missions", "mission_ref", "TEXT");

      await db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_nexus_mission_ref ON nexus_missions(mission_ref) WHERE mission_ref IS NOT NULL").run();

      // Missões antigas sem reserva financeira ficam fechadas para não consumir saldo fictício.
      await db.prepare("UPDATE nexus_missions SET status='closed' WHERE funded=0 AND status='open'").run();

      await db.prepare(`
        INSERT OR IGNORE INTO nexus_client_wallet(user_id,available,reserved)
        SELECT id,0,0 FROM nexus_users WHERE role IN ('client','both')
      `).run();

      // Limpeza leve de rate limits vencidos.
      await db.prepare("DELETE FROM nexus_rate_limits WHERE reset_at<?").bind(Date.now()-86400000).run();

      return true;
    })().catch(err => {
      schemaPromise = null;
      throw err;
    });
  }
  return schemaPromise;
}

async function ensureColumn(db, table, column, definition) {
  const rows = await db.prepare(`PRAGMA table_info(${table})`).all();
  const exists = (rows.results || []).some(r => String(r.name) === column);
  if (!exists) await db.prepare(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`).run();
}

async function ensureClientWallet(db, userId) {
  await db.prepare("INSERT OR IGNORE INTO nexus_client_wallet(user_id,available,reserved) VALUES(?,0,0)").bind(userId).run();
}

async function ensureConfiguredAdmin(db, env) {
  const email=clean(env.ADMIN_EMAIL||"",160).toLowerCase();
  if(!email) return;
  // Quando ADMIN_EMAIL está configurado, ele é a fonte de verdade:
  // remove privilégios antigos concedidos por versões anteriores e mantém somente o e-mail definido no Worker.
  await db.prepare("UPDATE nexus_users SET is_admin=CASE WHEN lower(email)=? THEN 1 ELSE 0 END").bind(email).run();
}

function asaasConfigured(env) {
  return !!String(env.ASAAS_API_KEY||"").trim();
}

function asaasWebhookConfigured(env) {
  return !!String(env.ASAAS_WEBHOOK_TOKEN||"").trim();
}

function asaasBase(env) {
  return String(env.ASAAS_ENV||"sandbox").toLowerCase()==="production"
    ? "https://api.asaas.com"
    : "https://api-sandbox.asaas.com";
}

async function asaasRequest(env, path, options={}) {
  if(!asaasConfigured(env)) throw new Error("Integração Asaas ainda não configurada.");
  const headers={
    "accept":"application/json",
    "access_token":String(env.ASAAS_API_KEY),
    "User-Agent":"BernNexus/0.5.0",
    ...(options.body?{"content-type":"application/json"}:{}),
    ...(options.headers||{})
  };
  const res=await fetch(asaasBase(env)+path,{...options,headers});
  let data={};
  try{data=await res.json()}catch{}
  if(!res.ok) {
    const msg=data?.errors?.[0]?.description||data?.message||`Asaas HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

function digitsOnly(value) {
  return String(value||"").replace(/\D/g,"");
}

function validCpfCnpj(value) {
  const d=digitsOnly(value);
  return d.length===11||d.length===14;
}

function normalizePixKey(type,value) {
  const t=String(type||"").toUpperCase();
  let v=String(value||"").trim();
  if(t==="CPF"||t==="CNPJ"||t==="PHONE") v=digitsOnly(v);
  if(t==="EMAIL") v=v.toLowerCase();
  return v.slice(0,180);
}

function validPixKey(type,value) {
  const t=String(type||"").toUpperCase();
  const v=normalizePixKey(t,value);
  if(t==="CPF") return /^\d{11}$/.test(v);
  if(t==="CNPJ") return /^\d{14}$/.test(v);
  if(t==="EMAIL") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  if(t==="PHONE") return /^\d{10,13}$/.test(v);
  if(t==="EVP") return /^[a-zA-Z0-9-]{20,80}$/.test(v);
  return false;
}

async function ensureAsaasCustomer(env, db, user, cpfCnpj) {
  const current=await db.prepare("SELECT asaas_customer_id FROM nexus_users WHERE id=? LIMIT 1").bind(user.id).first();
  if(current?.asaas_customer_id) return String(current.asaas_customer_id);

  const cpf=digitsOnly(cpfCnpj);
  if(!validCpfCnpj(cpf)) throw new Error("Informe um CPF ou CNPJ válido para gerar a cobrança PIX.");

  const externalRef=`nexus-user-${user.id}`;
  const found=await asaasRequest(env,`/v3/customers?externalReference=${encodeURIComponent(externalRef)}&limit=1`,{method:"GET"});
  let customerId=found?.data?.[0]?.id||"";

  if(!customerId) {
    const created=await asaasRequest(env,"/v3/customers",{
      method:"POST",
      body:JSON.stringify({
        name:user.name,
        cpfCnpj:cpf,
        email:user.email,
        externalReference:externalRef,
        notificationDisabled:true
      })
    });
    customerId=created?.id||"";
  }

  if(!customerId) throw new Error("O Asaas não retornou o identificador do cliente.");

  // Por minimização de dados, não persistimos CPF/CNPJ no D1.
  await db.prepare("UPDATE nexus_users SET asaas_customer_id=? WHERE id=?")
    .bind(customerId,user.id).run();
  return customerId;
}

async function createPixDepositCharge(env, db, user, amount, cpfCnpj) {
  const existing=await db.prepare(`
    SELECT id,status,asaas_payment_id,qr_image FROM nexus_pix_deposits
    WHERE user_id=? AND status IN ('creating','pending') AND abs(amount-?)<0.001
      AND created_at>=datetime('now','-10 minutes')
    ORDER BY id DESC LIMIT 1
  `).bind(user.id,amount).first();

  if(existing) {
    if(existing.status==="pending"&&existing.asaas_payment_id&&!existing.qr_image) {
      try {
        const qr=await asaasRequest(env,`/v3/payments/${encodeURIComponent(existing.asaas_payment_id)}/pixQrCode`,{method:"GET"});
        await db.prepare(`
          UPDATE nexus_pix_deposits SET pix_payload=?,qr_image=?,expiration_date=?,updated_at=CURRENT_TIMESTAMP WHERE id=?
        `).bind(String(qr?.payload||""),qr?.encodedImage?`data:image/png;base64,${qr.encodedImage}`:"",String(qr?.expirationDate||""),existing.id).run();
      } catch {}
    }
    return Number(existing.id);
  }

  const externalRef=`nexus-pix-${user.id}-${Date.now()}-${randomHex(4)}`;
  const intent=await db.prepare(`
    INSERT INTO nexus_pix_deposits(user_id,external_ref,amount,status)
    SELECT ?,?,?,'creating'
    WHERE NOT EXISTS(
      SELECT 1 FROM nexus_pix_deposits
      WHERE user_id=? AND status IN ('creating','pending') AND abs(amount-?)<0.001
        AND created_at>=datetime('now','-10 minutes')
    )
  `).bind(user.id,externalRef,amount,user.id,amount).run();

  if(Number(intent.meta?.changes||0)<1) {
    const recent=await db.prepare(`
      SELECT id FROM nexus_pix_deposits
      WHERE user_id=? AND status IN ('creating','pending') AND abs(amount-?)<0.001
        AND created_at>=datetime('now','-10 minutes')
      ORDER BY id DESC LIMIT 1
    `).bind(user.id,amount).first();
    if(recent) return Number(recent.id);
    throw new Error("Já existe uma cobrança semelhante sendo processada.");
  }

  const depositId=Number(intent.meta?.last_row_id||0);
  if(!depositId) throw new Error("Não foi possível iniciar a cobrança PIX.");

  try {
    const customerId=await ensureAsaasCustomer(env,db,user,cpfCnpj);
    let payment=null;
    try {
      payment=await asaasRequest(env,"/v3/lean/payments",{
        method:"POST",
        body:JSON.stringify({
          customer:customerId,
          billingType:"PIX",
          value:amount,
          dueDate:datePlusDays(1),
          externalReference:externalRef,
          description:"Crédito de saldo Bern Nexus"
        })
      });
    } catch(createError) {
      // Se houve timeout após o Asaas criar a cobrança, recuperamos pelo externalReference
      // antes de tentar criar outra e gerar duplicidade.
      try {
        const found=await asaasRequest(env,`/v3/lean/payments?externalReference=${encodeURIComponent(externalRef)}&limit=1`,{method:"GET"});
        payment=found?.data?.[0]||null;
      } catch {}
      if(!payment?.id) throw createError;
    }

    if(!payment?.id) throw new Error("Não foi possível criar a cobrança PIX.");

    await db.prepare(`
      UPDATE nexus_pix_deposits
      SET asaas_customer_id=?,asaas_payment_id=?,status='pending',updated_at=CURRENT_TIMESTAMP
      WHERE id=? AND status='creating'
    `).bind(customerId,payment.id,depositId).run();

    const qr=await asaasRequest(env,`/v3/payments/${encodeURIComponent(payment.id)}/pixQrCode`,{method:"GET"});
    const image=qr?.encodedImage?`data:image/png;base64,${qr.encodedImage}`:"";
    const payload=String(qr?.payload||"");
    const expiration=String(qr?.expirationDate||"");

    await db.prepare(`
      UPDATE nexus_pix_deposits
      SET pix_payload=?,qr_image=?,expiration_date=?,updated_at=CURRENT_TIMESTAMP
      WHERE id=?
    `).bind(payload,image,expiration,depositId).run();

    return depositId;
  } catch(e) {
    await db.prepare(`
      UPDATE nexus_pix_deposits SET status='error',updated_at=CURRENT_TIMESTAMP
      WHERE id=? AND status='creating'
    `).bind(depositId).run();
    throw e;
  }
}

async function creditPixPayment(db, payment) {
  const paymentId=String(payment?.id||"");
  if(!paymentId) return false;

  const dep=await db.prepare("SELECT * FROM nexus_pix_deposits WHERE asaas_payment_id=? LIMIT 1").bind(paymentId).first();
  if(!dep||dep.status!=="pending") return false;

  const value=roundMoney(Number(payment?.value||0));
  const expected=roundMoney(Number(dep.amount||0));
  if(Math.abs(value-expected)>0.001) throw new Error("Valor confirmado no Asaas difere da cobrança registrada.");

  const status=String(payment?.status||"").toUpperCase();
  if(!["RECEIVED","CONFIRMED"].includes(status)) return false;
  if(String(payment?.billingType||"").toUpperCase()!=="PIX") throw new Error("Cobrança confirmada não é PIX.");

  const fee=roundMoney(Math.max(0,value-Number(payment?.netValue??value)));
  const source=`asaas:${paymentId}`;
  const feeSource=`asaas_fee:${paymentId}`;

  const result=await db.batch([
    db.prepare("INSERT OR IGNORE INTO nexus_client_wallet(user_id,available,reserved) VALUES(?,0,0)").bind(dep.user_id),
    db.prepare(`
      INSERT OR IGNORE INTO nexus_client_ledger(user_id,delta_available,delta_reserved,type,source_ref,description)
      SELECT user_id,amount,0,'pix_deposit',?,'Crédito confirmado via PIX Asaas'
      FROM nexus_pix_deposits WHERE asaas_payment_id=? AND status='pending'
    `).bind(source,paymentId),
    db.prepare(`
      UPDATE nexus_client_wallet
      SET available=available+(SELECT amount FROM nexus_pix_deposits WHERE asaas_payment_id=?),
          updated_at=CURRENT_TIMESTAMP
      WHERE user_id=(SELECT user_id FROM nexus_pix_deposits WHERE asaas_payment_id=? AND status='pending')
        AND EXISTS(SELECT 1 FROM nexus_client_ledger WHERE source_ref=?)
    `).bind(paymentId,paymentId,source),
    db.prepare(`
      INSERT OR IGNORE INTO nexus_platform_ledger(amount,mission_id,submission_id,source_ref,description)
      SELECT ?,NULL,NULL,?,'Taxa de processamento Asaas'
      WHERE ?>0 AND EXISTS(SELECT 1 FROM nexus_pix_deposits WHERE asaas_payment_id=? AND status='pending')
    `).bind(-fee,feeSource,fee,paymentId),
    db.prepare(`
      UPDATE nexus_pix_deposits
      SET status='paid',credited_at=CURRENT_TIMESTAMP,updated_at=CURRENT_TIMESTAMP
      WHERE asaas_payment_id=? AND status='pending'
        AND EXISTS(SELECT 1 FROM nexus_client_ledger WHERE source_ref=?)
    `).bind(paymentId,source)
  ]);

  return Number(result?.[4]?.meta?.changes||0)>0;
}

async function reversePixPayment(db, paymentId) {
  const dep=await db.prepare("SELECT * FROM nexus_pix_deposits WHERE asaas_payment_id=? LIMIT 1").bind(paymentId).first();
  if(!dep||dep.status!=="paid") return false;

  const source=`asaas_refund:${paymentId}`;
  const result=await db.batch([
    db.prepare(`
      INSERT OR IGNORE INTO nexus_client_ledger(user_id,delta_available,delta_reserved,type,source_ref,description)
      SELECT user_id,-amount,0,'pix_refund',?,'Estorno PIX confirmado pelo Asaas'
      FROM nexus_pix_deposits WHERE asaas_payment_id=? AND status='paid'
    `).bind(source,paymentId),
    db.prepare(`
      UPDATE nexus_client_wallet
      SET available=available-(SELECT amount FROM nexus_pix_deposits WHERE asaas_payment_id=?),
          updated_at=CURRENT_TIMESTAMP
      WHERE user_id=(SELECT user_id FROM nexus_pix_deposits WHERE asaas_payment_id=? AND status='paid')
        AND EXISTS(SELECT 1 FROM nexus_client_ledger WHERE source_ref=?)
    `).bind(paymentId,paymentId,source),
    db.prepare(`
      UPDATE nexus_pix_deposits
      SET status='refunded',updated_at=CURRENT_TIMESTAMP
      WHERE asaas_payment_id=? AND status='paid'
        AND EXISTS(SELECT 1 FROM nexus_client_ledger WHERE source_ref=?)
    `).bind(paymentId,source)
  ]);
  return Number(result?.[2]?.meta?.changes||0)>0;
}

async function processAsaasEvent(env, eventId) {
  const row=await env.DB.prepare("SELECT * FROM nexus_asaas_events WHERE event_id=? LIMIT 1").bind(eventId).first();
  if(!row||row.status==="processed") return;

  try {
    const payload=JSON.parse(row.payload||"{}");
    const paymentId=String(payload?.payment?.id||row.payment_id||"");
    const type=String(row.event_type||"");

    if(["PAYMENT_RECEIVED","PAYMENT_CONFIRMED"].includes(type)&&paymentId) {
      const payment=await asaasRequest(env,`/v3/payments/${encodeURIComponent(paymentId)}`,{method:"GET"});
      await creditPixPayment(env.DB,payment);
    } else if(type==="PAYMENT_REFUNDED"&&paymentId) {
      const payment=await asaasRequest(env,`/v3/payments/${encodeURIComponent(paymentId)}`,{method:"GET"});
      if(String(payment?.status||"").toUpperCase()==="REFUNDED") await reversePixPayment(env.DB,paymentId);
    } else if(["PAYMENT_PARTIALLY_REFUNDED","PAYMENT_CHARGEBACK_REQUESTED"].includes(type)&&paymentId) {
      await env.DB.prepare(`
        UPDATE nexus_pix_deposits SET status='review_required',updated_at=CURRENT_TIMESTAMP
        WHERE asaas_payment_id=? AND status IN ('paid','pending')
      `).bind(paymentId).run();
    }

    await env.DB.prepare(`
      UPDATE nexus_asaas_events SET status='processed',processed_at=CURRENT_TIMESTAMP,error=NULL WHERE event_id=?
    `).bind(eventId).run();
  } catch(e) {
    await env.DB.prepare("UPDATE nexus_asaas_events SET status='error',error=? WHERE event_id=?")
      .bind(clean(String(e?.message||e),500),eventId).run();
  }
}

async function reconcilePendingAsaas(env, limit=20) {
  if(!asaasConfigured(env)) return {checked:0,credited:0};
  const rows=await env.DB.prepare(`
    SELECT asaas_payment_id FROM nexus_pix_deposits
    WHERE status='pending' AND asaas_payment_id IS NOT NULL
    ORDER BY id ASC LIMIT ?
  `).bind(Math.max(1,Math.min(20,limit))).all();

  let credited=0;
  for(const r of (rows.results||[])) {
    try {
      const payment=await asaasRequest(env,`/v3/payments/${encodeURIComponent(r.asaas_payment_id)}`,{method:"GET"});
      if(await creditPixPayment(env.DB,payment)) credited++;
    } catch {}
  }
  return {checked:(rows.results||[]).length,credited};
}

function roundMoney(v) {
  return Math.round((Number(v) + Number.EPSILON) * 100) / 100;
}

function perSlotCost(reward, feeRate = PLATFORM_FEE_RATE) {
  return roundMoney(Number(reward) * (1 + Number(feeRate)));
}

function finalMissionCost(reward, slots, feeRate = PLATFORM_FEE_RATE) {
  return roundMoney(perSlotCost(reward, feeRate) * Number(slots));
}

function todayDate() {
  return new Date().toISOString().slice(0,10);
}

function datePlusDays(days) {
  const d = new Date(Date.now() + days * 86400000);
  return d.toISOString().slice(0,10);
}

function deadlineLabel(deadline) {
  if (!deadline) return "Sem prazo";
  const today = new Date(todayDate() + "T00:00:00Z");
  const d = new Date(String(deadline).slice(0,10) + "T00:00:00Z");
  const days = Math.ceil((d - today) / 86400000);
  if (days < 0) return "Prazo encerrado";
  if (days === 0) return "Encerra hoje";
  if (days === 1) return "1 dia restante";
  return `${days} dias restantes`;
}

async function expireMissions(db) {
  const rows = await db.prepare(`
    SELECT id,client_id FROM nexus_missions
    WHERE funded=1 AND status='open' AND deadline IS NOT NULL AND date(deadline)<date('now')
    LIMIT 20
  `).all();
  for (const m of (rows.results || [])) {
    try { await closeMissionFunds(db, Number(m.id), Number(m.client_id), "Prazo encerrado"); } catch {}
  }
}

async function closeMissionFunds(db, missionId, clientId, reason = "Missão fechada") {
  const actionRef=`close_release:${missionId}:${Date.now()}:${randomHex(3)}`;
  const desc=clean(`${reason}: saldo não utilizado liberado`,180);
  const calc = `
    SELECT m.*,
      ROUND(m.reward*(1+m.fee_rate),2) slot_cost,
      MIN(
        COALESCE(w.reserved,0),
        MAX(0,ROUND(m.reserved_remaining -
          (SELECT COUNT(*) FROM nexus_submissions s
           WHERE s.mission_id=m.id AND s.status IN ('started','submitted'))
          * ROUND(m.reward*(1+m.fee_rate),2),2))
      ) release_amount
    FROM nexus_missions m
    JOIN nexus_client_wallet w ON w.user_id=m.client_id
    WHERE m.id=? AND m.client_id=? AND m.status='open'
  `;

  const result=await db.batch([
    db.prepare(`
      WITH c AS (${calc})
      INSERT INTO nexus_client_ledger(user_id,delta_available,delta_reserved,type,source_ref,description)
      SELECT client_id,release_amount,-release_amount,'mission_release',?,?
      FROM c WHERE release_amount>0
    `).bind(missionId,clientId,actionRef,desc),
    db.prepare(`
      UPDATE nexus_client_wallet
      SET available=available+COALESCE((SELECT delta_available FROM nexus_client_ledger WHERE source_ref=?),0),
          reserved=MAX(0,reserved+COALESCE((SELECT delta_reserved FROM nexus_client_ledger WHERE source_ref=?),0)),
          updated_at=CURRENT_TIMESTAMP
      WHERE user_id=? AND EXISTS(SELECT 1 FROM nexus_missions WHERE id=? AND client_id=? AND status='open')
    `).bind(actionRef,actionRef,clientId,missionId,clientId),
    db.prepare(`
      UPDATE nexus_missions
      SET reserved_remaining=MAX(0,reserved_remaining-COALESCE((SELECT delta_available FROM nexus_client_ledger WHERE source_ref=?),0)),
          status='closed'
      WHERE id=? AND client_id=? AND status='open'
    `).bind(actionRef,missionId,clientId)
  ]);

  return Number(result?.[2]?.meta?.changes||0)>0;
}

async function reopenMissionFunds(db, missionId, clientId) {
  const actionRef=`reopen:${missionId}:${Date.now()}:${randomHex(3)}`;
  const calc = `
    SELECT m.id,m.client_id,m.status,m.deadline,m.reserved_remaining,
      ROUND(
        MAX(0,m.slots-(SELECT COUNT(*) FROM nexus_submissions s WHERE s.mission_id=m.id AND s.status='approved'))
        * ROUND(m.reward*(1+m.fee_rate),2),2
      ) desired,
      MAX(0,ROUND(
        MAX(0,m.slots-(SELECT COUNT(*) FROM nexus_submissions s WHERE s.mission_id=m.id AND s.status='approved'))
        * ROUND(m.reward*(1+m.fee_rate),2) - m.reserved_remaining,2
      )) needed
    FROM nexus_missions m
    WHERE m.id=? AND m.client_id=? AND m.status='closed'
      AND (m.deadline IS NULL OR date(m.deadline)>=date('now'))
  `;

  const result=await db.batch([
    db.prepare(`
      WITH c AS (${calc})
      INSERT INTO nexus_client_ledger(user_id,delta_available,delta_reserved,type,source_ref,description)
      SELECT c.client_id,-c.needed,c.needed,'mission_rereserve',?,'Reserva para reabrir missão'
      FROM c JOIN nexus_client_wallet w ON w.user_id=c.client_id
      WHERE c.needed>0 AND w.available>=c.needed
    `).bind(missionId,clientId,actionRef),
    db.prepare(`
      WITH c AS (${calc})
      UPDATE nexus_client_wallet
      SET available=available-COALESCE((SELECT needed FROM c),0),
          reserved=reserved+COALESCE((SELECT needed FROM c),0),
          updated_at=CURRENT_TIMESTAMP
      WHERE user_id=? AND EXISTS(
        SELECT 1 FROM c WHERE needed=0 OR EXISTS(SELECT 1 FROM nexus_client_ledger WHERE source_ref=?)
      )
    `).bind(missionId,clientId,clientId,actionRef),
    db.prepare(`
      WITH c AS (${calc})
      UPDATE nexus_missions
      SET status='open',reserved_remaining=(SELECT desired FROM c)
      WHERE id=? AND client_id=? AND status='closed'
        AND EXISTS(SELECT 1 FROM c WHERE needed=0 OR EXISTS(SELECT 1 FROM nexus_client_ledger WHERE source_ref=?))
    `).bind(missionId,clientId,missionId,clientId,actionRef)
  ]);

  if(Number(result?.[2]?.meta?.changes||0)>0) return {ok:true};

  const m=await db.prepare("SELECT deadline FROM nexus_missions WHERE id=? AND client_id=? LIMIT 1").bind(missionId,clientId).first();
  if(!m) return {ok:false,message:"Missão não encontrada."};
  if(m.deadline&&String(m.deadline).slice(0,10)<todayDate()) return {ok:false,message:"O prazo dessa missão já terminou."};
  return {ok:false,message:"Saldo insuficiente para reabrir a missão."};
}

async function getWorkerWallet(db, userId) {
  const [available,pending,total,today,withdrawPending,entries] = await Promise.all([
    db.prepare("SELECT COALESCE(SUM(amount),0) v FROM nexus_wallet_ledger WHERE user_id=?").bind(userId).first(),
    db.prepare(`
      SELECT COALESCE(SUM(m.reward),0) v
      FROM nexus_submissions s JOIN nexus_missions m ON m.id=s.mission_id
      WHERE s.worker_id=? AND s.status='submitted'
    `).bind(userId).first(),
    db.prepare("SELECT COALESCE(SUM(amount),0) v FROM nexus_wallet_ledger WHERE user_id=? AND type='mission_reward'").bind(userId).first(),
    db.prepare(`
      SELECT COALESCE(SUM(amount),0) v FROM nexus_wallet_ledger
      WHERE user_id=? AND type='mission_reward' AND date(created_at,'-3 hours')=date('now','-3 hours')
    `).bind(userId).first(),
    db.prepare(`
      SELECT COALESCE(SUM(amount),0) v FROM nexus_withdrawals
      WHERE user_id=? AND status IN ('pending','approved')
    `).bind(userId).first(),
    db.prepare(`
      SELECT id,amount,type,description,created_at FROM nexus_wallet_ledger
      WHERE user_id=? ORDER BY created_at DESC LIMIT 30
    `).bind(userId).all()
  ]);
  return {
    available:Number(available?.v||0),
    pending:Number(pending?.v||0),
    total:Number(total?.v||0),
    today:Number(today?.v||0),
    withdrawal_pending:Number(withdrawPending?.v||0),
    entries:entries.results||[]
  };
}

async function getClientWallet(db, userId) {
  await ensureClientWallet(db,userId);
  const [wallet,spent,entries] = await Promise.all([
    db.prepare("SELECT available,reserved FROM nexus_client_wallet WHERE user_id=?").bind(userId).first(),
    db.prepare(`
      SELECT COALESCE(SUM(m.reward*(1+m.fee_rate)),0) v
      FROM nexus_submissions s JOIN nexus_missions m ON m.id=s.mission_id
      WHERE m.client_id=? AND s.status='approved'
    `).bind(userId).first(),
    db.prepare(`
      SELECT delta_available,delta_reserved,type,description,created_at
      FROM nexus_client_ledger WHERE user_id=? ORDER BY created_at DESC LIMIT 20
    `).bind(userId).all()
  ]);
  return {
    available:Number(wallet?.available||0),
    reserved:Number(wallet?.reserved||0),
    spent:roundMoney(Number(spent?.v||0)),
    entries:entries.results||[]
  };
}

async function getUserWithdrawals(db,userId) {
  const rows=await db.prepare(`
    SELECT id,amount,pix_key_type,pix_key,status,created_at,reviewed_at,paid_at
    FROM nexus_withdrawals WHERE user_id=? ORDER BY id DESC LIMIT 20
  `).bind(userId).all();
  return rows.results||[];
}

async function getUserPixDeposits(db,userId) {
  const rows=await db.prepare(`
    SELECT id,amount,status,expiration_date,created_at,credited_at
    FROM nexus_pix_deposits WHERE user_id=? ORDER BY id DESC LIMIT 20
  `).bind(userId).all();
  return rows.results||[];
}

async function getPixDepositById(db,userId,id) {
  if(!id) return null;
  return await db.prepare(`
    SELECT id,amount,status,pix_payload,qr_image,expiration_date,created_at,credited_at
    FROM nexus_pix_deposits WHERE id=? AND user_id=? LIMIT 1
  `).bind(id,userId).first();
}

async function getReputation(db, user) {
  const result = {worker:null,client:null};
  if (canWorker(user)) {
    const r = await db.prepare(`
      SELECT
        SUM(CASE WHEN status='approved' THEN 1 ELSE 0 END) approved,
        SUM(CASE WHEN status='rejected' THEN 1 ELSE 0 END) rejected,
        SUM(CASE WHEN status='submitted' THEN 1 ELSE 0 END) pending,
        COUNT(*) total
      FROM nexus_submissions WHERE worker_id=?
    `).bind(user.id).first();
    const approved=Number(r?.approved||0), rejected=Number(r?.rejected||0);
    result.worker={approved,rejected,pending:Number(r?.pending||0),total:Number(r?.total||0),rate:(approved+rejected)?Math.round(approved/(approved+rejected)*100):100};
  }
  if (canClient(user)) {
    const r = await db.prepare(`
      SELECT
        (SELECT COUNT(*) FROM nexus_missions WHERE client_id=?) missions,
        SUM(CASE WHEN s.status='approved' THEN 1 ELSE 0 END) approved,
        SUM(CASE WHEN s.status='rejected' THEN 1 ELSE 0 END) rejected
      FROM nexus_missions m LEFT JOIN nexus_submissions s ON s.mission_id=m.id
      WHERE m.client_id=?
    `).bind(user.id,user.id).first();
    const approved=Number(r?.approved||0), rejected=Number(r?.rejected||0);
    result.client={missions:Number(r?.missions||0),approved,rejected,rate:(approved+rejected)?Math.round(approved/(approved+rejected)*100):100};
  }
  return result;
}

function feedOptions(url) {
  const category = ["Pesquisa","Teste","Opinião","Levantamento"].includes(url.searchParams.get("category")) ? url.searchParams.get("category") : "";
  const sort = ["recent","highest","deadline","vacancies"].includes(url.searchParams.get("sort")) ? url.searchParams.get("sort") : "recent";
  const mode = url.searchParams.get("mode") === "list" ? "list" : "cards";
  const page = Math.max(1,Math.min(500,Number(url.searchParams.get("page")||1)));
  return {
    q:clean(url.searchParams.get("q")||"",80),
    category,sort,mode,page,
    newonly:url.searchParams.get("newonly")==="1"
  };
}

async function getFeedData(db, user, url) {
  const o = feedOptions(url);
  let where = `
    m.status='open' AND m.funded=1
    AND (m.deadline IS NULL OR date(m.deadline)>=date('now'))
    AND m.client_id<>?
    AND (SELECT COUNT(*) FROM nexus_submissions sx WHERE sx.mission_id=m.id AND sx.status IN ('started','submitted','approved')) < m.slots
  `;
  const binds=[user.id];

  if (o.category) { where += " AND m.category=?"; binds.push(o.category); }
  if (o.q) {
    where += " AND (lower(m.title) LIKE ? OR lower(m.description) LIKE ? OR lower(m.instructions) LIKE ? OR lower(u.name) LIKE ?)";
    const q=`%${o.q.toLowerCase()}%`; binds.push(q,q,q,q);
  }
  if (o.newonly) {
    where += " AND NOT EXISTS(SELECT 1 FROM nexus_submissions sn WHERE sn.mission_id=m.id AND sn.worker_id=?)";
    binds.push(user.id);
  }

  const order = o.sort==="highest" ? "m.reward DESC,m.created_at DESC"
    : o.sort==="deadline" ? "date(m.deadline) ASC,m.created_at DESC"
    : o.sort==="vacancies" ? `(m.slots-(SELECT COUNT(*) FROM nexus_submissions sv WHERE sv.mission_id=m.id AND sv.status IN ('started','submitted','approved'))) DESC,m.created_at DESC`
    : "m.created_at DESC";

  const count = await db.prepare(`
    SELECT COUNT(*) c FROM nexus_missions m JOIN nexus_users u ON u.id=m.client_id WHERE ${where}
  `).bind(...binds).first();

  const offset=(o.page-1)*PAGE_SIZE;
  const rows=await db.prepare(`
    SELECT m.*,u.name client_name,
      (SELECT COUNT(*) FROM nexus_submissions s WHERE s.mission_id=m.id AND s.status IN ('started','submitted','approved')) occupied,
      (SELECT COUNT(*) FROM nexus_missions cm WHERE cm.client_id=m.client_id) client_missions,
      (SELECT COUNT(*) FROM nexus_submissions ca JOIN nexus_missions mm ON mm.id=ca.mission_id WHERE mm.client_id=m.client_id AND ca.status='approved') client_approved
    FROM nexus_missions m JOIN nexus_users u ON u.id=m.client_id
    WHERE ${where}
    ORDER BY ${order}
    LIMIT ? OFFSET ?
  `).bind(...binds,PAGE_SIZE,offset).all();

  return {missions:rows.results||[],total:Number(count?.c||0),opts:o,pages:Math.max(1,Math.ceil(Number(count?.c||0)/PAGE_SIZE))};
}

async function getMySubmissions(db,userId,url) {
  const allowed=["all","started","submitted","approved","rejected"];
  const filter=allowed.includes(url.searchParams.get("status"))?url.searchParams.get("status"):"all";
  let sql=`
    SELECT s.*,m.title,m.category,m.reward,m.description,m.image_data,m.deadline,m.estimated_minutes
    FROM nexus_submissions s JOIN nexus_missions m ON m.id=s.mission_id
    WHERE s.worker_id=?`;
  const binds=[userId];
  if(filter!=="all"){sql+=" AND s.status=?";binds.push(filter);}
  sql+=" ORDER BY s.created_at DESC LIMIT 100";
  const rows=await db.prepare(sql).bind(...binds).all();
  return {submissions:rows.results||[],filter};
}

async function getClientData(db,userId) {
  const [missions,subs]=await Promise.all([
    db.prepare(`
      SELECT m.*,
        (SELECT COUNT(*) FROM nexus_submissions s WHERE s.mission_id=m.id) submissions_count,
        (SELECT COUNT(*) FROM nexus_submissions s WHERE s.mission_id=m.id AND s.status='approved') approved_count,
        (SELECT COUNT(*) FROM nexus_submissions s WHERE s.mission_id=m.id AND s.status='submitted') pending_count
      FROM nexus_missions m WHERE m.client_id=? ORDER BY m.created_at DESC LIMIT 100
    `).bind(userId).all(),
    db.prepare(`
      SELECT s.*,w.name worker_name,m.title,m.reward,m.client_id,m.status mission_status
      FROM nexus_submissions s
      JOIN nexus_missions m ON m.id=s.mission_id
      JOIN nexus_users w ON w.id=s.worker_id
      WHERE m.client_id=?
      ORDER BY CASE s.status WHEN 'submitted' THEN 0 ELSE 1 END,s.created_at DESC
      LIMIT 150
    `).bind(userId).all()
  ]);
  return {missions:missions.results||[],subs:subs.results||[]};
}

async function getAdminData(db) {
  const [users,missions,withdrawals,deposits,stats,platform] = await Promise.all([
    db.prepare(`
      SELECT u.id,u.name,u.email,u.role,u.is_admin,u.is_blocked,u.created_at,
             COALESCE(c.available,0) client_available,COALESCE(c.reserved,0) client_reserved
      FROM nexus_users u LEFT JOIN nexus_client_wallet c ON c.user_id=u.id
      ORDER BY u.created_at DESC LIMIT 100
    `).all(),
    db.prepare(`
      SELECT m.id,m.title,m.status,m.reward,m.slots,m.final_cost,m.deadline,u.name client_name
      FROM nexus_missions m LEFT JOIN nexus_users u ON u.id=m.client_id
      ORDER BY m.created_at DESC LIMIT 100
    `).all(),
    db.prepare(`
      SELECT w.id,w.user_id,w.amount,w.pix_key_type,w.pix_key,w.status,w.created_at,u.name worker_name,u.email worker_email
      FROM nexus_withdrawals w JOIN nexus_users u ON u.id=w.user_id
      ORDER BY CASE w.status WHEN 'pending' THEN 0 WHEN 'approved' THEN 1 ELSE 2 END,w.id DESC LIMIT 100
    `).all(),
    db.prepare(`
      SELECT p.id,p.user_id,p.amount,p.status,p.asaas_payment_id,p.created_at,p.credited_at,u.name client_name
      FROM nexus_pix_deposits p JOIN nexus_users u ON u.id=p.user_id
      ORDER BY p.id DESC LIMIT 100
    `).all(),
    db.prepare(`
      SELECT
        (SELECT COUNT(*) FROM nexus_users) users,
        (SELECT COUNT(*) FROM nexus_missions WHERE status='open' AND funded=1) open_missions,
        (SELECT COUNT(*) FROM nexus_submissions WHERE status='submitted') pending_reviews,
        (SELECT COALESCE(SUM(reserved),0) FROM nexus_client_wallet) total_reserved,
        (SELECT COUNT(*) FROM nexus_withdrawals WHERE status='pending') pending_withdrawals,
        (SELECT COUNT(*) FROM nexus_pix_deposits WHERE status='pending') pending_pix,
        (SELECT COALESCE(SUM(amount),0) FROM nexus_pix_deposits WHERE status='paid') pix_received
    `).first(),
    db.prepare("SELECT COALESCE(SUM(amount),0) v FROM nexus_platform_ledger").first()
  ]);
  return {
    users:users.results||[],
    missions:missions.results||[],
    withdrawals:withdrawals.results||[],
    deposits:deposits.results||[],
    stats:stats||{},
    platform:Number(platform?.v||0)
  };
}

function queryUrl(opts, changes={}) {
  const p=new URLSearchParams();
  p.set("view","home");
  const merged={...opts,...changes};
  if(merged.q)p.set("q",merged.q);
  if(merged.category)p.set("category",merged.category);
  if(merged.sort&&merged.sort!=="recent")p.set("sort",merged.sort);
  if(merged.mode&&merged.mode!=="cards")p.set("mode",merged.mode);
  if(merged.newonly)p.set("newonly","1");
  if(merged.page&&merged.page>1)p.set("page",String(merged.page));
  return "/?"+p.toString();
}

async function sha256Hex(value) {
  const data = new TextEncoder().encode(String(value || ""));
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map(x => x.toString(16).padStart(2,"0")).join("");
}

async function requestIpHash(request) {
  const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "unknown";
  return (await sha256Hex("bern-nexus:" + ip)).slice(0,32);
}

async function enforceRateLimit(db, request, scope, subject, limit, windowMs) {
  const ipHash = await requestIpHash(request);
  const bucket = await sha256Hex(`${scope}:${ipHash}:${String(subject || "").toLowerCase()}`);
  const now = Date.now();
  const row = await db.prepare("SELECT count,reset_at FROM nexus_rate_limits WHERE bucket=? LIMIT 1").bind(bucket).first();

  if (!row) {
    await db.prepare("INSERT INTO nexus_rate_limits(bucket,count,reset_at) VALUES(?,1,?)")
      .bind(bucket, now + windowMs).run();
    return {ok:true, remaining:Math.max(0,limit-1)};
  }

  if (Number(row.reset_at || 0) <= now) {
    await db.prepare("UPDATE nexus_rate_limits SET count=1,reset_at=? WHERE bucket=?")
      .bind(now + windowMs,bucket).run();
    return {ok:true, remaining:Math.max(0,limit-1)};
  }

  if (Number(row.count || 0) >= limit) {
    return {ok:false, retryMs:Number(row.reset_at)-now};
  }

  await db.prepare("UPDATE nexus_rate_limits SET count=count+1 WHERE bucket=?").bind(bucket).run();
  return {ok:true, remaining:Math.max(0,limit-Number(row.count||0)-1)};
}

async function auditSecurity(db, request, userId, action, subject="") {
  try {
    const ipHash = await requestIpHash(request);
    await db.prepare(`
      INSERT INTO nexus_audit_log(user_id,action,subject,ip_hash)
      VALUES(?,?,?,?)
    `).bind(userId || null,clean(action,80),clean(subject,240),ipHash).run();
  } catch {}
}

async function handleRegister(request, db) {
  const f = await request.formData();
  const name = clean(f.get("name"),80);
  const email = clean(f.get("email"),160).toLowerCase();
  const password = String(f.get("password")||"");
  const role = ["worker","client","both"].includes(String(f.get("role"))) ? String(f.get("role")) : "worker";

  const rate = await enforceRateLimit(db,request,"register",email,5,30*60*1000);
  if(!rate.ok) {
    await auditSecurity(db,request,null,"register_rate_limited",email);
    return redirect("/register?err="+enc("Muitas tentativas de cadastro. Tente novamente mais tarde."),request);
  }

  if(name.length<2) return redirect("/register?err="+enc("Informe seu nome."),request);
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return redirect("/register?err="+enc("E-mail inválido."),request);
  if(password.length<8) return redirect("/register?err="+enc("Use uma senha com pelo menos 8 caracteres."),request);

  const exists=await db.prepare("SELECT id FROM nexus_users WHERE email=? LIMIT 1").bind(email).first();
  if(exists) return redirect("/login?err="+enc("Esse e-mail já está cadastrado."),request);

  const salt=randomHex(16);
  const hash=await hashPassword(password,salt);
  const r=await db.prepare("INSERT INTO nexus_users(name,email,password_hash,password_salt,role) VALUES(?,?,?,?,?)")
    .bind(name,email,hash,salt,role).run();
  const userId=Number(r.meta?.last_row_id||0);
  if(!userId) throw new Error("Não foi possível criar o usuário.");

  if(role==="client"||role==="both") await ensureClientWallet(db,userId);
  await auditSecurity(db,request,userId,"register_success",role);
  return redirect("/login?msg="+enc("Conta criada com sucesso. Agora entre com seu e-mail e senha."),request);
}

async function handleLogin(request, db) {
  const f=await request.formData();
  const email=clean(f.get("email"),160).toLowerCase();
  const password=String(f.get("password")||"");

  const ipRate=await enforceRateLimit(db,request,"login-ip","all",30,15*60*1000);
  const emailRate=await enforceRateLimit(db,request,"login-email",email,10,15*60*1000);
  if(!ipRate.ok||!emailRate.ok) {
    await auditSecurity(db,request,null,"login_rate_limited",email);
    return redirect("/login?err="+enc("Muitas tentativas de acesso. Aguarde alguns minutos e tente novamente."),request);
  }

  const row=await db.prepare("SELECT * FROM nexus_users WHERE email=? LIMIT 1").bind(email).first();
  const dummySalt="000102030405060708090a0b0c0d0e0f";
  const candidate=await hashPassword(password,row?.password_salt||dummySalt);

  if(!row||!safeEqual(candidate,String(row.password_hash||""))) {
    await auditSecurity(db,request,row?.id||null,"login_failed",email);
    return redirect("/login?err="+enc("E-mail ou senha incorretos."),request);
  }
  if(Number(row.is_blocked||0)===1) {
    await auditSecurity(db,request,row.id,"login_blocked_account",email);
    return redirect("/login?err="+enc("Esta conta está suspensa."),request);
  }

  const token=await createSession(db,row.id);
  await auditSecurity(db,request,row.id,"login_success","web");
  return redirect("/?msg="+enc("Login realizado."),request,sessionCookie(token));
}

async function handleLogout(request, db) {
  const token=sessionTokenFromRequest(request);
  const user=token?await currentUser(request,db):null;
  if(token) {
    const tokenHash=await sha256Hex("session:"+token);
    await db.prepare("DELETE FROM nexus_sessions WHERE token=? OR token=?").bind(tokenHash,token).run();
  }
  if(user) await auditSecurity(db,request,user.id,"logout","web");
  return redirect("/login?msg="+enc("Você saiu da conta."),request,expiredCookie());
}

async function handleCreateMission(request, db, user) {
  if(!canClient(user)) return redirect("/?view=create&err="+enc("Seu perfil não pode publicar missões."),request);

  const f=await request.formData();
  const title=clean(f.get("title"),100);
  const category=["Pesquisa","Teste","Opinião","Levantamento"].includes(String(f.get("category")))?String(f.get("category")):"Pesquisa";
  const description=clean(f.get("description"),500);
  const instructions=clean(f.get("instructions"),1500);
  const reward=Number(String(f.get("reward")||"0").replace(",","."));
  const slots=Math.floor(Number(f.get("slots")));
  const estimated=Math.floor(Number(f.get("estimated_minutes")||5));
  const deadline=clean(f.get("deadline"),10);
  const image=String(f.get("image_data")||"");
  const formToken=clean(f.get("form_token"),64);

  if(!/^[a-f0-9]{32}$/i.test(formToken)) return redirect("/?view=create&err="+enc("Formulário expirado ou inválido. Reabra a tela de publicação."),request);
  if(title.length<5||description.length<10||instructions.length<10) return redirect("/?view=create&err="+enc("Preencha título, descrição e instruções com mais detalhes."),request);
  if(!Number.isFinite(reward)||reward<MIN_REWARD||reward>500) return redirect("/?view=create&err="+enc("A recompensa mínima é R$ 2,50."),request);
  if(!Number.isInteger(slots)||slots<1||slots>500) return redirect("/?view=create&err="+enc("Informe entre 1 e 500 vagas."),request);
  if(!Number.isInteger(estimated)||estimated<1||estimated>180) return redirect("/?view=create&err="+enc("O tempo estimado deve ficar entre 1 e 180 minutos."),request);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(deadline)||deadline<todayDate()) return redirect("/?view=create&err="+enc("Escolha um prazo válido."),request);
  if(image&&(!image.startsWith("data:image/jpeg;base64,")||image.length>MAX_IMAGE_CHARS)) return redirect("/?view=create&err="+enc("A imagem ficou grande demais."),request);

  const total=finalMissionCost(reward,slots,PLATFORM_FEE_RATE);
  const missionRef=`mission:${user.id}:${formToken}`;
  const ledgerRef=`mission_reserve:${missionRef}`;
  await ensureClientWallet(db,user.id);

  const result=await db.batch([
    db.prepare(`
      INSERT OR IGNORE INTO nexus_missions(
        client_id,title,category,description,instructions,reward,slots,image_data,status,
        deadline,estimated_minutes,fee_rate,final_cost,reserved_remaining,funded,mission_ref
      )
      SELECT ?,?,?,?,?,?,?,?,'open',?,?,?,?,?,1,?
      FROM nexus_client_wallet w
      WHERE w.user_id=? AND w.available>=?
        AND NOT EXISTS(
          SELECT 1 FROM nexus_pix_deposits p
          WHERE p.user_id=w.user_id AND p.status='review_required'
        )
    `).bind(
      user.id,title,category,description,instructions,reward,slots,image||null,
      deadline,estimated,PLATFORM_FEE_RATE,total,total,missionRef,user.id,total
    ),
    db.prepare(`
      UPDATE nexus_client_wallet
      SET available=available-?,reserved=reserved+?,updated_at=CURRENT_TIMESTAMP
      WHERE user_id=? AND EXISTS(SELECT 1 FROM nexus_missions WHERE mission_ref=?)
        AND NOT EXISTS(SELECT 1 FROM nexus_client_ledger WHERE source_ref=?)
    `).bind(total,total,user.id,missionRef,ledgerRef),
    db.prepare(`
      INSERT OR IGNORE INTO nexus_client_ledger(user_id,delta_available,delta_reserved,type,source_ref,description)
      SELECT client_id,?,?, 'mission_reserve',?,?
      FROM nexus_missions WHERE mission_ref=?
    `).bind(-total,total,ledgerRef,`Custo final reservado: ${title}`,missionRef)
  ]);

  if(Number(result?.[0]?.meta?.changes||0)<1) {
    const already=await db.prepare("SELECT id FROM nexus_missions WHERE mission_ref=? LIMIT 1").bind(missionRef).first();
    if(already) return redirect("/?view=client&msg="+enc("Essa publicação já tinha sido processada. Nenhum saldo foi reservado novamente."),request);
    const review=await db.prepare("SELECT id FROM nexus_pix_deposits WHERE user_id=? AND status='review_required' LIMIT 1").bind(user.id).first();
    if(review) return redirect("/?view=create&err="+enc("Sua conta está em revisão financeira por causa de um estorno parcial ou contestação. Resolva isso com o administrador antes de publicar novas missões."),request);
    const w=await db.prepare("SELECT available FROM nexus_client_wallet WHERE user_id=?").bind(user.id).first();
    return redirect("/?view=create&err="+enc(`Saldo insuficiente. Custo final: ${brl(total)}. Saldo disponível: ${brl(w?.available||0)}.`),request);
  }

  return redirect("/?view=client&msg="+enc(`Missão publicada. Custo final reservado: ${brl(total)}.`),request);
}

async function handleStartMission(request, db, user, missionId) {
  if(!canWorker(user)) return redirect("/?err="+enc("Seu perfil não pode executar missões."),request);

  try {
    const r=await db.prepare(`
      INSERT INTO nexus_submissions(mission_id,worker_id,status)
      SELECT m.id,?,'started'
      FROM nexus_missions m
      WHERE m.id=?
        AND m.status='open' AND m.funded=1
        AND (m.deadline IS NULL OR date(m.deadline)>=date('now'))
        AND m.client_id<>?
        AND NOT EXISTS(
          SELECT 1 FROM nexus_submissions s0 WHERE s0.mission_id=m.id AND s0.worker_id=?
        )
        AND (
          SELECT COUNT(*) FROM nexus_submissions s
          WHERE s.mission_id=m.id AND s.status IN ('started','submitted','approved')
        ) < m.slots
    `).bind(user.id,missionId,user.id,user.id).run();

    if(Number(r.meta?.changes||0)>0) {
      return redirect("/?view=mine&msg="+enc("Missão aceita. Agora envie o trabalho."),request);
    }
  } catch(e) {
    if(!String(e).includes("UNIQUE")) throw e;
  }

  const mission=await db.prepare("SELECT status,deadline,client_id FROM nexus_missions WHERE id=? LIMIT 1").bind(missionId).first();
  if(!mission||mission.status!=="open") return redirect("/?err="+enc("Missão indisponível."),request);
  if(Number(mission.client_id)===Number(user.id)) return redirect("/?err="+enc("Você não pode executar sua própria missão."),request);
  const already=await db.prepare("SELECT id FROM nexus_submissions WHERE mission_id=? AND worker_id=? LIMIT 1").bind(missionId,user.id).first();
  if(already) return redirect("/?view=mine&msg="+enc("Você já participou dessa missão."),request);
  return redirect("/?err="+enc("As vagas desta missão acabaram ou o prazo terminou."),request);
}

async function handleCancelSubmission(request, db, user, submissionId) {
  if(!canWorker(user)) return redirect("/?view=mine&err="+enc("Perfil sem acesso."),request);

  const refundRef=`cancel_release:${submissionId}`;
  const result=await db.batch([
    db.prepare(`
      INSERT OR IGNORE INTO nexus_client_ledger(user_id,delta_available,delta_reserved,type,source_ref,description)
      SELECT m.client_id,
             ROUND(m.reward*(1+m.fee_rate),2),
             -ROUND(m.reward*(1+m.fee_rate),2),
             'cancel_release',?,
             'Participação cancelada: reserva liberada'
      FROM nexus_submissions s JOIN nexus_missions m ON m.id=s.mission_id
      WHERE s.id=? AND s.worker_id=? AND s.status='started'
        AND m.status='closed'
        AND m.reserved_remaining>=ROUND(m.reward*(1+m.fee_rate),2)
        AND COALESCE((SELECT reserved FROM nexus_client_wallet WHERE user_id=m.client_id),0)>=ROUND(m.reward*(1+m.fee_rate),2)
    `).bind(refundRef,submissionId,user.id),
    db.prepare(`
      UPDATE nexus_client_wallet
      SET available=available+COALESCE((SELECT delta_available FROM nexus_client_ledger WHERE source_ref=?),0),
          reserved=MAX(0,reserved+COALESCE((SELECT delta_reserved FROM nexus_client_ledger WHERE source_ref=?),0)),
          updated_at=CURRENT_TIMESTAMP
      WHERE user_id=(
        SELECT m.client_id FROM nexus_submissions s JOIN nexus_missions m ON m.id=s.mission_id
        WHERE s.id=? AND s.worker_id=? AND s.status='started' LIMIT 1
      )
        AND EXISTS(SELECT 1 FROM nexus_client_ledger WHERE source_ref=?)
    `).bind(refundRef,refundRef,submissionId,user.id,refundRef),
    db.prepare(`
      UPDATE nexus_missions
      SET reserved_remaining=MAX(0,reserved_remaining-COALESCE((SELECT delta_available FROM nexus_client_ledger WHERE source_ref=?),0))
      WHERE id=(
        SELECT mission_id FROM nexus_submissions WHERE id=? AND worker_id=? AND status='started'
      )
        AND EXISTS(SELECT 1 FROM nexus_client_ledger WHERE source_ref=?)
    `).bind(refundRef,submissionId,user.id,refundRef),
    db.prepare(`
      DELETE FROM nexus_submissions
      WHERE id=? AND worker_id=? AND status='started'
        AND (
          EXISTS(SELECT 1 FROM nexus_missions m WHERE m.id=nexus_submissions.mission_id AND m.status='open')
          OR EXISTS(SELECT 1 FROM nexus_client_ledger WHERE source_ref=?)
        )
    `).bind(submissionId,user.id,refundRef)
  ]);

  if(Number(result?.[3]?.meta?.changes||0)<1) {
    return redirect("/?view=mine&err="+enc("Essa participação não pode ser cancelada agora."),request);
  }
  return redirect("/?view=mine&msg="+enc("Participação cancelada."),request);
}

async function handleSubmitWork(request, db, user, submissionId) {
  if (!canWorker(user)) return redirect("/?view=mine&err=" + enc("Perfil sem acesso."), request);

  const f = await request.formData();
  const answer = clean(f.get("answer"), 3000);
  const proof = String(f.get("proof_image") || "");

  if (answer.length < 3) return redirect("/?view=mine&err=" + enc("Descreva o trabalho realizado."), request);
  if (proof && (!proof.startsWith("data:image/jpeg;base64,") || proof.length > MAX_IMAGE_CHARS)) {
    return redirect("/?view=mine&err=" + enc("O comprovante ficou grande demais."), request);
  }

  const r = await db.prepare(`
    UPDATE nexus_submissions
    SET answer=?, proof_image=?, status='submitted', submitted_at=CURRENT_TIMESTAMP
    WHERE id=? AND worker_id=? AND status='started'
  `).bind(answer, proof || null, submissionId, user.id).run();

  if (!r.meta?.changes) return redirect("/?view=mine&err=" + enc("Essa missão não pode mais ser enviada."), request);
  return redirect("/?view=mine&msg=" + enc("Trabalho enviado para aprovação."), request);
}

async function handleReview(request, db, user, submissionId, action) {
  if(!canClient(user)) return redirect("/?view=client&err="+enc("Perfil sem acesso."),request);

  if(action==="reject") {
    const releaseRef=`rejection_release:${submissionId}`;
    const result=await db.batch([
      db.prepare(`
        INSERT OR IGNORE INTO nexus_client_ledger(user_id,delta_available,delta_reserved,type,source_ref,description)
        SELECT m.client_id,
               ROUND(m.reward*(1+m.fee_rate),2),
               -ROUND(m.reward*(1+m.fee_rate),2),
               'rejection_release',?,
               'Trabalho rejeitado em missão fechada: reserva liberada'
        FROM nexus_submissions s JOIN nexus_missions m ON m.id=s.mission_id
        WHERE s.id=? AND s.status='submitted' AND m.client_id=? AND m.status='closed'
          AND m.reserved_remaining>=ROUND(m.reward*(1+m.fee_rate),2)
          AND COALESCE((SELECT reserved FROM nexus_client_wallet WHERE user_id=m.client_id),0)>=ROUND(m.reward*(1+m.fee_rate),2)
      `).bind(releaseRef,submissionId,user.id),
      db.prepare(`
        UPDATE nexus_client_wallet
        SET available=available+COALESCE((SELECT delta_available FROM nexus_client_ledger WHERE source_ref=?),0),
            reserved=MAX(0,reserved+COALESCE((SELECT delta_reserved FROM nexus_client_ledger WHERE source_ref=?),0)),
            updated_at=CURRENT_TIMESTAMP
        WHERE user_id=?
          AND EXISTS(SELECT 1 FROM nexus_client_ledger WHERE source_ref=?)
          AND EXISTS(SELECT 1 FROM nexus_submissions WHERE id=? AND status='submitted')
      `).bind(releaseRef,releaseRef,user.id,releaseRef,submissionId),
      db.prepare(`
        UPDATE nexus_missions
        SET reserved_remaining=MAX(0,reserved_remaining-COALESCE((SELECT delta_available FROM nexus_client_ledger WHERE source_ref=?),0))
        WHERE client_id=? AND id=(SELECT mission_id FROM nexus_submissions WHERE id=? AND status='submitted')
          AND EXISTS(SELECT 1 FROM nexus_client_ledger WHERE source_ref=?)
      `).bind(releaseRef,user.id,submissionId,releaseRef),
      db.prepare(`
        UPDATE nexus_submissions
        SET status='rejected',reviewed_at=CURRENT_TIMESTAMP
        WHERE id=? AND status='submitted'
          AND EXISTS(SELECT 1 FROM nexus_missions WHERE id=nexus_submissions.mission_id AND client_id=?)
      `).bind(submissionId,user.id)
    ]);

    if(Number(result?.[3]?.meta?.changes||0)<1) {
      return redirect("/?view=client&err="+enc("Esse envio já foi revisado ou não pertence à sua missão."),request);
    }
    return redirect("/?view=client&msg="+enc("Trabalho rejeitado."),request);
  }

  const workerRef=`submission:${submissionId}`;
  const feeRef=`fee:${submissionId}`;
  const clientRef=`approved:${submissionId}`;

  const result=await db.batch([
    db.prepare(`
      INSERT OR IGNORE INTO nexus_wallet_ledger(user_id,amount,type,source_ref,description)
      SELECT s.worker_id,m.reward,'mission_reward',?,('Missão aprovada: '||substr(m.title,1,100))
      FROM nexus_submissions s JOIN nexus_missions m ON m.id=s.mission_id
      WHERE s.id=? AND s.status='submitted' AND m.client_id=?
        AND m.reserved_remaining>=ROUND(m.reward*(1+m.fee_rate),2)
        AND COALESCE((SELECT reserved FROM nexus_client_wallet WHERE user_id=m.client_id),0)>=ROUND(m.reward*(1+m.fee_rate),2)
    `).bind(workerRef,submissionId,user.id),
    db.prepare(`
      INSERT OR IGNORE INTO nexus_platform_ledger(amount,mission_id,submission_id,source_ref,description)
      SELECT ROUND(m.reward*m.fee_rate,2),m.id,s.id,?,('Receita Nexus: '||substr(m.title,1,100))
      FROM nexus_submissions s JOIN nexus_missions m ON m.id=s.mission_id
      WHERE s.id=? AND s.status='submitted' AND m.client_id=?
        AND m.reserved_remaining>=ROUND(m.reward*(1+m.fee_rate),2)
        AND COALESCE((SELECT reserved FROM nexus_client_wallet WHERE user_id=m.client_id),0)>=ROUND(m.reward*(1+m.fee_rate),2)
    `).bind(feeRef,submissionId,user.id),
    db.prepare(`
      INSERT OR IGNORE INTO nexus_client_ledger(user_id,delta_available,delta_reserved,type,source_ref,description)
      SELECT m.client_id,0,-ROUND(m.reward*(1+m.fee_rate),2),'mission_approved',?,
             ('Trabalho aprovado: '||substr(m.title,1,100))
      FROM nexus_submissions s JOIN nexus_missions m ON m.id=s.mission_id
      WHERE s.id=? AND s.status='submitted' AND m.client_id=?
        AND m.reserved_remaining>=ROUND(m.reward*(1+m.fee_rate),2)
        AND COALESCE((SELECT reserved FROM nexus_client_wallet WHERE user_id=m.client_id),0)>=ROUND(m.reward*(1+m.fee_rate),2)
    `).bind(clientRef,submissionId,user.id),
    db.prepare(`
      UPDATE nexus_client_wallet
      SET reserved=MAX(0,reserved-(
        SELECT ROUND(m.reward*(1+m.fee_rate),2)
        FROM nexus_submissions s JOIN nexus_missions m ON m.id=s.mission_id
        WHERE s.id=? AND s.status='submitted' AND m.client_id=?
      )),updated_at=CURRENT_TIMESTAMP
      WHERE user_id=? AND EXISTS(SELECT 1 FROM nexus_client_ledger WHERE source_ref=?)
        AND EXISTS(SELECT 1 FROM nexus_submissions WHERE id=? AND status='submitted')
    `).bind(submissionId,user.id,user.id,clientRef,submissionId),
    db.prepare(`
      UPDATE nexus_missions
      SET reserved_remaining=MAX(0,reserved_remaining-ROUND(reward*(1+fee_rate),2))
      WHERE client_id=? AND id=(SELECT mission_id FROM nexus_submissions WHERE id=? AND status='submitted')
        AND EXISTS(SELECT 1 FROM nexus_client_ledger WHERE source_ref=?)
    `).bind(user.id,submissionId,clientRef),
    db.prepare(`
      UPDATE nexus_submissions
      SET status='approved',reviewed_at=CURRENT_TIMESTAMP
      WHERE id=? AND status='submitted'
        AND EXISTS(SELECT 1 FROM nexus_missions WHERE id=nexus_submissions.mission_id AND client_id=?)
        AND EXISTS(SELECT 1 FROM nexus_client_ledger WHERE source_ref=?)
        AND EXISTS(SELECT 1 FROM nexus_wallet_ledger WHERE source_ref=?)
    `).bind(submissionId,user.id,clientRef,workerRef)
  ]);

  if(Number(result?.[5]?.meta?.changes||0)<1) {
    return redirect("/?view=client&err="+enc("Esse envio já foi processado ou a reserva é insuficiente."),request);
  }

  const rewardRow=await db.prepare(`
    SELECT m.reward FROM nexus_submissions s JOIN nexus_missions m ON m.id=s.mission_id WHERE s.id=? LIMIT 1
  `).bind(submissionId).first();
  return redirect("/?view=client&msg="+enc(`Trabalho aprovado. ${brl(rewardRow?.reward||0)} creditados ao trabalhador.`),request);
}

async function handleMissionStatus(request, db, user, missionId, status) {
  if(!canClient(user)) return redirect("/?view=client&err="+enc("Perfil sem acesso."),request);
  if(status==="closed") {
    const ok=await closeMissionFunds(db,missionId,user.id,"Missão fechada pelo contratante");
    return redirect("/?view=client&"+(ok?"msg="+enc("Missão fechada e saldo não utilizado liberado."):"err="+enc("Missão não encontrada.")),request);
  }
  const r=await reopenMissionFunds(db,missionId,user.id);
  return redirect("/?view=client&"+(r.ok?"msg="+enc("Missão reaberta e saldo novamente reservado."):"err="+enc(r.message)),request);
}

async function handleCreatePixDeposit(request, env, user) {
  if(!canClient(user)) return redirect("/?view=profile&err="+enc("Seu perfil não pode adicionar saldo de contratante."),request);
  if(!asaasConfigured(env)) return redirect("/?view=profile&err="+enc("O PIX via Asaas ainda não foi configurado pelo administrador."),request);

  const f=await request.formData();
  const amount=roundMoney(Number(String(f.get("amount")||"0").replace(",",".")));
  const cpfCnpj=digitsOnly(f.get("cpf_cnpj"));

  if(!Number.isFinite(amount)||amount<10||amount>50000) {
    return redirect("/?view=profile&err="+enc("Informe um valor entre R$ 10,00 e R$ 50.000,00."),request);
  }
  if(!validCpfCnpj(cpfCnpj)) {
    return redirect("/?view=profile&err="+enc("Informe um CPF ou CNPJ válido para gerar a cobrança PIX."),request);
  }

  const rate=await enforceRateLimit(env.DB,request,"pix-deposit",String(user.id),6,15*60*1000);
  if(!rate.ok) return redirect("/?view=profile&err="+enc("Muitas cobranças PIX em pouco tempo. Aguarde alguns minutos."),request);

  try {
    const id=await createPixDepositCharge(env,env.DB,user,amount,cpfCnpj);
    await auditSecurity(env.DB,request,user.id,"pix_deposit_created",String(id));
    return redirect(`/?view=profile&pix=${id}&msg=`+enc("Cobrança PIX criada. O saldo será liberado somente após confirmação do Asaas."),request);
  } catch(e) {
    await auditSecurity(env.DB,request,user.id,"pix_deposit_error",clean(String(e?.message||e),200));
    return redirect("/?view=profile&err="+enc(`Não foi possível gerar o PIX: ${String(e?.message||e)}`),request);
  }
}

async function handleAsaasWebhook(request, env, ctx) {
  if(!asaasWebhookConfigured(env)) return new Response("webhook not configured",{status:503});

  const received=String(request.headers.get("asaas-access-token")||"");
  const expected=String(env.ASAAS_WEBHOOK_TOKEN||"");
  if(!safeEqual(received,expected)) return new Response("unauthorized",{status:401});

  let payload={};
  try{payload=await request.json()}catch{return new Response("invalid json",{status:400})}

  const eventId=clean(payload?.id,180);
  const eventType=clean(payload?.event,80);
  const paymentId=clean(payload?.payment?.id,120);
  if(!eventId) return new Response("missing event id",{status:400});

  const r=await env.DB.prepare(`
    INSERT OR IGNORE INTO nexus_asaas_events(event_id,event_type,payment_id,payload,status)
    VALUES(?,?,?,?, 'pending')
  `).bind(eventId,eventType,paymentId,JSON.stringify(payload).slice(0,20000)).run();

  if(Number(r.meta?.changes||0)>0) {
    if(ctx?.waitUntil) ctx.waitUntil(processAsaasEvent(env,eventId));
    else await processAsaasEvent(env,eventId);
  }

  return new Response("ok",{status:200});
}

async function handleWithdrawalRequest(request, db, user) {
  if(!canWorker(user)) return redirect("/?view=profile&err="+enc("Seu perfil não pode solicitar saque."),request);

  const f=await request.formData();
  const amount=roundMoney(Number(String(f.get("amount")||"0").replace(",",".")));
  const keyType=String(f.get("pix_key_type")||"").toUpperCase();
  const pixKey=normalizePixKey(keyType,f.get("pix_key"));

  if(!["CPF","CNPJ","EMAIL","PHONE","EVP"].includes(keyType)) {
    return redirect("/?view=profile&err="+enc("Selecione um tipo de chave PIX válido."),request);
  }
  if(!Number.isFinite(amount)||amount<MIN_WITHDRAWAL||amount>50000) {
    return redirect("/?view=profile&err="+enc(`O saque mínimo é ${brl(MIN_WITHDRAWAL)}.`),request);
  }
  if(!validPixKey(keyType,pixKey)) return redirect("/?view=profile&err="+enc("Informe uma chave PIX válida para o tipo selecionado."),request);

  const requestRef=`withdraw:${user.id}:${Date.now()}:${randomHex(4)}`;
  const holdRef=`withdrawal_hold:${requestRef}`;

  const result=await db.batch([
    db.prepare(`
      INSERT INTO nexus_withdrawals(user_id,amount,pix_key_type,pix_key,status,request_ref)
      SELECT ?,?,?,?,'pending',?
      WHERE (SELECT COALESCE(SUM(amount),0) FROM nexus_wallet_ledger WHERE user_id=?)>=?
        AND NOT EXISTS(
          SELECT 1 FROM nexus_withdrawals
          WHERE user_id=? AND status IN ('pending','approved') AND created_at>=datetime('now','-5 minutes')
        )
    `).bind(user.id,amount,keyType,pixKey,requestRef,user.id,amount,user.id),
    db.prepare(`
      INSERT INTO nexus_wallet_ledger(user_id,amount,type,source_ref,description)
      SELECT user_id,-amount,'withdrawal_hold',?,'Saldo reservado para solicitação de saque'
      FROM nexus_withdrawals WHERE request_ref=?
    `).bind(holdRef,requestRef)
  ]);

  if(Number(result?.[0]?.meta?.changes||0)<1) {
    return redirect("/?view=profile&err="+enc("Saldo insuficiente ou já existe uma solicitação recente em análise."),request);
  }
  return redirect("/?view=profile&msg="+enc("Saque solicitado. O valor ficou reservado até a conferência do administrador."),request);
}

async function handleAdminWithdrawal(request, db, user, withdrawalId, action) {
  if(!user.is_admin) return redirect("/?err="+enc("Acesso administrativo necessário."),request);

  const w=await db.prepare("SELECT * FROM nexus_withdrawals WHERE id=? LIMIT 1").bind(withdrawalId).first();
  if(!w) return redirect("/?view=admin&err="+enc("Saque não encontrado."),request);

  if(action==="approve") {
    const r=await db.prepare(`
      UPDATE nexus_withdrawals
      SET status='approved',reviewed_by=?,reviewed_at=CURRENT_TIMESTAMP
      WHERE id=? AND status='pending'
    `).bind(user.id,withdrawalId).run();
    return redirect("/?view=admin&"+(Number(r.meta?.changes||0)>0?"msg="+enc("Saque aprovado para pagamento manual."):"err="+enc("Esse saque já foi processado.")),request);
  }

  if(action==="reject") {
    const refundRef=`withdrawal_refund:${withdrawalId}`;
    const result=await db.batch([
      db.prepare(`
        INSERT OR IGNORE INTO nexus_wallet_ledger(user_id,amount,type,source_ref,description)
        SELECT user_id,amount,'withdrawal_refund',?,'Saque rejeitado: saldo devolvido'
        FROM nexus_withdrawals WHERE id=? AND status IN ('pending','approved')
      `).bind(refundRef,withdrawalId),
      db.prepare(`
        UPDATE nexus_withdrawals
        SET status='rejected',reviewed_by=?,reviewed_at=CURRENT_TIMESTAMP
        WHERE id=? AND status IN ('pending','approved')
          AND EXISTS(SELECT 1 FROM nexus_wallet_ledger WHERE source_ref=?)
      `).bind(user.id,withdrawalId,refundRef)
    ]);
    return redirect("/?view=admin&"+(Number(result?.[1]?.meta?.changes||0)>0?"msg="+enc("Saque rejeitado e saldo devolvido ao trabalhador."):"err="+enc("Esse saque já foi processado.")),request);
  }

  if(action==="paid") {
    const r=await db.prepare(`
      UPDATE nexus_withdrawals
      SET status='paid',reviewed_by=COALESCE(reviewed_by,?),reviewed_at=COALESCE(reviewed_at,CURRENT_TIMESTAMP),paid_at=CURRENT_TIMESTAMP
      WHERE id=? AND status='approved'
    `).bind(user.id,withdrawalId).run();
    return redirect("/?view=admin&"+(Number(r.meta?.changes||0)>0?"msg="+enc("Saque marcado como pago."):"err="+enc("O saque precisa estar aprovado antes de ser marcado como pago.")),request);
  }

  return redirect("/?view=admin&err="+enc("Ação de saque inválida."),request);
}

async function handleAdminAsaasReconcile(request, env, user) {
  if(!user.is_admin) return redirect("/?err="+enc("Acesso administrativo necessário."),request);
  if(!asaasConfigured(env)) return redirect("/?view=admin&err="+enc("Asaas ainda não está configurado."),request);
  const result=await reconcilePendingAsaas(env,20);
  return redirect("/?view=admin&msg="+enc(`Conciliação concluída: ${result.checked} cobrança(s) verificadas e ${result.credited} crédito(s) liberado(s).`),request);
}


async function handleAdminUserAction(request, env, user, targetId, action) {
  if(!user.is_admin) return redirect("/?err="+enc("Acesso administrativo necessário."),request);
  const db=env.DB;
  const target=await db.prepare("SELECT id,name,role,is_admin FROM nexus_users WHERE id=? LIMIT 1").bind(targetId).first();
  if(!target) return redirect("/?view=admin&err="+enc("Usuário não encontrado."),request);

  if(action==="block"||action==="unblock") {
    if(Number(target.is_admin||0)===1) return redirect("/?view=admin&err="+enc("Não é permitido bloquear um administrador."),request);
    await db.prepare("UPDATE nexus_users SET is_blocked=? WHERE id=?").bind(action==="block"?1:0,targetId).run();
    await auditSecurity(db,request,user.id,action==="block"?"admin_block_user":"admin_unblock_user",String(targetId));
    return redirect("/?view=admin&msg="+enc(action==="block"?"Usuário bloqueado.":"Usuário desbloqueado."),request);
  }

  if(action==="credit") {
    if(String(env.ALLOW_ADMIN_CREDIT||"").toLowerCase()!=="true") {
      return redirect("/?view=admin&err="+enc("Ajuste manual de saldo está desativado. Use PIX/Asaas para créditos reais."),request);
    }
    if(!["client","both"].includes(String(target.role))) return redirect("/?view=admin&err="+enc("Saldo de contratante só pode ser adicionado a perfis contratante ou os dois."),request);
    const f=await request.formData();
    const amount=roundMoney(Number(String(f.get("amount")||"0").replace(",",".")));
    if(!Number.isFinite(amount)||amount<MIN_REWARD||amount>100000) return redirect("/?view=admin&err="+enc("Informe um crédito entre R$ 2,50 e R$ 100.000."),request);
    await ensureClientWallet(db,targetId);
    const ref=`admin_credit:${targetId}:${Date.now()}:${randomHex(4)}`;
    await db.batch([
      db.prepare("UPDATE nexus_client_wallet SET available=available+?,updated_at=CURRENT_TIMESTAMP WHERE user_id=?").bind(amount,targetId),
      db.prepare(`
        INSERT INTO nexus_client_ledger(user_id,delta_available,delta_reserved,type,source_ref,description)
        VALUES(?,?,0,'admin_credit',?,?)
      `).bind(targetId,amount,ref,"Ajuste manual de saldo pelo administrador")
    ]);
    await auditSecurity(db,request,user.id,"admin_credit",`${targetId}:${amount}`);
    return redirect("/?view=admin&msg="+enc(`${brl(amount)} adicionados ao saldo interno de ${target.name}.`),request);
  }

  return redirect("/?view=admin&err="+enc("Ação inválida."),request);
}

async function handleAdminMissionClose(request, db, user, missionId) {
  if(!user.is_admin) return redirect("/?err="+enc("Acesso administrativo necessário."),request);
  const m=await db.prepare("SELECT client_id FROM nexus_missions WHERE id=? LIMIT 1").bind(missionId).first();
  if(!m) return redirect("/?view=admin&err="+enc("Missão não encontrada."),request);
  await closeMissionFunds(db,missionId,Number(m.client_id),"Missão encerrada pelo administrador");
  await auditSecurity(db,request,user.id,"admin_close_mission",String(missionId));
  return redirect("/?view=admin&msg="+enc("Missão encerrada pelo administrador."),request);
}

async function renderDashboard(request, env, user, url) {
  const db=env.DB;
  if(!user||!user.id) return redirect("/login?err="+enc("Sua sessão não foi carregada. Entre novamente."),request);

  let view=["home","mine","create","client","profile","admin"].includes(url.searchParams.get("view"))?url.searchParams.get("view"):"home";
  if(user.role==="worker"&&["create","client"].includes(view)) return redirect("/?view=home&err="+enc("Essa área é exclusiva para contratantes."),request);
  if(user.role==="client"&&view==="mine") return redirect("/?view=home&err="+enc("Essa área é exclusiva para trabalhadores."),request);
  if(view==="admin"&&!user.is_admin) return redirect("/?view=profile&err="+enc("Acesso administrativo necessário."),request);

  const msg=url.searchParams.get("msg")||"";
  const err=url.searchParams.get("err")||"";
  const reputation=await getReputation(db,user);
  const financeConfig={
    asaasReady:asaasConfigured(env),
    webhookReady:asaasWebhookConfigured(env),
    asaasEnv:String(env.ASAAS_ENV||"sandbox").toLowerCase(),
    allowAdminCredit:String(env.ALLOW_ADMIN_CREDIT||"").toLowerCase()==="true",
    adminEmailConfigured:!!String(env.ADMIN_EMAIL||"").trim()
  };

  let content="";
  if(view==="home") {
    if(user.role==="client") {
      const [data,wallet]=await Promise.all([getClientData(db,user.id),getClientWallet(db,user.id)]);
      content=renderClientHome(user,data.missions,data.subs,wallet,financeConfig);
    } else {
      const [feed,wallet]=await Promise.all([getFeedData(db,user,url),getWorkerWallet(db,user.id)]);
      content=renderHome(user,feed,wallet);
    }
  } else if(view==="mine") {
    const [mine,wallet]=await Promise.all([getMySubmissions(db,user.id,url),getWorkerWallet(db,user.id)]);
    content=renderMine(user,mine,wallet);
  } else if(view==="create") {
    content=renderCreate(user,await getClientWallet(db,user.id),financeConfig);
  } else if(view==="client") {
    const [data,wallet]=await Promise.all([getClientData(db,user.id),getClientWallet(db,user.id)]);
    content=renderClient(user,data.missions,data.subs,wallet);
  } else if(view==="profile") {
    const pixId=Math.max(0,Number(url.searchParams.get("pix")||0));
    const [workerWallet,clientWallet,withdrawals,deposits,pixDeposit]=await Promise.all([
      canWorker(user)?getWorkerWallet(db,user.id):Promise.resolve(null),
      canClient(user)?getClientWallet(db,user.id):Promise.resolve(null),
      canWorker(user)?getUserWithdrawals(db,user.id):Promise.resolve([]),
      canClient(user)?getUserPixDeposits(db,user.id):Promise.resolve([]),
      canClient(user)&&pixId?getPixDepositById(db,user.id,pixId):Promise.resolve(null)
    ]);
    content=renderProfile(user,workerWallet,clientWallet,reputation,withdrawals,deposits,pixDeposit,financeConfig);
  } else if(view==="admin") {
    content=renderAdmin(user,await getAdminData(db),financeConfig);
  }

  const body=`
    <div class="app">
      <header><div class="toprow">
        <a class="brand brand-with-logo" href="/"><img class="brand-logo-img" src="${BRAND_LOGO_DATA}" alt=""><span>BERN <b>NEXUS</b></span></a>
        <div class="head-user">
          <span class="head-name">${esc(user.name||"Usuário")}</span>
          ${user.is_admin?`<span class="pill adminpill">ADMIN</span>`:""}
          <span class="pill">${roleLabel(user.role)}</span>
        </div>
      </div></header>
      <main>
        ${msg?`<div class="flash ok">${esc(msg)}</div>`:""}
        ${err?`<div class="flash err">${esc(err)}</div>`:""}
        ${content}
      </main>
      ${renderNav(view,user)}
    </div>`;
  return page("BERN NEXUS",body);
}

function renderHome(user, feed, wallet) {
  const o=feed.opts;
  const progress=Math.min(100,Math.max(0,wallet.today/DAILY_GOAL*100));
  const remaining=Math.max(0,DAILY_GOAL-wallet.today);
  return `
    <section class="home-hero-shell">
      <div class="home-hero-copy">
        <span class="hero-kicker">Painel do trabalhador</span>
        <h1>Ganhe fazendo<br>pequenas missões.</h1>
        <p class="muted">Encontre tarefas rapidamente, filtre melhor e foque nas missões que mais valem a pena para você.</p>

        <div class="hero-mini-stats">
          <div class="hero-mini-card">
            <small>Disponível</small>
            <b>${brl(wallet.available)}</b>
          </div>
          <div class="hero-mini-card">
            <small>Em análise</small>
            <b>${brl(wallet.pending)}</b>
          </div>
          <div class="hero-mini-card">
            <small>Missões encontradas</small>
            <b>${feed.total}</b>
          </div>
        </div>
      </div>

      <section class="goal goal-highlight">
        <div class="goal-topline">
          <span class="goal-badge">${progress >= 100 ? "Meta batida" : "Meta do dia"}</span>
          <span class="goal-percent">${Math.round(progress)}%</span>
        </div>
        <div class="goalrow">
          <div>
            <small>Ganhos aprovados hoje</small>
            <div class="money">${brl(wallet.today)}</div>
          </div>
          <div class="goalright">
            <small>Meta visual</small>
            <b>R$ 50/dia</b>
          </div>
        </div>
        <div class="bar"><i style="width:${progress}%"></i></div>
        <div class="goalfoot">
          <div class="goaltext">${wallet.today>=DAILY_GOAL?"Meta atingida hoje.":`${brl(remaining)} para chegar à meta visual.`}</div>
          <div class="goalhint">${feed.total ? `${feed.total} missão(ões) disponível(is)` : "Aguardando novas missões"}</div>
        </div>
      </section>
    </section>

    <div class="notice notice-home">A meta de R$ 50/dia não é garantia de renda. Ela depende de missões disponíveis e aprovação.</div>

    <form class="filter-panel filter-panel-hero" method="get">
      <input type="hidden" name="view" value="home">
      <input type="hidden" name="mode" value="${esc(o.mode)}">

      <div class="filter-panel-head">
        <div>
          <b>Encontre as melhores tarefas</b>
          <p class="muted">Use a busca, escolha o formato e refine os resultados.</p>
        </div>
        <div class="view-switch">
          <a class="${o.mode==="cards"?"active":""}" href="${queryUrl(o,{mode:"cards",page:1})}">▦ Cards</a>
          <a class="${o.mode==="list"?"active":""}" href="${queryUrl(o,{mode:"list",page:1})}">☷ Lista</a>
        </div>
      </div>

      <div class="filter-search filter-search-wide">
        <label>Buscar missão</label>
        <input class="field search-field" name="q" value="${esc(o.q)}" placeholder="Ex.: landing page, pesquisa, Instagram">
      </div>

      <div class="filter-grid filter-grid-4">
        <div><label>Categoria</label><select class="field" name="category">
          ${option("", "Todas", o.category)}
          ${option("Pesquisa","Pesquisa",o.category)}
          ${option("Teste","Teste",o.category)}
          ${option("Opinião","Opinião",o.category)}
          ${option("Levantamento","Levantamento",o.category)}
        </select></div>
        <div><label>Ordenar</label><select class="field" name="sort">
          ${option("recent","Mais recentes",o.sort)}
          ${option("highest","Maior recompensa",o.sort)}
          ${option("deadline","Menor prazo",o.sort)}
          ${option("vacancies","Mais vagas",o.sort)}
        </select></div>
        <div><label>Participação</label><select class="field" name="newonly">
          <option value="">Todas disponíveis</option>
          <option value="1" ${o.newonly?"selected":""}>Ainda não iniciei</option>
        </select></div>
        <div class="filter-summary-box">
          <small>Resultados</small>
          <b>${feed.total}</b>
          <span>${o.mode === "list" ? "visualização compacta" : "visualização em cards"}</span>
        </div>
      </div>

      <div class="filter-actions">
        <button class="btn primary">Aplicar filtros</button>
        <a class="btn secondary linkbtn nomargin" href="/?view=home">Limpar</a>
      </div>
    </form>

    <div class="toolbar toolbar-home">
      <div><b>${feed.total}</b> missões encontradas</div>
      <div class="toolbar-note">${o.q ? `Busca: "${esc(o.q)}"` : "Veja abaixo as oportunidades disponíveis"}</div>
    </div>

    ${o.mode==="list"
      ? `<div class="mission-list">${feed.missions.length?feed.missions.map(m=>missionListRow(m,user)).join(""):`<div class="empty">Nenhuma missão disponível com esses filtros.</div>`}</div>`
      : `<div class="grid">${feed.missions.length?feed.missions.map(m=>missionCard(m,user)).join(""):`<div class="empty">Nenhuma missão disponível com esses filtros.</div>`}</div>`
    }

    ${renderPagination(feed)}
  `;
}

function renderClientHome(user, missions, subs, wallet, financeConfig={}) {
  const openCount=missions.filter(m=>m.status==="open").length;
  const waiting=subs.filter(s=>s.status==="submitted").length;
  const approved=subs.filter(s=>s.status==="approved").length;
  return `
    <section class="hero"><h1>Seu painel de missões.</h1><p class="muted">Publique tarefas e acompanhe os trabalhos recebidos.</p></section>

    <div class="metric-grid">
      ${metric("Saldo disponível",brl(wallet.available))}
      ${metric("Saldo reservado",brl(wallet.reserved))}
      ${metric("Missões abertas",openCount)}
      ${metric("Aguardando aprovação",waiting)}
    </div>

    <div class="row action-row">
      <a class="btn primary wide linkbtn nomargin" href="/?view=create">＋ Publicar missão</a>
      <a class="btn secondary wide linkbtn nomargin" href="/?view=profile">${financeConfig.asaasReady?"⚡ Adicionar saldo via PIX":"Carteira"}</a>
    </div>

    ${financeConfig.asaasReady?`<div class="notice finance-note">Saldo real: gere uma cobrança PIX no Perfil. O crédito só entra após confirmação do Asaas.</div>`:""}

    <div class="section-title"><h2>Suas missões recentes</h2><span>${missions.length}</span></div>
    <div class="grid">
      ${missions.length?missions.slice(0,6).map(m=>clientMissionCard(m)).join(""):`<div class="empty">Você ainda não publicou nenhuma missão.</div>`}
    </div>
  `;
}

function missionCard(m, user) {
  const left=Math.max(0,Number(m.slots)-Number(m.occupied||0));
  return `
    <article class="card">
      ${m.image_data?`<img class="cardimg" src="${m.image_data}" alt="">`:""}
      <div class="cardbody">
        <div class="meta"><span class="tag">${esc(m.category).toUpperCase()}</span><span class="reward">${brl(m.reward)}</span></div>
        <h3>${esc(m.title)}</h3>
        <p>${esc(m.description)}</p>
        <div class="instruction"><b>O que fazer:</b><br>${esc(m.instructions)}</div>
        <div class="stats">
          <span>⏱ ${Number(m.estimated_minutes||5)} min</span>
          <span>🎯 ${left} vagas</span>
          <span>📅 ${esc(deadlineLabel(m.deadline))}</span>
        </div>
        <div class="contractor-line">👤 ${esc(m.client_name||"Contratante")} · ${Number(m.client_approved||0)} trabalhos aprovados</div>
        <form method="post" action="/missions/${m.id}/start"><button class="btn primary wide">Fazer missão · você recebe ${brl(m.reward)}</button></form>
      </div>
    </article>`;
}

function renderMine(user, mine, wallet) {
  if(!canWorker(user)) return denied("Seu perfil não está habilitado para executar missões.");
  const f=mine.filter;
  const tab=(value,label)=>`<a class="${f===value?"active":""}" href="/?view=mine&status=${value}">${label}</a>`;
  return `
    <section class="hero"><h1>Minhas missões</h1><p class="muted">Acompanhe cada etapa sem misturar tarefas em andamento e concluídas.</p></section>

    <div class="metric-grid">
      ${metric("Disponível",brl(wallet.available))}
      ${metric("Em análise",brl(wallet.pending))}
      ${metric("Total ganho",brl(wallet.total))}
    </div>

    <div class="status-tabs">
      ${tab("all","Todas")}${tab("started","Em andamento")}${tab("submitted","Enviadas")}${tab("approved","Aprovadas")}${tab("rejected","Rejeitadas")}
    </div>

    <div class="grid">
      ${mine.submissions.length?mine.submissions.map(s=>`
        <article class="card">
          ${s.image_data?`<img class="cardimg" src="${s.image_data}" alt="">`:""}
          <div class="cardbody">
            <div class="meta"><span class="status ${esc(s.status)}">${statusText(s.status)}</span><span class="reward">${brl(s.reward)}</span></div>
            <h3>${esc(s.title)}</h3>
            <div class="stats"><span>⏱ ${Number(s.estimated_minutes||5)} min</span><span>📅 ${esc(deadlineLabel(s.deadline))}</span></div>
            ${s.status==="started"?`
              <form method="post" action="/submissions/${s.id}/submit" class="image-form">
                <label>Descreva o trabalho realizado</label>
                <textarea class="field" name="answer" required minlength="3" placeholder="Digite sua resposta, resultado ou comprovação..."></textarea>
                <label>Imagem de comprovante (opcional)</label>
                <input class="field image-input" type="file" accept="image/jpeg,image/png,image/webp">
                <input type="hidden" name="proof_image" class="image-data"><img class="preview" alt="">
                <button class="btn primary wide">Enviar para aprovação</button>
              </form>
              <form method="post" action="/submissions/${s.id}/cancel"><button class="btn secondary wide topgap">Cancelar participação</button></form>
            `:`
              ${s.answer?`<div class="answer"><b>Sua resposta:</b><br>${esc(s.answer)}</div>`:""}
              ${s.proof_image?`<img class="proof" src="${s.proof_image}" alt="">`:""}
            `}
          </div>
        </article>`).join(""):`<div class="empty">Nenhuma missão nesta aba.</div>`}
    </div>`;
}

function renderCreate(user, wallet, financeConfig={}) {
  if(!canClient(user)) return denied("Seu perfil foi criado apenas para realizar missões.");
  const defaultDeadline=datePlusDays(7);
  return `
    <section class="hero"><h1>Publicar missão</h1><p class="muted">Defina a recompensa líquida do trabalhador. Você verá o custo final já com a taxa Nexus.</p></section>

    <div class="metric-grid wallet-mini">
      ${metric("Saldo disponível",brl(wallet.available))}
      ${metric("Saldo reservado",brl(wallet.reserved))}
      ${metric("Gasto aprovado",brl(wallet.spent))}
    </div>

    ${wallet.available<MIN_REWARD?`<div class="notice">Seu saldo disponível está baixo. ${financeConfig.asaasReady?`Abra <a href="/?view=profile">Perfil e carteira</a> para adicionar saldo via PIX.`:"A integração PIX ainda não está configurada."}</div>`:""}

    <form class="panel image-form" method="post" action="/missions/create">
      <input type="hidden" name="form_token" value="${randomHex(16)}">
      <label>Título</label><input class="field" name="title" required minlength="5" maxlength="100" placeholder="Ex.: Teste minha página e diga o que ficou confuso">
      <label>Categoria</label><select class="field" name="category"><option>Pesquisa</option><option>Teste</option><option>Opinião</option><option>Levantamento</option></select>
      <label>Descrição curta</label><textarea class="field" name="description" required minlength="10" maxlength="500" placeholder="Explique o objetivo da missão."></textarea>
      <label>Instruções</label><textarea class="field" name="instructions" required minlength="10" maxlength="1500" placeholder="Passo a passo do que a pessoa deve fazer."></textarea>

      <div class="form-grid">
        <div><label>Recompensa por pessoa</label><input class="field reward-input" name="reward" type="number" min="2.50" max="500" step="0.50" value="2.50" required></div>
        <div><label>Vagas</label><input class="field slots-input" name="slots" type="number" min="1" max="500" value="10" required></div>
        <div><label>Tempo estimado (min)</label><input class="field" name="estimated_minutes" type="number" min="1" max="180" value="5" required></div>
        <div><label>Prazo</label><input class="field" name="deadline" type="date" min="${todayDate()}" value="${defaultDeadline}" required></div>
      </div>

      <label>Imagem do card (opcional)</label><input class="field image-input" type="file" accept="image/jpeg,image/png,image/webp">
      <input type="hidden" name="image_data" class="image-data"><img class="preview" alt="">

      <div class="final-cost budget">Custo final da missão: ${brl(finalMissionCost(2.50,10))}</div>
      <div class="notice">O trabalhador vê somente a recompensa líquida. Ao publicar, o custo final é reservado imediatamente para impedir missões sem cobertura.</div>
      <button class="btn primary wide">Publicar e reservar saldo</button>
    </form>`;
}

function renderClient(user, missions, subs, wallet) {
  if(!canClient(user)) return denied("Seu perfil não possui acesso de contratante.");
  return `
    <section class="hero"><h1>Painel do contratante</h1><p class="muted">Gerencie missões, prazos, reservas e aprovações.</p></section>

    <div class="metric-grid">
      ${metric("Saldo disponível",brl(wallet.available))}
      ${metric("Reservado",brl(wallet.reserved))}
      ${metric("Gasto aprovado",brl(wallet.spent))}
      ${metric("Pendentes",subs.filter(s=>s.status==="submitted").length)}
    </div>

    <div class="section-title"><h2>Suas missões</h2><span>${missions.length}</span></div>
    <div class="grid">${missions.length?missions.map(m=>clientMissionCard(m)).join(""):`<div class="empty">Você ainda não publicou nenhuma missão.</div>`}</div>

    <div class="section-title spaced"><h2>Trabalhos recebidos</h2><span>${subs.length}</span></div>
    <div class="grid">
      ${subs.length?subs.map(s=>`
        <article class="card"><div class="cardbody">
          <div class="meta"><span class="status ${esc(s.status)}">${statusText(s.status)}</span><span class="reward">${brl(s.reward)}</span></div>
          <h3>${esc(s.title)}</h3><p><b>${esc(s.worker_name)}</b></p>
          ${s.answer?`<div class="answer">${esc(s.answer)}</div>`:`<p class="muted">Ainda não enviou a resposta.</p>`}
          ${s.proof_image?`<img class="proof" src="${s.proof_image}" alt="">`:""}
          ${s.status==="submitted"?`<div class="row">
            <form method="post" action="/submissions/${s.id}/reject"><button class="btn danger wide">Rejeitar</button></form>
            <form method="post" action="/submissions/${s.id}/approve"><button class="btn primary wide">Aprovar</button></form>
          </div>`:""}
        </div></article>`).join(""):`<div class="empty">Nenhum trabalho recebido ainda.</div>`}
    </div>`;
}

function withdrawalStatusText(status) {
  return ({pending:"Em análise",approved:"Aprovado para pagamento",paid:"Pago",rejected:"Rejeitado"})[status]||status;
}
function depositStatusText(status) {
  return ({creating:"Preparando cobrança",pending:"Aguardando PIX",paid:"Creditado",refunded:"Estornado",review_required:"Revisão necessária",error:"Falha ao gerar",cancelled:"Cancelado",expired:"Expirado"})[status]||status;
}
function maskPixKey(value) {
  const s=String(value||"");
  if(s.length<=6) return s;
  return s.slice(0,3)+"••••"+s.slice(-3);
}

function renderProfile(user, workerWallet, clientWallet, reputation, withdrawals=[], deposits=[], pixDeposit=null, financeConfig={}) {
  const initials=String(user.name||"U").split(/\s+/).slice(0,2).map(x=>x[0]||"").join("").toUpperCase();
  return `
    <section class="hero"><h1>Perfil e carteira</h1><p class="muted">Acompanhe reputação, saldo, PIX e histórico financeiro.</p></section>

    <div class="profile-head panel">
      <div class="userline"><div class="avatar initials">${esc(initials)}</div><div>
        <b>${esc(user.name)}</b><div class="muted small">${esc(user.email)}</div>
        <div class="profile-badges">${user.is_admin?`<span class="tag">ADMIN</span>`:""}<span class="tag">${roleLabel(user.role)}</span></div>
      </div></div>
    </div>

    ${workerWallet?`
      <div class="section-title"><h2>Carteira do trabalhador</h2></div>
      <div class="metric-grid">
        ${metric("Disponível",brl(workerWallet.available))}
        ${metric("Em análise",brl(workerWallet.pending))}
        ${metric("Reservado p/ saque",brl(workerWallet.withdrawal_pending))}
        ${metric("Total ganho",brl(workerWallet.total))}
      </div>

      <div class="finance-grid">
        <form class="panel finance-panel" method="post" action="/wallet/withdraw/request">
          <div class="finance-panel-head"><div><span class="tag">SAQUE PIX</span><h3>Solicitar saque</h3></div></div>
          <p class="muted small">O valor é reservado imediatamente e passa por conferência do administrador antes do pagamento.</p>
          <label>Valor do saque</label>
          <input class="field" name="amount" type="number" min="${MIN_WITHDRAWAL}" step="0.01" placeholder="${brl(MIN_WITHDRAWAL)}" required>
          <div class="form-grid">
            <div><label>Tipo de chave</label><select class="field" name="pix_key_type" required>
              <option value="CPF">CPF</option><option value="CNPJ">CNPJ</option><option value="EMAIL">E-mail</option><option value="PHONE">Telefone</option><option value="EVP">Chave aleatória</option>
            </select></div>
            <div><label>Chave PIX</label><input class="field" name="pix_key" maxlength="180" required></div>
          </div>
          <button class="btn primary wide">Solicitar saque</button>
        </form>

        <div class="panel finance-panel">
          <div class="finance-panel-head"><div><span class="tag">HISTÓRICO</span><h3>Saques</h3></div></div>
          ${withdrawals.length?withdrawals.map(w=>`
            <div class="finance-row">
              <div><b>${brl(w.amount)}</b><small>${esc(w.pix_key_type)} · ${esc(maskPixKey(w.pix_key))}<br>${formatDateTime(w.created_at)}</small></div>
              <span class="finance-status ${esc(w.status)}">${esc(withdrawalStatusText(w.status))}</span>
            </div>`).join(""):`<div class="muted small">Nenhum saque solicitado.</div>`}
        </div>
      </div>
      ${renderWorkerHistory(workerWallet.entries)}
    `:""}

    ${clientWallet?`
      <div class="section-title spaced"><h2>Carteira do contratante</h2></div>
      <div class="metric-grid">
        ${metric("Disponível",brl(clientWallet.available))}
        ${metric("Reservado",brl(clientWallet.reserved))}
        ${metric("Gasto aprovado",brl(clientWallet.spent))}
        ${metric("Reputação",`${reputation.client?.rate||100}%`)}
      </div>

      <div class="finance-grid">
        <form class="panel finance-panel" method="post" action="/wallet/pix/create">
          <div class="finance-panel-head"><div><span class="tag">PIX</span><h3>Adicionar saldo</h3></div></div>
          ${financeConfig.asaasReady?`
            <p class="muted small">Gere um QR Code dinâmico. O Nexus só credita o saldo após o Asaas confirmar o pagamento.</p>
            <label>Valor</label><input class="field" name="amount" type="number" min="10" max="50000" step="0.01" value="50.00" required>
            <label>CPF ou CNPJ do pagador</label><input class="field" name="cpf_cnpj" inputmode="numeric" maxlength="18" placeholder="Somente números ou formatado" required>
            <button class="btn primary wide">Gerar cobrança PIX</button>
            <div class="small muted topgap">Ambiente: ${financeConfig.asaasEnv==="production"?"Produção":"Sandbox/Teste"}</div>
          `:`<div class="notice">Integração Asaas ainda não configurada. O administrador precisa cadastrar os Secrets antes de gerar cobranças reais.</div>`}
        </form>

        <div class="panel finance-panel">
          <div class="finance-panel-head"><div><span class="tag">DEPÓSITOS</span><h3>Histórico PIX</h3></div></div>
          ${deposits.length?deposits.map(d=>`
            <div class="finance-row">
              <div><b>${brl(d.amount)}</b><small>${formatDateTime(d.created_at)}</small></div>
              <span class="finance-status ${esc(d.status)}">${esc(depositStatusText(d.status))}</span>
            </div>`).join(""):`<div class="muted small">Nenhuma cobrança PIX criada.</div>`}
        </div>
      </div>

      ${pixDeposit?`
        <div class="panel pix-charge-panel">
          <div class="finance-panel-head"><div><span class="tag">COBRANÇA PIX</span><h3>${brl(pixDeposit.amount)}</h3></div><span class="finance-status ${esc(pixDeposit.status)}">${esc(depositStatusText(pixDeposit.status))}</span></div>
          ${pixDeposit.status==="pending"?`
            <div class="pix-grid">
              <div class="pix-qr">${pixDeposit.qr_image?`<img src="${pixDeposit.qr_image}" alt="QR Code PIX">`:"<div class='empty'>QR Code ainda não disponível. Gere novamente a mesma cobrança para tentar recuperar o QR.</div>"}</div>
              <div>
                <p class="muted">Pague pelo aplicativo do seu banco. O saldo não é liberado apenas porque a tela foi aberta: o servidor espera a confirmação do Asaas.</p>
                <label>PIX copia e cola</label>
                <textarea class="field pix-payload" readonly>${esc(pixDeposit.pix_payload||"")}</textarea>
                <button type="button" class="btn secondary copy-pix" data-copy="${esc(pixDeposit.pix_payload||"")}">Copiar código PIX</button>
                ${pixDeposit.expiration_date?`<div class="small muted topgap">Expiração informada pelo Asaas: ${esc(pixDeposit.expiration_date)}</div>`:""}
              </div>
            </div>
          `:pixDeposit.status==="creating"?`<div class="notice">A cobrança está sendo preparada. Atualize a página em alguns segundos ou gere novamente o mesmo valor para recuperar o QR sem duplicar a cobrança.</div>`
            :pixDeposit.status==="paid"?`<div class="flash ok">Pagamento confirmado e saldo creditado.</div>`
            :pixDeposit.status==="refunded"?`<div class="flash err">Esse PIX foi estornado no Asaas e o crédito correspondente foi revertido da carteira.</div>`
            :pixDeposit.status==="review_required"?`<div class="notice">Essa cobrança exige revisão administrativa por estorno parcial ou contestação.</div>`
            :`<div class="flash err">A cobrança não pôde ser concluída. Gere uma nova cobrança PIX.</div>`}
        </div>
      `:""}

      ${renderClientHistory(clientWallet.entries)}
    `:""}

    <div class="section-title spaced"><h2>Reputação</h2></div>
    <div class="panel reputation">
      ${reputation.worker?`<p><b>Trabalhador:</b> ${reputation.worker.approved} aprovadas · ${reputation.worker.rejected} rejeitadas · ${reputation.worker.rate}% de aprovação</p>`:""}
      ${reputation.client?`<p><b>Contratante:</b> ${reputation.client.missions} missões · ${reputation.client.approved} trabalhos aprovados · ${reputation.client.rate}% de aprovação</p>`:""}
    </div>

    ${user.is_admin?`<a class="btn secondary linkbtn admin-link" href="/?view=admin">Abrir painel Admin</a>`:""}
    ${!financeConfig.adminEmailConfigured?`<div class="notice security-notice">Administrador não configurado por variável privada. Defina <b>ADMIN_EMAIL</b> no Worker antes de abrir a plataforma ao público.</div>`:""}

    <form method="post" action="/logout" class="logoutform"><button class="btn secondary">Sair</button></form>`;
}

function renderNav(view, user) {
  const items=[];
  if(user.role==="worker") {
    items.push(["home","⌂","Missões"],["mine","✓","Minhas"],["profile","●","Perfil"]);
  } else if(user.role==="client") {
    items.push(["home","⌂","Início"],["create","＋","Publicar"],["client","▣","Trabalhos"],["profile","●","Perfil"]);
  } else {
    items.push(["home","⌂","Missões"],["mine","✓","Minhas"],["create","＋","Publicar"],["client","▣","Contratante"],["profile","●","Perfil"]);
  }
  if(user.is_admin) items.push(["admin","⚙","Admin"]);
  return `<nav class="nav" style="--nav-count:${items.length}">${items.map(([id,icon,label])=>`<a class="${view===id?"active":""}" href="/?view=${id}"><strong>${icon}</strong>${label}</a>`).join("")}</nav>`;
}

function option(value,label,current) {
  return `<option value="${esc(value)}" ${String(value)===String(current)?"selected":""}>${esc(label)}</option>`;
}

function metric(label,value) {
  return `<div class="metric-card"><small>${esc(label)}</small><b>${esc(String(value))}</b></div>`;
}

function missionListRow(m,user) {
  const left=Math.max(0,Number(m.slots)-Number(m.occupied||0));
  return `<article class="mission-row">
    <div class="mission-row-main">
      <div class="row-title"><span class="tag">${esc(m.category).toUpperCase()}</span><b>${esc(m.title)}</b></div>
      <div class="row-meta"><span>⏱ ${Number(m.estimated_minutes||5)} min</span><span>🎯 ${left} vagas</span><span>📅 ${esc(deadlineLabel(m.deadline))}</span><span>👤 ${esc(m.client_name||"Contratante")}</span></div>
    </div>
    <div class="mission-row-pay"><span>Você recebe</span><b>${brl(m.reward)}</b>
      <form method="post" action="/missions/${m.id}/start"><button class="btn primary">Fazer</button></form>
    </div>
  </article>`;
}

function renderPagination(feed) {
  if(feed.pages<=1) return "";
  const o=feed.opts;
  return `<div class="pagination">
    ${o.page>1?`<a class="btn secondary linkbtn nomargin" href="${queryUrl(o,{page:o.page-1})}">← Anterior</a>`:`<span></span>`}
    <span>Página ${o.page} de ${feed.pages}</span>
    ${o.page<feed.pages?`<a class="btn secondary linkbtn nomargin" href="${queryUrl(o,{page:o.page+1})}">Próxima →</a>`:`<span></span>`}
  </div>`;
}

function clientMissionCard(m) {
  return `<article class="card">
    ${m.image_data?`<img class="cardimg" src="${m.image_data}" alt="">`:""}
    <div class="cardbody">
      <div class="meta"><span class="tag">${esc(m.category).toUpperCase()}</span><span class="reward">${brl(m.reward)}</span></div>
      <h3>${esc(m.title)}</h3>
      <div class="stats">
        <span>${Number(m.submissions_count||0)} ${Number(m.submissions_count||0)===1?"participação":"participações"}</span>
        <span>${Number(m.pending_count||0)} em análise</span>
        <span>${Number(m.approved_count||0)} aprovadas</span>
        <span>📅 ${esc(deadlineLabel(m.deadline))}</span>
      </div>
      <div class="cost-line"><span>Custo final</span><b>${brl(m.final_cost)}</b></div>
      <div class="cost-line"><span>Ainda reservado</span><b>${brl(m.reserved_remaining)}</b></div>
      <form method="post" action="/missions/${m.id}/${m.status==="open"?"close":"open"}">
        <button class="btn secondary wide">${m.status==="open"?"Fechar missão":"Reabrir missão"}</button>
      </form>
    </div></article>`;
}

function renderWorkerHistory(entries) {
  return `<div class="history panel"><h3>Histórico</h3>${entries.length?entries.map(e=>`<div class="history-row"><div><b>${esc(e.description||e.type)}</b><small>${formatDateTime(e.created_at)}</small></div><strong class="${Number(e.amount)>=0?"positive":"negative"}">${brl(e.amount)}</strong></div>`).join(""):`<div class="muted">Nenhuma movimentação ainda.</div>`}</div>`;
}

function renderClientHistory(entries) {
  return `<div class="history panel"><h3>Histórico</h3>${entries.length?entries.map(e=>`<div class="history-row"><div><b>${esc(e.description||e.type)}</b><small>${formatDateTime(e.created_at)}</small></div><div class="ledger-values"><span>Disponível ${signedBrl(e.delta_available)}</span><span>Reservado ${signedBrl(e.delta_reserved)}</span></div></div>`).join(""):`<div class="muted">Nenhuma movimentação ainda.</div>`}</div>`;
}

function renderAdmin(user,data,financeConfig={}) {
  return `
    <section class="hero"><h1>Admin Bern Nexus</h1><p class="muted">Controle usuários, missões, PIX, saques e integridade financeira.</p></section>

    <div class="metric-grid admin-metrics">
      ${metric("Usuários",Number(data.stats.users||0))}
      ${metric("Missões abertas",Number(data.stats.open_missions||0))}
      ${metric("Revisões pendentes",Number(data.stats.pending_reviews||0))}
      ${metric("Saques pendentes",Number(data.stats.pending_withdrawals||0))}
      ${metric("PIX pendentes",Number(data.stats.pending_pix||0))}
      ${metric("PIX recebidos",brl(data.stats.pix_received||0))}
      ${metric("Saldo reservado",brl(data.stats.total_reserved||0))}
      ${metric("Resultado plataforma",brl(data.platform))}
    </div>

    <div class="panel admin-config-panel">
      <div>
        <b>Integração financeira</b>
        <div class="small muted">
          Asaas: ${financeConfig.asaasReady?"configurado":"não configurado"} ·
          Webhook: ${financeConfig.webhookReady?"token configurado":"sem token"} ·
          Ambiente: ${financeConfig.asaasEnv==="production"?"Produção":"Sandbox/Teste"}
        </div>
      </div>
      ${financeConfig.asaasReady?`<form method="post" action="/admin/asaas/reconcile"><button class="btn secondary">Conciliar PIX pendentes</button></form>`:""}
    </div>

    <div class="section-title spaced"><h2>Saques solicitados</h2><span>${data.withdrawals.length}</span></div>
    <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Trabalhador</th><th>Valor</th><th>Chave PIX</th><th>Status</th><th>Ações</th></tr></thead><tbody>
      ${data.withdrawals.length?data.withdrawals.map(w=>`<tr>
        <td><b>${esc(w.worker_name)}</b><small>${esc(w.worker_email)}</small></td>
        <td>${brl(w.amount)}</td>
        <td>${esc(w.pix_key_type)}<small>${esc(w.pix_key)}</small></td>
        <td>${esc(withdrawalStatusText(w.status))}<small>${formatDateTime(w.created_at)}</small></td>
        <td>
          ${w.status==="pending"?`
            <form class="inline-form" method="post" action="/admin/withdrawals/${w.id}/approve"><button class="mini-btn">Aprovar</button></form>
            <form class="inline-form" method="post" action="/admin/withdrawals/${w.id}/reject"><button class="mini-btn danger-mini">Rejeitar</button></form>
          `:""}
          ${w.status==="approved"?`
            <form class="inline-form" method="post" action="/admin/withdrawals/${w.id}/paid"><button class="mini-btn">Marcar pago</button></form>
            <form class="inline-form" method="post" action="/admin/withdrawals/${w.id}/reject"><button class="mini-btn danger-mini">Cancelar/estornar</button></form>
          `:""}
        </td>
      </tr>`).join(""):`<tr><td colspan="5">Nenhum saque solicitado.</td></tr>`}
    </tbody></table></div>

    <div class="section-title spaced"><h2>Depósitos PIX</h2><span>${data.deposits.length}</span></div>
    <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Contratante</th><th>Valor</th><th>Status</th><th>Asaas</th><th>Data</th></tr></thead><tbody>
      ${data.deposits.length?data.deposits.map(d=>`<tr>
        <td>${esc(d.client_name)}</td><td>${brl(d.amount)}</td>
        <td>${esc(depositStatusText(d.status))}</td>
        <td><small>${esc(d.asaas_payment_id||"—")}</small></td>
        <td>${formatDateTime(d.credited_at||d.created_at)}</td>
      </tr>`).join(""):`<tr><td colspan="5">Nenhuma cobrança PIX registrada.</td></tr>`}
    </tbody></table></div>

    <div class="section-title spaced"><h2>Usuários</h2><span>${data.users.length}</span></div>
    <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Usuário</th><th>Perfil</th><th>Saldo</th><th>Status</th><th>Ações</th></tr></thead><tbody>
      ${data.users.map(u=>`<tr>
        <td><b>${esc(u.name)}</b><small>${esc(u.email)}</small></td>
        <td>${esc(roleLabel(u.role))}${Number(u.is_admin||0)===1?` · ADMIN`:""}</td>
        <td>${["client","both"].includes(u.role)?`${brl(u.client_available)} disp.<br><small>${brl(u.client_reserved)} reservado</small>`:"—"}</td>
        <td>${Number(u.is_blocked||0)===1?"Bloqueado":"Ativo"}</td>
        <td>
          ${financeConfig.allowAdminCredit&&["client","both"].includes(u.role)?`<form class="inline-form" method="post" action="/admin/users/${u.id}/credit"><input class="mini-input" name="amount" type="number" min="2.50" step="0.50" placeholder="R$"><button class="mini-btn">Ajuste manual</button></form>`:""}
          ${Number(u.is_admin||0)!==1?`<form class="inline-form" method="post" action="/admin/users/${u.id}/${Number(u.is_blocked||0)===1?"unblock":"block"}"><button class="mini-btn ${Number(u.is_blocked||0)===1?"":"danger-mini"}">${Number(u.is_blocked||0)===1?"Desbloquear":"Bloquear"}</button></form>`:""}
        </td>
      </tr>`).join("")}
    </tbody></table></div>

    <div class="section-title spaced"><h2>Missões recentes</h2><span>${data.missions.length}</span></div>
    <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Missão</th><th>Contratante</th><th>Valor</th><th>Prazo</th><th>Status</th><th></th></tr></thead><tbody>
      ${data.missions.map(m=>`<tr><td><b>#${m.id} ${esc(m.title)}</b></td><td>${esc(m.client_name||"—")}</td><td>${brl(m.final_cost)}</td><td>${esc(deadlineLabel(m.deadline))}</td><td>${esc(m.status)}</td><td>${m.status==="open"?`<form method="post" action="/admin/missions/${m.id}/close"><button class="mini-btn danger-mini">Encerrar</button></form>`:""}</td></tr>`).join("")}
    </tbody></table></div>`;
}

function formatDateTime(v) {
  if(!v) return "";
  return String(v).replace("T"," ").slice(0,16);
}
function signedBrl(v) {
  const n=Number(v||0);
  return `${n>=0?"+":""}${brl(n)}`;
}

function renderLanding() {
  const lion = `<img class="lion-logo-img" src="${BRAND_LOGO_DATA}" alt="Leão Bern Nexus">`;

  return page("BERN NEXUS — Missões para renda extra e tarefas para negócios", `
    <div class="lp-cinema">
      <header class="cinema-header">
        <a class="cinema-brand" href="/">
          ${lion}
          <span>BERN <b>NEXUS</b></span>
        </a>

        <nav class="cinema-nav">
          <a href="#renda">Renda extra</a>
          <a href="#negocio">Para negócios</a>
          <a href="#como">Como funciona</a>
          <a href="/login">Entrar</a>
          <a class="cinema-nav-cta" href="/register?role=worker">Começar agora</a>
        </nav>
      </header>

      <main class="cinema-main">
        <section id="renda" class="cinema-screen cinema-screen-dark cinema-hero">
          <div class="cinema-watermark">
            <img src="${BRAND_LOGO_DATA}" alt="">
          </div>

          <div class="cinema-hero-copy reveal">
            <span class="cinema-eyebrow">MISSÕES REAIS · RECOMPENSA CLARA</span>
            <h1>Seu tempo pode virar <em>renda extra.</em></h1>
            <p>
              Entre no Bern Nexus, escolha uma missão disponível e veja exatamente
              quanto você pode receber antes de começar.
            </p>

            <div class="cinema-actions">
              <a class="cinema-btn cinema-btn-gold" href="/register?role=worker">
                <strong>Começar missões agora</strong>
                <span>Criar perfil de trabalhador</span>
              </a>
              <a class="cinema-btn cinema-btn-ghost" href="#como">
                <strong>Ver como funciona</strong>
                <span>Entenda em poucos segundos</span>
              </a>
            </div>

            <div class="cinema-trust">
              <span>✓ Recompensas a partir de R$ 2,50</span>
              <span>✓ Você escolhe o que quer fazer</span>
              <span>✓ Sem promessa de renda garantida</span>
            </div>
          </div>

          <div class="float-stack reveal">
            <article class="float-card float-card-main">
              <div class="float-card-head">
                <span class="float-tag">TESTE</span>
                <strong>R$ 5,00</strong>
              </div>
              <h3>Teste uma landing page</h3>
              <p>Veja a página, responda três perguntas e envie sua percepção.</p>
              <div class="float-meta">
                <span>⏱ 8 min</span>
                <span>🎯 12 vagas</span>
                <span>📅 2 dias</span>
              </div>
              <div class="float-action">Fazer missão</div>
            </article>

            <article class="float-card float-card-mini float-card-top">
              <small>Ganhos aprovados hoje</small>
              <b>R$ 18,50</b>
              <div class="float-progress"><i style="width:37%"></i></div>
            </article>

            <article class="float-card float-card-mini float-card-bottom">
              <small>Missões disponíveis</small>
              <b>7 agora</b>
              <span>Escolha a que faz sentido para você</span>
            </article>
          </div>

          <a class="cinema-scroll" href="#negocio">Role para descobrir ↓</a>
        </section>

        <section id="negocio" class="cinema-screen cinema-screen-light cinema-business">
          <div class="cinema-business-copy reveal">
            <span class="cinema-eyebrow cinema-eyebrow-dark">PARA QUEM TEM UM NEGÓCIO</span>
            <h2>Coloque pessoas reais para resolver pequenas tarefas.</h2>
            <p>
              Pesquisa, teste, opinião ou levantamento: publique o que precisa,
              escolha quantas pessoas quer e acompanhe cada entrega no painel.
            </p>

            <div class="cinema-actions">
              <a class="cinema-btn cinema-btn-black" href="/register?role=client">
                <strong>Publicar uma tarefa</strong>
                <span>Criar perfil de contratante</span>
              </a>
              <a class="cinema-btn cinema-btn-outline" href="#como">
                <strong>Ver o fluxo</strong>
                <span>Do pedido à aprovação</span>
              </a>
            </div>
          </div>

          <div class="business-stage reveal">
            <article class="biz-float biz-float-main">
              <div class="biz-title-row">
                <div>
                  <small>Sua missão</small>
                  <h3>Quero 20 opiniões sobre minha página</h3>
                </div>
                <span>ABERTA</span>
              </div>

              <div class="biz-metrics">
                <div><small>Pessoas</small><b>20</b></div>
                <div><small>Recompensa</small><b>R$ 5</b></div>
                <div><small>Prazo</small><b>3 dias</b></div>
              </div>

              <div class="biz-status">
                <span>13 trabalhos recebidos</span>
                <div class="biz-progress"><i style="width:65%"></i></div>
              </div>
            </article>

            <article class="biz-float biz-float-small biz-float-a">
              <small>Aguardando aprovação</small>
              <b>4 trabalhos</b>
            </article>

            <article class="biz-float biz-float-small biz-float-b">
              <small>Feedback recebido</small>
              <b>“O botão principal ficou fácil de achar.”</b>
            </article>
          </div>
        </section>

        <section id="como" class="cinema-screen cinema-screen-black cinema-how">
          <div class="cinema-section-title reveal">
            <span class="cinema-eyebrow">SEM COMPLICAÇÃO</span>
            <h2>Quatro passos. Um fluxo simples.</h2>
          </div>

          <div class="cinema-steps">
            <article class="cinema-step reveal">
              <span class="step-number">01</span>
              <div class="step-icon">📝</div>
              <h3>Entre</h3>
              <p>Crie sua conta e escolha se quer realizar missões ou publicar tarefas.</p>
            </article>
            <article class="cinema-step reveal">
              <span class="step-number">02</span>
              <div class="step-icon">🎯</div>
              <h3>Escolha</h3>
              <p>Trabalhadores escolhem missões. Contratantes definem objetivo, vagas e prazo.</p>
            </article>
            <article class="cinema-step reveal">
              <span class="step-number">03</span>
              <div class="step-icon">⚡</div>
              <h3>Execute</h3>
              <p>A tarefa é realizada e o resultado é enviado diretamente pelo painel.</p>
            </article>
            <article class="cinema-step reveal">
              <span class="step-number">04</span>
              <div class="step-icon">📊</div>
              <h3>Acompanhe</h3>
              <p>Aprovações, status, reputação e carteira ficam organizados no Nexus.</p>
            </article>
          </div>

          <div class="cinema-mid-cta reveal">
            <div>
              <small>Tem alguns minutos livres?</small>
              <b>Veja se existe uma missão para você.</b>
            </div>
            <a href="/register?role=worker">Começar agora →</a>
          </div>
        </section>

        <section class="cinema-screen cinema-screen-soft cinema-categories">
          <div class="cinema-section-title reveal">
            <span class="cinema-eyebrow cinema-eyebrow-dark">TAREFAS HUMANAS, NÃO BOTS</span>
            <h2>O que pode virar missão?</h2>
          </div>

          <div class="cinema-card-track">
            <article class="category-card reveal">
              <span class="category-number">01</span>
              <div class="category-icon">🔎</div>
              <h3>Pesquisa</h3>
              <p>Levante preços, referências, contatos públicos ou informações específicas.</p>
              <div class="category-chip">Busca orientada</div>
            </article>
            <article class="category-card reveal">
              <span class="category-number">02</span>
              <div class="category-icon">🧪</div>
              <h3>Teste</h3>
              <p>Peça avaliações privadas de páginas, fluxos, anúncios ou experiências.</p>
              <div class="category-chip">Feedback prático</div>
            </article>
            <article class="category-card reveal">
              <span class="category-number">03</span>
              <div class="category-icon">💬</div>
              <h3>Opinião</h3>
              <p>Compare ideias, nomes, criativos ou propostas e receba percepções reais.</p>
              <div class="category-chip">Visão humana</div>
            </article>
            <article class="category-card reveal">
              <span class="category-number">04</span>
              <div class="category-icon">📋</div>
              <h3>Levantamento</h3>
              <p>Organize pequenas listas ou colete dados seguindo instruções claras.</p>
              <div class="category-chip">Execução guiada</div>
            </article>
          </div>
        </section>

        <section class="cinema-screen cinema-final cinema-final-split">
          <div class="homeoffice-stage reveal">
            <div class="homeoffice-glow"></div>
            <article class="homeoffice-main">
              <div class="homeoffice-monitor">
                <div class="monitor-bar">
                  <span></span><span></span><span></span>
                </div>
                <div class="monitor-content">
                  <div class="workspace-visual">
                    <div class="person-emoji">🧑</div>
                    <div class="workspace-mini-laptop">💻</div>
                  </div>
                  <div class="monitor-text">
                    <b>Home office + microtarefas</b>
                    <small>Escolha missões, envie respostas e acompanhe seu saldo sem complicação.</small>
                    <div class="monitor-bullets">
                      <span>✅ tarefas rápidas</span>
                      <span>💰 recompensa visível</span>
                      <span>📱 funciona no celular</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article class="homeoffice-float homeoffice-float-a">
              <small>Vantagem</small>
              <b>Faça no seu ritmo</b>
            </article>

            <article class="homeoffice-float homeoffice-float-b">
              <small>Vantagem</small>
              <b>Veja o valor antes de começar</b>
            </article>

            <article class="homeoffice-float homeoffice-float-c">
              <small>Vantagem</small>
              <b>Painel para trabalhador e contratante</b>
            </article>
          </div>

          <div class="cinema-final-copy reveal">
            <span class="cinema-eyebrow">BERN NEXUS</span>
            <h2>Escolha de que lado você quer começar.</h2>
            <p>
              Faça pequenas missões para buscar renda extra ou publique tarefas
              para colocar pessoas reais ajudando seu negócio.
            </p>

            <div class="final-adv-grid">
              <div class="final-adv-item"><strong>Missões rápidas</strong><span>Pesquisa, teste, opinião e mais.</span></div>
              <div class="final-adv-item"><strong>Fluxo simples</strong><span>Cadastro, execução e acompanhamento em poucos passos.</span></div>
              <div class="final-adv-item"><strong>Dois perfis</strong><span>Trabalhador para renda extra e contratante para negócios.</span></div>
            </div>

            <div class="cinema-actions">
              <a class="cinema-btn cinema-btn-gold" href="/register?role=worker">
                <strong>Quero fazer missões</strong>
                <span>Criar conta de trabalhador</span>
              </a>
              <a class="cinema-btn cinema-btn-ghost" href="/register?role=client">
                <strong>Quero publicar tarefas</strong>
                <span>Criar conta de contratante</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <div class="cinema-mobile-cta">
        <a href="/register?role=worker">Fazer missões</a>
        <a href="/register?role=client">Publicar tarefa</a>
      </div>
    </div>
  `);
}

function renderAuth(mode, url) {
  const msg = url.searchParams.get("msg") || "";
  const err = url.searchParams.get("err") || "";
  const register = mode === "register";
  const requestedRole = ["worker","client","both"].includes(url.searchParams.get("role")) ? url.searchParams.get("role") : "worker";

  return page("BERN NEXUS", `
    <div class="auth-wrap">
      <div class="auth-card">
        <div class="brand big auth-brand"><img class="brand-logo-img" src="${BRAND_LOGO_DATA}" alt=""><span>BERN <b>NEXUS</b></span></div>
        ${msg ? `<div class="flash ok">${esc(msg)}</div>` : ""}
        ${err ? `<div class="flash err">${esc(err)}</div>` : ""}

        <h1>${register ? "Criar conta" : "Entrar"}</h1>
        <p class="muted">${register ? "Escolha como você quer usar a plataforma." : "Acesse sua conta do Bern Nexus."}</p>

        <form method="post" action="${register ? "/register" : "/login"}">
          ${register ? `
            <label>Nome</label>
            <input class="field" name="name" required minlength="2" maxlength="80">
          ` : ""}
          <label>E-mail</label>
          <input class="field" name="email" type="email" required>
          <label>Senha</label>
          <input class="field" name="password" type="password" required minlength="8">
          ${register ? `
            <label>Como quer usar o Nexus?</label>
            <select class="field" name="role">
              <option value="worker" ${requestedRole==="worker"?"selected":""}>Quero ganhar fazendo missões</option>
              <option value="client" ${requestedRole==="client"?"selected":""}>Quero publicar missões</option>
              <option value="both" ${requestedRole==="both"?"selected":""}>Quero fazer os dois</option>
            </select>
          ` : ""}
          <button class="btn primary wide">${register ? "Criar conta" : "Entrar"}</button>
        </form>

        <a class="switch" href="${register ? "/login" : "/register"}">${register ? "Já tenho conta" : "Criar minha conta"}</a>
        <a class="auth-home-link" href="/">← Voltar para a página inicial</a>
      </div>
    </div>
  `);
}

function sessionTokenFromRequest(request) {
  return getCookie(request,"__Host-bn_session") || getCookie(request,"bn_session");
}

async function currentUser(request, db) {
  const token=sessionTokenFromRequest(request);
  if(!token) return null;
  const tokenHash=await sha256Hex("session:"+token);
  const row=await db.prepare(`
    SELECT u.id,u.name,u.email,u.role,u.created_at,u.is_admin,u.is_blocked,s.token session_token
    FROM nexus_sessions s JOIN nexus_users u ON u.id=s.user_id
    WHERE (s.token=? OR s.token=?) AND s.expires_at>CURRENT_TIMESTAMP LIMIT 1
  `).bind(tokenHash,token).first();
  if(!row||!row.id) return null;

  // Migra silenciosamente sessões antigas que guardavam o token bruto.
  if(row.session_token===token) {
    try{await db.prepare("UPDATE OR IGNORE nexus_sessions SET token=? WHERE token=?").bind(tokenHash,token).run()}catch{}
  }

  return {
    id:Number(row.id),
    name:String(row.name||"Usuário"),
    email:String(row.email||""),
    role:["worker","client","both"].includes(String(row.role))?String(row.role):"worker",
    is_admin:Number(row.is_admin||0)===1,
    is_blocked:Number(row.is_blocked||0)===1,
    created_at:row.created_at||""
  };
}

async function createSession(db, userId) {
  const token=randomHex(32);
  const tokenHash=await sha256Hex("session:"+token);
  const expires=new Date(Date.now()+SESSION_DAYS*86400000).toISOString().replace("T"," ").replace("Z","");
  await db.prepare("INSERT INTO nexus_sessions(token,user_id,expires_at) VALUES(?,?,?)").bind(tokenHash,userId,expires).run();
  return token;
}

function sessionCookie(token) {
  return `__Host-bn_session=${token}; Path=/; Max-Age=${SESSION_DAYS*86400}; HttpOnly; Secure; SameSite=Lax`;
}

function expiredCookie() {
  return "__Host-bn_session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax";
}

function redirect(path, request, cookie = "") {
  const url = new URL(path, request.url);
  const headers = { location: url.toString() };
  if (cookie) headers["set-cookie"] = cookie;
  return new Response(null, { status: 303, headers });
}

function canWorker(u) { return u && (u.role === "worker" || u.role === "both"); }
function canClient(u) { return u && (u.role === "client" || u.role === "both"); }

function roleLabel(role) {
  return role === "worker" ? "TRABALHADOR" : role === "client" ? "CONTRATANTE" : "TRABALHADOR + CONTRATANTE";
}
function statusText(s) {
  return ({started:"Em andamento",submitted:"Em análise",approved:"Aprovada",rejected:"Rejeitada",cancelled:"Cancelada"})[s] || s;
}
function denied(text) {
  return `<section class="hero"><h1>Acesso limitado</h1></section><div class="notice">${esc(text)}</div>`;
}
function messageCard(text, error=false) {
  return `<div class="auth-wrap"><div class="auth-card"><div class="flash ${error?"err":"ok"}">${esc(text)}</div></div></div>`;
}
function brl(v) {
  return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(Number(v||0));
}
function enc(s) { return encodeURIComponent(s); }
function clean(v,max) { return String(v ?? "").replace(/\u0000/g,"").trim().slice(0,max); }
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
function getCookie(request,name) {
  const raw = request.headers.get("cookie") || "";
  for (const part of raw.split(";")) {
    const [k,...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return "";
}
function randomHex(bytes) {
  const a = new Uint8Array(bytes);
  crypto.getRandomValues(a);
  return [...a].map(x => x.toString(16).padStart(2,"0")).join("");
}
async function hashPassword(password,saltHex) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw",enc.encode(password),"PBKDF2",false,["deriveBits"]);
  const salt = Uint8Array.from(saltHex.match(/.{1,2}/g).map(x => parseInt(x,16)));
  const bits = await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt,iterations:100000},key,256);
  return [...new Uint8Array(bits)].map(x => x.toString(16).padStart(2,"0")).join("");
}
function safeEqual(a,b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let x = 0;
  for (let i=0;i<a.length;i++) x |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return x === 0;
}

function page(title, body, status=200) {
  const nonce=randomHex(16);
  return new Response(`<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#FFFFFF">
<link rel="icon" type="image/webp" href="${FAVICON_DATA}">
<title>${esc(title)}</title>
<style nonce="${nonce}">

:root{
  --bg:#FFFFFF;
  --panel:#FFFFFF;
  --panel-2:#F7F6F1;
  --line:rgba(187,185,182,.58);
  --line-2:#BBB9B6;
  --text:#0A0A0A;
  --muted:#716E69;
  --accent:#BC913C;
  --accent-light:#E0B55A;
  --accent-dark:#86672A;
  --white:#FFFFFF;
  --offwhite:#F7F6F1;
  --lion-gray:#BBB9B6;
  --black:#0A0A0A;
}
*{box-sizing:border-box}
html{background:var(--bg)}
body{
  margin:0;
  min-width:320px;
  background:
    radial-gradient(circle at 10% 0%,rgba(27,82,103,.18),transparent 34rem),
    var(--bg);
  color:var(--text);
  font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
}
button,input,textarea,select{font:inherit}
button,a,input,textarea,select{-webkit-tap-highlight-color:transparent}
a{color:inherit}

.app{
  width:100%;
  max-width:1180px;
  min-height:100vh;
  margin:0 auto;
  background:linear-gradient(180deg,#0a1726 0%,#07111f 42%);
}
.app>header{
  position:sticky;
  top:0;
  z-index:40;
  min-height:64px;
  padding:14px 18px;
  background:rgba(7,17,31,.94);
  backdrop-filter:blur(14px);
  border-bottom:1px solid #173149;
}
.toprow{
  min-height:36px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:16px;
}
.brand{
  font-weight:950;
  letter-spacing:.5px;
  color:#fff;
  text-decoration:none;
  white-space:nowrap;
}
.brand b{color:var(--accent)}
.brand.big{font-size:24px;margin-bottom:20px}
.head-user{display:flex;align-items:center;gap:10px;min-width:0}
.head-name{
  max-width:180px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  font-size:12px;
  color:#b8c9d8;
}
.pill{
  white-space:nowrap;
  font-size:10px;
  border:1px solid #2a4259;
  border-radius:999px;
  padding:6px 9px;
  color:#9fb5c8;
}
.app>main{
  width:100%;
  min-width:0;
  padding:22px 18px 112px;
}
.hero{
  margin-bottom:16px;
}
.hero h1{
  max-width:760px;
  margin:0 0 8px;
  font-size:clamp(26px,5vw,38px);
  line-height:1.07;
  letter-spacing:-.7px;
}
.hero p{max-width:720px;margin:0}
.muted{color:var(--muted)}
.small,small{font-size:12px;color:var(--muted)}

.goal{
  max-width:820px;
  background:linear-gradient(135deg,#12364b,#0b2537);
  border:1px solid #24506b;
  border-radius:20px;
  padding:18px;
  margin:16px 0;
}
.goalrow{display:flex;justify-content:space-between;gap:16px;align-items:flex-end}
.goalright{text-align:right}
.money{font-size:30px;font-weight:950;margin-top:4px}
.bar{height:9px;background:#07131f;border-radius:99px;overflow:hidden;margin-top:13px}
.bar i{display:block;height:100%;background:var(--accent);border-radius:99px}
.goaltext{font-size:12px;color:#9db1c3;margin-top:8px}

.notice{
  max-width:820px;
  padding:11px 13px;
  border:1px solid #5c4c2f;
  background:#2a2316;
  color:#f0d494;
  border-radius:13px;
  font-size:12px;
  line-height:1.45;
  margin:12px 0;
}
.flash{
  max-width:820px;
  padding:11px 13px;
  border-radius:13px;
  margin-bottom:14px;
  font-size:13px;
}
.flash.ok{background:#123329;border:1px solid #28694f;color:#8ff2c5}
.flash.err{background:#351b25;border:1px solid #6f3043;color:#ffb4c4}

.section-title{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
  margin:22px 0 11px;
}
.section-title.spaced{margin-top:32px}
.section-title h2{margin:0;font-size:19px}
.section-title span{font-size:12px;color:#8fa5b8}

.grid{
  display:grid;
  grid-template-columns:1fr;
  gap:14px;
}
.card{
  min-width:0;
  background:var(--panel);
  border:1px solid var(--line);
  border-radius:19px;
  overflow:hidden;
}
.cardimg{
  width:100%;
  aspect-ratio:16/9;
  max-height:260px;
  object-fit:cover;
  background:#091521;
  display:block;
}
.cardbody{padding:16px}
.meta{
  display:flex;
  justify-content:space-between;
  gap:10px;
  align-items:center;
  margin-bottom:10px;
}
.tag{
  font-size:10px;
  font-weight:900;
  background:#15344a;
  color:#9fdcff;
  padding:5px 8px;
  border-radius:999px;
}
.reward{font-size:18px;font-weight:950;color:#58edac}
.card h3{margin:0 0 7px;font-size:17px;line-height:1.25}
.card p{font-size:13px;line-height:1.48;color:#9cb0c2}
.instruction,.answer{
  font-size:12px;
  line-height:1.48;
  background:#081521;
  border:1px solid #1e354b;
  border-radius:12px;
  padding:11px;
  margin:10px 0;
  color:#bfd0df;
  overflow-wrap:anywhere;
}
.stats{
  font-size:11px;
  color:#819aae;
  display:flex;
  gap:12px;
  flex-wrap:wrap;
  margin:12px 0;
}

.btn{
  min-height:44px;
  border:0;
  border-radius:12px;
  padding:11px 14px;
  font-weight:900;
  cursor:pointer;
}
.primary{background:var(--accent);color:var(--accent-dark)}
.secondary{background:#12263a;color:#e6f1fc;border:1px solid #29435b}
.danger{background:#3b1b25;color:#ffd7e2;border:1px solid #6c3042}
.wide{width:100%}
.linkbtn{display:flex;align-items:center;justify-content:center;text-align:center;text-decoration:none;margin-top:12px}
.row{
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(0,1fr);
  gap:10px;
}
.row form{margin:0;min-width:0}

.panel{
  width:100%;
  max-width:820px;
  background:var(--panel);
  border:1px solid var(--line);
  border-radius:20px;
  padding:18px;
}
label{
  display:block;
  font-size:12px;
  color:#9bb0c3;
  margin:13px 0 6px;
}
.field{
  width:100%;
  min-width:0;
  min-height:44px;
  border:1px solid var(--line-2);
  background:#081521;
  color:var(--text);
  border-radius:12px;
  padding:11px 12px;
  outline:none;
}
.field:focus{border-color:var(--accent);box-shadow:0 0 0 2px rgba(80,227,164,.08)}
textarea.field{min-height:104px;resize:vertical}
.preview,.proof{
  display:none;
  width:100%;
  max-height:280px;
  object-fit:cover;
  border-radius:13px;
  margin:11px 0;
}
.proof{display:block}

.client-summary{
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:11px;
  max-width:820px;
  margin:17px 0;
}
.summary-box{
  min-width:0;
  background:var(--panel);
  border:1px solid var(--line);
  border-radius:15px;
  padding:14px;
}
.summary-box small{display:block;line-height:1.25}
.summary-box b{display:block;font-size:24px;margin-top:5px}
.action-row{max-width:820px;margin:11px 0}
.nomargin{margin-top:0}

.nav{
  position:fixed;
  left:0;
  right:0;
  bottom:0;
  z-index:50;
  display:grid;
  grid-template-columns:repeat(var(--nav-count,5),minmax(0,1fr));
  width:100%;
  max-width:1180px;
  margin:0 auto;
  padding:7px 8px max(8px,env(safe-area-inset-bottom));
  background:rgba(7,17,31,.98);
  border-top:1px solid #193248;
  backdrop-filter:blur(14px);
}
.nav-worker{grid-template-columns:repeat(3,minmax(0,1fr))}
.nav-client{grid-template-columns:repeat(4,minmax(0,1fr))}
.nav a{
  min-width:0;
  min-height:48px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:2px;
  color:#829aae;
  text-decoration:none;
  text-align:center;
  font-size:10px;
  border-radius:11px;
  padding:5px 4px;
}
.nav strong{display:block;font-size:18px;line-height:1}
.nav a.active{color:var(--accent);background:rgba(80,227,164,.07)}


.lp-gold{
  --gold:#b8860b;
  --gold-2:#d6aa2f;
  --gold-3:#f3df9b;
  --ink:#17130a;
  --muted:#6d6658;
  --soft:#fbf8f1;
  --line-gold:#eadfbe;
  min-height:100vh;
  background:#fff;
  color:var(--ink);
}
.lp-gold *{box-sizing:border-box}
.lp-header{
  position:sticky;top:0;z-index:80;
  max-width:1260px;margin:0 auto;
  display:flex;align-items:center;justify-content:space-between;gap:20px;
  padding:16px 26px;
  background:rgba(255,255,255,.92);
  border-bottom:1px solid #eee8d9;
  backdrop-filter:blur(16px);
}
.lp-logo{display:inline-flex;align-items:center;gap:10px;color:#17130a;text-decoration:none;font-weight:950;letter-spacing:.2px}
.lp-logo b{color:var(--gold)}
.lion-logo{width:34px;height:34px;color:var(--gold);flex:0 0 auto}
.lp-nav{display:flex;align-items:center;gap:24px;font-size:12px;font-weight:700}
.lp-nav a{color:#4c473d;text-decoration:none}
.lp-nav a:hover{color:#111}
.lp-nav-cta{padding:10px 15px!important;border-radius:10px;background:#17130a;color:#fff!important}
.lp-hero{background:
  radial-gradient(circle at 50% 10%,rgba(214,170,47,.15),transparent 30rem),
  linear-gradient(180deg,#fff 0%,#fdfaf2 100%);
  border-bottom:1px solid #eee5cc;
}
.lp-hero-inner{max-width:1180px;margin:0 auto;padding:82px 26px 72px;text-align:center}
.lp-hero-badge{display:inline-block;border:1px solid #e7d6a4;background:#fffaf0;color:#80620f;border-radius:999px;padding:8px 12px;font-size:10px;font-weight:950;letter-spacing:1px}
.lp-hero h1{max-width:940px;margin:25px auto 0;font-size:clamp(52px,7.4vw,94px);line-height:.94;letter-spacing:-4.2px;font-weight:950;color:#16130c}
.lp-hero h1 span{color:var(--gold)}
.lp-hero-sub{max-width:720px;margin:24px auto 0;color:#655e50;font-size:18px;line-height:1.65}
.lp-hero-actions,.lp-final-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:30px}
.lp-main-cta,.lp-business-cta{min-width:300px;min-height:70px;display:flex;align-items:center;gap:13px;text-align:left;text-decoration:none;border-radius:14px;padding:12px 16px}
.lp-main-cta{background:linear-gradient(135deg,#d4a92c,#b8860b);color:#fff;box-shadow:0 16px 38px rgba(184,134,11,.22)}
.lp-business-cta{background:#fff;color:#17130a;border:1px solid #d9c991;box-shadow:0 10px 24px rgba(45,35,10,.06)}
.lp-main-cta-icon,.lp-business-cta-icon{width:42px;height:42px;display:grid;place-items:center;border-radius:11px;font-size:22px;font-weight:900;flex:0 0 auto}
.lp-main-cta-icon{background:rgba(255,255,255,.18)}.lp-business-cta-icon{background:#f7efd4;color:#9b7310}
.lp-main-cta strong,.lp-business-cta strong{display:block;font-size:15px}.lp-main-cta small,.lp-business-cta small{display:block;margin-top:3px}.lp-main-cta small{color:#fff4ce}.lp-business-cta small{color:#746d60}
.lp-proofline{display:flex;justify-content:center;gap:18px;flex-wrap:wrap;margin-top:20px;color:#756e61;font-size:11px;font-weight:700}
.lp-demo-wrap{max-width:900px;margin:48px auto 0;text-align:left}.lp-demo-caption{display:flex;align-items:center;gap:8px;color:#817762;font-size:11px;font-weight:800;margin:0 0 8px 5px}.lp-pulse{width:8px;height:8px;border-radius:50%;background:#c69b22;box-shadow:0 0 0 5px rgba(198,155,34,.13)}
.lp-demo-card{display:grid;grid-template-columns:minmax(0,1fr) 190px;gap:20px;align-items:center;background:#fff;border:1px solid #dfd4b3;border-radius:20px;padding:20px 22px;box-shadow:0 20px 50px rgba(77,57,8,.08)}
.lp-demo-tag{display:inline-block;background:#19150d;color:#f6d978;border-radius:999px;padding:5px 8px;font-size:9px;font-weight:950}.lp-demo-card h3{font-size:20px;margin:11px 0 6px}.lp-demo-card p{color:#756e61;font-size:13px;line-height:1.5}.lp-demo-meta{display:flex;gap:13px;flex-wrap:wrap;color:#8b8374;font-size:11px}.lp-demo-pay{text-align:right}.lp-demo-pay small,.lp-demo-pay span{display:block;color:#7d7568;font-size:10px}.lp-demo-pay strong{display:block;color:#a87905;font-size:27px;margin:3px 0}.lp-fake-button{margin-top:11px;background:#17130a;color:#fff;text-align:center;padding:10px;border-radius:10px;font-size:12px;font-weight:900}
.lp-choice,.lp-how,.lp-business-section,.lp-real-use,.lp-faq{max-width:1180px;margin:0 auto;padding:92px 26px}
.lp-choice-intro,.lp-section-head{max-width:800px;margin-bottom:34px}.lp-kicker{display:inline-block;color:#9d750d;font-size:10px;font-weight:950;letter-spacing:1.4px;margin-bottom:13px}.lp-choice-intro h2,.lp-section-head h2,.lp-business-copy h2{margin:0;font-size:clamp(36px,5vw,60px);line-height:1.02;letter-spacing:-2px}.lp-choice-intro p,.lp-section-head p,.lp-business-copy p{color:#716a5e;line-height:1.65;font-size:15px}
.lp-choice-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.lp-choice-card{position:relative;min-height:410px;border:1px solid #e7dec5;border-radius:22px;padding:27px;background:#fff;box-shadow:0 16px 36px rgba(80,59,9,.05);overflow:hidden}.lp-choice-worker{background:linear-gradient(180deg,#fff,#fffaf0)}.lp-choice-business{background:#18150e;color:#fff;border-color:#18150e}.lp-choice-number{position:absolute;right:22px;top:12px;font-size:64px;font-weight:950;color:#eee5cf}.lp-choice-business .lp-choice-number{color:#342e1e}.lp-choice-icon{width:52px;height:52px;border-radius:14px;display:grid;place-items:center;background:#f4e8bf;color:#9c7310;font-size:25px}.lp-choice-business .lp-choice-icon{background:#332b18;color:#f0cd69}.lp-choice-card h3{font-size:31px;margin:58px 0 10px}.lp-choice-card p{max-width:520px;line-height:1.6;color:#716a5e}.lp-choice-business p{color:#c9c1b2}.lp-choice-card ul{list-style:none;padding:0;margin:22px 0}.lp-choice-card li{padding:7px 0;font-size:13px}.lp-choice-card li:before{content:"✓";color:#b8860b;font-weight:950;margin-right:8px}.lp-choice-business li:before{color:#efc75b}.lp-choice-card a{display:inline-block;margin-top:10px;font-weight:900;color:#9c7310;text-decoration:none}.lp-choice-business a{color:#efc75b}
.lp-how{border-top:1px solid #eee8d9}.lp-flow{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1fr;gap:12px;align-items:center}.lp-flow-step{min-height:210px;border:1px solid #e7dec5;background:#fff;border-radius:18px;padding:18px}.lp-flow-step>strong{width:34px;height:34px;display:grid;place-items:center;border-radius:10px;background:#f4e7bd;color:#9b710b}.lp-flow-step h3{margin:34px 0 7px;font-size:19px}.lp-flow-step p{color:#766f62;font-size:13px;line-height:1.55}.lp-flow-arrow{font-size:22px;color:#bfae7f}.lp-inline-cta{margin-top:22px;background:#fffaf0;border:1px solid #e3d5aa;border-radius:17px;padding:16px 18px;display:flex;align-items:center;justify-content:space-between;gap:15px}.lp-inline-cta b,.lp-inline-cta span{display:block}.lp-inline-cta span{color:#766e61;font-size:12px;margin-top:3px}.lp-inline-cta a{background:#17130a;color:#fff;text-decoration:none;border-radius:10px;padding:11px 14px;font-weight:850;font-size:12px}
.lp-business-section{display:grid;grid-template-columns:1fr .82fr;gap:35px;align-items:center;background:#fff}.lp-business-bigcta{display:inline-block;margin-top:12px;background:#b8860b;color:#fff;text-decoration:none;border-radius:11px;padding:13px 16px;font-weight:900}.lp-business-example{background:#18150e;color:#fff;border-radius:24px;padding:27px}.lp-biz-label{display:inline-block;color:#efc75b;border:1px solid #5e4b17;border-radius:999px;padding:5px 8px;font-size:9px;font-weight:950}.lp-business-example h3{font-size:27px;line-height:1.25}.lp-biz-result{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:20px 0}.lp-biz-result>div{border:1px solid #39311f;border-radius:12px;padding:11px}.lp-biz-result small{display:block;color:#aaa18f}.lp-biz-result b{display:block;font-size:18px;margin-top:4px;color:#f5d46e}.lp-business-example p{color:#bdb5a7;font-size:12px;line-height:1.5}
.lp-real-use{border-top:1px solid #eee8d9}.lp-use-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.lp-use-grid>div{border:1px solid #e8dfc8;border-radius:17px;padding:18px;background:#fff}.lp-use-grid span{color:#b8860b;font-size:10px;font-weight:950}.lp-use-grid h3{font-size:19px;margin:25px 0 7px}.lp-use-grid p{color:#746d60;font-size:13px;line-height:1.5}
.lp-faq{border-top:1px solid #eee8d9}.lp-faq details{max-width:900px;border-bottom:1px solid #e7dfca;padding:18px 0}.lp-faq summary{cursor:pointer;font-weight:900;font-size:16px}.lp-faq details p{color:#746d60;line-height:1.6;font-size:13px}
.lp-final{margin:40px auto 0;max-width:1180px;padding:85px 26px;text-align:center;background:#faf5e7;border:1px solid #e4d5aa;border-radius:28px}.lp-lion-big .lion-logo{width:70px;height:70px}.lp-final h2{max-width:900px;margin:0 auto;font-size:clamp(34px,5vw,58px);line-height:1.04;letter-spacing:-2px}.lp-footer{max-width:1180px;margin:0 auto;padding:28px 26px 100px;display:flex;align-items:center;justify-content:space-between;gap:18px;color:#756e61;font-size:12px}.lp-footer p{margin:0}.lp-footer>a:last-child{color:#9b7310;text-decoration:none;font-weight:850}
.lp-mobile-bar{display:none}

.auth-wrap{
  min-height:100vh;
  display:grid;
  place-items:center;
  padding:24px 16px;
  background:radial-gradient(circle at 50% 0%,rgba(224,181,90,.18),transparent 25rem),#FFFFFF;
}
.auth-card{
  width:min(430px,100%);
  background:#FFFFFF;
  color:#0A0A0A;
  border:1px solid #BBB9B6;
  border-radius:22px;
  padding:22px;
  box-shadow:0 24px 60px rgba(10,10,10,.08);
}
.auth-card .muted{color:#756e61}
.auth-card .field{background:#fff;border-color:#d8cfb7;color:#17130a}
.auth-card label{color:#6f685b}
.auth-card .primary{background:#b8860b;color:#fff}
.auth-card .switch{color:#9b7310}
.auth-card .brand{color:#17130a}.auth-card .brand b{color:#b8860b}
.auth-home-link{color:#877d6c}
.auth-card h1{margin-bottom:6px}
.auth-card form .btn{margin-top:16px}
.switch{display:block;color:var(--accent);text-decoration:none;margin-top:14px;font-size:13px}

.userline{display:flex;gap:12px;align-items:center}
.avatar{
  width:52px;height:52px;border-radius:16px;
  background:#17364d;
  display:grid;place-items:center;
  font-size:23px;
}
.panel hr{border:0;border-top:1px solid var(--line);margin:18px 0}
.empty{
  padding:34px 16px;
  text-align:center;
  color:#839bae;
  border:1px dashed #223c53;
  border-radius:16px;
}
.status{font-size:11px;font-weight:900;text-transform:uppercase}
.started{color:#8bcaff}.submitted{color:#ffc978}.approved{color:#55e9aa}.rejected{color:#ff8fa9}


.filter-panel{max-width:1000px;background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:15px;margin:18px 0}
.home-hero-shell{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(320px,.85fr);gap:18px;align-items:stretch;max-width:1000px}
.hero-kicker{display:inline-flex;align-items:center;gap:8px;background:rgba(80,227,164,.08);border:1px solid rgba(80,227,164,.18);color:#88efbc;border-radius:999px;padding:7px 12px;font-size:11px;font-weight:800;letter-spacing:.2px;margin-bottom:12px}
.home-hero-copy{min-width:0;padding-top:4px}
.hero-mini-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:18px;max-width:760px}
.hero-mini-card{min-width:0;background:linear-gradient(180deg,rgba(14,32,49,.95),rgba(10,25,40,.95));border:1px solid #1d3a50;border-radius:16px;padding:14px 14px 13px;box-shadow:0 10px 24px rgba(0,0,0,.12)}
.hero-mini-card small{display:block}
.hero-mini-card b{display:block;font-size:22px;margin-top:5px;color:#f4fbff;overflow-wrap:anywhere}
.goal-highlight{max-width:none;min-width:0;margin:0;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 18px 38px rgba(3,15,25,.18)}
.goal-topline{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:10px}
.goal-badge{display:inline-flex;align-items:center;border:1px solid rgba(80,227,164,.22);background:rgba(80,227,164,.08);color:#8ff1c2;border-radius:999px;padding:6px 10px;font-size:11px;font-weight:800}
.goal-percent{font-size:12px;font-weight:900;color:#c6f7de}
.goalfoot{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-top:8px}
.goalhint{font-size:11px;color:#a7c0d2;text-align:right}
.notice-home{max-width:1000px}
.filter-panel-hero{max-width:1000px;background:linear-gradient(180deg,rgba(13,27,42,.98),rgba(9,22,35,.98));box-shadow:0 10px 28px rgba(0,0,0,.14)}
.filter-panel-head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:12px}
.filter-panel-head b{font-size:18px}
.filter-panel-head p{margin:6px 0 0}
.filter-search-wide{max-width:none}
.search-field{font-size:14px}
.filter-grid-4{grid-template-columns:1.25fr 1fr 1fr minmax(150px,.7fr)}
.filter-summary-box{background:#0b1b2b;border:1px solid #20384e;border-radius:14px;padding:12px 13px;display:flex;flex-direction:column;justify-content:center}
.filter-summary-box small{display:block}
.filter-summary-box b{display:block;font-size:24px;line-height:1.1;margin:4px 0;color:#fff}
.filter-summary-box span{font-size:11px;color:#92a8ba}
.toolbar-home{max-width:1000px}
.toolbar-note{font-size:11px;color:#8ea6b8}

.filter-search{max-width:650px}.filter-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.filter-actions{display:flex;gap:9px;margin-top:12px}.filter-actions .btn{min-width:130px}
.toolbar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:20px 0 11px;color:#9fb2c4;font-size:12px}.view-switch{display:flex;border:1px solid var(--line);border-radius:11px;overflow:hidden}.view-switch a{padding:8px 11px;text-decoration:none}.view-switch a.active{background:#15344a;color:var(--accent)}
.mission-list{display:grid;gap:8px}.mission-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:16px;align-items:center;background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:13px 14px}.mission-row-main{min-width:0}.row-title{display:flex;align-items:center;gap:9px;min-width:0}.row-title b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.row-meta{display:flex;gap:12px;flex-wrap:wrap;color:#819aae;font-size:11px;margin-top:7px}.mission-row-pay{text-align:right;min-width:130px}.mission-row-pay>span{display:block;color:#8fa5b8;font-size:10px}.mission-row-pay>b{display:block;color:var(--accent);font-size:18px;margin:2px 0 6px}.mission-row-pay .btn{min-height:36px;padding:7px 13px}
.pagination{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:10px;margin-top:18px}.pagination>:last-child{justify-self:end}.pagination>span{text-align:center;color:#8fa5b8;font-size:12px}
.metric-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;max-width:1000px;margin:15px 0}.metric-card{min-width:0;background:var(--panel);border:1px solid var(--line);border-radius:15px;padding:13px}.metric-card small{display:block}.metric-card b{display:block;font-size:21px;margin-top:5px;overflow-wrap:anywhere}.wallet-mini{grid-template-columns:repeat(3,minmax(0,1fr));max-width:820px}
.status-tabs{display:flex;gap:7px;overflow:auto;padding:2px 0 14px}.status-tabs a{white-space:nowrap;text-decoration:none;border:1px solid var(--line);border-radius:999px;padding:8px 11px;color:#99adbf;font-size:12px}.status-tabs a.active{background:#15344a;color:var(--accent);border-color:#28516b}
.form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.final-cost{margin:14px 0;background:#123329;border:1px solid #28694f;color:#9af2c9;border-radius:14px;padding:14px;font-size:17px;font-weight:900}
.contractor-line{font-size:11px;color:#849caf;margin:10px 0}.cost-line{display:flex;justify-content:space-between;gap:10px;padding:7px 0;border-top:1px solid #1c3348;font-size:12px}.cost-line b{color:#bcd0e0}.topgap{margin-top:8px}
.profile-head{margin-bottom:14px}.initials{font-weight:950;color:var(--accent)}.profile-badges{display:flex;gap:6px;margin-top:7px}.reputation p{margin:7px 0}.history{margin-top:10px}.history h3{margin-top:0}.history-row{display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-top:1px solid #1c3348}.history-row:first-of-type{border-top:0}.history-row small{display:block;margin-top:3px}.history-row strong.positive{color:var(--accent)}.history-row strong.negative{color:#ff8fa9}.ledger-values{text-align:right;font-size:11px;color:#a7bbcb}.ledger-values span{display:block}.admin-link{max-width:260px}.logoutform{margin-top:16px}
.adminpill{border-color:#66552d;color:#ffd776}

/* === IDENTIDADE BERN NEXUS: BRANCO / DOURADO / PRETO === */
body{background:#F7F6F1;color:#0A0A0A}
.app{background:#FFFFFF;border-color:rgba(187,185,182,.55);box-shadow:0 20px 60px rgba(10,10,10,.06)}
.app>header,header{background:#0A0A0A;border-bottom-color:#282828}
.brand{color:#FFFFFF}.brand b{color:#BC913C}
.brand-with-logo,.auth-brand{display:inline-flex;align-items:center;gap:10px;text-decoration:none}
.brand-logo-img{width:34px;height:34px;object-fit:cover;border-radius:9px;border:1px solid #86672A;background:#0A0A0A}
.auth-brand .brand-logo-img{width:44px;height:44px;border-radius:11px}
.head-name{color:#BBB9B6}
.pill{border-color:#86672A;color:#E0B55A;background:rgba(188,145,60,.08)}
.app>main{background:#FFFFFF}.hero h1{color:#0A0A0A}.muted,.small,small{color:#716E69}
.nav{background:#0A0A0A;border-color:#282828}.nav a{color:#BBB9B6}.nav a:hover{color:#FFFFFF}.nav a.active{color:#0A0A0A;background:#BC913C}.nav a.active strong{color:#0A0A0A}
.goal{background:linear-gradient(145deg,#FFFFFF,#F7F6F1);border-color:#BC913C;box-shadow:0 14px 32px rgba(188,145,60,.10)}
.goal small,.goaltext,.goalhint{color:#716E69}.money{color:#0A0A0A}.bar{background:#E8E6E1}.bar i{background:linear-gradient(90deg,#BC913C,#E0B55A)}
.goal-badge{border-color:#BC913C!important;background:rgba(188,145,60,.10)!important;color:#86672A!important}.goal-percent{color:#86672A!important}
.notice{background:#F7F6F1;color:#5D5545;border-color:#E0B55A}
.flash.ok{background:#FFF9E9;color:#5A430E;border-color:#BC913C}.flash.err{background:#FFF5F5;color:#7B2020;border-color:#D7A3A3}
.card,.panel,.metric-card,.summary-box,.filter-panel,.mission-row,.history{background:#FFFFFF;border-color:rgba(187,185,182,.60);box-shadow:0 10px 28px rgba(10,10,10,.045)}
.card h3,.panel h3,.section-title h2{color:#0A0A0A}.card p,.contractor-line,.stats,.row-meta,.toolbar,.toolbar-note{color:#716E69}.cardimg{background:#F7F6F1}
.tag{background:#0A0A0A;color:#E0B55A}.reward{color:#86672A}
.instruction,.answer{background:#F7F6F1;border-color:#DDDAD4;color:#4D4A45}
.status.started{color:#86672A}.status.submitted{color:#9B7017}.status.approved{color:#6D541C}.status.rejected{color:#9C3D3D}
.btn.primary,.primary{background:#BC913C;color:#0A0A0A}.btn.primary:hover,.primary:hover{background:#E0B55A}.btn.primary:active,.primary:active{background:#86672A;color:#FFFFFF}
.btn.secondary,.secondary{background:#FFFFFF;color:#0A0A0A;border-color:#BBB9B6}.btn.secondary:hover,.secondary:hover{border-color:#BC913C;color:#86672A}
.danger{background:#0A0A0A;color:#FFFFFF;border-color:#0A0A0A}
.field{background:#FFFFFF;color:#0A0A0A;border-color:#BBB9B6}.field::placeholder{color:#9D9A96}.field:focus{border-color:#BC913C;box-shadow:0 0 0 3px rgba(188,145,60,.14)}label{color:#5E5A54}
.metric-card b,.summary-box b{color:#0A0A0A}
.hero-mini-card{background:#FFFFFF!important;border-color:rgba(187,185,182,.60)!important;box-shadow:0 10px 28px rgba(10,10,10,.04)!important}.hero-mini-card b{color:#0A0A0A!important}
.hero-kicker{background:#F7F6F1!important;border-color:#E0B55A!important;color:#86672A!important}
.filter-panel-hero{background:#F7F6F1!important;box-shadow:none!important}.filter-panel-head b{color:#0A0A0A}.filter-summary-box{background:#FFFFFF;border-color:#BBB9B6}.filter-summary-box b{color:#0A0A0A}
.view-switch{border-color:#BBB9B6}.view-switch a{color:#716E69}.view-switch a.active{background:#0A0A0A;color:#E0B55A}
.final-cost{background:#FFF8E6;border-color:#BC913C;color:#5B420D}.cost-line{border-color:#E5E2DC}.cost-line b{color:#0A0A0A}
.avatar{background:#0A0A0A;color:#E0B55A}.initials{color:#E0B55A}
.history-row{border-color:#E5E2DC}.history-row strong.positive{color:#86672A}.history-row strong.negative{color:#9C3D3D}.ledger-values{color:#716E69}
.adminpill{border-color:#BC913C!important;color:#E0B55A!important}.admin-table-wrap{border-color:#BBB9B6}.admin-table{background:#FFFFFF}.admin-table th{background:#0A0A0A;color:#E0B55A}.admin-table td{color:#0A0A0A;border-bottom-color:#E5E2DC}
.mini-input{background:#FFFFFF;color:#0A0A0A;border-color:#BBB9B6}.mini-btn{background:#F7F6F1;color:#0A0A0A;border-color:#BBB9B6}.mini-btn:hover{border-color:#BC913C}.danger-mini{background:#0A0A0A;color:#FFFFFF;border-color:#0A0A0A}
.empty{color:#716E69;border-color:#BBB9B6;background:#F7F6F1}
.status-tabs a{color:#716E69;border-color:#BBB9B6;background:#FFFFFF}.status-tabs a.active{background:#0A0A0A;color:#E0B55A;border-color:#0A0A0A}.pagination>span{color:#716E69}
.admin-table-wrap{overflow:auto;border:1px solid var(--line);border-radius:15px;max-width:100%}.admin-table{width:100%;border-collapse:collapse;min-width:760px;background:var(--panel)}.admin-table th,.admin-table td{text-align:left;padding:11px;border-bottom:1px solid #1d3449;font-size:12px;vertical-align:top}.admin-table th{color:#8fa5b8;background:#091725}.admin-table td small{display:block;margin-top:3px}.inline-form{display:flex;gap:5px;margin:3px 0}.mini-input{width:85px;background:#081521;border:1px solid var(--line-2);color:white;border-radius:8px;padding:6px}.mini-btn{border:1px solid #31506a;background:#132a3e;color:#dceaf6;border-radius:8px;padding:6px 8px;cursor:pointer;white-space:nowrap}.danger-mini{border-color:#703449;background:#3a1d27;color:#ffd4df}


@media(max-width:900px){
  .lp-hero{grid-template-columns:1fr;min-height:auto;padding-top:58px}
  .lp-hero-visual{min-height:460px}
  .lp-audience-grid,.lp-problem-grid{grid-template-columns:1fr}
  .lp-steps{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:680px){
  .lp-header{padding:15px 16px}.lp-nav>a:not(.lp-nav-cta):not(:last-child){display:none}
  .lp-main{padding:0 16px}
  .lp-hero{gap:28px;padding:48px 0 34px}
  .lp-hero h1{font-size:clamp(43px,13vw,62px);letter-spacing:-2px}
  .lp-hero-copy>p{font-size:15px}
  .lp-cta-row{flex-direction:column}.lp-btn{width:100%;min-width:0}
  .lp-trust-row{gap:8px 14px}
  .lp-hero-visual{min-height:390px}.lp-floating-top{right:0}.lp-floating-bottom{left:0}
  .lp-strip{justify-content:flex-start;overflow:auto}
  .lp-section{padding:72px 0}.lp-section-heading h2{font-size:40px}
  .lp-audience-card{min-height:auto}.lp-steps{grid-template-columns:1fr}
  .lp-final-cta{padding:70px 18px;margin-bottom:48px}.lp-final-cta h2{font-size:38px}
  .lp-footer{padding:24px 16px 40px;flex-direction:column;align-items:flex-start}
}




/* === BERN NEXUS CINEMA / TESLA-INSPIRED INTERACTION LAYER === */
html{scroll-behavior:smooth}
.lp-cinema{
  --gold:#BC913C;--gold-light:#E0B55A;--gold-dark:#86672A;
  --black:#0A0A0A;--white:#FFFFFF;--soft:#F7F6F1;--gray:#BBB9B6;
  background:#0A0A0A;color:#FFFFFF;overflow-x:hidden
}
.cinema-header{
  position:fixed;top:0;left:0;right:0;transform:none;
  z-index:120;width:100%;max-width:none;
  display:flex;align-items:center;justify-content:space-between;gap:20px;
  padding-top:14px;padding-bottom:14px;
  padding-left:max(20px,calc((100vw - 1180px)/2));
  padding-right:max(20px,calc((100vw - 1180px)/2));
  background:linear-gradient(180deg,rgba(10,10,10,.92),rgba(10,10,10,.74));
  border-bottom:1px solid rgba(255,255,255,.08);
  backdrop-filter:blur(16px)
}
.cinema-brand{display:flex;align-items:center;gap:10px;color:#fff;text-decoration:none;font-weight:950;letter-spacing:.3px}
.cinema-brand b{color:var(--gold-light)}.cinema-brand .lion-logo-img{width:38px;height:38px;border-radius:11px}
.cinema-nav{display:flex;align-items:center;gap:22px;font-size:12px;font-weight:750}.cinema-nav a{color:#f4f4f4;text-decoration:none;text-shadow:0 1px 10px rgba(0,0,0,.25)}
.cinema-nav-cta{padding:10px 14px;border-radius:10px;background:rgba(255,255,255,.92);color:#0A0A0A!important;text-shadow:none!important}
.cinema-main{scroll-snap-type:y proximity}
.cinema-screen{
  position:relative;min-height:100svh;display:grid;align-items:center;
  overflow:hidden;padding:96px max(24px,calc((100vw - 1180px)/2)) 60px;
  scroll-snap-align:start
}
.cinema-screen-dark,.cinema-screen-black{background:#0A0A0A;color:#fff}
.cinema-screen-light{background:#fff;color:#0A0A0A}
.cinema-screen-soft{background:#F7F6F1;color:#0A0A0A}
.cinema-hero{grid-template-columns:minmax(0,1.02fr) minmax(380px,.98fr);gap:48px}
.cinema-watermark{position:absolute;right:-4vw;bottom:-10vh;width:min(60vw,780px);opacity:.13;filter:saturate(.8) contrast(1.1);pointer-events:none}
.cinema-watermark img{width:100%;display:block}
.cinema-hero-copy{position:relative;z-index:5;max-width:720px}
.cinema-eyebrow{display:inline-block;color:#E0B55A;font-size:10px;font-weight:950;letter-spacing:1.5px;margin-bottom:14px}
.cinema-eyebrow-dark{color:#86672A}
.cinema-hero h1,.cinema-business h2,.cinema-section-title h2,.cinema-final h2{
  margin:0;font-size:clamp(50px,6.6vw,92px);line-height:.95;letter-spacing:-4px;font-weight:950
}
.cinema-hero h1 em{font-style:normal;color:#E0B55A}
.cinema-hero-copy>p,.cinema-business-copy>p,.cinema-final-copy>p{
  max-width:680px;color:#D0D0D0;font-size:17px;line-height:1.65;margin:22px 0 0
}
.cinema-business-copy>p{color:#5f5b54}.cinema-final-copy>p{margin-left:auto;margin-right:auto}
.cinema-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.cinema-actions-center{justify-content:center}
.cinema-btn{
  min-width:250px;min-height:66px;display:flex;flex-direction:column;justify-content:center;
  padding:12px 17px;border-radius:13px;text-decoration:none;border:1px solid transparent;
  transition:transform .22s ease,box-shadow .22s ease,background .22s ease
}
.cinema-btn:hover{transform:translateY(-3px)}.cinema-btn strong{font-size:14px}.cinema-btn span{font-size:11px;margin-top:3px}
.cinema-btn-gold{background:#BC913C;color:#0A0A0A;box-shadow:0 18px 42px rgba(188,145,60,.22)}.cinema-btn-gold span{color:#4c390e}
.cinema-btn-ghost{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.28);color:#fff;backdrop-filter:blur(10px)}.cinema-btn-ghost span{color:#c6c6c6}
.cinema-btn-black{background:#0A0A0A;color:#fff;box-shadow:0 16px 34px rgba(10,10,10,.14)}.cinema-btn-black span{color:#BBB9B6}
.cinema-btn-outline{background:#fff;border-color:#BBB9B6;color:#0A0A0A}.cinema-btn-outline span{color:#716E69}
.cinema-trust{display:flex;gap:16px;flex-wrap:wrap;margin-top:20px;color:#BDBDBD;font-size:11px}
.float-stack,.business-stage{position:relative;z-index:5;min-height:560px}
.float-card,.biz-float{
  position:absolute;border-radius:22px;box-shadow:0 28px 80px rgba(0,0,0,.32);
  backdrop-filter:blur(16px);transition:transform .3s ease,box-shadow .3s ease
}
.float-card:hover,.biz-float:hover{transform:translateY(-7px) scale(1.01);box-shadow:0 34px 90px rgba(0,0,0,.38)}
.float-card-main{left:8%;top:19%;width:min(420px,78%);padding:22px;background:linear-gradient(180deg,rgba(30,30,30,.97),rgba(14,14,14,.94));border:1px solid rgba(224,181,90,.32);animation:floatA 6s ease-in-out infinite}
.float-card-head{display:flex;justify-content:space-between;align-items:center}.float-card-head strong{color:#E0B55A;font-size:21px}.float-tag{background:#BC913C;color:#0A0A0A;border-radius:999px;padding:5px 8px;font-size:9px;font-weight:950}
.float-card h3{font-size:24px;margin:18px 0 8px}.float-card p{color:#B9B9B9;line-height:1.5;font-size:13px}.float-meta{display:flex;gap:12px;flex-wrap:wrap;color:#9d9d9d;font-size:11px;margin:18px 0}.float-action{background:#BC913C;color:#0A0A0A;text-align:center;padding:12px;border-radius:11px;font-weight:950}
.float-card-mini{padding:15px 17px;background:rgba(255,255,255,.93);color:#0A0A0A;border:1px solid rgba(255,255,255,.62)}.float-card-mini small,.float-card-mini span{display:block;color:#716E69}.float-card-mini b{display:block;font-size:20px;margin:4px 0}
.float-card-top{right:2%;top:8%;width:210px;animation:floatB 5.2s ease-in-out infinite}.float-card-bottom{left:0;bottom:8%;width:220px;animation:floatC 6.6s ease-in-out infinite}
.float-progress{height:6px;border-radius:99px;background:#E5E5E5;margin-top:9px;overflow:hidden}.float-progress i{display:block;height:100%;background:#BC913C;border-radius:99px}
.cinema-scroll{position:absolute;left:50%;bottom:24px;transform:translateX(-50%);color:#C5C5C5;text-decoration:none;font-size:10px;letter-spacing:.5px}
.cinema-business{grid-template-columns:minmax(0,1fr) minmax(400px,.9fr);gap:55px}
.business-stage{min-height:520px}
.biz-float-main{left:4%;top:18%;width:min(500px,88%);background:#fff;border:1px solid #D8D5D0;padding:22px;color:#0A0A0A;animation:floatA 6.4s ease-in-out infinite}.biz-title-row{display:flex;justify-content:space-between;gap:16px}.biz-title-row small{display:block;color:#716E69}.biz-title-row h3{font-size:24px;line-height:1.25;margin:6px 0}.biz-title-row>span{height:max-content;background:#0A0A0A;color:#E0B55A;border-radius:999px;padding:6px 9px;font-size:9px;font-weight:950}
.biz-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin:22px 0}.biz-metrics>div{background:#F7F6F1;border-radius:13px;padding:12px}.biz-metrics small{display:block;color:#716E69}.biz-metrics b{display:block;font-size:19px;margin-top:4px}
.biz-status{font-size:11px;color:#716E69}.biz-progress{height:7px;background:#E5E2DC;border-radius:99px;overflow:hidden;margin-top:9px}.biz-progress i{display:block;height:100%;background:#BC913C}
.biz-float-small{background:#0A0A0A;color:#fff;border:1px solid #292929;padding:15px 17px}.biz-float-small small{display:block;color:#BBB9B6}.biz-float-small b{display:block;margin-top:5px;font-size:16px;line-height:1.35}.biz-float-a{right:0;top:4%;width:205px;animation:floatB 5.7s ease-in-out infinite}.biz-float-b{left:0;bottom:4%;width:255px;animation:floatC 6.2s ease-in-out infinite}
.cinema-how{display:block;padding-top:110px}.cinema-section-title{max-width:850px}.cinema-section-title h2{font-size:clamp(44px,6vw,74px)}
.cinema-steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:44px}.cinema-step{min-height:300px;border:1px solid #282828;border-radius:22px;padding:23px;background:linear-gradient(180deg,#111,#0c0c0c);box-shadow:0 20px 50px rgba(0,0,0,.28);transition:transform .25s ease,border-color .25s ease}.cinema-step:hover{transform:translateY(-8px);border-color:#86672A}.cinema-step>span{font-size:11px;color:#E0B55A;font-weight:950}.cinema-step h3{font-size:25px;margin:125px 0 10px}.cinema-step p{color:#ABABAB;font-size:13px;line-height:1.55}
.cinema-mid-cta{margin-top:20px;border:1px solid #2f2f2f;border-radius:18px;padding:17px 19px;display:flex;align-items:center;justify-content:space-between;gap:18px;background:#111}.cinema-mid-cta small,.cinema-mid-cta b{display:block}.cinema-mid-cta small{color:#B0B0B0}.cinema-mid-cta b{margin-top:4px;font-size:18px}.cinema-mid-cta a{background:#BC913C;color:#0A0A0A;text-decoration:none;padding:12px 15px;border-radius:11px;font-weight:950}
.cinema-categories{display:block;padding-top:110px}
.cinema-card-track{display:grid;grid-template-columns:repeat(4,minmax(260px,1fr));gap:14px;margin-top:44px}
.category-card{position:relative;min-height:360px;background:#fff;border:1px solid #DAD7D2;border-radius:22px;padding:23px;box-shadow:0 18px 46px rgba(10,10,10,.06);transition:transform .25s ease,box-shadow .25s ease;overflow:hidden}
.category-card:hover{transform:translateY(-9px);box-shadow:0 28px 60px rgba(10,10,10,.10)}
.category-card:before{content:"";position:absolute;inset:auto -30px -40px auto;width:120px;height:120px;background:radial-gradient(circle,rgba(188,145,60,.12),transparent 70%)}
.category-number{font-size:10px;color:#86672A;font-weight:950}
.category-icon{width:66px;height:66px;border-radius:18px;display:grid;place-items:center;background:#F7F6F1;border:1px solid #E0D3B4;font-size:30px;margin-top:26px;box-shadow:0 10px 24px rgba(188,145,60,.08)}
.category-card h3{font-size:28px;margin:34px 0 10px}
.category-card p{color:#716E69;font-size:13px;line-height:1.55;max-width:250px}
.category-chip{display:inline-flex;align-items:center;justify-content:center;margin-top:18px;padding:8px 12px;border-radius:999px;background:#0A0A0A;color:#E0B55A;font-size:11px;font-weight:800}
.cinema-final{background:radial-gradient(circle at 12% 20%,rgba(188,145,60,.20),transparent 20rem),radial-gradient(circle at 80% 75%,rgba(188,145,60,.16),transparent 22rem),#0A0A0A}
.cinema-final-split{
  grid-template-columns:minmax(0,1fr) minmax(0,1fr);
  gap:clamp(34px,5vw,72px);
  text-align:left;
  align-items:center
}
.homeoffice-stage{
  position:relative;
  min-height:0;
  width:100%;
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  grid-template-areas:
    "main main"
    "a b"
    "c c";
  gap:12px;
  align-content:center
}
.homeoffice-glow{
  position:absolute;
  inset:12% 8% auto 8%;
  height:220px;
  border-radius:999px;
  background:radial-gradient(circle,rgba(188,145,60,.28),transparent 72%);
  filter:blur(24px);
  pointer-events:none
}
.homeoffice-main{
  position:relative;
  grid-area:main;
  left:auto;top:auto;
  width:100%;
  min-width:0;
  padding:18px;
  background:rgba(255,255,255,.06);
  border:1px solid rgba(224,181,90,.26);
  border-radius:28px;
  box-shadow:0 30px 80px rgba(0,0,0,.30);
  backdrop-filter:blur(14px);
  z-index:2
}
.homeoffice-monitor{background:#111;border:1px solid #2A2A2A;border-radius:22px;padding:16px}
.monitor-bar{display:flex;gap:6px;margin-bottom:14px}
.monitor-bar span{width:8px;height:8px;border-radius:50%;background:#4E4E4E}
.monitor-content{display:grid;grid-template-columns:92px 1fr;gap:16px;align-items:center}
.person-emoji{width:92px;height:92px;border-radius:22px;display:grid;place-items:center;font-size:50px;background:linear-gradient(145deg,#BC913C,#86672A)}
.monitor-text b{display:block;font-size:20px;color:#fff}
.monitor-text small{display:block;margin-top:8px;color:#BBB9B6;line-height:1.55;font-size:12px}
.homeoffice-float{
  position:relative;
  inset:auto;
  width:auto;
  min-width:0;
  padding:14px 16px;
  border-radius:18px;
  background:#fff;
  color:#0A0A0A;
  border:1px solid #DAD7D2;
  box-shadow:0 18px 42px rgba(0,0,0,.18);
  z-index:2
}
.homeoffice-float small{display:block;color:#716E69;font-size:10px}
.homeoffice-float b{display:block;margin-top:5px;font-size:15px;line-height:1.35}
.homeoffice-float-a{grid-area:a;animation:floatB 5.6s ease-in-out infinite}
.homeoffice-float-b{grid-area:b;animation:floatC 6.1s ease-in-out infinite}
.homeoffice-float-c{grid-area:c;animation:floatA 6.8s ease-in-out infinite}
.cinema-final-copy{width:100%;max-width:700px;min-width:0}
.cinema-final-copy h2{font-size:clamp(42px,5.4vw,72px);margin-top:8px;max-width:680px}
.cinema-final-copy>p{color:#B9B9B9;max-width:620px;margin-left:0;margin-right:0}
.final-adv-grid{display:grid;grid-template-columns:1fr;gap:10px;margin:24px 0 0}
.final-adv-item{padding:14px 16px;border-radius:16px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.10)}
.final-adv-item strong{display:block;color:#fff;font-size:15px}
.final-adv-item span{display:block;margin-top:5px;color:#BBB9B6;font-size:12px;line-height:1.45}
.cinema-mobile-cta{display:none}
.reveal{opacity:0;transform:translateY(32px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.8,.2,1)}.reveal.is-visible{opacity:1;transform:none}
@keyframes floatA{0%,100%{transform:translate3d(0,0,0) rotate(-1deg)}50%{transform:translate3d(0,-14px,0) rotate(.4deg)}}
@keyframes floatB{0%,100%{transform:translate3d(0,0,0) rotate(1.2deg)}50%{transform:translate3d(0,11px,0) rotate(-.4deg)}}
@keyframes floatC{0%,100%{transform:translate3d(0,0,0) rotate(-.8deg)}50%{transform:translate3d(0,-9px,0) rotate(.5deg)}}

/* Portal motion/depth */
.app .card,.app .metric-card,.app .panel,.app .mission-row,.app .goal{
  transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease
}
.app .card:hover,.app .metric-card:hover,.app .mission-row:hover{
  transform:translateY(-5px);box-shadow:0 18px 42px rgba(10,10,10,.10);border-color:#BC913C
}
.app .goal{box-shadow:0 18px 38px rgba(188,145,60,.10)}
.app .metric-grid{position:relative;z-index:2}
.app main{background:linear-gradient(180deg,#FFFFFF 0,#FFFFFF 260px,#F7F6F1 260px,#F7F6F1 100%)}

/* === LP oficial #BC913C / #E0B55A / #86672A / #FFFFFF / #F7F6F1 / #BBB9B6 / #0A0A0A === */
.lp-gold{--gold:#BC913C;--gold-2:#E0B55A;--gold-3:#E0B55A;--ink:#0A0A0A;--muted:#716E69;--soft:#F7F6F1;--line-gold:#BBB9B6;background:#FFFFFF;color:#0A0A0A}
.lp-header{background:rgba(255,255,255,.95);border-bottom-color:#E3E0DA}.lp-logo{color:#0A0A0A}.lp-logo b{color:#BC913C}
.lion-logo-img{width:40px;height:40px;object-fit:cover;border-radius:10px;background:#0A0A0A;border:1px solid #86672A}.lp-lion-big .lion-logo-img{width:82px;height:82px;border-radius:18px}
.lp-nav a{color:#4D4A45}.lp-nav-cta{background:#0A0A0A!important;color:#FFFFFF!important}
.lp-hero{background:radial-gradient(circle at 50% 5%,rgba(224,181,90,.18),transparent 28rem),linear-gradient(180deg,#FFFFFF 0%,#F7F6F1 100%);border-bottom-color:#E3E0DA}
.lp-hero-badge{border-color:#E0B55A;background:#FFF9E9;color:#86672A}.lp-hero h1{color:#0A0A0A}.lp-hero h1 span{color:#BC913C}.lp-hero-sub{color:#716E69}
.lp-main-cta{background:linear-gradient(135deg,#E0B55A,#BC913C);color:#0A0A0A;box-shadow:0 16px 38px rgba(188,145,60,.20)}.lp-main-cta small{color:#49370F}
.lp-business-cta{background:#FFFFFF;color:#0A0A0A;border-color:#BC913C}.lp-business-cta small{color:#716E69}.lp-main-cta-icon{background:rgba(255,255,255,.35)}.lp-business-cta-icon{background:#F7F6F1;color:#86672A}
.lp-proofline,.lp-demo-caption{color:#716E69}.lp-pulse{background:#BC913C;box-shadow:0 0 0 5px rgba(188,145,60,.14)}
.lp-demo-card{border-color:#BBB9B6;background:#FFFFFF;box-shadow:0 20px 50px rgba(10,10,10,.06)}.lp-demo-tag{background:#0A0A0A;color:#E0B55A}.lp-demo-card p,.lp-demo-meta,.lp-demo-pay small,.lp-demo-pay span{color:#716E69}.lp-demo-pay strong{color:#86672A}.lp-fake-button{background:#0A0A0A;color:#FFFFFF}
.lp-kicker{color:#86672A}.lp-choice-card{border-color:#DAD7D2;background:#FFFFFF}.lp-choice-worker{background:linear-gradient(180deg,#FFFFFF,#F7F6F1)}.lp-choice-business{background:#0A0A0A;color:#FFFFFF;border-color:#0A0A0A}
.lp-choice-icon{background:#F7F6F1;color:#BC913C}.lp-choice-business .lp-choice-icon{background:#1B1B1B;color:#E0B55A}.lp-choice-card p{color:#716E69}.lp-choice-business p{color:#BBB9B6}.lp-choice-card li:before{color:#BC913C}.lp-choice-business li:before{color:#E0B55A}.lp-choice-card a{color:#86672A}.lp-choice-business a{color:#E0B55A}
.lp-how,.lp-real-use,.lp-faq{border-top-color:#E3E0DA}.lp-flow-step,.lp-use-grid>div{border-color:#DAD7D2;background:#FFFFFF}.lp-flow-step>strong{background:#F7F6F1;color:#86672A}.lp-flow-step p,.lp-section-head p,.lp-business-copy p{color:#716E69}.lp-flow-arrow{color:#BC913C}
.lp-inline-cta{background:#F7F6F1;border-color:#E0B55A}.lp-inline-cta a{background:#0A0A0A;color:#FFFFFF}
.lp-business-bigcta{background:#BC913C;color:#0A0A0A}.lp-business-example{background:#0A0A0A}.lp-biz-label{color:#E0B55A;border-color:#86672A}.lp-biz-result>div{border-color:#33312D}.lp-biz-result small,.lp-business-example p{color:#BBB9B6}.lp-biz-result b{color:#E0B55A}
.lp-use-grid span{color:#86672A}.lp-use-grid p,.lp-faq details p{color:#716E69}.lp-faq details{border-bottom-color:#E3E0DA}
.lp-final{background:#F7F6F1;border-color:#E0B55A}.lp-footer{color:#716E69}.lp-footer>a:last-child{color:#86672A}
.lp-mobile-bar{background:rgba(255,255,255,.97);border-color:#E0B55A}.lp-mobile-bar a:first-child{background:#BC913C;color:#0A0A0A}.lp-mobile-bar a:last-child{background:#0A0A0A;color:#FFFFFF}


@media(max-width:1020px){
  .cinema-hero,.cinema-business{grid-template-columns:1fr;gap:24px}
  .cinema-screen{min-height:auto;padding-top:120px;padding-bottom:70px}
  .float-stack,.business-stage{min-height:480px}
  .cinema-steps{grid-template-columns:repeat(2,1fr)}
  .cinema-card-track{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:720px){
  .cinema-header{padding:11px 13px;background:rgba(10,10,10,.92)}
  .cinema-nav>a:not(.cinema-nav-cta):not([href="/login"]){display:none}
  .cinema-nav{gap:8px}.cinema-brand span{font-size:12px}.cinema-brand .lion-logo-img{width:34px;height:34px}
  .cinema-screen{padding:100px 15px 74px}
  .cinema-hero h1,.cinema-business h2,.cinema-section-title h2,.cinema-final h2{font-size:clamp(42px,13vw,60px);letter-spacing:-2.5px}
  .cinema-hero-copy>p,.cinema-business-copy>p,.cinema-final-copy>p{font-size:15px}
  .cinema-actions{flex-direction:column}.cinema-btn{width:100%;min-width:0}
  .cinema-trust{display:grid;gap:7px}
  .float-stack,.business-stage{min-height:430px}
  .float-card-main,.biz-float-main{left:0;top:82px;width:94%}
  .float-card-top,.biz-float-a{right:0;top:0;width:185px}
  .float-card-bottom,.biz-float-b{left:auto;right:8px;bottom:0;width:205px}
  .cinema-steps,.cinema-card-track{grid-template-columns:1fr}
  .cinema-step{min-height:220px}.cinema-step h3{margin-top:75px}
  .category-card{min-height:250px}.category-card h3{margin-top:24px}.category-icon{margin-top:18px}
  .cinema-final-split{grid-template-columns:1fr;gap:22px}
  .homeoffice-stage{min-height:430px}
  .homeoffice-main{left:0;top:68px;width:94%}
  .homeoffice-float-a{right:0;top:0;width:180px}
  .homeoffice-float-b{left:0;bottom:0;width:190px}
  .homeoffice-float-c{right:12px;bottom:88px;width:210px}
  .monitor-content{grid-template-columns:74px 1fr}.person-emoji{width:74px;height:74px;font-size:40px}
  .cinema-mid-cta{flex-direction:column;align-items:flex-start}
  .cinema-mobile-cta{position:fixed;z-index:130;left:8px;right:8px;bottom:8px;display:grid;grid-template-columns:1fr 1fr;gap:7px;padding:7px;background:rgba(255,255,255,.95);border:1px solid #E0B55A;border-radius:15px;box-shadow:0 14px 36px rgba(0,0,0,.22);backdrop-filter:blur(14px)}
  .cinema-mobile-cta a{text-align:center;text-decoration:none;padding:12px 7px;border-radius:10px;font-size:11px;font-weight:950}
  .cinema-mobile-cta a:first-child{background:#BC913C;color:#0A0A0A}.cinema-mobile-cta a:last-child{background:#0A0A0A;color:#fff}
  .cinema-scroll{display:none}
}
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}.float-card-main,.float-card-top,.float-card-bottom,.biz-float-main,.biz-float-a,.biz-float-b{animation:none}
  .reveal{opacity:1;transform:none;transition:none}
}

@media(max-width:960px){
  .lp-flow{grid-template-columns:1fr 1fr}.lp-flow-arrow{display:none}
  .lp-business-section{grid-template-columns:1fr}.lp-use-grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:760px){
  .lp-header{padding:13px 15px}.lp-nav>a:not(.lp-nav-cta):not([href="/login"]){display:none}.lp-nav{gap:9px}.lp-nav a{font-size:11px}
  .lp-hero-inner{padding:58px 15px 48px}.lp-hero h1{font-size:clamp(44px,13vw,66px);letter-spacing:-2.5px}.lp-hero-sub{font-size:15px}
  .lp-hero-actions,.lp-final-actions{flex-direction:column}.lp-main-cta,.lp-business-cta{width:100%;min-width:0}
  .lp-proofline{justify-content:flex-start;text-align:left}
  .lp-demo-card{grid-template-columns:1fr}.lp-demo-pay{text-align:left;display:grid;grid-template-columns:1fr auto;gap:3px 12px;align-items:center}.lp-demo-pay .lp-fake-button{grid-column:1/-1}.lp-demo-pay span{grid-column:1/-1}
  .lp-choice,.lp-how,.lp-business-section,.lp-real-use,.lp-faq{padding:68px 15px}
  .lp-choice-grid{grid-template-columns:1fr}.lp-choice-card{min-height:auto}
  .lp-flow{grid-template-columns:1fr}.lp-inline-cta{align-items:flex-start;flex-direction:column}
  .lp-use-grid{grid-template-columns:1fr}.lp-biz-result{grid-template-columns:1fr 1fr 1fr}
  .lp-final{margin:20px 15px 0;padding:65px 15px}.lp-final h2{font-size:38px}
  .lp-footer{padding:26px 15px 92px;align-items:flex-start;flex-direction:column}
  .lp-mobile-bar{position:fixed;z-index:100;left:8px;right:8px;bottom:8px;display:grid;grid-template-columns:1fr 1fr;gap:7px;padding:7px;background:rgba(255,255,255,.95);border:1px solid #e5dbc0;border-radius:15px;box-shadow:0 15px 35px rgba(47,35,7,.18);backdrop-filter:blur(12px)}
  .lp-mobile-bar a{text-align:center;text-decoration:none;border-radius:10px;padding:12px 8px;font-size:11px;font-weight:950}.lp-mobile-bar a:first-child{background:#b8860b;color:#fff}.lp-mobile-bar a:last-child{background:#18150e;color:#fff}
}


/* === FINANCEIRO / PIX / SAQUES v0.5 === */
.finance-note{max-width:1000px}
.finance-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;max-width:1000px;margin:12px 0}
.finance-panel{max-width:none;height:100%}
.finance-panel-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px}
.finance-panel-head h3{margin:8px 0 0;font-size:20px}
.finance-row{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;padding:11px 0;border-bottom:1px solid #E5E2DC}
.finance-row:last-child{border-bottom:0}
.finance-row b,.finance-row small{display:block}.finance-row small{margin-top:4px;color:#716E69;line-height:1.4}
.finance-status{display:inline-flex;align-items:center;justify-content:center;min-height:28px;border-radius:999px;padding:5px 9px;font-size:10px;font-weight:900;white-space:nowrap;border:1px solid #BBB9B6;background:#F7F6F1}
.finance-status.pending{color:#86672A;border-color:#E0B55A;background:#FFF9E9}
.finance-status.approved{color:#4D4A45;border-color:#BBB9B6}
.finance-status.paid{color:#0A0A0A;border-color:#BC913C;background:#F3E6BE}
.finance-status.rejected,.finance-status.cancelled,.finance-status.expired,.finance-status.refunded{color:#8B2F2F;border-color:#D8A5A5;background:#FFF5F5}.finance-status.review_required{color:#6B4E00;border-color:#E0B55A;background:#FFF9E9}
.pix-charge-panel{max-width:1000px;margin-top:14px}
.pix-grid{display:grid;grid-template-columns:280px minmax(0,1fr);gap:22px;align-items:center}
.pix-qr{background:#FFFFFF;border:1px solid #DAD7D2;border-radius:18px;padding:14px;display:grid;place-items:center}
.pix-qr img{display:block;width:100%;max-width:250px;height:auto}
.pix-payload{min-height:120px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;word-break:break-all}
.copy-pix{margin-top:8px}
.security-notice{max-width:1000px}
.admin-metrics{grid-template-columns:repeat(4,minmax(0,1fr));max-width:none}
.admin-config-panel{max-width:none;display:flex;justify-content:space-between;align-items:center;gap:16px}
.admin-config-panel form{margin:0}
.admin-table small{overflow-wrap:anywhere}
@media(max-width:900px){
  .finance-grid,.pix-grid{grid-template-columns:1fr}
  .pix-qr{max-width:320px}
  .admin-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}
}

@media(max-width:520px){
  .head-name{display:none}
  .pill{font-size:9px;padding:5px 7px}
  main{padding:18px 14px 110px}
  header{padding:13px 14px}
  .hero h1{font-size:28px}
  .goal{padding:16px}
  .goalrow{align-items:flex-start}
  .goalright{max-width:115px}
  .row{grid-template-columns:1fr}
  .client-summary{grid-template-columns:1fr}
  .cardbody,.panel{padding:15px}
  .home-hero-shell{grid-template-columns:1fr}
  .hero-mini-stats{grid-template-columns:1fr}
  .goal-topline,.goalfoot{flex-direction:column;align-items:flex-start}
  .filter-panel-head{flex-direction:column}
  .filter-grid,.form-grid,.metric-grid,.wallet-mini,.filter-grid-4{grid-template-columns:1fr}
  .filter-actions{flex-direction:column}
  .mission-row{grid-template-columns:1fr}
  .mission-row-pay{text-align:left;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  .mission-row-pay>b{margin:0}
  .pagination{grid-template-columns:1fr}.pagination>*{justify-self:stretch!important}
  .toolbar{align-items:flex-start;flex-direction:column}
  .finance-grid,.pix-grid,.admin-metrics{grid-template-columns:1fr}
  .finance-row{flex-direction:column}
  .finance-status{align-self:flex-start}
  .admin-config-panel{align-items:flex-start;flex-direction:column}
  .pix-qr{max-width:none;width:100%}
}


@media(max-width:860px){
  .home-hero-shell{grid-template-columns:1fr}
  .filter-grid-4{grid-template-columns:repeat(2,minmax(0,1fr))}
  .goal-highlight{max-width:1000px}
}

@media(min-width:900px){
  .app{
    display:grid;
    grid-template-columns:210px minmax(0,1fr);
    grid-template-rows:auto 1fr;
    min-height:100vh;
    border-left:1px solid rgba(187,185,182,.55);
    border-right:1px solid rgba(187,185,182,.55);
  }
  .app>header{
    grid-column:1/-1;
    grid-row:1;
    padding:15px 24px;
  }
  .app>main{
    grid-column:2;
    grid-row:2;
    min-width:0;
    padding:30px 32px 54px;
  }
  .nav{
    position:sticky;
    top:64px;
    left:auto;
    right:auto;
    bottom:auto;
    grid-column:1;
    grid-row:2;
    align-self:start;
    display:flex;
    flex-direction:column;
    gap:6px;
    width:auto;
    max-width:none;
    min-height:calc(100vh - 64px);
    margin:0;
    padding:22px 12px;
    background:#081522;
    border-top:0;
    border-right:1px solid rgba(187,185,182,.55);
    backdrop-filter:none;
  }
  .nav a{
    min-height:48px;
    flex-direction:row;
    justify-content:flex-start;
    gap:11px;
    padding:10px 12px;
    font-size:12px;
    text-align:left;
  }
  .nav strong{
    width:22px;
    text-align:center;
    font-size:17px;
  }
  .grid{
    grid-template-columns:1fr;
  }
  .panel{
    padding:22px;
  }
}

@media(min-width:1080px){
  .app{grid-template-columns:230px minmax(0,1fr)}
  .app>main{padding:34px 42px 64px}
  .grid{gap:16px}
  .hero h1{font-size:40px}
}

@media(min-width:1180px){
  .app{
    width:calc(100% - 36px);
    min-height:calc(100vh - 36px);
    margin:18px auto;
    border:1px solid rgba(187,185,182,.55);
    border-radius:26px;
    overflow:clip;
  }
  .nav{min-height:calc(100vh - 101px)}
}


/* === LAYOUT NORMALIZATION v0.5.1 === */
html,body{max-width:100%;overflow-x:hidden}
body{background:#F7F6F1}
img,svg,video,canvas{max-width:100%}
form{min-width:0}
.app{isolation:isolate}
.app>header{grid-area:header}
.app>main{min-width:0;overflow:visible}
.app .grid>*,
.app .metric-grid>*,
.app .finance-grid>*,
.app .form-grid>*{min-width:0}

/* Public LP is fully isolated from portal spacing. */
.lp-cinema{width:100%;max-width:none;margin:0;min-height:100vh}
.lp-cinema .cinema-main{width:100%;padding:0;margin:0;max-width:none}
.lp-cinema .cinema-header{min-height:0}
.lp-cinema .cinema-screen{
  width:100%;
  max-width:none;
  margin:0;
  padding-left:max(20px,calc((100vw - 1180px)/2));
  padding-right:max(20px,calc((100vw - 1180px)/2));
}
.lp-cinema .cinema-hero-copy,
.lp-cinema .cinema-business-copy,
.lp-cinema .cinema-section-title,
.lp-cinema .cinema-final-copy{min-width:0}
.lp-cinema .float-stack,
.lp-cinema .business-stage,
.lp-cinema .homeoffice-stage{min-width:0}
.lp-cinema .cinema-card-track,
.lp-cinema .cinema-steps{width:100%;min-width:0}
.lp-cinema .category-card,
.lp-cinema .cinema-step{min-width:0}
.lp-cinema h1,.lp-cinema h2,.lp-cinema h3,
.app h1,.app h2,.app h3{overflow-wrap:break-word}

/* Dashboard spacing and widths */
.app .home-hero-shell,
.app .filter-panel,
.app .toolbar,
.app .metric-grid,
.app .finance-grid,
.app .pix-charge-panel,
.app .security-notice{width:100%;max-width:none}
.app .panel{max-width:none}
.app .goal{width:100%;max-width:none}
.app .action-row{width:100%;max-width:none}
.app .client-summary{width:100%;max-width:none}
.app .section-title{width:100%}

/* Cards: 1 col on phones/tablets, 2 on real desktop, 3 only on very wide screens. */
.app .grid{grid-template-columns:1fr}
@media(min-width:1040px){
  .app .grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media(min-width:1480px){
  .app{max-width:1380px}
  .app .grid{grid-template-columns:repeat(3,minmax(0,1fr))}
}

/* Metrics should never become four tiny boxes on tablet. */
.app .metric-grid{
  grid-template-columns:repeat(2,minmax(0,1fr));
}
.app .wallet-mini{grid-template-columns:repeat(3,minmax(0,1fr))}
@media(max-width:620px){
  .app .metric-grid,
  .app .wallet-mini,
  .app .client-summary{grid-template-columns:1fr}
}

/* Finance / PIX */
.app .finance-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
.app .pix-grid{grid-template-columns:minmax(220px,300px) minmax(0,1fr)}
.app .pix-payload{width:100%;max-width:100%}
.app .admin-table-wrap{width:100%;max-width:100%;overflow:auto;-webkit-overflow-scrolling:touch}
@media(max-width:900px){
  .app .finance-grid,
  .app .pix-grid{grid-template-columns:1fr}
  .app .pix-qr{width:min(100%,320px)}
}

/* Tablet stays full-width with bottom navigation. */
@media(max-width:899px){
  .app{
    display:block;
    width:100%;
    max-width:none;
    min-height:100vh;
    margin:0;
    border:0;
    border-radius:0;
  }
  .app>header{
    position:sticky;
    top:0;
    padding:12px 16px;
  }
  .app>main{
    width:100%;
    padding:24px 18px 110px;
  }
  .app .nav{
    position:fixed;
    top:auto;
    left:0;
    right:0;
    bottom:0;
    width:100%;
    max-width:none;
    min-height:0;
    display:grid;
    grid-template-columns:repeat(var(--nav-count,5),minmax(0,1fr));
    padding:7px 8px max(8px,env(safe-area-inset-bottom));
    border-right:0;
    border-top:1px solid #282828;
  }
  .app .nav a{
    min-height:48px;
    flex-direction:column;
    justify-content:center;
    gap:3px;
    padding:5px 4px;
    text-align:center;
    font-size:10px;
  }
  .app .nav strong{width:auto;font-size:18px}
  .app .head-user{max-width:58%}
  .app .pill{max-width:145px;overflow:hidden;text-overflow:ellipsis}
}

/* Proper desktop app grid. */
@media(min-width:900px){
  .app{
    grid-template-columns:220px minmax(0,1fr);
    grid-template-areas:
      "header header"
      "nav main";
  }
  .app>header{grid-area:header}
  .app>main{
    grid-area:main;
    padding:32px clamp(24px,3.2vw,48px) 64px;
  }
  .app .nav{
    grid-area:nav;
    position:sticky;
    top:64px;
    align-self:start;
    min-height:calc(100vh - 64px);
  }
  .app .metric-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
}

/* Mobile portal cleanup. */
@media(max-width:560px){
  .app>main{padding:18px 13px 104px}
  .app>header{padding:10px 13px}
  .app .brand-logo-img{width:31px;height:31px}
  .app .brand span{font-size:12px}
  .app .head-user{gap:5px}
  .app .head-name{display:none}
  .app .pill{font-size:8px;max-width:105px}
  .app .home-hero-shell{display:block}
  .app .hero h1,
  .app .home-hero-copy h1{font-size:clamp(28px,9vw,38px);line-height:1.03}
  .app .hero-mini-stats{grid-template-columns:1fr 1fr}
  .app .hero-mini-card:last-child{grid-column:1/-1}
  .app .goalrow{flex-direction:column;align-items:flex-start}
  .app .goalright{text-align:left;max-width:none}
  .app .filter-panel{padding:13px}
  .app .filter-grid-4,
  .app .filter-grid,
  .app .form-grid{grid-template-columns:1fr}
  .app .filter-actions,
  .app .row{grid-template-columns:1fr;display:grid}
  .app .mission-row{grid-template-columns:1fr}
  .app .mission-row-pay{text-align:left}
  .app .status-tabs{margin-left:-3px;margin-right:-3px}
  .app .card,
  .app .panel,
  .app .metric-card{border-radius:16px}
  .app .cardbody{padding:14px}
  .app .finance-row{gap:8px}
}

/* Landing: laptop */
@media(max-width:1020px){
  .lp-cinema .cinema-screen{
    min-height:auto;
    padding:110px 24px 72px;
  }
  .lp-cinema .cinema-hero,
  .lp-cinema .cinema-business,
  .lp-cinema .cinema-final-split{grid-template-columns:1fr}
  .lp-cinema .float-stack,
  .lp-cinema .business-stage,
  .lp-cinema .homeoffice-stage{
    width:min(100%,680px);
    margin:0 auto;
  }
  .lp-cinema .cinema-steps{grid-template-columns:repeat(2,minmax(0,1fr))}
  .lp-cinema .cinema-card-track{grid-template-columns:repeat(2,minmax(0,1fr))}
}

/* Landing: mobile. Avoid absolute cards colliding with text. */
@media(max-width:720px){
  .lp-cinema .cinema-header{width:100%;padding:10px 12px}
  .lp-cinema .cinema-nav a[href="/login"]{display:none}
  .lp-cinema .cinema-nav-cta{padding:9px 10px}
  .lp-cinema .cinema-screen{padding:92px 14px 80px}
  .lp-cinema .cinema-hero,
  .lp-cinema .cinema-business,
  .lp-cinema .cinema-final-split{display:block}
  .lp-cinema .cinema-hero h1,
  .lp-cinema .cinema-business h2,
  .lp-cinema .cinema-section-title h2,
  .lp-cinema .cinema-final h2{
    font-size:clamp(40px,12vw,58px);
    line-height:.98;
    letter-spacing:-2px;
  }
  .lp-cinema .cinema-actions{display:grid;grid-template-columns:1fr}
  .lp-cinema .cinema-btn{width:100%}
  .lp-cinema .float-stack,
  .lp-cinema .business-stage,
  .lp-cinema .homeoffice-stage{
    min-height:0;
    width:100%;
    margin-top:34px;
    display:grid;
    grid-template-columns:1fr;
    gap:10px;
  }
  .lp-cinema .float-card,
  .lp-cinema .biz-float,
  .lp-cinema .homeoffice-main,
  .lp-cinema .homeoffice-float{
    position:relative;
    inset:auto;
    width:100%;
    max-width:none;
    animation:none;
    transform:none;
  }
  .lp-cinema .float-card-main,
  .lp-cinema .biz-float-main{order:1}
  .lp-cinema .float-card-top,
  .lp-cinema .biz-float-a,
  .lp-cinema .homeoffice-float-a{order:2}
  .lp-cinema .float-card-bottom,
  .lp-cinema .biz-float-b,
  .lp-cinema .homeoffice-float-b{order:3}
  .lp-cinema .homeoffice-float-c{order:4}
  .lp-cinema .cinema-steps,
  .lp-cinema .cinema-card-track{grid-template-columns:1fr}
  .lp-cinema .cinema-step,
  .lp-cinema .category-card{min-height:auto}
  .lp-cinema .cinema-step h3,
  .lp-cinema .category-card h3{margin-top:26px}
  .lp-cinema .cinema-mid-cta{display:grid;grid-template-columns:1fr}
  .lp-cinema .cinema-mid-cta a{text-align:center}
  .lp-cinema .monitor-content{grid-template-columns:66px minmax(0,1fr)}
  .lp-cinema .person-emoji{width:66px;height:66px;font-size:35px}
  .lp-cinema .cinema-final-copy{margin-top:34px}
  .lp-cinema .final-adv-grid{grid-template-columns:1fr}
}

/* Very narrow devices */
@media(max-width:380px){
  .lp-cinema .cinema-brand span{display:none}
  .lp-cinema .cinema-nav-cta{font-size:10px}
  .app .hero-mini-stats{grid-template-columns:1fr}
  .app .hero-mini-card:last-child{grid-column:auto}
  .app .nav a{font-size:9px;padding-inline:2px}
}


/* === RESPONSIVE POSITIONING v0.5.2 === */
:root{--lp-max:1180px}

/* Header spans the viewport; its children align with every section. */
.lp-cinema .cinema-header{
  box-sizing:border-box;
  width:100vw;
  max-width:100vw;
}
.lp-cinema .cinema-brand,
.lp-cinema .cinema-nav{min-width:0}
.lp-cinema .cinema-nav{justify-content:flex-end}

/* Sections use exactly the same horizontal alignment. */
.lp-cinema .cinema-screen{
  box-sizing:border-box;
  width:100%;
  padding-left:max(20px,calc((100vw - var(--lp-max))/2));
  padding-right:max(20px,calc((100vw - var(--lp-max))/2));
}
.lp-cinema .cinema-hero,
.lp-cinema .cinema-business,
.lp-cinema .cinema-final-split{
  column-gap:clamp(32px,5vw,72px);
}
.lp-cinema .cinema-hero>*,
.lp-cinema .cinema-business>*,
.lp-cinema .cinema-final-split>*{
  min-width:0;
}

/* Do not let animated transforms create page overflow. */
.lp-cinema .float-stack,
.lp-cinema .business-stage,
.lp-cinema .homeoffice-stage{
  overflow:visible;
  max-width:100%;
}
.lp-cinema .cinema-final{
  overflow:hidden;
}

/* Home office panel is now a stable rectangle. */
.lp-cinema .homeoffice-stage{
  padding:10px;
  border-radius:32px;
  background:linear-gradient(145deg,rgba(188,145,60,.10),rgba(255,255,255,.025));
  border:1px solid rgba(224,181,90,.16);
}
.lp-cinema .homeoffice-main{
  aspect-ratio:16 / 9;
  display:flex;
  align-items:stretch;
}
.lp-cinema .homeoffice-monitor{
  width:100%;
  min-height:0;
  display:flex;
  flex-direction:column;
  justify-content:center;
}
.lp-cinema .monitor-content{min-width:0}
.lp-cinema .monitor-text{min-width:0}
.lp-cinema .monitor-text b,
.lp-cinema .monitor-text small{overflow-wrap:anywhere}

/* Final advantages stay compact instead of stretching the slide. */
.lp-cinema .final-adv-grid{
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:8px;
}
.lp-cinema .final-adv-item{min-width:0}
.lp-cinema .final-adv-item strong,
.lp-cinema .final-adv-item span{overflow-wrap:anywhere}

/* Keep category cards consistently rectangular. */
.lp-cinema .cinema-card-track{
  align-items:stretch;
}
.lp-cinema .category-card{
  height:100%;
  min-height:340px;
  display:flex;
  flex-direction:column;
}
.lp-cinema .category-card p{max-width:none}
.lp-cinema .category-chip{margin-top:auto;align-self:flex-start}

/* Laptop: stack the final section earlier, before it gets cramped. */
@media(max-width:1120px){
  .lp-cinema .cinema-final-split{
    grid-template-columns:1fr;
    gap:34px;
  }
  .lp-cinema .homeoffice-stage{
    width:min(760px,100%);
    margin:0 auto;
  }
  .lp-cinema .cinema-final-copy{
    width:min(760px,100%);
    max-width:none;
    margin:0 auto;
    text-align:center;
  }
  .lp-cinema .cinema-final-copy h2,
  .lp-cinema .cinema-final-copy>p{
    max-width:none;
    margin-left:auto;
    margin-right:auto;
  }
  .lp-cinema .cinema-final-copy .cinema-actions{
    justify-content:center;
  }
}

/* Tablet */
@media(max-width:900px){
  .lp-cinema .cinema-header{
    padding-left:18px;
    padding-right:18px;
  }
  .lp-cinema .cinema-nav{gap:12px}
  .lp-cinema .cinema-screen{
    padding-left:18px;
    padding-right:18px;
  }
  .lp-cinema .cinema-card-track{
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
  .lp-cinema .category-card{min-height:300px}
  .lp-cinema .final-adv-grid{
    grid-template-columns:1fr;
  }
}

/* Mobile: no absolute/floating layout at all. */
@media(max-width:720px){
  .lp-cinema .cinema-header{
    left:0;right:0;
    width:100%;
    max-width:100%;
    padding:9px 12px;
  }
  .lp-cinema .cinema-brand .lion-logo-img{
    width:34px;height:34px
  }
  .lp-cinema .cinema-nav{
    gap:7px;
    flex:0 0 auto;
  }
  .lp-cinema .cinema-nav-cta{
    padding:9px 10px;
    white-space:nowrap;
  }

  .lp-cinema .cinema-screen{
    padding-left:14px;
    padding-right:14px;
    padding-top:88px;
    padding-bottom:78px;
  }

  .lp-cinema .float-stack,
  .lp-cinema .business-stage,
  .lp-cinema .homeoffice-stage{
    display:grid;
    grid-template-columns:1fr;
    grid-template-areas:none;
    gap:10px;
    width:100%;
    max-width:100%;
    padding:0;
    border:0;
    background:transparent;
    overflow:visible;
  }

  .lp-cinema .float-card,
  .lp-cinema .biz-float,
  .lp-cinema .homeoffice-main,
  .lp-cinema .homeoffice-float{
    position:relative!important;
    inset:auto!important;
    grid-area:auto!important;
    width:100%!important;
    max-width:100%!important;
    margin:0!important;
    animation:none!important;
    transform:none!important;
  }

  .lp-cinema .homeoffice-main{
    aspect-ratio:auto;
    padding:12px;
  }
  .lp-cinema .homeoffice-monitor{
    min-height:230px;
  }
  .lp-cinema .monitor-content{
    grid-template-columns:64px minmax(0,1fr);
    gap:12px;
  }
  .lp-cinema .person-emoji{
    width:64px;height:64px;font-size:34px
  }
  .lp-cinema .monitor-text b{font-size:17px}

  .lp-cinema .cinema-final-copy{
    width:100%;
    margin-top:30px;
    text-align:left;
  }
  .lp-cinema .cinema-final-copy h2,
  .lp-cinema .cinema-final-copy>p{
    margin-left:0;
    margin-right:0;
  }
  .lp-cinema .cinema-final-copy .cinema-actions{
    justify-content:stretch;
  }

  .lp-cinema .cinema-card-track{
    grid-template-columns:1fr;
  }
  .lp-cinema .category-card{
    min-height:0;
    height:auto;
  }
  .lp-cinema .category-chip{margin-top:18px}

  /* Header: only logo + two essential actions on small screens. */
  .lp-cinema .cinema-nav a:not([href="/login"]):not(.cinema-nav-cta){
    display:none;
  }
}

/* Small phones */
@media(max-width:430px){
  .lp-cinema .cinema-header{padding:8px 10px}
  .lp-cinema .cinema-brand{gap:7px}
  .lp-cinema .cinema-brand span{font-size:11px}
  .lp-cinema .cinema-nav a[href="/login"]{display:none}
  .lp-cinema .cinema-nav-cta{font-size:10px;padding:9px}
  .lp-cinema .cinema-screen{padding-left:12px;padding-right:12px}
  .lp-cinema .cinema-hero h1,
  .lp-cinema .cinema-business h2,
  .lp-cinema .cinema-section-title h2,
  .lp-cinema .cinema-final h2{
    font-size:clamp(36px,11vw,48px);
    letter-spacing:-1.7px;
  }
}


/* === PORTAL ALIGNMENT v0.5.2 === */
@media(min-width:900px){
  .app{
    grid-template-columns:220px minmax(0,1fr);
  }
  .app>header{
    width:100%;
    min-width:0;
  }
  .app>main{
    min-width:0;
    width:100%;
    max-width:none;
  }
  .app .nav{
    width:220px;
    min-width:220px;
  }
  .app .grid{
    width:100%;
    align-items:stretch;
  }
}
@media(max-width:899px){
  .app{
    overflow-x:hidden;
  }
  .app>main{
    overflow-x:hidden;
  }
  .app .nav{
    width:100%;
    left:0;
    right:0;
  }
}


/* === VISUAL / POSITIONING IMPROVEMENTS v0.5.3 === */

/* Four steps: less empty, more visual. */
.lp-cinema .cinema-step{
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  gap:0;
  min-height:300px;
}
.lp-cinema .cinema-step .step-number{
  font-size:10px;
  color:#E0B55A;
  font-weight:950;
}
.lp-cinema .step-icon{
  width:66px;
  height:66px;
  margin-top:22px;
  border-radius:18px;
  display:grid;
  place-items:center;
  font-size:30px;
  background:linear-gradient(145deg,rgba(188,145,60,.22),rgba(188,145,60,.08));
  border:1px solid rgba(224,181,90,.22);
  box-shadow:0 10px 28px rgba(0,0,0,.18);
}
.lp-cinema .cinema-step h3{
  margin:26px 0 10px;
}
.lp-cinema .cinema-step p{
  margin:0;
  color:#C7C7C7;
  line-height:1.6;
  max-width:290px;
}
.lp-cinema .cinema-steps{
  align-items:stretch;
}
.lp-cinema .cinema-steps .cinema-step{
  height:100%;
}

/* Home office card better aligned */
.lp-cinema .homeoffice-stage{
  padding:12px;
}
.lp-cinema .homeoffice-main{
  padding:16px;
}
.lp-cinema .homeoffice-monitor{
  padding:18px;
}
.lp-cinema .monitor-content{
  grid-template-columns:112px minmax(0,1fr);
  gap:18px;
  align-items:center;
}
.lp-cinema .workspace-visual{
  position:relative;
  width:112px;
  height:112px;
  border-radius:24px;
  display:grid;
  place-items:center;
  background:linear-gradient(145deg,#BC913C,#86672A);
  box-shadow:0 14px 34px rgba(188,145,60,.22);
}
.lp-cinema .person-emoji{
  width:72px;
  height:72px;
  display:grid;
  place-items:center;
  border-radius:50%;
  background:rgba(255,255,255,.16);
  font-size:42px;
}
.lp-cinema .workspace-mini-laptop{
  position:absolute;
  right:-12px;
  bottom:8px;
  width:44px;
  height:44px;
  border-radius:12px;
  display:grid;
  place-items:center;
  font-size:24px;
  background:#1A1A1A;
  border:1px solid rgba(255,255,255,.12);
  box-shadow:0 10px 20px rgba(0,0,0,.25);
}
.lp-cinema .monitor-text b{
  font-size:20px;
  line-height:1.2;
}
.lp-cinema .monitor-text small{
  display:block;
  margin-top:8px;
  line-height:1.58;
  font-size:13px;
}
.lp-cinema .monitor-bullets{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  margin-top:14px;
}
.lp-cinema .monitor-bullets span{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:7px 10px;
  border-radius:999px;
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.08);
  color:#D8D8D8;
  font-size:11px;
  font-weight:700;
}

/* Better size balance for the benefit cards */
.lp-cinema .homeoffice-float{
  min-height:92px;
  display:flex;
  flex-direction:column;
  justify-content:center;
}
.lp-cinema .homeoffice-float b{
  max-width:22ch;
}

/* Keep the large heading under control on desktop */
@media(min-width:1100px){
  .lp-cinema .cinema-section-title h2{
    max-width:980px;
  }
}

/* Tablet */
@media(max-width:900px){
  .lp-cinema .monitor-content{
    grid-template-columns:96px minmax(0,1fr);
    gap:14px;
  }
  .lp-cinema .workspace-visual{
    width:96px;
    height:96px;
  }
  .lp-cinema .person-emoji{
    width:64px;
    height:64px;
    font-size:36px;
  }
  .lp-cinema .workspace-mini-laptop{
    width:38px;
    height:38px;
    font-size:20px;
    right:-10px;
    bottom:6px;
  }
}

/* Mobile */
@media(max-width:720px){
  .lp-cinema .cinema-step{
    min-height:0;
    padding:20px;
  }
  .lp-cinema .step-icon{
    width:58px;
    height:58px;
    font-size:28px;
    margin-top:16px;
  }
  .lp-cinema .cinema-step h3{
    margin-top:18px;
  }

  .lp-cinema .homeoffice-stage{
    padding:0;
  }
  .lp-cinema .homeoffice-main{
    padding:12px!important;
    border-radius:22px;
  }
  .lp-cinema .homeoffice-monitor{
    padding:14px;
    border-radius:18px;
  }
  .lp-cinema .monitor-content{
    grid-template-columns:1fr;
    gap:14px;
    align-items:flex-start;
  }
  .lp-cinema .workspace-visual{
    width:92px;
    height:92px;
    margin:0 auto;
  }
  .lp-cinema .workspace-mini-laptop{
    right:-8px;
    bottom:4px;
  }
  .lp-cinema .monitor-text{
    text-align:left;
  }
  .lp-cinema .monitor-text b{
    font-size:18px;
  }
  .lp-cinema .monitor-bullets{
    display:grid;
    grid-template-columns:1fr;
    gap:8px;
  }
  .lp-cinema .monitor-bullets span{
    width:100%;
    justify-content:flex-start;
  }
  .lp-cinema .homeoffice-float{
    min-height:0;
  }
}

/* Very small phones */
@media(max-width:430px){
  .lp-cinema .cinema-step{
    padding:18px;
  }
  .lp-cinema .workspace-visual{
    width:84px;
    height:84px;
  }
  .lp-cinema .person-emoji{
    width:58px;
    height:58px;
    font-size:32px;
  }
  .lp-cinema .workspace-mini-laptop{
    width:34px;
    height:34px;
    font-size:18px;
  }
}
</style>
</head>
<body>
${body}
<script nonce="${nonce}">

(function(){
  const forms=document.querySelectorAll(".image-form");
  forms.forEach(form=>{
    const input=form.querySelector(".image-input");
    const hidden=form.querySelector(".image-data");
    const preview=form.querySelector(".preview");
    if(input){
      input.addEventListener("change",async()=>{
        if(!input.files||!input.files[0]){hidden.value="";preview.style.display="none";return}
        try{
          const data=await compressImage(input.files[0]);
          hidden.value=data;
          preview.src=data;
          preview.style.display="block";
        }catch(e){
          alert(e.message);
          input.value="";
          hidden.value="";
          preview.style.display="none";
        }
      });
    }
  });

  document.querySelectorAll(".reward-input,.slots-input").forEach(el=>{
    el.addEventListener("input",()=>{
      const form=el.closest("form");
      const reward=Number(form.querySelector(".reward-input")?.value||0);
      const slots=Number(form.querySelector(".slots-input")?.value||0);
      const budget=form.querySelector(".budget");
      if(budget){
        const porPessoa=Math.round(reward*1.20*100)/100;
        const total=Math.round(porPessoa*slots*100)/100;
        budget.textContent="Custo final da missão: "+new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(total);
      }
    });
  });


  document.querySelectorAll("form[method='post']").forEach(form=>{
    form.addEventListener("submit",e=>{
      if(form.dataset.submitting==="1"){
        e.preventDefault();
        return;
      }
      form.dataset.submitting="1";
      const btn=form.querySelector("button[type='submit'],button:not([type])");
      if(btn){
        btn.dataset.originalText=btn.textContent;
        btn.disabled=true;
        btn.textContent="Processando…";
      }
    });
  });

  document.querySelectorAll(".copy-pix").forEach(btn=>{
    btn.addEventListener("click",async()=>{
      const value=btn.dataset.copy||"";
      if(!value)return;
      try{
        await navigator.clipboard.writeText(value);
        const old=btn.textContent;
        btn.textContent="Código copiado ✓";
        setTimeout(()=>btn.textContent=old,1800);
      }catch{
        const area=btn.closest(".pix-charge-panel")?.querySelector(".pix-payload");
        if(area){area.focus();area.select();document.execCommand("copy");}
      }
    });
  });

  const reveals=[...document.querySelectorAll(".reveal")];
  if(reveals.length){
    if("IntersectionObserver" in window){
      const io=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },{threshold:.14,rootMargin:"0px 0px -6% 0px"});
      reveals.forEach(el=>io.observe(el));
    }else{
      reveals.forEach(el=>el.classList.add("is-visible"));
    }
  }

  const cinemaHeader=document.querySelector(".cinema-header");
  if(cinemaHeader){
    let ticking=false;
    const onScroll=()=>{
      if(ticking)return;
      ticking=true;
      requestAnimationFrame(()=>{
        cinemaHeader.style.background=window.scrollY>40
          ?"rgba(10,10,10,.94)"
          :"linear-gradient(180deg,rgba(10,10,10,.78),rgba(10,10,10,.16),transparent)";
        ticking=false;
      });
    };
    window.addEventListener("scroll",onScroll,{passive:true});
  }

  async function compressImage(file){
    if(file.size>8*1024*1024) throw new Error("Escolha uma imagem de até 8 MB.");
    const bmp=await createImageBitmap(file);
    const max=900;
    let w=bmp.width,h=bmp.height;
    if(Math.max(w,h)>max){
      const k=max/Math.max(w,h);
      w=Math.round(w*k);h=Math.round(h*k);
    }
    const c=document.createElement("canvas");
    c.width=w;c.height=h;
    c.getContext("2d").drawImage(bmp,0,0,w,h);
    let q=.76,data="";
    for(let i=0;i<8;i++){
      data=c.toDataURL("image/jpeg",q);
      if(data.length<=190000) break;
      q-=.08;
    }
    if(data.length>200000) throw new Error("Não consegui reduzir a imagem. Escolha uma imagem menor.");
    return data;
  }
})();
</script>
</body></html>`, {
    status,
    headers: {
      "content-type":"text/html; charset=UTF-8",
      "cache-control":"no-store",
      "x-content-type-options":"nosniff",
      "x-frame-options":"DENY",
      "referrer-policy":"strict-origin-when-cross-origin",
      "permissions-policy":"camera=(), microphone=(), geolocation=(), payment=(), usb=()",
      "strict-transport-security":"max-age=31536000; includeSubDomains",
      "cross-origin-opener-policy":"same-origin",
      "cross-origin-resource-policy":"same-origin",
      "content-security-policy":`default-src 'none'; img-src 'self' data:; style-src 'nonce-${nonce}' 'unsafe-inline'; script-src 'nonce-${nonce}'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'; object-src 'none'; upgrade-insecure-requests`
    }
  });
}
