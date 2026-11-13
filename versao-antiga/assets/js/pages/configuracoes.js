// =============================================================
// BOLSO JOVEM - Página Configurações
// Salva tema e tamanho do texto no localStorage.
// A função aplicarPreferencias() está em assets/js/config.js.
// =============================================================

// Liga um grupo de botões de rádio a uma chave do localStorage.
function ligarOpcoes(nomeGrupo, chave, valorPadrao) {
  const radios = document.querySelectorAll(`input[name="${nomeGrupo}"]`);
  const salvo = localStorage.getItem(chave) || valorPadrao;

  for (const radio of radios) {
    // Marca a opção que estava salva.
    radio.checked = radio.value === salvo;

    // Quando o usuário escolhe outra, salva e aplica na hora.
    radio.addEventListener("change", function () {
      localStorage.setItem(chave, radio.value);
      aplicarPreferencias();
    });
  }
}

ligarOpcoes("tema", "bolsoJovem.tema", "claro");
ligarOpcoes("tamanho", "bolsoJovem.tamanho", "padrao");

// Sair da conta: esquece o nome do usuário (o link leva para o login).
document.getElementById("btn-sair").addEventListener("click", function () {
  localStorage.removeItem("bolsoJovem.usuario");
});
