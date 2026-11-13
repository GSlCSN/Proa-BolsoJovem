// =============================================================
// BOLSO JOVEM - script principal
//
// O site é uma página única: o menu troca o conteúdo de <div id="view">
// sem recarregar a página. Os dados ficam salvos no localStorage.
//
// Índice:
//   1. Ícones                     8. Formulários (Create e Update)
//   2. Funções utilitárias        9. Pedaços de HTML reutilizados
//   3. Listas fixas              10. Telas (Read)
//   4. Dados e localStorage      11. Simulador
//   5. Datas                     12. Navegação e renderização
//   6. Cálculos                  13. Ações dos botões (inclui Delete)
//   7. Janela, aviso e efeitos   14. Eventos
// =============================================================


// -------------------------------------------------------------
// 1. ÍCONES
// Cada ícone é o desenho ("d") de um <path> SVG de 24x24.
// -------------------------------------------------------------
const CAMINHOS_ICONES = {
    home: "M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z",
    swap: "M17 3l4 4-4 4M21 7H8M7 21l-4-4 4-4M3 17h13",
    chart: "M3 21h18M6 17v-5M11 17V8M16 17v-8M21 17V4",
    target: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
    set: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6",
    book: "M2 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H2zM22 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z",
    calc: "M5 3h14v18H5zM8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01",
    bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0",
    plus: "M12 5v14M5 12h14",
    minus: "M5 12h14",
    pencil: "M4 20h4L19 9l-4-4L4 16zM13 7l4 4",
    trash: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
    star: "M12 2l3 7 7 .6-5.3 4.7 1.7 7.2L12 17.8 5.6 21.5l1.7-7.2L2 9.6 9 9z",
    bulb: "M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.8 1 1.5 1 2.5h6c0-1 .3-1.7 1-2.5A6 6 0 0 0 12 3z",
    case: "M3 7h18v13H3zM8 7V4h8v3M3 13h18",
    food: "M6 3v8M10 3v8M6 7h4M8 11v10M17 3c-2 2-2 6 0 8v10",
    bus: "M5 4h14v13H5zM5 11h14M8 20v-3M16 20v-3",
    bag: "M5 8h14l-1 12H6zM9 8a3 3 0 0 1 6 0",
    heart: "M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z",
    dots: "M5 12h.01M12 12h.01M19 12h.01",
    trophy: "M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H3v1a4 4 0 0 0 4 4M17 6h4v1a4 4 0 0 1-4 4",
    arrow: "M5 12h14M13 6l6 6-6 6",
    user: "M20 21a8 8 0 0 0-16 0M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    out: "M9 21H5V3h4M16 17l5-5-5-5M21 12H9",
    sun: "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5",
    moon: "M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z",
    ok: "M5 12l5 5 9-10",
};

// Monta o <svg> de um ícone. Ex: icone("trash") devolve o desenho da lixeira.
function icone(nome, classeExtra = "") {
    return `<svg class="i ${classeExtra}" viewBox="0 0 24 24"><path d="${CAMINHOS_ICONES[nome]}"/></svg>`;
}


// -------------------------------------------------------------
// 2. FUNÇÕES UTILITÁRIAS
// -------------------------------------------------------------

// Atalho para document.querySelector.
function pegar(seletor) {
    return document.querySelector(seletor);
}

