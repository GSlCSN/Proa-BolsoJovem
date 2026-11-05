// =============================================================
// BOLSO JOVEM - Dados compartilhados
// Funções usadas por várias páginas (Movimentações, Início, Relatórios).
// Este arquivo precisa ser carregado ANTES do script de cada página.
// =============================================================

// Nome da "gaveta" onde as movimentações ficam guardadas no localStorage.
const CHAVE_STORAGE = "bolsoJovem.movimentacoes";

// Retorna a data de hoje no formato "2026-11-05".
function hojeISO() {
  const hoje = new Date();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${hoje.getFullYear()}-${mes}-${dia}`;
}

// Lê a lista salva. Se não existir nada ainda, começa com exemplos.
// localStorage só guarda texto, por isso usamos JSON.parse
// para transformar o texto de volta em array de objetos.
function carregarMovimentacoes() {
  const texto = localStorage.getItem(CHAVE_STORAGE);

  if (texto === null) {
    const mesAtual = hojeISO().slice(0, 7); // "2026-11"
    return [
      { id: 1, descricao: "Salário", valor: 2500.5, tipo: "entrada", categoria: "Renda", data: `${mesAtual}-01` },
      { id: 2, descricao: "Transporte", valor: 130, tipo: "despesa", categoria: "Transporte", data: `${mesAtual}-02` },
      { id: 3, descricao: "Supermercado", valor: 450, tipo: "despesa", categoria: "Alimentação", data: `${mesAtual}-03` },
      { id: 4, descricao: "Lazer", valor: 240, tipo: "despesa", categoria: "Lazer", data: `${mesAtual}-04` },
    ];
  }

  return JSON.parse(texto);
}

// Salva a lista inteira. JSON.stringify transforma o array em texto.
function salvarMovimentacoes(lista) {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista));
}

// Retorna só as movimentações do mês atual.
function doMesAtual(lista) {
  const mesAtual = hojeISO().slice(0, 7);
  return lista.filter((mov) => mov.data.slice(0, 7) === mesAtual);
}

// Formata número como dinheiro: 2500.5 vira "R$ 2.500,50".
function formatarMoeda(numero) {
  return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Formata data: "2026-11-01" vira "01/11/2026".
function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Soma entradas e despesas percorrendo a lista.
function calcularResumo(listaMov) {
  let entradas = 0;
  let despesas = 0;

  for (const mov of listaMov) {
    if (mov.tipo === "entrada") {
      entradas += mov.valor;
    } else {
      despesas += mov.valor;
    }
  }

  return { entradas, despesas, saldo: entradas - despesas };
}
