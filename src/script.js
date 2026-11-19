const links = document.querySelectorAll(".navlinks a");
const telas = document.querySelectorAll(".tela");

links.forEach(function (link) {
    link.addEventListener("click", function (evento) {
        evento.preventDefault();

        const idDaTela = link.getAttribute("href").replace("#", "");

        telas.forEach( function (tela) {
            tela.classList.remove("ativa");
        });

        document.getElementById(idDaTela).classList.add("ativa");

        links.forEach( function (linkcss) {
            linkcss.classList.remove("ativa");
        });

        link.classList.add("ativa");
    })
})