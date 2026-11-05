// =============================================================
// BOLSO JOVEM - Página Login
// ATENÇÃO: é um login de demonstração. Não existe servidor,
// então nenhuma senha é conferida de verdade. Só guardamos o nome
// para mostrar "Olá, nome!" nas outras páginas.
// =============================================================

const formLogin = document.getElementById("form-login");
const campoUsuario = document.getElementById("usuario");
const campoSenha = document.getElementById("senha");
const erroLogin = document.getElementById("erro-login");
const botaoVerSenha = document.getElementById("btn-ver-senha");

formLogin.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const usuario = campoUsuario.value.trim();
  const senha = campoSenha.value;

  if (usuario === "") {
    erroLogin.textContent = "Digite seu e-mail ou usuário.";
    return;
  } else if (senha.length < 4) {
    erroLogin.textContent = "A senha precisa ter pelo menos 4 caracteres.";
    return;
  }

  // Se for e-mail, usa só a parte antes do @ como nome.
  const nome = usuario.split("@")[0];
  localStorage.setItem("bolsoJovem.usuario", nome);
  window.location.href = "inicio.html";
});

// Mostrar/esconder senha trocando o type do input.
botaoVerSenha.addEventListener("click", function () {
  if (campoSenha.type === "password") {
    campoSenha.type = "text";
    botaoVerSenha.setAttribute("aria-label", "Esconder senha");
  } else {
    campoSenha.type = "password";
    botaoVerSenha.setAttribute("aria-label", "Mostrar senha");
  }
  botaoVerSenha.classList.toggle("aberto");
});

// "Entrar com Google" também é só demonstração.
document.getElementById("btn-google").addEventListener("click", function () {
  localStorage.setItem("bolsoJovem.usuario", "Visitante");
  window.location.href = "inicio.html";
});
