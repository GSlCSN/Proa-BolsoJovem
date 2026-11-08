const P = { home: "M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z", swap: "M17 3l4 4-4 4M21 7H8M7 21l-4-4 4-4M3 17h13", chart: "M3 21h18M6 17v-5M11 17V8M16 17v-8M21 17V4", target: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z", set: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6", book: "M2 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H2zM22 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z", calc: "M5 3h14v18H5zM8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01", bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0", plus: "M12 5v14M5 12h14", minus: "M5 12h14", pencil: "M4 20h4L19 9l-4-4L4 16zM13 7l4 4", trash: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3", star: "M12 2l3 7 7 .6-5.3 4.7 1.7 7.2L12 17.8 5.6 21.5l1.7-7.2L2 9.6 9 9z", bulb: "M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.8 1 1.5 1 2.5h6c0-1 .3-1.7 1-2.5A6 6 0 0 0 12 3z", case: "M3 7h18v13H3zM8 7V4h8v3M3 13h18", food: "M6 3v8M10 3v8M6 7h4M8 11v10M17 3c-2 2-2 6 0 8v10", bus: "M5 4h14v13H5zM5 11h14M8 20v-3M16 20v-3", bag: "M5 8h14l-1 12H6zM9 8a3 3 0 0 1 6 0", heart: "M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z", dots: "M5 12h.01M12 12h.01M19 12h.01", trophy: "M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H3v1a4 4 0 0 0 4 4M17 6h4v1a4 4 0 0 1-4 4", arrow: "M5 12h14M13 6l6 6-6 6", user: "M20 21a8 8 0 0 0-16 0M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", out: "M9 21H5V3h4M16 17l5-5-5-5M21 12H9", sun: "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5", moon: "M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z", ok: "M5 12l5 5 9-10" };
const ic = (n, c = "") => `<svg class="i ${c}" viewBox="0 0 24 24"><path d="${P[n]}"/></svg>`;
const $ = s => document.querySelector(s);
const brl = v => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const num = v => { const n = parseFloat(v); return isFinite(n) ? Math.round(n * 100) / 100 : NaN };
const CATS = { "Alimentação": ["#d4af37", "food"], "Transporte": ["#f1d77a", "bus"], "Lazer": ["#c4c6ce", "star"], "Compras": ["#9a9ca5", "bag"], "Moradia": ["#a67c00", "home"], "Saúde": ["#e7cf8f", "heart"], "Outros": ["#6b6d77", "dots"] };
const TIPS = ["Evite compras por impulso. Pense se você realmente precisa daquilo agora.", "Guarde primeiro, gaste depois: separe uma parte da renda assim que ela entrar.", "Anote cada gasto, até os pequenos. Eles somam rápido no fim do mês.", "Uma reserva de emergência vale de 3 a 6 meses dos seus gastos."];
const LESSONS = ["O que é orçamento?", "Juros compostos na prática", "Reserva de emergência", "Inflação e poder de compra", "Dívidas e cartão de crédito", "Primeiros passos para investir"];
const CHALL = ["Fique 7 dias sem gastos supérfluos.", "Guarde R$ 5 por dia durante uma semana.", "Anote todos os gastos de hoje, até o cafezinho.", "Compare preços antes da próxima compra."];
/* ---------- estado ---------- */
const KEY = "bj-app-v1", seed = () => ({ name: "Lucas Silva", income: 1200, moves: [], goals: [{ id: "g1", name: "Comprar um notebook", target: 3000, saved: 1200, due: "2026-12" }, { id: "g2", name: "Viajar nas férias", target: 1500, saved: 1125, due: "2027-01" }], lessons: [], set: { theme: "dark", size: "m", bold: false, fx: true } });
let D = seed(); try { const r = JSON.parse(localStorage.getItem(KEY)); if (r && r.set) D = { ...seed(), ...r, set: { ...seed().set, ...r.set } } } catch (e) { }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(D)) } catch (e) { } };
const now = new Date(), iso = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
const d1 = iso(new Date(now.getFullYear(), now.getMonth(), 1)), d2 = iso(new Date(now.getFullYear(), now.getMonth() + 1, 0));
const dl = d => { const [y, m, x] = d.split("-").map(Number); return new Date(y, m - 1, x).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }) };
const T = () => { const s = t => D.moves.filter(m => m.t === t).reduce((a, m) => a + m.v, 0), inc = D.income + s("in"), out = s("out"); return { inc, out, bal: inc - out, pct: inc > 0 ? out / inc * 100 : out ? 100 : 0 } };
const gp = g => Math.min(100, Math.round(g.saved / g.target * 100));
/* ---------- util UI ---------- */
function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove("on"), 2200) }
let cb = null;
function form({ title, sub = "", fields = [], ok = "Salvar", danger, onOk }) {
    $("#dt").textContent = title; $("#dp").textContent = sub;
    $("#dfl").innerHTML = fields.map(f => `<label class="fld">${f.label}${f.opts ? `<select name="${f.id}">${f.opts.map(o => `<option ${o === f.value ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>` : `<input name="${f.id}" type="${f.type || "text"}" ${f.min != null ? `min="${f.min}"` : ""} ${f.max ? `max="${f.max}"` : ""} ${f.type === "number" ? 'step="0.01" inputmode="decimal"' : 'maxlength="40"'} value="${esc(f.value ?? "")}" ${f.req ? "required" : ""}>`}</label>`).join("");
    $("#dok").className = "btn " + (danger ? "danger" : "gold"); $("#dok").textContent = ok; cb = onOk; $("#dlg").showModal();
    const f = $("#dfl input,#dfl select"); if (f) f.focus();
}
$("#df").addEventListener("submit", e => { e.preventDefault(); if (cb(Object.fromEntries(new FormData(e.target))) !== false) $("#dlg").close() });
$("#dcx").addEventListener("click", () => $("#dlg").close());
$("#dlg").addEventListener("click", e => { if (e.target.id === "dlg") $("#dlg").close() });
function gate(t, p, b, fn) { $("#gt").textContent = t; $("#gp").textContent = p; $("#gb").textContent = b; $("#gb").onclick = () => { $("#gate").classList.remove("on"); fn() }; $("#gate").classList.add("on") }
document.addEventListener("pointerdown", e => { /* efeito de clique (ripple dourado) */
    if (!D.set.fx) return; const el = e.target.closest(".btn,.tile,.nv,.ib,.x,.seg button,.lesson,.ed"); if (!el) return;
    const r = el.getBoundingClientRect(), s = document.createElement("span"); s.className = "rp"; s.style.left = e.clientX - r.left + "px"; s.style.top = e.clientY - r.top + "px";
    if (getComputedStyle(el).position === "static") el.style.position = "relative"; el.style.overflow = "hidden"; el.appendChild(s); s.addEventListener("animationend", () => s.remove());
});
/* ---------- formulários ---------- */
const catOpts = () => Object.keys(CATS);
function newMove(t) {
    form({
        title: t === "in" ? "Nova entrada" : "Nova saída", sub: t === "in" ? "Entra na sua renda do mês." : "Soma nas saídas e desconta do saldo.", ok: "Adicionar", fields: [{ id: "cat", label: "Categoria", opts: t === "in" ? ["Renda extra"] : catOpts() }, { id: "v", label: "Valor (R$)", type: "number", min: .01, req: 1 }, { id: "desc", label: "Descrição (opcional)" }, { id: "date", label: "Data", type: "date", min: d1, max: d2, value: iso(now), req: 1 }],
        onOk: v => { const n = num(v.v); if (!(n > 0)) return false; D.moves.push({ id: Date.now() + "", ts: Date.now(), t, cat: v.cat, desc: v.desc.trim(), v: n, date: v.date }); save(); render(); toast(t === "in" ? "Entrada adicionada" : "Saída adicionada") }
    })
}
function editIncome() { form({ title: "Quanto você recebe por mês?", sub: "Base do seu saldo do mês.", fields: [{ id: "v", label: "Valor mensal (R$)", type: "number", min: 0, value: D.income, req: 1 }], onOk: v => { const n = num(v.v); if (!(n >= 0)) return false; D.income = n; save(); render(); toast("Renda atualizada") } }) }
function newGoal() { form({ title: "Nova meta", ok: "Criar meta", fields: [{ id: "name", label: "Nome da meta", req: 1 }, { id: "target", label: "Valor alvo (R$)", type: "number", min: 1, req: 1 }, { id: "saved", label: "Já guardado (R$)", type: "number", min: 0, value: 0 }, { id: "due", label: "Prazo", type: "month", req: 1 }], onOk: v => { const t = num(v.target), s = num(v.saved) || 0; if (!(t > 0) || !v.name.trim()) return false; D.goals.push({ id: Date.now() + "", name: v.name.trim(), target: t, saved: s, due: v.due }); save(); render(); toast("Meta criada") } }) }
/* ---------- telas ---------- */
const row = (m, del) => { const c = CATS[m.cat] || CATS.Outros; return `<div class="row"><span class="ico ${m.t}">${ic(m.t === "in" ? "case" : c[1])}</span><div class="t"><b>${esc(m.cat)}</b><span class="mu">${m.desc ? esc(m.desc) + " • " : ""}${m.t === "in" ? "Entrada" : "Saída"}</span></div><span class="mu">${dl(m.date)}</span><span class="amt ${m.t}">${m.t === "in" ? "+" : "-"} ${brl(m.v)}</span>${del ? `<button class="x" data-act="del" data-id="${m.id}" aria-label="Excluir">${ic("trash")}</button>` : ""}</div>` };
const sorted = () => [...D.moves].sort((a, b) => b.date.localeCompare(a.date) || b.ts - a.ts);
const goalRow = g => `<div class="card goal"><span class="ico">${ic("target")}</span><div><b>${esc(g.name)}</b><div class="mu">${brl(g.saved)} de ${brl(g.target)} • até ${g.due.split("-").reverse().join("/")}</div><div class="bar"><i style="width:${gp(g)}%"></i></div></div><div style="text-align:right"><div class="pct gt">${gp(g)}%</div><button class="btn ghost sm" data-act="gadd" data-id="${g.id}">${ic("plus")}Guardar</button> <button class="x" data-act="gdel" data-id="${g.id}" aria-label="Excluir meta">${ic("trash")}</button></div></div>`;
let F = { t: "all", c: "all" };
const V = {
    inicio() {
        const t = T(), avg = D.goals.length ? Math.round(D.goals.reduce((a, g) => a + gp(g), 0) / D.goals.length) : 0;
        let acc = D.income; const pts = [acc];[...D.moves].sort((a, b) => a.date.localeCompare(b.date) || a.ts - b.ts).forEach(m => { acc += m.t === "in" ? m.v : -m.v; pts.push(acc) }); if (pts.length < 2) pts.push(pts[0]);
        const mn = Math.min(...pts), mx = Math.max(...pts), r = mx - mn, pl = pts.map((v, i) => i * 100 / (pts.length - 1) + "," + (r ? 4 + (1 - (v - mn) / r) * 24 : 16)).join(" ");
        const tile = (a, i, l) => `<button class="tile" ${a.startsWith("go:") ? `data-go="${a.slice(3)}"` : `data-act="${a}"`}><span class="bd">${ic(i)}</span>${l}</button>`;
        return `<div class="col"><div class="bal"><small>Seu saldo do mês</small><strong>${brl(t.bal)}</strong><small>${t.bal < 0 ? "Saldo negativo" : Math.round(Math.max(0, 100 - t.pct)) + "% da renda livre"} • recebe ${brl(D.income)}/mês</small><svg class="sp" viewBox="0 0 100 32" preserveAspectRatio="none"><polyline points="${pl}" fill="none" stroke="rgba(26,19,0,.7)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg><button class="ed" data-act="inc" aria-label="Alterar renda">${ic("pencil")}</button></div>
 <div class="tiles">${tile("out", "minus", "Nova saída")}${tile("in", "plus", "Nova entrada")}${tile("goal", "target", "Nova meta")}${tile("inc", "pencil", "Alterar renda")}${tile("go:simulador", "calc", "Simular")}${tile("go:educacao", "book", "Aprender")}</div>
 <div class="g2c"><div class="col"><div class="card"><h3>${ic("trophy")}Seu progresso nas metas</h3><div class="row" style="border:0"><b class="gt" style="font-size:1.6rem">${avg}%</b><div style="flex:1"><div class="bar"><i style="width:${avg}%"></i></div><span class="mu">${D.goals.length ? "Continue assim!" : "Crie sua primeira meta."}</span></div><button class="btn ghost sm" data-go="metas">Ver metas</button></div></div>
 <div class="card"><h3>${ic("swap")}Últimas movimentações</h3>${D.moves.length ? sorted().slice(0, 4).map(m => row(m)).join("") : `<p class="empty">Nada lançado ainda. Use os atalhos acima.</p>`}<button class="btn ghost sm" data-go="movimentacoes" style="margin-top:.6rem">Ver todas ${ic("arrow")}</button></div></div>
 <div class="col"><div class="g3" style="grid-template-columns:1fr 1fr"><div class="card mini in"><span class="mu">Entradas</span><b>${brl(t.inc)}</b></div><div class="card mini out"><span class="mu">Saídas</span><b>${brl(t.out)}</b></div></div>
 <div class="card"><h3>${ic("bulb")}<span class="gt">Dica do dia</span></h3><p>${TIPS[(now.getDate()) % TIPS.length]}</p></div></div></div></div>`
    },
    movimentacoes() {
        const t = T(); let l = sorted().filter(m => (F.t === "all" || m.t === F.t) && (F.c === "all" || m.cat === F.c));
        return `<div class="col"><div class="g3"><div class="card mini in"><span class="mu">Entradas</span><b>${brl(t.inc)}</b></div><div class="card mini out"><span class="mu">Despesas</span><b>${brl(t.out)}</b></div><div class="card mini"><span class="mu">Saldo</span><b ${t.bal < 0 ? 'class="dz"' : ""}>${brl(t.bal)}</b></div></div>
 <div class="card"><div class="flt"><select data-f="t" aria-label="Tipo"><option value="all">Todas</option><option value="in" ${F.t === "in" ? "selected" : ""}>Entradas</option><option value="out" ${F.t === "out" ? "selected" : ""}>Saídas</option></select><select data-f="c" aria-label="Categoria"><option value="all">Todas as categorias</option>${[...catOpts(), "Renda extra"].map(c => `<option ${F.c === c ? "selected" : ""}>${c}</option>`).join("")}</select></div>
 ${(F.t !== "out" && F.c === "all" ? `<div class="row"><span class="ico in">${ic("case")}</span><div class="t"><b>Salário</b><span class="mu">Renda mensal • Entrada</span></div><span class="mu">${dl(d1)}</span><span class="amt in">+ ${brl(D.income)}</span><button class="x" data-act="inc" aria-label="Alterar renda">${ic("pencil")}</button></div>` : "")}
 ${l.length ? l.map(m => row(m, 1)).join("") : `<p class="empty">Nenhuma movimentação neste filtro.</p>`}</div></div>`
    },
    relatorios() {
        const t = T(), mx = Math.max(t.inc, t.out, 1), by = {}; D.moves.filter(m => m.t === "out").forEach(m => by[m.cat] = (by[m.cat] || 0) + m.v); const ls = Object.entries(by).sort((a, b) => b[1] - a[1]);
        return `<div class="col"><div class="g2c" style="grid-template-columns:1fr 1fr"><div class="card"><h3>Resumo do período</h3><div class="row"><span class="mu" style="flex:1">Entradas</span><b class="amt in">${brl(t.inc)}</b></div><div class="row"><span class="mu" style="flex:1">Despesas</span><b class="amt out">${brl(t.out)}</b></div><div class="row"><span class="mu" style="flex:1">Saldo</span><b ${t.bal < 0 ? 'class="dz"' : ""}>${brl(t.bal)}</b></div><div class="row"><span class="mu" style="flex:1">Renda usada</span><b>${Math.round(t.pct)}%</b></div></div>
 <div class="card"><h3>Entradas vs Despesas</h3><div class="bars"><div style="height:${t.inc / mx * 100}%"></div><div class="o" style="height:${t.out / mx * 100}%"></div></div><div class="lbl"><span>Entradas</span><span>Despesas</span></div></div></div>
 <div class="card"><h3>Categorias de gastos</h3>${ls.length ? ls.map(([n, v]) => `<div><div class="row" style="border:0;padding:.3rem 0"><span style="flex:1">${esc(n)}</span><span class="mu">${brl(v)} • ${Math.round(v / t.out * 100)}%</span></div><div class="bar"><i style="width:${v / t.out * 100}%;background:${(CATS[n] || CATS.Outros)[0]}"></i></div></div>`).join("") : `<p class="empty">Lance saídas para ver seus gastos por categoria.</p>`}</div></div>`
    },
    metas() { return `<div class="col">${D.goals.length ? D.goals.map(goalRow).join("") : `<div class="card empty">Você ainda não tem metas. Crie a primeira!</div>`}</div>` },
    educacao() {
        const d = D.lessons.length, p = Math.round(d / LESSONS.length * 100);
        return `<div class="col"><div class="edc"><div class="card">${ic("book")}<b>Conceitos básicos</b><span class="mu">Entenda juros, inflação e orçamento.</span><button class="btn gold sm" data-act="les">Acessar</button></div><div class="card">${ic("calc")}<b>Simulador</b><span class="mu">Teste na prática o que aprendeu.</span><button class="btn gold sm" data-go="simulador">Acessar</button></div><div class="card">${ic("trophy")}<b>Desafios</b><span class="mu">Responda e ganhe conquistas.</span><button class="btn gold sm" data-act="chall">Acessar</button></div></div>
 <div class="card" id="les"><h3>Sua jornada de aprendizado • <span class="gt">${p}%</span></h3><div class="bar"><i style="width:${p}%"></i></div>${LESSONS.map((l, i) => `<button class="lesson" data-act="lesson" data-id="${i}"><span class="chk ${D.lessons.includes(i) ? "on" : ""}">${D.lessons.includes(i) ? ic("ok") : ""}</span>${l}</button>`).join("")}</div></div>`
    },
    simulador() { return `<div class="g2c" style="grid-template-columns:1fr 1.3fr"><div class="card" id="sim"><h3>Parâmetros</h3><label class="fld">Valor inicial (R$)<input id="s1" type="number" min="0" step="0.01" value="${SIM.p}"></label><label class="fld">Aporte mensal (R$)<input id="s2" type="number" min="0" step="0.01" value="${SIM.a}"></label><label class="fld">Prazo (meses)<input id="s3" type="number" min="1" max="600" value="${SIM.m}"></label><p class="mu">Cenários anuais: alto +10%, estável +6%, queda -10%. Simulação educativa, não é recomendação de investimento.</p></div><div class="card"><h3>Resultados</h3><div id="simRes">${simRes()}</div></div></div>` },
    configuracoes() {
        const s = D.set, seg = (k, o) => `<div class="seg">${o.map(([v, l]) => `<button data-act="set" data-id="${k}" data-v="${v}" class="${String(s[k]) === v ? "on" : ""}">${l}</button>`).join("")}</div>`, sw = (k, l, d) => `<div class="set"><div><b>${l}</b><div class="mu">${d}</div></div><button class="sw" role="switch" aria-checked="${!!s[k]}" aria-label="${l}" data-act="tog" data-id="${k}"></button></div>`;
        return `<div class="col"><div class="card"><h3>${ic("set")}Aparência</h3><div class="set"><b>Tema</b>${seg("theme", [["light", "Claro"], ["dark", "Escuro"], ["auto", "Automático"]])}</div><div class="set"><b>Tamanho do texto</b>${seg("size", [["s", "Pequeno"], ["m", "Médio"], ["l", "Grande"]])}</div>${sw("bold", "Texto em negrito", "Deixa todas as letras mais grossas.")}${sw("fx", "Efeitos ao clicar", "Brilho dourado e animações nos toques.")}</div>
 <div class="card"><h3>${ic("user")}Conta</h3><div class="set"><span>${esc(D.name)}</span><button class="btn ghost sm" data-act="prof">Alterar perfil</button></div><div class="set"><span>Renda mensal: ${brl(D.income)}</span><button class="btn ghost sm" data-act="inc">Alterar renda</button></div><div class="set"><span>Sair da conta</span><button class="btn ghost sm" data-act="out">${ic("out")}Sair</button></div><div class="set"><div><b class="dz">Excluir conta</b><div class="mu">Apaga todos os seus dados deste aparelho.</div></div><button class="btn danger sm" data-act="delacc">${ic("trash")}Excluir</button></div></div>
 <p class="mu" style="text-align:center">Bolso Jovem • versão 1.0.0</p></div>`}
};
let SIM = { p: 500, a: 100, m: 12 };
function simRes() {
    const rs = [["Cenário alto (+10% a.a.)", .10, ""], ["Cenário estável (+6% a.a.)", .06, "eq"], ["Cenário de queda (-10% a.a.)", -.10, "dn"]], inv = SIM.p + SIM.a * SIM.m;
    return `<p class="mu" style="margin-bottom:.6rem">Total investido: <b>${brl(inv)}</b></p>` + rs.map(([n, a, c]) => { const r = Math.pow(1 + a, 1 / 12) - 1, f = Math.pow(1 + r, SIM.m), fv = SIM.p * f + SIM.a * (r ? (f - 1) / r : SIM.m), g = fv - inv; return `<div class="sc ${c}"><b>${n}</b><b>${brl(fv)}</b><span class="mu">Rendimento</span><span class="${g < 0 ? "dz" : "amt in"}">${g < 0 ? "-" : "+"} ${brl(Math.abs(g))}</span></div>` }).join("")
}
document.addEventListener("input", e => { if (!e.target.closest("#sim")) return; SIM = { p: Math.max(0, num($("#s1").value) || 0), a: Math.max(0, num($("#s2").value) || 0), m: Math.min(600, Math.max(1, parseInt($("#s3").value) || 1)) }; $("#simRes").innerHTML = simRes() });
document.addEventListener("change", e => { const f = e.target.dataset.f; if (f) { F[f] = e.target.value; render() } });
/* ---------- rotas e render ---------- */
const NAV = [["inicio", "home", "Início"], ["movimentacoes", "swap", "Movimentações"], ["relatorios", "chart", "Relatórios"], ["metas", "target", "Metas"], ["educacao", "book", "Educação"], ["simulador", "calc", "Simulador"], ["configuracoes", "set", "Configurações"]];
const first = () => D.name.split(" ")[0];
const HD = () => ({ inicio: ["Olá, " + first() + "!", "Aprenda, organize e construa um futuro financeiro melhor.", "Nova movimentação", "out"], movimentacoes: ["Movimentações", "Acompanhe suas receitas e despesas.", "Nova movimentação", "out"], relatorios: ["Relatórios financeiros", "Resumo visual do seu mês."], metas: ["Minhas metas", "Defina objetivos e acompanhe seu progresso.", "Nova meta", "goal"], educacao: ["Educação financeira", "Aprenda sobre dinheiro no seu ritmo."], simulador: ["Simulador de investimentos", "Descubra como o dinheiro pode crescer."], configuracoes: ["Configurações", "Personalize sua experiência no Bolso Jovem."] });
let route = "inicio";
function go(r) { route = r; location.hash = r; render(); window.scrollTo({ top: 0, behavior: "smooth" }) }
function render() {
    const h = HD()[route] || HD().inicio;
    $("#h1").textContent = h[0]; $("#h2").textContent = h[1]; $("#act").innerHTML = h[2] ? `<button class="btn gold" data-act="${h[3]}">${ic("plus")}${h[2]}</button>` : "";
    $("#nav").innerHTML = NAV.map(([k, i, l]) => `<button class="nv ${k === route ? "on" : ""}" data-go="${k}" ${k === route ? 'aria-current="page"' : ""}>${ic(i)}<span>${l}</span></button>`).join("");
    $("#view").innerHTML = V[route](); $("#view").style.animation = "none"; $("#view").offsetHeight; $("#view").style.animation = "";
    $("#nm").textContent = D.name; $("#av").textContent = D.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
    const s = D.set, rt = document.documentElement; rt.dataset.theme = s.theme === "auto" ? (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark") : s.theme; rt.dataset.size = s.size; rt.dataset.bold = s.bold ? "on" : "off"; document.body.dataset.fx = s.fx ? "on" : "off";
    $("#thm").innerHTML = ic(rt.dataset.theme === "dark" ? "sun" : "moon");
}
/* ---------- ações ---------- */
const A = {
    out: () => newMove("out"), in: () => newMove("in"), inc: editIncome, goal: newGoal,
    del: id => { D.moves = D.moves.filter(m => m.id !== id); save(); render(); toast("Movimentação excluída") },
    gdel: id => { D.goals = D.goals.filter(g => g.id !== id); save(); render(); toast("Meta excluída") },
    gadd: id => { const g = D.goals.find(x => x.id === id); form({ title: "Guardar dinheiro", sub: g.name, ok: "Guardar", fields: [{ id: "v", label: "Valor (R$)", type: "number", min: .01, req: 1 }], onOk: v => { const n = num(v.v); if (!(n > 0)) return false; g.saved += n; save(); render(); toast(g.saved >= g.target ? "Meta concluída! 🎉" : "Valor guardado") } }) },
    lesson: id => { id = +id; D.lessons = D.lessons.includes(id) ? D.lessons.filter(x => x !== id) : [...D.lessons, id]; save(); render(); if (D.lessons.length === LESSONS.length) toast("Jornada completa! 🏆") },
    les: () => $("#les").scrollIntoView({ behavior: "smooth" }), chall: () => toast("Desafio: " + CHALL[Math.floor(Math.random() * CHALL.length)]),
    set: (k, v) => { D.set[k] = v; save(); render() }, tog: k => { D.set[k] = !D.set[k]; save(); render() },
    prof: () => form({ title: "Alterar perfil", fields: [{ id: "n", label: "Seu nome", value: D.name, req: 1 }], onOk: v => { if (!v.n.trim()) return false; D.name = v.n.trim(); save(); render(); toast("Perfil atualizado") } }),
    delacc: () => form({ title: "Excluir conta", sub: "Isso apaga todos os seus dados e não pode ser desfeito. Digite EXCLUIR para confirmar.", ok: "Excluir para sempre", danger: 1, fields: [{ id: "c", label: "Confirmação", req: 1 }], onOk: v => { if (v.c.trim().toUpperCase() !== "EXCLUIR") { toast("Digite EXCLUIR para confirmar"); return false } try { localStorage.removeItem(KEY) } catch (e) { } D = seed(); render(); gate("Conta excluída", "Todos os seus dados foram apagados deste aparelho.", "Criar nova conta", () => { save(); go("inicio") }) } })
};
A.logout = () => gate("Você saiu", "Seus dados continuam salvos neste aparelho.", "Entrar novamente", () => go("inicio"));
document.addEventListener("click", e => {
    const g = e.target.closest("[data-go]"); if (g) { go(g.dataset.go); return }
    const a = e.target.closest("[data-act]"); if (!a) return; const k = a.dataset.act === "out" && a.closest(".set") ? "logout" : a.dataset.act;
    if (k === "set") A.set(a.dataset.id, a.dataset.v); else A[k] && A[k](a.dataset.id)
});
$("#thm").addEventListener("click", () => { D.set.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; save(); render() });
addEventListener("hashchange", () => { const r = location.hash.slice(1); if (HD()[r] && r !== route) { route = r; render() } });
if (HD()[location.hash.slice(1)]) route = location.hash.slice(1);
render();