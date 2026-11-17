/* ==========================================================
   script_lineatemp.js - Línea temporal interactiva
   Qué hace:
   1. Guarda los hitos en una lista (array de objetos).
   2. Dibuja los hitos en la línea de tiempo.
   3. Muestra el detalle del hito que se elige.
   4. Permite filtrar por tema y moverse con "Anterior/Siguiente".
   ========================================================== */

// ---------- 1. DATOS: un objeto por cada hito ----------
const hitos = [
    {
        anio: "2004",
        titulo: "Fundación (DynaBlocks)",
        categoria: "plataforma",
        texto: "David Baszucki y Erik Cassel empiezan a desarrollar DynaBlocks, una plataforma para experimentar con la física y construir objetos.",
        enlace: "./evolucion.html#e0406",
        enlaceTexto: "Ver la etapa 2004-2006"
    },
    {
        anio: "2006",
        titulo: "Lanzamiento público",
        categoria: "plataforma",
        texto: "Después de cambiar su nombre a Roblox en 2005, la plataforma se lanza oficialmente. Desde el principio, los usuarios no solo juegan: también crean.",
        enlace: "./evolucion.html#e0406",
        enlaceTexto: "Ver la etapa 2004-2006"
    },
    {
        anio: "2007",
        titulo: "Nacen los Robux y los Tix",
        categoria: "economia",
        texto: "El 14 de mayo aparecen los Robux y el 2 de agosto los Tix, la moneda gratuita. El 16 de agosto se presenta Builders Club, la primera membresía de pago.",
        enlace: "./economia.html#tix",
        enlaceTexto: "Ver la economía de Roblox"
    },
    {
        anio: "2012",
        titulo: "Versión móvil",
        categoria: "tecnologia",
        texto: "Roblox llega a teléfonos y tablets y deja de depender principalmente de la computadora.",
        enlace: "./evolucion.html#e1316",
        enlaceTexto: "Ver la etapa 2013-2016"
    },
    {
        anio: "2013",
        titulo: "Nace el DevEx",
        categoria: "economia",
        texto: "El Developer Exchange (DevEx) permite a los creadores convertir los Robux que ganan en dinero real.",
        enlace: "./comunidad.html",
        enlaceTexto: "Ver la sección Comunidad"
    },
    {
        anio: "2016",
        titulo: "Fin de los Tix",
        categoria: "economia",
        texto: "En marzo Roblox anuncia que los Tix serán eliminados, para simplificar su economía y evitar la entrada de moneda sin actividad económica real.",
        enlace: "./economia.html#tix",
        enlaceTexto: "Ver la historia de los Tix"
    },
    {
        anio: "2021",
        titulo: "Salida a bolsa (NYSE)",
        categoria: "economia",
        texto: "Roblox sale a la Bolsa de Nueva York y se convierte en empresa pública. Ese año informa más de 43 millones de usuarios activos diarios en 180 países.",
        enlace: "./evolucion.html#e2021",
        enlaceTexto: "Ver la etapa 2020-2021"
    },
    {
        anio: "2023",
        titulo: "Una comunidad más grande",
        categoria: "comunidad",
        texto: "Roblox informa que más del 55 % de sus usuarios tiene más de 13 años, y que el grupo de 17 a 24 años es uno de los de mayor crecimiento.",
        enlace: "./evolucion.html#e2223",
        enlaceTexto: "Ver la etapa 2022-2023"
    },
    {
        anio: "2024",
        titulo: "The Hunt: First Edition",
        categoria: "comunidad",
        texto: "Evento oficial que reúne a unos 34 millones de usuarios, quienes completan más de 200 millones de misiones en distintas experiencias.",
        enlace: "./evolucion.html#e2426",
        enlaceTexto: "Ver la etapa 2024-2026"
    },
    {
        anio: "2025",
        titulo: "The Hunt: Mega Edition",
        categoria: "comunidad",
        texto: "Nuevo evento oficial que reúne a decenas de millones de jugadores y ofrece un premio de US$1 millón.",
        enlace: "./evolucion.html#e2426",
        enlaceTexto: "Ver la etapa 2024-2026"
    },
    {
        anio: "2024-2026",
        titulo: "Comunidades e IA en Studio",
        categoria: "tecnologia",
        texto: "Roblox consolida sus comunidades y suma herramientas de inteligencia artificial en Roblox Studio.",
        enlace: "./comunidad.html",
        enlaceTexto: "Ver la sección Comunidad"
    }
];

