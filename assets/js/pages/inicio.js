// =============================================================
// BOLSO JOVEM - Página Início
// Mostra o saldo calculado a partir das movimentações salvas.
// Usa funções de assets/js/dados.js.
// =============================================================

const saldoValor = document.getElementById("saldo-valor");
const botaoOlho = document.getElementById("btn-olho");

// Começa escondido, como no Figma.
let saldoVisivel = false;

botaoOlho.addEventListener("click", function () {
  saldoVisivel = !saldoVisivel; // inverte: true vira false e vice-versa

  if (saldoVisivel) {
    const resumo = calcularResumo(carregarMovimentacoes());
    saldoValor.textContent = formatarMoeda(resumo.saldo);
    botaoOlho.setAttribute("aria-label", "Esconder saldo");
  } else {
    saldoValor.textContent = "R$ ****,**";
    botaoOlho.setAttribute("aria-label", "Mostrar saldo");
  }

  // A classe "aberto" esconde o risco do ícone de olho (ver style.css).
  botaoOlho.classList.toggle("aberto", saldoVisivel);
});
