// =============================================================
// BOLSO JOVEM - Preferências (carregado em todas as páginas)
// Aplica o tema e o tamanho do texto escolhidos em Configurações,
// e mostra o nome do usuário que fez login.
// =============================================================

function aplicarPreferencias() {
  const tema = localStorage.getItem("bolsoJovem.tema") || "claro";
  const tamanho = localStorage.getItem("bolsoJovem.tamanho") || "padrao";

  // "automatico" segue o tema do sistema operacional.
  let escuro = tema === "escuro";
  if (tema === "automatico") {
    escuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  document.documentElement.dataset.tema = escuro ? "escuro" : "claro";

  // zoom aumenta a página inteira (textos e espaçamentos juntos).
  const zoom = { padrao: 1, medio: 1.1, grande: 1.2 };
  const valorZoom = zoom[tamanho] || 1;
  document.documentElement.style.zoom = valorZoom;
  // O CSS usa --zoom para a página continuar cabendo na tela mesmo ampliada.
  document.documentElement.style.setProperty("--zoom", valorZoom);
}

aplicarPreferencias();

// Quando o HTML terminar de carregar, coloca o nome do usuário
// em todo elemento com a classe "nome-usuario".
document.addEventListener("DOMContentLoaded", function () {
  const nome = localStorage.getItem("bolsoJovem.usuario");
  if (nome === null) return;

  for (const elemento of document.querySelectorAll(".nome-usuario")) {
    elemento.textContent = nome;
  }
  for (const avatar of document.querySelectorAll(".avatar")) {
    avatar.textContent = nome[0].toUpperCase();
  }
});