// Nombre "bonito" de cada categoría
const nombresCategoria = {
    plataforma: "Plataforma",
    economia: "Economía",
    tecnologia: "Tecnología",
    comunidad: "Comunidad"
};

// ---------- 2. ELEMENTOS DEL HTML que vamos a usar ----------
const pista = document.querySelector("#pista");
const detalle = document.querySelector("#detalle");
const contador = document.querySelector("#contador");
const botonAnterior = document.querySelector("#anterior");
const botonSiguiente = document.querySelector("#siguiente");
const botonesFiltro = document.querySelectorAll(".filtro");

// ---------- 3. ESTADO: lo que cambia mientras se usa la página ----------
let categoriaActiva = "todos"; // filtro elegido
let indiceActual = 0;          // posición del hito seleccionado

// Devuelve los hitos que se ven según el filtro activo
const obtenerVisibles = () => {
    if (categoriaActiva === "todos") {
        return hitos;
    }
    return hitos.filter((hito) => hito.categoria === categoriaActiva);
};

// ---------- 4. DIBUJAR la línea de tiempo ----------
const dibujarPista = () => {
    const visibles = obtenerVisibles();

    // map() crea un bloque de HTML por cada hito; join("") los une en un solo texto
    pista.innerHTML = visibles.map((hito, indice) => `
        <li class="hito categoria_${hito.categoria}">
            <button type="button" class="hito_boton" data-indice="${indice}" aria-label="${hito.anio}: ${hito.titulo}">
                <span class="hito_anio">${hito.anio}</span>
                <span class="hito_punto" aria-hidden="true"></span>
                <span class="hito_titulo">${hito.titulo}</span>
            </button>
        </li>
    `).join("");
};

// ---------- 5. SELECCIONAR un hito y mostrar su detalle ----------
const seleccionarHito = (indice) => {
    const visibles = obtenerVisibles();

    // Evita salirse de la lista (no puede ser menor a 0 ni mayor al último)
    indiceActual = Math.max(0, Math.min(indice, visibles.length - 1));
    const hito = visibles[indiceActual];

    // Panel de detalle
    detalle.innerHTML = `
        <p class="detalle_anio">${hito.anio}</p>
        <p class="detalle_categoria categoria_${hito.categoria}">${nombresCategoria[hito.categoria]}</p>
        <h2>${hito.titulo}</h2>
        <p>${hito.texto}</p>
        <a class="detalle_enlace" href="${hito.enlace}">${hito.enlaceTexto}</a>
    `;

    // Marca cuál es el botón activo (aria-current lo lee un lector de pantalla)
    const botones = pista.querySelectorAll(".hito_boton");
    botones.forEach((boton, i) => {
        boton.setAttribute("aria-current", i === indiceActual ? "true" : "false");
    });

    // Desplaza la línea para que el hito elegido quede centrado
    // (si la persona pidió menos animaciones, se mueve sin animar)
    const sinAnimacion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    botones[indiceActual].scrollIntoView({
        behavior: sinAnimacion ? "auto" : "smooth",
        inline: "center",
        block: "nearest"
    });

    // Contador y estado de los botones Anterior / Siguiente
    contador.textContent = `Hito ${indiceActual + 1} de ${visibles.length}`;
    botonAnterior.disabled = indiceActual === 0;
    botonSiguiente.disabled = indiceActual === visibles.length - 1;
};

// ---------- 6. EVENTOS ----------

// Clic en un hito. En vez de poner un evento en cada botón, se escucha
// en la lista completa y se detecta cuál botón fue ("delegación de eventos").
pista.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".hito_boton");
    if (!boton) {
        return; // el clic no fue sobre un hito
    }
    seleccionarHito(Number(boton.dataset.indice));
});

// Botones Anterior / Siguiente
botonAnterior.addEventListener("click", () => seleccionarHito(indiceActual - 1));
botonSiguiente.addEventListener("click", () => seleccionarHito(indiceActual + 1));

// Filtros por tema
botonesFiltro.forEach((botonFiltro) => {
    botonFiltro.addEventListener("click", () => {
        categoriaActiva = botonFiltro.dataset.categoria;

        // Solo el filtro elegido queda "presionado"
        botonesFiltro.forEach((otro) => {
            otro.setAttribute("aria-pressed", otro === botonFiltro ? "true" : "false");
        });

        dibujarPista();
        seleccionarHito(0);
    });
});

// ---------- 7. INICIO ----------
dibujarPista();
seleccionarHito(0);
