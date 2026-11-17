const preguntas = document.querySelectorAll(".faq_pregunta");

preguntas.forEach(function (pregunta) {
    pregunta.addEventListener("click", function () {
        const respuesta = pregunta.nextElementSibling;

        if (respuesta.style.display === "block") {
            respuesta.style.display = "none";
        } else {
            respuesta.style.display = "block";
        }
    });
});