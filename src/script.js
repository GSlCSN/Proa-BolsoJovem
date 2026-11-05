// =============================================================
// BOLSO JOVEM - CRUD de Movimentações
// Create (criar), Read (listar), Update (editar), Delete (excluir)
// Os dados ficam salvos no navegador com localStorage.
// Funções como carregarMovimentacoes, formatarMoeda e calcularResumo
// estão em src/dados.js (compartilhado com outras páginas).
// =============================================================

// Categorias disponíveis. Cada uma tem um ícone (desenho SVG).
// Para criar uma categoria nova, basta adicionar uma linha aqui.
const CATEGORIAS = {
  "Renda": '<svg viewBox="0 0 64 64" fill="none" stroke="#3f7f4f" stroke-width="4"><circle cx="32" cy="32" r="27"/><path d="M40 23c-1.5-2.5-4.5-3.5-8-3.5-5 0-8 2.5-8 6 0 8.5 16 4.5 16 13 0 3.5-3.5 6-8 6-4 0-7-1.5-8.5-4M32 14v36"/></svg>',
  "Transporte": '<svg viewBox="0 0 64 64" fill="currentColor"><rect x="10" y="6" width="44" height="46" rx="8"/><rect x="16" y="14" width="32" height="16" rx="2" style="fill:var(--fundo-lista)"/><circle cx="20" cy="40" r="3.5" style="fill:var(--fundo-lista)"/><circle cx="44" cy="40" r="3.5" style="fill:var(--fundo-lista)"/><rect x="14" y="50" width="8" height="9" rx="2"/><rect x="42" y="50" width="8" height="9" rx="2"/><rect x="4" y="16" width="5" height="12" rx="2"/><rect x="55" y="16" width="5" height="12" rx="2"/></svg>',
  "Alimentação": '<svg viewBox="0 0 64 64" fill="currentColor"><path d="M2 8h9l8 30h32l7-22H16" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M16 16h42l-7 22H21z"/><circle cx="24" cy="52" r="5"/><circle cx="46" cy="52" r="5"/></svg>',
  "Lazer": '<svg viewBox="0 0 64 64" fill="currentColor"><rect x="14" y="8" width="36" height="28" rx="6"/><rect x="4" y="22" width="12" height="30" rx="5"/><rect x="48" y="22" width="12" height="30" rx="5"/><rect x="14" y="38" width="36" height="14" rx="3"/><rect x="8" y="52" width="6" height="6"/><rect x="50" y="52" width="6" height="6"/></svg>',
  "Moradia": '<svg viewBox="0 0 64 64" fill="currentColor"><path d="M6 30L32 8l26 22v26H40V40H24v16H6z"/></svg>',
  "Saúde": '<svg viewBox="0 0 64 64" fill="currentColor"><path d="M24 6h16v18h18v16H40v18H24V40H6V24h18z"/></svg>',
  "Educação": '<svg viewBox="0 0 64 64" fill="currentColor"><path d="M2 24L32 10l30 14-30 14z"/><path d="M14 32v14c10 8 26 8 36 0V32L32 41z"/></svg>',
  "Outros": '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4"><circle cx="32" cy="32" r="27"/><circle cx="20" cy="32" r="2" fill="currentColor"/><circle cx="32" cy="32" r="2" fill="currentColor"/><circle cx="44" cy="32" r="2" fill="currentColor"/></svg>',
};

// Ícones dos botões de editar (lápis) e excluir (lixeira).
const ICONE_EDITAR = '<svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>';
const ICONE_EXCLUIR = '<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>';

// -------------------------------------------------------------
// 1. DADOS
// -------------------------------------------------------------

// "let" porque a lista muda (excluir cria uma lista nova).
let movimentacoes = carregarMovimentacoes();

// Guarda o id do item que está sendo editado.
// null significa "não estou editando, estou criando".
let idEmEdicao = null;

// -------------------------------------------------------------
// 2. ELEMENTOS DA TELA (pegamos uma vez e reutilizamos)
// -------------------------------------------------------------
const modal = document.getElementById("modal-mov");
const tituloModal = document.getElementById("modal-titulo");
const form = document.getElementById("form-mov");
const campoDescricao = document.getElementById("descricao");
const campoValor = document.getElementById("valor");
const campoTipo = document.getElementById("tipo");
const campoCategoria = document.getElementById("categoria");
const campoData = document.getElementById("data");
const botaoNova = document.getElementById("btn-nova");
const botaoSalvar = document.getElementById("btn-salvar");
const botaoCancelar = document.getElementById("btn-cancelar");
const mensagemErro = document.getElementById("erro");
const lista = document.getElementById("lista-mov");