// 1200 vira "R$ 1.200,00".
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Troca caracteres especiais para o texto digitado pelo usuário
// nunca virar HTML de verdade (proteção contra injeção de código).
function escaparHtml(texto) {
    const trocas = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return String(texto).replace(/[&<>"']/g, (caractere) => trocas[caractere]);
}

// Converte o texto digitado em número com 2 casas decimais.
// Se não for um número, devolve NaN.
function lerNumero(texto) {
    const numero = parseFloat(texto);
    if (!isFinite(numero)) return NaN;
    return Math.round(numero * 100) / 100;
}


// -------------------------------------------------------------
// 3. LISTAS FIXAS
// -------------------------------------------------------------

// Categorias de saída: cor (usada nos relatórios) e ícone.
const CATEGORIAS = {
    "Alimentação": { cor: "#d4af37", icone: "food" },
    "Transporte": { cor: "#f1d77a", icone: "bus" },
    "Lazer": { cor: "#c4c6ce", icone: "star" },
    "Compras": { cor: "#9a9ca5", icone: "bag" },
    "Moradia": { cor: "#a67c00", icone: "home" },
    "Saúde": { cor: "#e7cf8f", icone: "heart" },
    "Outros": { cor: "#6b6d77", icone: "dots" },
};

const DICAS = [
    "Evite compras por impulso. Pense se você realmente precisa daquilo agora.",
    "Guarde primeiro, gaste depois: separe uma parte da renda assim que ela entrar.",
    "Anote cada gasto, até os pequenos. Eles somam rápido no fim do mês.",
    "Uma reserva de emergência vale de 3 a 6 meses dos seus gastos.",
];

const LICOES = [
    "O que é orçamento?",
    "Juros compostos na prática",
    "Reserva de emergência",
    "Inflação e poder de compra",
    "Dívidas e cartão de crédito",
    "Primeiros passos para investir",
];

const DESAFIOS = [
    "Fique 7 dias sem gastos supérfluos.",
    "Guarde R$ 5 por dia durante uma semana.",
    "Anote todos os gastos de hoje, até o cafezinho.",
    "Compare preços antes da próxima compra.",
];


// -------------------------------------------------------------
// 4. DADOS E LOCALSTORAGE
//
// Formato de cada item salvo:
//   movimentação: { id, ts (momento da criação), t ("in" = entrada, "out" = saída),
//                   cat (categoria), desc (descrição), v (valor), date ("2026-11-03") }
//   meta:         { id, name (nome), target (valor alvo), saved (já guardado), due (prazo "2026-12") }
// -------------------------------------------------------------
const CHAVE_STORAGE = "bj-app-v1";

// Dados de quem abre o site pela primeira vez.
function dadosIniciais() {
    return {
        name: "Lucas Silva",
        income: 1200, // renda mensal
        moves: [],    // movimentações
        goals: [      // metas
            { id: "g1", name: "Comprar um notebook", target: 3000, saved: 1200, due: "2026-12" },
            { id: "g2", name: "Viajar nas férias", target: 1500, saved: 1125, due: "2027-01" },
        ],
        lessons: [],  // índices das lições concluídas
        set: { theme: "dark", size: "m", bold: false, fx: true }, // preferências
    };
}

let dados = dadosIniciais();

// Carrega o que estiver salvo. O try/catch protege contra dados
// corrompidos ou localStorage bloqueado (aba anônima, por exemplo).
try {
    const salvos = JSON.parse(localStorage.getItem(CHAVE_STORAGE));
    if (salvos && salvos.set) {
        // Junta com os dados iniciais para não faltar nenhum campo.
        dados = { ...dadosIniciais(), ...salvos, set: { ...dadosIniciais().set, ...salvos.set } };
    }
} catch (erro) {
    // Mantém os dados iniciais.
}

function salvar() {
    try {
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(dados));
    } catch (erro) {
        // Sem localStorage: os dados duram só até fechar a página.
    }
}


// -------------------------------------------------------------
// 5. DATAS
// -------------------------------------------------------------
const hoje = new Date();

// Data no formato "2026-11-08" (o mesmo usado pelo <input type="date">).
function dataISO(data) {
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    return `${data.getFullYear()}-${mes}-${dia}`;
}

const PRIMEIRO_DIA_DO_MES = dataISO(new Date(hoje.getFullYear(), hoje.getMonth(), 1));
const MES_ATUAL = dataISO(hoje).slice(0, 7); // ex: "2026-11"

// "2026-11-03" vira "03/11".
function formatarDataCurta(textoData) {
    const [ano, mes, dia] = textoData.split("-").map(Number);
    return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}


// -------------------------------------------------------------
// 6. CÁLCULOS
// -------------------------------------------------------------

// Só as movimentações do mês atual (é o que conta nos totais).
function movimentacoesDoMes() {
    return dados.moves.filter((mov) => mov.date.startsWith(MES_ATUAL));
}

// Todas as movimentações, da mais nova para a mais antiga.
function movimentacoesOrdenadas() {
    return [...dados.moves].sort((a, b) => b.date.localeCompare(a.date) || b.ts - a.ts);
}

// Entradas (renda + entradas extras), saídas, saldo e % da renda já usada no mês.
function calcularTotais() {
    let entradasExtras = 0;
    let saidas = 0;

    for (const mov of movimentacoesDoMes()) {
        if (mov.t === "in") {
            entradasExtras += mov.v;
        } else {
            saidas += mov.v;
        }
    }

    const entradas = dados.income + entradasExtras;

    let porcentagemUsada = 0;
    if (entradas > 0) {
        porcentagemUsada = (saidas / entradas) * 100;
    } else if (saidas > 0) {
        porcentagemUsada = 100;
    }

    return { entradas, saidas, saldo: entradas - saidas, porcentagemUsada };
}

// Quanto da meta já foi guardado, de 0 a 100.
function progressoMeta(meta) {
    return Math.min(100, Math.round((meta.saved / meta.target) * 100));
}

// Média do progresso de todas as metas.
function mediaDasMetas() {
    if (dados.goals.length === 0) return 0;
    const soma = dados.goals.reduce((total, meta) => total + progressoMeta(meta), 0);
    return Math.round(soma / dados.goals.length);
}


// -------------------------------------------------------------
// 7. JANELA (FORMULÁRIO), AVISO E EFEITOS
// -------------------------------------------------------------

// Mensagem curta que aparece embaixo da tela por 2,2 segundos.
function mostrarAviso(mensagem) {
    const aviso = pegar("#toast");
    aviso.textContent = mensagem;
    aviso.classList.add("on");
    clearTimeout(mostrarAviso.temporizador);
    mostrarAviso.temporizador = setTimeout(() => aviso.classList.remove("on"), 2200);
}

// Função que roda quando o formulário da janela é enviado.
let funcaoDoFormulario = null;

/*
  Abre a janela (<dialog>) com um formulário montado a partir de "campos".
  Cada campo: { id, label, type, value, min, max, req (obrigatório), opts (lista => vira <select>) }
  aoConfirmar recebe os valores digitados. Se ela devolver um TEXTO,
  esse texto aparece como erro e a janela continua aberta.
*/
function abrirFormulario({ titulo, subtitulo = "", campos = [], textoBotao = "Salvar", perigo = false, aoConfirmar }) {
    pegar("#dt").textContent = titulo;
    pegar("#dp").textContent = subtitulo;
    pegar("#dfl").innerHTML = campos.map(montarCampo).join("");

    const botaoOk = pegar("#dok");
    botaoOk.className = "btn " + (perigo ? "danger" : "gold");
    botaoOk.textContent = textoBotao;

    funcaoDoFormulario = aoConfirmar;
    pegar("#dlg").showModal();

    const primeiroCampo = pegar("#dfl input, #dfl select");
    if (primeiroCampo) primeiroCampo.focus();
}

// HTML de um campo: <select> se tiver opções, senão <input>.
function montarCampo(campo) {
    let controle;

    if (campo.opts) {
        const opcoes = campo.opts
            .map((opcao) => `<option ${opcao === campo.value ? "selected" : ""}>${escaparHtml(opcao)}</option>`)
            .join("");
        controle = `<select name="${campo.id}">${opcoes}</select>`;
    } else {
        const tipo = campo.type || "text";
        const atributos = [
            `name="${campo.id}"`,
            `type="${tipo}"`,
            campo.min != null ? `min="${campo.min}"` : "",
            campo.max ? `max="${campo.max}"` : "",
            tipo === "number" ? 'step="0.01" inputmode="decimal"' : 'maxlength="40"',
            `value="${escaparHtml(campo.value ?? "")}"`,
            campo.req ? "required" : "",
        ].join(" ");
        controle = `<input ${atributos}>`;
    }

    return `<label class="fld">${campo.label}${controle}</label>`;
}

// Tela cheia por cima de tudo (usada ao sair e ao excluir a conta).
function mostrarTelaCheia(titulo, texto, textoBotao, aoClicar) {
    pegar("#gt").textContent = titulo;
    pegar("#gp").textContent = texto;
    pegar("#gb").textContent = textoBotao;
    pegar("#gb").onclick = () => {
        pegar("#gate").classList.remove("on");
        aoClicar();
    };
    pegar("#gate").classList.add("on");
}

// Efeito de clique: um círculo dourado que cresce a partir do ponto clicado.
document.addEventListener("pointerdown", (evento) => {
    if (!dados.set.fx) return;

    const elemento = evento.target.closest(".btn, .tile, .nv, .ib, .x, .seg button, .lesson, .ed");
    if (!elemento) return;

    const area = elemento.getBoundingClientRect();
    const circulo = document.createElement("span");
    circulo.className = "rp";
    circulo.style.left = evento.clientX - area.left + "px";
    circulo.style.top = evento.clientY - area.top + "px";

    if (getComputedStyle(elemento).position === "static") elemento.style.position = "relative";
    elemento.style.overflow = "hidden";
    elemento.appendChild(circulo);
    circulo.addEventListener("animationend", () => circulo.remove());
});


// -------------------------------------------------------------
// 8. FORMULÁRIOS (CREATE e UPDATE)
// -------------------------------------------------------------

// Cria (sem "mov") ou edita (com "mov") uma movimentação.
// tipo: "in" (entrada) ou "out" (saída).
function formularioMovimentacao(tipo, mov) {
    const editando = Boolean(mov);
    const entrada = tipo === "in";

    let titulo = entrada ? "Nova entrada" : "Nova saída";
    if (editando) titulo = "Editar movimentação";

    abrirFormulario({
        titulo,
        subtitulo: entrada ? "Entra na sua renda do mês." : "Soma nas saídas e desconta do saldo.",
        textoBotao: editando ? "Salvar alterações" : "Adicionar",
        campos: [
            { id: "cat", label: "Categoria", opts: entrada ? ["Renda extra"] : Object.keys(CATEGORIAS), value: mov && mov.cat },
            { id: "v", label: "Valor (R$)", type: "number", min: 0.01, req: true, value: mov && mov.v },
            { id: "desc", label: "Descrição (opcional)", value: mov && mov.desc },
            { id: "date", label: "Data", type: "date", req: true, value: editando ? mov.date : dataISO(hoje) },
        ],
        aoConfirmar: (valores) => {
            const valor = lerNumero(valores.v);
            if (!(valor > 0)) return "Digite um valor maior que zero.";
            if (!valores.date) return "Escolha uma data.";

            const campos = { cat: valores.cat, desc: valores.desc.trim(), v: valor, date: valores.date };

            if (editando) {
                // UPDATE: troca os campos do item que já existe.
                Object.assign(mov, campos);
            } else {
                // CREATE: adiciona um item novo na lista.
                dados.moves.push({ id: String(Date.now()), ts: Date.now(), t: tipo, ...campos });
            }

            salvar();
            renderizar();

            if (editando) mostrarAviso("Movimentação atualizada");
            else mostrarAviso(entrada ? "Entrada adicionada" : "Saída adicionada");
        },
    });
}

// Botão "Nova movimentação": pergunta o tipo e depois abre o formulário certo.
function escolherTipoMovimentacao() {
    abrirFormulario({
        titulo: "Nova movimentação",
        subtitulo: "O que você quer lançar?",
        textoBotao: "Continuar",
        campos: [{ id: "tipo", label: "Tipo", opts: ["Saída", "Entrada"] }],
        aoConfirmar: (valores) => {
            const tipo = valores.tipo === "Entrada" ? "in" : "out";
            // setTimeout: espera esta janela fechar antes de abrir a próxima.
            setTimeout(() => formularioMovimentacao(tipo));
        },
    });
}

// Altera a renda mensal (a base do saldo).
function formularioRenda() {
    abrirFormulario({
        titulo: "Quanto você recebe por mês?",
        subtitulo: "Base do seu saldo do mês.",
        campos: [{ id: "v", label: "Valor mensal (R$)", type: "number", min: 0, req: true, value: dados.income }],
        aoConfirmar: (valores) => {
            const valor = lerNumero(valores.v);
            if (!(valor >= 0)) return "Digite um valor válido.";

            dados.income = valor;
            salvar();
            renderizar();
            mostrarAviso("Renda atualizada");
        },
    });
}

// Cria (sem "meta") ou edita (com "meta") uma meta.
function formularioMeta(meta) {
    const editando = Boolean(meta);

    abrirFormulario({
        titulo: editando ? "Editar meta" : "Nova meta",
        textoBotao: editando ? "Salvar alterações" : "Criar meta",
        campos: [
            { id: "name", label: "Nome da meta", req: true, value: meta && meta.name },
            { id: "target", label: "Valor alvo (R$)", type: "number", min: 1, req: true, value: meta && meta.target },
            { id: "saved", label: "Já guardado (R$)", type: "number", min: 0, value: editando ? meta.saved : 0 },
            { id: "due", label: "Prazo", type: "month", req: true, value: meta && meta.due },
        ],
        aoConfirmar: (valores) => {
            const alvo = lerNumero(valores.target);
            const guardado = lerNumero(valores.saved) || 0;
            const nome = valores.name.trim();
            if (!(alvo > 0) || !nome) return "Preencha o nome e um valor alvo maior que zero.";

            const campos = { name: nome, target: alvo, saved: guardado, due: valores.due };

            if (editando) {
                Object.assign(meta, campos);               // UPDATE
            } else {
                dados.goals.push({ id: String(Date.now()), ...campos }); // CREATE
            }

            salvar();
            renderizar();
            mostrarAviso(editando ? "Meta atualizada" : "Meta criada");
        },
    });
}


// -------------------------------------------------------------
// 9. PEDAÇOS DE HTML REUTILIZADOS
// -------------------------------------------------------------

// Uma linha da lista de movimentações. comAcoes = mostra editar/excluir.
function linhaMovimentacao(mov, comAcoes = false) {
    const entrada = mov.t === "in";
    const categoria = CATEGORIAS[mov.cat] || CATEGORIAS["Outros"];
    const nomeIcone = entrada ? "case" : categoria.icone;
    const descricao = mov.desc ? escaparHtml(mov.desc) + " • " : "";

    let botoes = "";
    if (comAcoes) {
        botoes = `
            <button class="x e" data-acao="editar" data-id="${mov.id}" aria-label="Editar">${icone("pencil")}</button>
            <button class="x" data-acao="excluir" data-id="${mov.id}" aria-label="Excluir">${icone("trash")}</button>`;
    }

    return `
        <div class="row">
            <span class="ico ${mov.t}">${icone(nomeIcone)}</span>
            <div class="t">
                <b>${escaparHtml(mov.cat)}</b>
                <span class="mu">${descricao}${entrada ? "Entrada" : "Saída"}</span>
            </div>
            <span class="mu">${formatarDataCurta(mov.date)}</span>
            <span class="amt ${mov.t}">${entrada ? "+" : "-"} ${formatarMoeda(mov.v)}</span>
            ${botoes}
        </div>`;
}

// A linha fixa do salário (renda mensal) no topo da lista.
function linhaSalario() {
    return `
        <div class="row">
            <span class="ico in">${icone("case")}</span>
            <div class="t"><b>Salário</b><span class="mu">Renda mensal • Entrada</span></div>
            <span class="mu">${formatarDataCurta(PRIMEIRO_DIA_DO_MES)}</span>
            <span class="amt in">+ ${formatarMoeda(dados.income)}</span>
            <button class="x" data-acao="alterar-renda" aria-label="Alterar renda">${icone("pencil")}</button>
        </div>`;
}

// O cartão de uma meta, com barra de progresso e botões.
function cartaoMeta(meta) {
    const progresso = progressoMeta(meta);
    const prazo = meta.due.split("-").reverse().join("/"); // "2026-12" vira "12/2026"

    return `
        <div class="card goal">
            <span class="ico">${icone("target")}</span>
            <div>
                <b>${escaparHtml(meta.name)}</b>
                <div class="mu">${formatarMoeda(meta.saved)} de ${formatarMoeda(meta.target)} • até ${prazo}</div>
                <div class="bar"><i style="width:${progresso}%"></i></div>
            </div>
            <div style="text-align:right">
                <div class="pct gt">${progresso}%</div>
                <button class="btn ghost sm" data-acao="guardar" data-id="${meta.id}">${icone("plus")}Guardar</button>
                <button class="x e" data-acao="editar-meta" data-id="${meta.id}" aria-label="Editar meta">${icone("pencil")}</button>
                <button class="x" data-acao="excluir-meta" data-id="${meta.id}" aria-label="Excluir meta">${icone("trash")}</button>
            </div>
        </div>`;
}

// Cartão pequeno com um título e um valor (Entradas, Saídas, Saldo).
function cartaoMini(classe, titulo, valor, valorNegativo = false) {
    return `
        <div class="card mini ${classe}">
            <span class="mu">${titulo}</span>
            <b ${valorNegativo ? 'class="dz"' : ""}>${formatarMoeda(valor)}</b>
        </div>`;
}

// Botão de atalho do Início. destino "ir:tela" navega; senão executa a ação.
function atalho(destino, nomeIcone, texto) {
    const atributo = destino.startsWith("ir:") ? `data-ir="${destino.slice(3)}"` : `data-acao="${destino}"`;
    return `<button class="tile" ${atributo}><span class="bd">${icone(nomeIcone)}</span>${texto}</button>`;
}

// Pontos da linha do cartão de saldo: o saldo depois de cada movimentação do mês.
function pontosDoGrafico() {
    let saldo = dados.income;
    const valores = [saldo];

    const doMes = movimentacoesDoMes().sort((a, b) => a.date.localeCompare(b.date) || a.ts - b.ts);
    for (const mov of doMes) {
        saldo += mov.t === "in" ? mov.v : -mov.v;
        valores.push(saldo);
    }
    if (valores.length < 2) valores.push(valores[0]); // linha reta se não houver nada

    const menor = Math.min(...valores);
    const maior = Math.max(...valores);
    const faixa = maior - menor;

    // Converte cada valor em "x,y" dentro de um desenho de 100x32.
    return valores
        .map((valor, i) => {
            const x = (i * 100) / (valores.length - 1);
            const y = faixa ? 4 + (1 - (valor - menor) / faixa) * 24 : 16;
            return x + "," + y;
        })
        .join(" ");
}


// -------------------------------------------------------------
// 10. TELAS (READ)
// Cada função devolve o HTML de uma tela.
// -------------------------------------------------------------

// Filtros da tela de Movimentações.
let filtros = { periodo: "mes", tipo: "all", categoria: "all" };

const TELAS = {
    inicio() {
        const totais = calcularTotais();
        const media = mediaDasMetas();

        let textoSaldo = Math.round(Math.max(0, 100 - totais.porcentagemUsada)) + "% da renda livre";
        if (totais.saldo < 0) textoSaldo = "Saldo negativo";

        let ultimas = `<p class="empty">Nada lançado ainda. Use os atalhos acima.</p>`;
        if (dados.moves.length > 0) {
            ultimas = movimentacoesOrdenadas().slice(0, 4).map((mov) => linhaMovimentacao(mov)).join("");
        }

        return `
        <div class="col">
            <div class="bal">
                <small>Seu saldo do mês</small>
                <strong>${formatarMoeda(totais.saldo)}</strong>
                <small>${textoSaldo} • recebe ${formatarMoeda(dados.income)}/mês</small>
                <svg class="sp" viewBox="0 0 100 32" preserveAspectRatio="none">
                    <polyline points="${pontosDoGrafico()}" fill="none" stroke="rgba(26,19,0,.7)" stroke-width="2.5"
                        stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
                </svg>
                <button class="ed" data-acao="alterar-renda" aria-label="Alterar renda">${icone("pencil")}</button>
            </div>

            <div class="tiles">
                ${atalho("nova-saida", "minus", "Nova saída")}
                ${atalho("nova-entrada", "plus", "Nova entrada")}
                ${atalho("nova-meta", "target", "Nova meta")}
                ${atalho("alterar-renda", "pencil", "Alterar renda")}
                ${atalho("ir:simulador", "calc", "Simular")}
                ${atalho("ir:educacao", "book", "Aprender")}
            </div>

            <div class="g2c">
                <div class="col">
                    <div class="card">
                        <h3>${icone("trophy")}Seu progresso nas metas</h3>
                        <div class="row" style="border:0">
                            <b class="gt" style="font-size:1.6rem">${media}%</b>
                            <div style="flex:1">
                                <div class="bar"><i style="width:${media}%"></i></div>
                                <span class="mu">${dados.goals.length ? "Continue assim!" : "Crie sua primeira meta."}</span>
                            </div>
                            <button class="btn ghost sm" data-ir="metas">Ver metas</button>
                        </div>
                    </div>

                    <div class="card">
                        <h3>${icone("swap")}Últimas movimentações</h3>
                        ${ultimas}
                        <button class="btn ghost sm" data-ir="movimentacoes" style="margin-top:.6rem">Ver todas ${icone("arrow")}</button>
                    </div>
                </div>

                <div class="col">
                    <div class="g3" style="grid-template-columns:1fr 1fr">
                        ${cartaoMini("in", "Entradas", totais.entradas)}
                        ${cartaoMini("out", "Saídas", totais.saidas)}
                    </div>
                    <div class="card">
                        <h3>${icone("bulb")}<span class="gt">Dica do dia</span></h3>
                        <p>${DICAS[hoje.getDate() % DICAS.length]}</p>
                    </div>
                </div>
            </div>
        </div>`;
    },

    movimentacoes() {
        const totais = calcularTotais();

        // Aplica os 3 filtros escolhidos nos <select>.
        const lista = movimentacoesOrdenadas().filter((mov) => {
            if (filtros.periodo === "mes" && !mov.date.startsWith(MES_ATUAL)) return false;
            if (filtros.tipo !== "all" && mov.t !== filtros.tipo) return false;
            if (filtros.categoria !== "all" && mov.cat !== filtros.categoria) return false;
            return true;
        });

        const opcoesCategoria = [...Object.keys(CATEGORIAS), "Renda extra"]
            .map((nome) => `<option ${filtros.categoria === nome ? "selected" : ""}>${nome}</option>`)
            .join("");

        // O salário só aparece quando o filtro não esconde entradas.
        const mostrarSalario = filtros.tipo !== "out" && filtros.categoria === "all";

        let itens = `<p class="empty">Nenhuma movimentação neste filtro.</p>`;
        if (lista.length > 0) {
            itens = lista.map((mov) => linhaMovimentacao(mov, true)).join("");
        }

        return `
        <div class="col">
            <div class="g3">
                ${cartaoMini("in", "Entradas", totais.entradas)}
                ${cartaoMini("out", "Despesas", totais.saidas)}
                ${cartaoMini("", "Saldo", totais.saldo, totais.saldo < 0)}
            </div>

            <div class="card">
                <div class="flt">
                    <select data-filtro="periodo" aria-label="Período">
                        <option value="mes">Este mês</option>
                        <option value="all" ${filtros.periodo === "all" ? "selected" : ""}>Todo o período</option>
                    </select>
                    <select data-filtro="tipo" aria-label="Tipo">
                        <option value="all">Todas</option>
                        <option value="in" ${filtros.tipo === "in" ? "selected" : ""}>Entradas</option>
                        <option value="out" ${filtros.tipo === "out" ? "selected" : ""}>Saídas</option>
                    </select>
                    <select data-filtro="categoria" aria-label="Categoria">
                        <option value="all">Todas as categorias</option>
                        ${opcoesCategoria}
                    </select>
                </div>
                ${mostrarSalario ? linhaSalario() : ""}
                ${itens}
            </div>
        </div>`;
    },

    relatorios() {
        const totais = calcularTotais();
        const maiorValor = Math.max(totais.entradas, totais.saidas, 1); // 1 evita divisão por zero

        // Soma os gastos do mês por categoria e ordena do maior para o menor.
        const gastosPorCategoria = {};
        for (const mov of movimentacoesDoMes()) {
            if (mov.t === "out") {
                gastosPorCategoria[mov.cat] = (gastosPorCategoria[mov.cat] || 0) + mov.v;
            }
        }
        const ranking = Object.entries(gastosPorCategoria).sort((a, b) => b[1] - a[1]);

        let categoriasHtml = `<p class="empty">Lance saídas para ver seus gastos por categoria.</p>`;
        if (ranking.length > 0) {
            categoriasHtml = ranking
                .map(([nome, valor]) => {
                    const porcentagem = (valor / totais.saidas) * 100;
                    const cor = (CATEGORIAS[nome] || CATEGORIAS["Outros"]).cor;
                    return `
                    <div>
                        <div class="row" style="border:0;padding:.3rem 0">
                            <span style="flex:1">${escaparHtml(nome)}</span>
                            <span class="mu">${formatarMoeda(valor)} • ${Math.round(porcentagem)}%</span>
                        </div>
                        <div class="bar"><i style="width:${porcentagem}%;background:${cor}"></i></div>
                    </div>`;
                })
                .join("");
        }

        return `
        <div class="col">
            <div class="g2c" style="grid-template-columns:1fr 1fr">
                <div class="card">
                    <h3>Resumo do período</h3>
                    <div class="row"><span class="mu" style="flex:1">Entradas</span><b class="amt in">${formatarMoeda(totais.entradas)}</b></div>
                    <div class="row"><span class="mu" style="flex:1">Despesas</span><b class="amt out">${formatarMoeda(totais.saidas)}</b></div>
                    <div class="row"><span class="mu" style="flex:1">Saldo</span><b ${totais.saldo < 0 ? 'class="dz"' : ""}>${formatarMoeda(totais.saldo)}</b></div>
                    <div class="row"><span class="mu" style="flex:1">Renda usada</span><b>${Math.round(totais.porcentagemUsada)}%</b></div>
                </div>

                <div class="card">
                    <h3>Entradas vs Despesas</h3>
                    <div class="bars">
                        <div style="height:${(totais.entradas / maiorValor) * 100}%"></div>
                        <div class="o" style="height:${(totais.saidas / maiorValor) * 100}%"></div>
                    </div>
                    <div class="lbl"><span>Entradas</span><span>Despesas</span></div>
                </div>
            </div>

            <div class="card">
                <h3>Categorias de gastos</h3>
                ${categoriasHtml}
            </div>
        </div>`;
    },

    metas() {
        if (dados.goals.length === 0) {
            return `<div class="col"><div class="card empty">Você ainda não tem metas. Crie a primeira!</div></div>`;
        }
        return `<div class="col">${dados.goals.map(cartaoMeta).join("")}</div>`;
    },

    educacao() {
        const progresso = Math.round((dados.lessons.length / LICOES.length) * 100);

        const listaLicoes = LICOES.map((titulo, indice) => {
            const feita = dados.lessons.includes(indice);
            return `
                <button class="lesson" data-acao="licao" data-id="${indice}">
                    <span class="chk ${feita ? "on" : ""}">${feita ? icone("ok") : ""}</span>${titulo}
                </button>`;
        }).join("");

        return `
        <div class="col">
            <div class="edc">
                <div class="card">
                    ${icone("book")}<b>Conceitos básicos</b>
                    <span class="mu">Entenda juros, inflação e orçamento.</span>
                    <button class="btn gold sm" data-acao="ver-licoes">Acessar</button>
                </div>
                <div class="card">
                    ${icone("calc")}<b>Simulador</b>
                    <span class="mu">Teste na prática o que aprendeu.</span>
                    <button class="btn gold sm" data-ir="simulador">Acessar</button>
                </div>
                <div class="card">
                    ${icone("trophy")}<b>Desafios</b>
                    <span class="mu">Responda e ganhe conquistas.</span>
                    <button class="btn gold sm" data-acao="desafio">Acessar</button>
                </div>
            </div>

            <div class="card" id="licoes">
                <h3>Sua jornada de aprendizado • <span class="gt">${progresso}%</span></h3>
                <div class="bar"><i style="width:${progresso}%"></i></div>
                ${listaLicoes}
            </div>
        </div>`;
    },

    simulador() {
        return `
        <div class="g2c" style="grid-template-columns:1fr 1.3fr">
            <div class="card" id="sim">
                <h3>Parâmetros</h3>
                <label class="fld">Valor inicial (R$)<input id="sim-inicial" type="number" min="0" step="0.01" value="${simulacao.inicial}"></label>
                <label class="fld">Aporte mensal (R$)<input id="sim-aporte" type="number" min="0" step="0.01" value="${simulacao.aporte}"></label>
                <label class="fld">Prazo (meses)<input id="sim-meses" type="number" min="1" max="600" value="${simulacao.meses}"></label>
                <p class="mu">Cenários anuais: alto +10%, estável +6%, queda -10%. Simulação educativa, não é recomendação de investimento.</p>
            </div>
            <div class="card">
                <h3>Resultados</h3>
                <div id="sim-resultado">${resultadoSimulacao()}</div>
            </div>
        </div>`;
    },

    configuracoes() {
        const preferencias = dados.set;

        // Grupo de botões em que só um fica marcado (ex: Claro / Escuro / Automático).
        const grupoOpcoes = (chave, opcoes) => `
            <div class="seg">
                ${opcoes.map(([valor, texto]) => `
                    <button data-acao="preferencia" data-id="${chave}" data-valor="${valor}"
                        class="${String(preferencias[chave]) === valor ? "on" : ""}">${texto}</button>`).join("")}
            </div>`;

        // Interruptor liga/desliga.
        const interruptor = (chave, titulo, descricao) => `
            <div class="set">
                <div><b>${titulo}</b><div class="mu">${descricao}</div></div>
                <button class="sw" role="switch" aria-checked="${Boolean(preferencias[chave])}" aria-label="${titulo}"
                    data-acao="alternar" data-id="${chave}"></button>
            </div>`;

        return `
        <div class="col">
            <div class="card">
                <h3>${icone("set")}Aparência</h3>
                <div class="set"><b>Tema</b>${grupoOpcoes("theme", [["light", "Claro"], ["dark", "Escuro"], ["auto", "Automático"]])}</div>
                <div class="set"><b>Tamanho do texto</b>${grupoOpcoes("size", [["s", "Pequeno"], ["m", "Médio"], ["l", "Grande"]])}</div>
                ${interruptor("bold", "Texto em negrito", "Deixa todas as letras mais grossas.")}
                ${interruptor("fx", "Efeitos ao clicar", "Brilho dourado e animações nos toques.")}
            </div>

            <div class="card">
                <h3>${icone("user")}Conta</h3>
                <div class="set">
                    <span>${escaparHtml(dados.name)}</span>
                    <button class="btn ghost sm" data-acao="perfil">Alterar perfil</button>
                </div>
                <div class="set">
                    <span>Renda mensal: ${formatarMoeda(dados.income)}</span>
                    <button class="btn ghost sm" data-acao="alterar-renda">Alterar renda</button>
                </div>
                <div class="set">
                    <span>Sair da conta</span>
                    <button class="btn ghost sm" data-acao="sair">${icone("out")}Sair</button>
                </div>
                <div class="set">
                    <div><b class="dz">Excluir conta</b><div class="mu">Apaga todos os seus dados deste aparelho.</div></div>
                    <button class="btn danger sm" data-acao="excluir-conta">${icone("trash")}Excluir</button>
                </div>
            </div>

            <p class="mu" style="text-align:center">Bolso Jovem • versão 1.0.0</p>
        </div>`;
    },
};


// -------------------------------------------------------------
// 11. SIMULADOR DE INVESTIMENTOS
// -------------------------------------------------------------
let simulacao = { inicial: 500, aporte: 100, meses: 12 };

function resultadoSimulacao() {
    const cenarios = [
        { nome: "Cenário alto (+10% a.a.)", taxaAnual: 0.1, classe: "" },
        { nome: "Cenário estável (+6% a.a.)", taxaAnual: 0.06, classe: "eq" },
        { nome: "Cenário de queda (-10% a.a.)", taxaAnual: -0.1, classe: "dn" },
    ];
    const totalInvestido = simulacao.inicial + simulacao.aporte * simulacao.meses;

    let html = `<p class="mu" style="margin-bottom:.6rem">Total investido: <b>${formatarMoeda(totalInvestido)}</b></p>`;

    for (const cenario of cenarios) {
        // Converte a taxa ao ano em taxa ao mês.
        const taxaMensal = Math.pow(1 + cenario.taxaAnual, 1 / 12) - 1;
        const fator = Math.pow(1 + taxaMensal, simulacao.meses);

        // Valor final = valor inicial com juros + aportes mensais com juros.
        const aportesComJuros = taxaMensal ? (simulacao.aporte * (fator - 1)) / taxaMensal : simulacao.aporte * simulacao.meses;
        const valorFinal = simulacao.inicial * fator + aportesComJuros;
        const rendimento = valorFinal - totalInvestido;
        const perdeu = rendimento < 0;

        html += `
            <div class="sc ${cenario.classe}">
                <b>${cenario.nome}</b>
                <b>${formatarMoeda(valorFinal)}</b>
                <span class="mu">Rendimento</span>
                <span class="${perdeu ? "dz" : "amt in"}">${perdeu ? "-" : "+"} ${formatarMoeda(Math.abs(rendimento))}</span>
            </div>`;
    }

    return html;
}


// -------------------------------------------------------------
// 12. NAVEGAÇÃO E RENDERIZAÇÃO
// -------------------------------------------------------------

// Itens do menu: [tela, ícone, texto].
const MENU = [
    ["inicio", "home", "Início"],
    ["movimentacoes", "swap", "Movimentações"],
    ["relatorios", "chart", "Relatórios"],
    ["metas", "target", "Metas"],
    ["educacao", "book", "Educação"],
    ["simulador", "calc", "Simulador"],
    ["configuracoes", "set", "Configurações"],
];

function primeiroNome() {
    return dados.name.split(" ")[0];
}

// Título, subtítulo e botão principal (texto + ação) de cada tela.
function cabecalhos() {
    return {
        inicio: { titulo: "Olá, " + primeiroNome() + "!", subtitulo: "Aprenda, organize e construa um futuro financeiro melhor.", botao: "Nova movimentação", acao: "nova-movimentacao" },
        movimentacoes: { titulo: "Movimentações", subtitulo: "Acompanhe suas receitas e despesas.", botao: "Nova movimentação", acao: "nova-movimentacao" },
        relatorios: { titulo: "Relatórios financeiros", subtitulo: "Resumo visual do seu mês." },
        metas: { titulo: "Minhas metas", subtitulo: "Defina objetivos e acompanhe seu progresso.", botao: "Nova meta", acao: "nova-meta" },
        educacao: { titulo: "Educação financeira", subtitulo: "Aprenda sobre dinheiro no seu ritmo." },
        simulador: { titulo: "Simulador de investimentos", subtitulo: "Descubra como o dinheiro pode crescer." },
        configuracoes: { titulo: "Configurações", subtitulo: "Personalize sua experiência no Bolso Jovem." },
    };
}

let telaAtual = "inicio";

function irPara(tela) {
    telaAtual = tela;
    location.hash = tela; // deixa o endereço como index.html#metas
    renderizar();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Desenha a tela atual inteira (cabeçalho, menu e conteúdo).
function renderizar() {
    const cabecalho = cabecalhos()[telaAtual] || cabecalhos().inicio;

    pegar("#h1").textContent = cabecalho.titulo;
    pegar("#h2").textContent = cabecalho.subtitulo;
    pegar("#act").innerHTML = cabecalho.botao
        ? `<button class="btn gold" data-acao="${cabecalho.acao}">${icone("plus")}${cabecalho.botao}</button>`
        : "";

    pegar("#nav").innerHTML = MENU.map(([tela, nomeIcone, texto]) => {
        const ativa = tela === telaAtual;
        return `<button class="nv ${ativa ? "on" : ""}" data-ir="${tela}" ${ativa ? 'aria-current="page"' : ""}>${icone(nomeIcone)}<span>${texto}</span></button>`;
    }).join("");

    const area = pegar("#view");
    area.innerHTML = TELAS[telaAtual]();
    // Reinicia a animação de entrada da tela.
    area.style.animation = "none";
    area.offsetHeight;
    area.style.animation = "";

    pegar("#nm").textContent = dados.name;
    pegar("#av").textContent = dados.name.split(" ").map((parte) => parte[0]).slice(0, 2).join("").toUpperCase();

    aplicarPreferencias();
}

// Aplica tema, tamanho do texto, negrito e efeitos (lidos pelo CSS via data-*).
function aplicarPreferencias() {
    const preferencias = dados.set;
    const raiz = document.documentElement;

    let tema = preferencias.theme;
    if (tema === "auto") {
        tema = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }

    raiz.dataset.theme = tema;
    raiz.dataset.size = preferencias.size;
    raiz.dataset.bold = preferencias.bold ? "on" : "off";
    document.body.dataset.fx = preferencias.fx ? "on" : "off";

    pegar("#thm").innerHTML = icone(tema === "dark" ? "sun" : "moon");
}


// -------------------------------------------------------------
// 13. AÇÕES DOS BOTÕES
// Cada botão tem data-acao="nome". O clique chama ACOES[nome](id, valor).
// -------------------------------------------------------------
const ACOES = {
    // --- Movimentações ---
    "nova-saida": () => formularioMovimentacao("out"),
    "nova-entrada": () => formularioMovimentacao("in"),
    "nova-movimentacao": escolherTipoMovimentacao,
    "alterar-renda": formularioRenda,

    "editar": (id) => {
        const mov = dados.moves.find((item) => item.id === id);
        if (mov) formularioMovimentacao(mov.t, mov);
    },

    // DELETE: pede confirmação e cria uma lista nova sem o item.
    "excluir": (id) => {
        abrirFormulario({
            titulo: "Excluir movimentação?",
            subtitulo: "Isso não pode ser desfeito.",
            textoBotao: "Excluir",
            perigo: true,
            aoConfirmar: () => {
                dados.moves = dados.moves.filter((item) => item.id !== id);
                salvar();
                renderizar();
                mostrarAviso("Movimentação excluída");
            },
        });
    },

    // --- Metas ---
    "nova-meta": () => formularioMeta(),

    "editar-meta": (id) => {
        const meta = dados.goals.find((item) => item.id === id);
        if (meta) formularioMeta(meta);
    },

    "excluir-meta": (id) => {
        abrirFormulario({
            titulo: "Excluir meta?",
            subtitulo: "Isso não pode ser desfeito.",
            textoBotao: "Excluir",
            perigo: true,
            aoConfirmar: () => {
                dados.goals = dados.goals.filter((item) => item.id !== id);
                salvar();
                renderizar();
                mostrarAviso("Meta excluída");
            },
        });
    },

    "guardar": (id) => {
        const meta = dados.goals.find((item) => item.id === id);
        abrirFormulario({
            titulo: "Guardar dinheiro",
            subtitulo: meta.name,
            textoBotao: "Guardar",
            campos: [{ id: "v", label: "Valor (R$)", type: "number", min: 0.01, req: true }],
            aoConfirmar: (valores) => {
                const valor = lerNumero(valores.v);
                if (!(valor > 0)) return "Digite um valor maior que zero.";

                meta.saved += valor;
                salvar();
                renderizar();
                mostrarAviso(meta.saved >= meta.target ? "Meta concluída! 🎉" : "Valor guardado");
            },
        });
    },

    // --- Educação ---
    "licao": (id) => {
        const indice = Number(id);
        if (dados.lessons.includes(indice)) {
            dados.lessons = dados.lessons.filter((item) => item !== indice); // desmarca
        } else {
            dados.lessons = [...dados.lessons, indice];                      // marca
        }
        salvar();
        renderizar();
        if (dados.lessons.length === LICOES.length) mostrarAviso("Jornada completa! 🏆");
    },

    "ver-licoes": () => pegar("#licoes").scrollIntoView({ behavior: "smooth" }),

    "desafio": () => {
        const sorteado = DESAFIOS[Math.floor(Math.random() * DESAFIOS.length)];
        mostrarAviso("Desafio: " + sorteado);
    },

    // --- Configurações ---
    "preferencia": (chave, valor) => {
        dados.set[chave] = valor;
        salvar();
        renderizar();
    },

    "alternar": (chave) => {
        dados.set[chave] = !dados.set[chave];
        salvar();
        renderizar();
    },

    "perfil": () => {
        abrirFormulario({
            titulo: "Alterar perfil",
            campos: [{ id: "nome", label: "Seu nome", req: true, value: dados.name }],
            aoConfirmar: (valores) => {
                const nome = valores.nome.trim();
                if (!nome) return "Digite seu nome.";

                dados.name = nome;
                salvar();
                renderizar();
                mostrarAviso("Perfil atualizado");
            },
        });
    },

    "sair": () => {
        mostrarTelaCheia("Você saiu", "Seus dados continuam salvos neste aparelho.", "Entrar novamente", () => irPara("inicio"));
    },

    "excluir-conta": () => {
        abrirFormulario({
            titulo: "Excluir conta",
            subtitulo: "Isso apaga todos os seus dados e não pode ser desfeito. Digite EXCLUIR para confirmar.",
            textoBotao: "Excluir para sempre",
            perigo: true,
            campos: [{ id: "confirmacao", label: "Confirmação", req: true }],
            aoConfirmar: (valores) => {
                if (valores.confirmacao.trim().toUpperCase() !== "EXCLUIR") return "Digite EXCLUIR para confirmar";

                try {
                    localStorage.removeItem(CHAVE_STORAGE);
                } catch (erro) {
                    // Sem localStorage: nada para apagar.
                }
                dados = dadosIniciais();
                renderizar();
                mostrarTelaCheia("Conta excluída", "Todos os seus dados foram apagados deste aparelho.", "Criar nova conta", () => {
                    salvar();
                    irPara("inicio");
                });
            },
        });
    },
};


// -------------------------------------------------------------
// 14. EVENTOS
// -------------------------------------------------------------

// Envio do formulário da janela.
pegar("#df").addEventListener("submit", (evento) => {
    evento.preventDefault();
    const valores = Object.fromEntries(new FormData(evento.target));
    const erro = funcaoDoFormulario(valores);

    if (typeof erro === "string") {
        mostrarAviso(erro); // mantém a janela aberta para corrigir
        return;
    }
    pegar("#dlg").close();
});

pegar("#dcx").addEventListener("click", () => pegar("#dlg").close());

// Fecha a janela só se o clique foi fora da caixa (no fundo escuro).
pegar("#dlg").addEventListener("click", (evento) => {
    if (evento.target !== evento.currentTarget) return;
    const caixa = evento.currentTarget.getBoundingClientRect();
    const foraDaCaixa =
        evento.clientX < caixa.left || evento.clientX > caixa.right ||
        evento.clientY < caixa.top || evento.clientY > caixa.bottom;
    if (foraDaCaixa) pegar("#dlg").close();
});

// Um único "ouvinte" para todos os cliques da página (delegação de eventos):
// data-ir="tela" navega e data-acao="nome" executa uma ação.
document.addEventListener("click", (evento) => {
    const link = evento.target.closest("[data-ir]");
    if (link) {
        irPara(link.dataset.ir);
        return;
    }

    const botao = evento.target.closest("[data-acao]");
    if (!botao) return;

    const acao = ACOES[botao.dataset.acao];
    if (acao) acao(botao.dataset.id, botao.dataset.valor);
});

// Troca de filtro na tela de Movimentações.
document.addEventListener("change", (evento) => {
    const filtro = evento.target.dataset.filtro;
    if (!filtro) return;
    filtros[filtro] = evento.target.value;
    renderizar();
});

// Digitação no simulador: recalcula na hora.
document.addEventListener("input", (evento) => {
    if (!evento.target.closest("#sim")) return;

    simulacao = {
        inicial: Math.max(0, lerNumero(pegar("#sim-inicial").value) || 0),
        aporte: Math.max(0, lerNumero(pegar("#sim-aporte").value) || 0),
        meses: Math.min(600, Math.max(1, parseInt(pegar("#sim-meses").value) || 1)),
    };
    pegar("#sim-resultado").innerHTML = resultadoSimulacao();
});

// Botão de sol/lua no topo: alterna entre claro e escuro.
pegar("#thm").addEventListener("click", () => {
    dados.set.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    salvar();
    renderizar();
});

// Botões voltar/avançar do navegador (mudam o #tela do endereço).
addEventListener("hashchange", () => {
    const tela = location.hash.slice(1);
    if (cabecalhos()[tela] && tela !== telaAtual) {
        telaAtual = tela;
        renderizar();
    }
});

// Início: abre a tela do endereço (ex: index.html#metas) ou o Início.
if (cabecalhos()[location.hash.slice(1)]) {
    telaAtual = location.hash.slice(1);
}
renderizar();
