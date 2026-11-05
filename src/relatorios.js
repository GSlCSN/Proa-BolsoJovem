// =============================================================
// BOLSO JOVEM - Página Relatórios
// Monta o resumo, o gráfico de barras e a pizza de categorias
// do mês atual, a partir das movimentações salvas.
// Usa funções de src/dados.js.
// =============================================================

const doMes = doMesAtual(carregarMovimentacoes());
const resumo = calcularResumo(doMes);

// --- Resumo do período ---
document.getElementById("rel-entradas").textContent = formatarMoeda(resumo.entradas);
document.getElementById("rel-despesas").textContent = formatarMoeda(resumo.despesas);
document.getElementById("rel-saldo").textContent = formatarMoeda(resumo.saldo);

// --- Gráfico de barras ---
// A barra maior ocupa 100% da altura; a outra é proporcional.
// O "1" evita divisão por zero quando não há nada no mês.
const maior = Math.max(resumo.entradas, resumo.despesas, 1);
document.getElementById("barra-entradas").style.height = (resumo.entradas / maior) * 100 + "%";
document.getElementById("barra-despesas").style.height = (resumo.despesas / maior) * 100 + "%";

// --- Pizza de categorias (só despesas) ---
// 1) Soma quanto foi gasto em cada categoria.
const porCategoria = {};
for (const mov of doMes) {
  if (mov.tipo === "despesa") {
    porCategoria[mov.categoria] = (porCategoria[mov.categoria] || 0) + mov.valor;
  }
}

// 2) Ordena da maior para a menor despesa.
const categorias = Object.entries(porCategoria).sort((a, b) => b[1] - a[1]);

const CORES = ["#f4a7a7", "#9fd89f", "#f7e27a", "#8ec5f0", "#c9a7f0", "#f7c08a", "#a7e0d8", "#cccccc"];
const pizza = document.getElementById("pizza");
const legenda = document.getElementById("lista-categorias");

if (categorias.length === 0) {
  legenda.innerHTML = "<li>Sem despesas neste mês.</li>";
} else {
  // 3) Cada categoria vira uma "fatia" do conic-gradient do CSS.
  //    Ex: "#f4a7a7 0% 55%, #9fd89f 55% 85%, ..."
  const fatias = [];
  let inicio = 0;

  categorias.forEach(function ([nome, valor], i) {
    const porcentagem = (valor / resumo.despesas) * 100;
    const cor = CORES[i % CORES.length];
    fatias.push(`${cor} ${inicio}% ${inicio + porcentagem}%`);
    inicio += porcentagem;

    const item = document.createElement("li");
    const quadrado = document.createElement("span");
    quadrado.className = "quadrado";
    quadrado.style.background = cor;
    const texto = document.createElement("span");
    texto.className = "legenda-nome";
    texto.textContent = nome;
    const pct = document.createElement("small");
    pct.textContent = Math.round(porcentagem) + "%";
    item.append(quadrado, texto, pct);
    legenda.appendChild(item);
  });

  pizza.style.background = `conic-gradient(${fatias.join(", ")})`;
}