const filtroPeriodo = document.getElementById("filtro-periodo");
const filtroCategoria = document.getElementById("filtro-categoria");

const cardEntradas = document.getElementById("total-entradas");
const cardDespesas = document.getElementById("total-despesas");
const cardSaldo = document.getElementById("total-saldo");
const labelSaldo = document.getElementById("label-saldo");

// Coloca as categorias dentro dos dois <select> (formulário e filtro).
for (const nome of Object.keys(CATEGORIAS)) {
  campoCategoria.add(new Option(nome, nome));
  filtroCategoria.add(new Option(nome, nome));
}

// -------------------------------------------------------------
// 3. FUNÇÕES AUXILIARES
// -------------------------------------------------------------

// Gera um id novo: o maior id existente + 1.
function gerarId() {
  let maior = 0;
  for (const mov of movimentacoes) {
    if (mov.id > maior) maior = mov.id;
  }
  return maior + 1;
}

// Retorna só os itens que passam nos filtros escolhidos na tela.
function aplicarFiltros() {
  const mesAtual = hojeISO().slice(0, 7);

  return movimentacoes.filter(function (mov) {
    if (filtroPeriodo.value === "mes" && mov.data.slice(0, 7) !== mesAtual) {
      return false;
    }
    if (filtroCategoria.value !== "todas" && mov.categoria !== filtroCategoria.value) {
      return false;
    }
    return true;
  });
}

// -------------------------------------------------------------
// 4. READ - desenhar a lista e os cards na tela
// -------------------------------------------------------------
function renderizar() {
  const visiveis = aplicarFiltros();

  // Limpa a lista antes de desenhar de novo.
  lista.innerHTML = "";

  if (visiveis.length === 0) {
    const vazio = document.createElement("li");
    vazio.className = "vazio";
    vazio.textContent = "Nenhuma movimentação encontrada.";
    lista.appendChild(vazio);
  }

  for (const mov of visiveis) {
    const item = document.createElement("li");
    item.className = "item-mov " + mov.tipo;

    // Ícone da categoria. Se a categoria não existir, usa "Outros".
    const icone = document.createElement("div");
    icone.className = "icone";
    icone.innerHTML = CATEGORIAS[mov.categoria] || CATEGORIAS["Outros"];

    // Usamos textContent (e não innerHTML) no texto digitado pelo usuário
    // para evitar que alguém injete HTML/código pela descrição.
    const info = document.createElement("div");
    info.className = "info";

    const descricao = document.createElement("strong");
    descricao.textContent = mov.descricao;

    const detalhes = document.createElement("span");
    detalhes.textContent = `${mov.categoria} • ${formatarData(mov.data)}`;

    info.append(descricao, detalhes);

    // Valor: verde para entrada, vermelho com "-" para despesa.
    const valor = document.createElement("span");
    valor.className = "valor";
    if (mov.tipo === "entrada") {
      valor.textContent = formatarMoeda(mov.valor);
    } else {
      valor.textContent = "-" + formatarMoeda(mov.valor);
    }

    // data-id guarda o id no botão, para sabermos qual item foi clicado.
    const botaoEditar = document.createElement("button");
    botaoEditar.className = "btn-editar";
    botaoEditar.title = "Editar";
    botaoEditar.innerHTML = ICONE_EDITAR;
    botaoEditar.dataset.id = mov.id;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.className = "btn-excluir";
    botaoExcluir.title = "Excluir";
    botaoExcluir.innerHTML = ICONE_EXCLUIR;
    botaoExcluir.dataset.id = mov.id;

    const acoes = document.createElement("div");
    acoes.className = "acoes";
    acoes.append(botaoEditar, botaoExcluir);

    item.append(icone, info, valor, acoes);
    lista.appendChild(item);
  }

  // Atualiza os 3 cards a partir da lista filtrada.
  const resumo = calcularResumo(visiveis);
  cardEntradas.textContent = formatarMoeda(resumo.entradas);
  cardDespesas.textContent = formatarMoeda(resumo.despesas);
  cardSaldo.textContent = formatarMoeda(resumo.saldo);

  if (filtroPeriodo.value === "mes") {
    labelSaldo.textContent = "Saldo do mês";
  } else {
    labelSaldo.textContent = "Saldo total";
  }
}

// -------------------------------------------------------------
// 5. ABRIR E FECHAR A JANELA DO FORMULÁRIO
// -------------------------------------------------------------
botaoNova.addEventListener("click", function () {
  limparFormulario();
  modal.showModal();
  campoDescricao.focus();
});

botaoCancelar.addEventListener("click", function () {
  modal.close();
});

// Sempre que a janela fechar (Cancelar, Esc ou salvar), limpa o formulário.
modal.addEventListener("close", limparFormulario);

// -------------------------------------------------------------
// 6. CREATE e UPDATE - envio do formulário
// -------------------------------------------------------------
form.addEventListener("submit", function (evento) {
  // Sem isso, o navegador recarrega a página ao enviar o form.
  evento.preventDefault();

  const descricao = campoDescricao.value.trim();
  const valor = Number(campoValor.value);
  const tipo = campoTipo.value;
  const categoria = campoCategoria.value;
  const data = campoData.value;

  // Validação com if/else.
  if (descricao === "") {
    mostrarErro("Preencha a descrição.");
    return;
  } else if (campoValor.value === "" || isNaN(valor) || valor <= 0) {
    mostrarErro("O valor precisa ser um número maior que zero.");
    return;
  } else if (data === "") {
    mostrarErro("Escolha uma data.");
    return;
  }

  if (idEmEdicao === null) {
    // CREATE: adiciona um objeto novo no fim da lista.
    movimentacoes.push({ id: gerarId(), descricao, valor, tipo, categoria, data });
  } else {
    // UPDATE: acha o item pelo id e troca os campos.
    const mov = movimentacoes.find((m) => m.id === idEmEdicao);
    mov.descricao = descricao;
    mov.valor = valor;
    mov.tipo = tipo;
    mov.categoria = categoria;
    mov.data = data;
  }

  salvarMovimentacoes(movimentacoes);
  modal.close();
  renderizar();
});

// -------------------------------------------------------------
// 7. Cliques em Editar e Excluir
// Em vez de pôr um evento em cada botão, ouvimos a lista inteira
// e vemos qual botão foi clicado ("delegação de eventos").
// -------------------------------------------------------------
lista.addEventListener("click", function (evento) {
  // closest acha o <button> mesmo se o clique foi no desenho dentro dele.
  const botao = evento.target.closest("button");
  if (botao === null) return;

  const id = Number(botao.dataset.id);

  if (botao.classList.contains("btn-excluir")) {
    // DELETE: confirma e cria uma lista nova sem aquele item.
    if (confirm("Excluir esta movimentação?")) {
      movimentacoes = movimentacoes.filter((m) => m.id !== id);
      salvarMovimentacoes(movimentacoes);
      renderizar();
    }
  } else if (botao.classList.contains("btn-editar")) {
    // Prepara a edição: joga os dados do item no formulário e abre a janela.
    const mov = movimentacoes.find((m) => m.id === id);
    campoDescricao.value = mov.descricao;
    campoValor.value = mov.valor;
    campoTipo.value = mov.tipo;
    campoCategoria.value = mov.categoria;
    campoData.value = mov.data;

    idEmEdicao = id;
    tituloModal.textContent = "Editar movimentação";
    botaoSalvar.textContent = "Salvar alterações";
    modal.showModal();
    campoDescricao.focus();
  }
});

// Quando o usuário troca um filtro, desenha a lista de novo.
filtroPeriodo.addEventListener("change", renderizar);
filtroCategoria.addEventListener("change", renderizar);

// -------------------------------------------------------------
// 8. Funções de apoio do formulário
// -------------------------------------------------------------
function mostrarErro(texto) {
  mensagemErro.textContent = texto;
}

function limparFormulario() {
  form.reset();
  idEmEdicao = null;
  tituloModal.textContent = "Nova movimentação";
  botaoSalvar.textContent = "Adicionar";
  campoData.value = hojeISO();
  mostrarErro("");
}

// Desenha a tela pela primeira vez.
renderizar();
