/* ==========================================================================
   script_tienda.js - Página de Tienda
   1) Dibuja las tarjetas de productos a partir de la lista `productos`.
   2) Al tocar "Comprar" abre una caja (modal) con más detalles del producto.
   3) En esa caja, "Confirmar" agrega el producto al carrito y "Cancelar" vuelve.
   4) El carrito se guarda en localStorage (no se pierde al recargar la página).
   5) El ícono del carrito abre un panel con los productos, su precio, un botón
      "Eliminar" en cada uno y un "Confirmar" para comprar todo (genera el ID).
   6) Arriba de los productos hay filtros por categoría y por rango de precio,
      y un selector para ordenarlos de menor a mayor o de mayor a menor.
   PARA AGREGAR UN PRODUCTO NUEVO: sumá un objeto más a la lista `productos`
   (con coma entre objetos). No hace falta tocar el HTML ni el CSS.
   ========================================================================== */

/* ---------- 1. DATOS ---------- */

// "precio" va como número, sin el signo $ (se agrega al mostrarlo).
// "id" debe ser único: es el que usa el botón para saber qué producto se eligió.
const productos = [
    {
        id: 1,
        nombre: "Mochila Roja - Marca ROBLOX",
        categoria: "Mochilas",
        precio: 45.99,
        imagen: "https://tse4.mm.bing.net/th/id/OIP.rcSLxlZwXMU7-ID90I8V8gHaHa?r=0&w=800&h=800&rs=1&pid=ImgDetMain&o=7&rm=3",
        alt: "Mochila roja de la marca Roblox",
        descripcion: "Mochila de color rojo de la marca ROBLOX."
    },
    {
        id: 2,
        nombre: "Mochila - Marca ROBLOX",
        categoria: "Mochilas",
        precio: 60.99,
        imagen: "https://images.immediate.co.uk/production/volatile/sites/3/2022/03/roblox-backpack-ff80bfb.jpg?quality=90&fit=620,413",
        alt: "Mochila de la marca Roblox",
        descripcion: "Mochila de la marca ROBLOX."
    },
    {
        id: 3,
        nombre: "Mochila para chicos - Marca ROBLOX",
        categoria: "Mochilas",
        precio: 65.99,
        imagen: "https://media.karousell.com/media/photos/products/2023/12/21/roblox_children_kids_school_ba_1703130277_a58f967f_progressive",
        alt: "Mochila para niños de la marca Roblox, con cartuchera",
        descripcion: "Mochila para chicos de la marca ROBLOX. Incluye una cartuchera."
    },
    {
        id: 4,
        nombre: "Mochila + Bolsa de Mano - ROBLOX",
        categoria: "Mochilas",
        precio: 95.90,
        imagen: "https://i5.walmartimages.com/seo/Roblox-Backpack-Gamer-Black-Rucksack-Green-Creeper-Zombie-Skeleton-Enderman-Cave-Spider_286688c2-d9f0-42f4-b17b-901f6c3293e6.e1a45c62a4d61106eee2fa4a4c5ed657.jpeg?odnHeight=580&odnWidth=580&odnBg=FFFFFF",
        alt: "Mochila de Roblox junto con una bolsa de mano",
        descripcion: "Mochila de la marca ROBLOX que viene con una bolsa de mano."
    },
    {
        id: 5,
        nombre: "Tarjeta de Regalo (4500 ROBUX)",
        categoria: "Tarjetas de regalo",
        precio: 50,
        imagen: "https://storegames.com.pe/wp-content/uploads/2024/01/roblox000-3-ph.webp",
        alt: "Tarjeta de regalo de Roblox de 4500 Robux",
        descripcion: "Tarjeta de regalo con 4500 Robux."
    },
    {
        id: 6,
        nombre: "Tarjeta de Regalo (1300 ROBUX)",
        categoria: "Tarjetas de regalo",
        precio: 10,
        imagen: "https://tse4.mm.bing.net/th/id/OIP.alAGrMin5xIT2u3IN3bqfgAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        alt: "Tarjeta de regalo de Roblox de 1300 Robux",
        descripcion: "Tarjeta de regalo con 1300 Robux."
    },
    {
        id: 7,
        nombre: "Tarjeta de Regalo (2700 ROBUX)",
        categoria: "Tarjetas de regalo",
        precio: 20,
        imagen: "https://http2.mlstatic.com/D_NQ_NP_830249-MLU92127197963_092025-O.webp",
        alt: "Tarjeta de regalo de Roblox de 2700 Robux",
        descripcion: "Tarjeta de regalo con 2700 Robux."
    },
    {
        id: 8,
        nombre: "Tarjeta de Regalo (9000 ROBUX)",
        categoria: "Tarjetas de regalo",
        precio: 100,
        imagen: "https://cdn.kemik.gt/2023/09/ROBLOX100USD-ROBLOX-1200x1200-01.jpg",
        alt: "Tarjeta de regalo de Roblox de 9000 Robux",
        descripcion: "Tarjeta de regalo con 9000 Robux."
    },
    {
        id: 9,
        nombre: "Tarjeta de Regalo (7500 ROBUX)",
        categoria: "Tarjetas de regalo",
        precio: 80,
        imagen: "https://http2.mlstatic.com/D_NQ_NP_695221-MLA79447789004_102024-O.webp",
        alt: "Tarjeta de regalo de Roblox de 7500 Robux",
        descripcion: "Tarjeta de regalo con 7500 Robux."
    },
    {
        id: 10,
        nombre: "Set de 32 personajes de ROBLOX para armar",
        categoria: "Juguetes",
        precio: 400,
        imagen: "https://tse1.mm.bing.net/th/id/OIP.500RRMXbfi91EDxLzfNngwHaEj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        alt: "Set de 32 personajes de Roblox para armar",
        descripcion: "Set de 32 personajes de ROBLOX para armar."
    },
    {
        id: 11,
        nombre: "Set de 6 personajes de ROBLOX para armar",
        categoria: "Juguetes",
        precio: 150,
        imagen: "https://i.pinimg.com/originals/ec/c3/25/ecc325326c49c98d1a326cf0c522d56c.jpg",
        alt: "Set de 6 personajes de Roblox para armar",
        descripcion: "Set de 6 personajes de ROBLOX para armar."
    },
    {
        id: 12,
        nombre: "Teclado - Marca ROBLOX",
        categoria: "Accesorios",
        precio: 550,
        imagen: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/3caa01c5-c7e0-4680-bfee-876437762f75.__CR0,0,970,600_PT0_SX970_V1___.png",
        alt: "Teclado de la marca Roblox",
        descripcion: "Teclado de la marca ROBLOX."
    }
];

/* ---------- 2. REFERENCIAS AL DOM ---------- */
// Se buscan una sola vez y se reutilizan en todas las funciones
const lista = document.querySelector("#lista_productos");
const modal = document.querySelector("#modal_compra");             // caja con el detalle del producto
const modalCaja = document.querySelector("#modal_caja");
const modalCarrito = document.querySelector("#modal_carrito");     // panel lateral del carrito
const carritoCaja = document.querySelector("#carrito_caja");
const botonCarrito = document.querySelector("#boton_carrito");     // ícono del carrito
const contadorCarrito = document.querySelector("#carrito_contador");
const zonaMensaje = document.querySelector("#zona_mensaje");

// Filtros y orden
const formularioFiltros = document.querySelector("#filtros");
const selectCategoria = document.querySelector("#filtro_categoria");
const inputPrecioMinimo = document.querySelector("#precio_minimo");
const inputPrecioMaximo = document.querySelector("#precio_maximo");
const selectOrden = document.querySelector("#filtro_orden");
const botonLimpiarFiltros = document.querySelector("#limpiar_filtros");
const estadoFiltros = document.querySelector("#estado_filtros");

// Nombre con el que el carrito se guarda en el navegador (localStorage)
const CLAVE_CARRITO = "carrito_tienda_roblox";

/* ---------- 3. ESTADO ---------- */
let carrito = [];           // lista de ids de productos agregados (un id repetido = producto agregado 2 veces)
let productoElegido = null; // producto que se está viendo en la caja de detalle
let cajaAbierta = null;     // cuál caja está abierta: `modal`, `modalCarrito` o null
let botonOrigen = null;     // botón que abrió la caja (para devolverle el foco al cerrar)

/* ---------- 4. CARRITO: DATOS Y LOCALSTORAGE ---------- */

// Convierte el número en texto con el signo $, igual que en tu página original:
// 45.99 -> "$45.99", 95.9 -> "$95.90" (siempre 2 decimales) y 50 -> "$50" (si es entero)
const formatearPrecio = (precio) => Number.isInteger(precio) ? `$${precio}` : `$${precio.toFixed(2)}`;

// Lee el carrito guardado. Si no hay nada, o el dato está dañado, devuelve una lista vacía.
// Solo se guardan ids: los nombres y precios siempre se toman de la lista `productos`.
const leerCarrito = () => {
    try {
        const guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO));
        if (!Array.isArray(guardado)) {
            return [];
        }
        return guardado.filter((id) => productos.some((producto) => producto.id === id));
    } catch (error) {
        return []; // localStorage bloqueado o texto guardado inválido
    }
};

// Guarda el carrito en el navegador. Si no se puede, la página sigue funcionando sin guardar.
const guardarCarrito = () => {
    try {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    } catch (error) {
        // sin localStorage el carrito solo dura hasta recargar la página
    }
};

// Convierte la lista de ids en la lista de productos completos
const obtenerItemsCarrito = () => carrito.map((id) => productos.find((producto) => producto.id === id));

// Suma los precios (se redondea a 2 decimales para evitar resultados como 106.97999999)
const calcularTotal = () => {
    const total = obtenerItemsCarrito().reduce((suma, producto) => suma + producto.precio, 0);
    return Math.round(total * 100) / 100;
};

// Actualiza el numerito del ícono y el texto que lee un lector de pantalla
const actualizarContador = () => {
    const cantidad = carrito.length;
    contadorCarrito.textContent = cantidad;
    contadorCarrito.hidden = cantidad === 0;
    botonCarrito.setAttribute("aria-label", `Abrir carrito (${cantidad} ${cantidad === 1 ? "producto" : "productos"})`);
};

const agregarAlCarrito = (producto) => {
    carrito.push(producto.id);
    guardarCarrito();
    actualizarContador();
};

const vaciarCarrito = () => {
    carrito = [];
    guardarCarrito();
    actualizarContador();
};

/* ---------- 5. HTML DE LAS TARJETAS Y DE LAS CAJAS ---------- */

// Arma el HTML de UNA tarjeta de producto
const crearTarjeta = (producto) => `
    <article class="producto">
        <img class="producto_imagen" src="${producto.imagen}" alt="${producto.alt}" width="300" height="300" loading="lazy">
        <div class="producto_cuerpo">
            <span class="producto_categoria">${producto.categoria}</span>
            <h2>${producto.nombre}</h2>
            <p class="producto_precio">${formatearPrecio(producto.precio)}</p>
            <button type="button" class="boton boton_comprar" data-id="${producto.id}" aria-label="Comprar ${producto.nombre}">Comprar</button>
        </div>
    </article>`;

// Arma el cartel que se ve cuando ningún producto cumple los filtros
const crearMensajeSinResultados = (rangoInvalido) => `
    <p class="sin_resultados">${rangoInvalido
        ? "El precio mínimo no puede ser mayor que el máximo."
        : "No hay productos que coincidan con los filtros. Pruebe con otra categoría u otro rango de precio."}</p>`;

// Dibuja las tarjetas de la lista que reciba (todos los productos, o solo los filtrados)
const mostrarProductos = (items, rangoInvalido = false) => {
    lista.innerHTML = items.length > 0
        ? items.map(crearTarjeta).join("")
        : crearMensajeSinResultados(rangoInvalido);
};

// Arma el HTML de lo que va DENTRO de la caja de detalle del producto
const crearContenidoModal = (producto) => `
    <div class="modal_imagen_caja">
        <img class="modal_imagen" src="${producto.imagen}" alt="${producto.alt}" width="400" height="400">
    </div>
    <div class="modal_info">
        <span class="producto_categoria">${producto.categoria}</span>
        <h2 id="modal_titulo">${producto.nombre}</h2>
        <p id="modal_descripcion">${producto.descripcion}</p>
        <p class="producto_precio">${formatearPrecio(producto.precio)}</p>
        <p class="modal_pregunta">¿Desea agregar este producto al carrito?</p>
        <div class="modal_botones">
            <button type="button" class="boton boton_secundario boton_cancelar">Cancelar</button>
            <button type="button" class="boton boton_confirmar">Confirmar</button>
        </div>
    </div>`;

// Arma el HTML de UNA fila del carrito. "indice" es la posición en la lista del carrito.
const crearItemCarrito = (producto, indice) => `
    <li class="carrito_item">
        <img class="carrito_miniatura" src="${producto.imagen}" alt="" width="64" height="64">
        <div class="carrito_datos">
            <p class="carrito_nombre">${producto.nombre}</p>
            <p class="carrito_precio">${formatearPrecio(producto.precio)}</p>
        </div>
        <button type="button" class="boton boton_secundario boton_eliminar" data-indice="${indice}" aria-label="Eliminar ${producto.nombre} del carrito">Eliminar</button>
    </li>`;

// Arma el HTML de todo el panel del carrito (con productos o con el mensaje de vacío)
const crearContenidoCarrito = () => {
    const items = obtenerItemsCarrito();
    const estaVacio = items.length === 0;

    const cuerpo = estaVacio
        ? `<p class="carrito_vacio">Su carrito está vacío.</p>`
        : `<ul class="carrito_lista">${items.map(crearItemCarrito).join("")}</ul>`;

    const total = estaVacio
        ? ""
        : `<p class="carrito_total">Total: <strong>${formatearPrecio(calcularTotal())}</strong></p>`;

    return `
        <div class="carrito_cabecera">
            <h2 id="carrito_titulo">Carrito</h2>
            <button type="button" class="carrito_cerrar" aria-label="Cerrar carrito">×</button>
        </div>
        ${cuerpo}
        <div class="carrito_pie">
            ${total}
            <button type="button" class="boton boton_confirmar_carrito" ${estaVacio ? "disabled" : ""}>Confirmar</button>
        </div>`;
};

/* ---------- 5B. FILTROS Y ORDEN ---------- */

// Categorías que existen en la lista, sin repetir: ["Mochilas", "Tarjetas de regalo", ...]
// (si agregás un producto con una categoría nueva, aparece sola en el filtro)
const obtenerCategorias = () => [...new Set(productos.map((producto) => producto.categoria))];

// Precio más alto de la lista, redondeado hacia arriba (sirve de valor inicial de "Hasta")
const obtenerPrecioMaximo = () => Math.ceil(Math.max(...productos.map((producto) => producto.precio)));

// Agrega una <option> por cada categoría al <select>
const llenarCategorias = () => {
    selectCategoria.innerHTML += obtenerCategorias()
        .map((categoria) => `<option value="${categoria}">${categoria}</option>`)
        .join("");
};

// Deja los filtros como al principio: todas las categorías, de 0 al precio más alto y orden original
const reiniciarCampos = () => {
    selectCategoria.value = "";
    inputPrecioMinimo.value = "";
    inputPrecioMaximo.value = "";
    selectOrden.value = "original";
};

// Convierte el texto de un campo en número. Si está vacío, usa el valor por defecto.
const leerNumero = (texto, valorPorDefecto) => texto === "" ? valorPorDefecto : Number(texto);

// Lee lo que hay elegido en el formulario y lo junta en un solo objeto
const leerFiltros = () => ({
    categoria: selectCategoria.value,
    minimo: leerNumero(inputPrecioMinimo.value, 0),
    maximo: leerNumero(inputPrecioMaximo.value, Infinity),
    orden: selectOrden.value
});

// Se queda solo con los productos de esa categoría (si hay una elegida) y dentro del rango de precio
const filtrarProductos = (filtros) => productos.filter((producto) =>
    (filtros.categoria === "" || producto.categoria === filtros.categoria)
    && producto.precio >= filtros.minimo
    && producto.precio <= filtros.maximo
);

// Devuelve una COPIA ordenada por precio (la lista original no se modifica)
const ordenarProductos = (items, orden) => {
    if (orden === "menor") {
        return [...items].sort((a, b) => a.precio - b.precio);
    }
    if (orden === "mayor") {
        return [...items].sort((a, b) => b.precio - a.precio);
    }
    return items; // "original": se respeta el orden de la lista
};

// Aplica filtros + orden y dibuja el resultado
const actualizarVista = () => {
    const filtros = leerFiltros();
    const rangoInvalido = filtros.minimo > filtros.maximo;
    const visibles = rangoInvalido ? [] : ordenarProductos(filtrarProductos(filtros), filtros.orden);

    mostrarProductos(visibles, rangoInvalido);
    estadoFiltros.textContent = `Mostrando ${visibles.length} de ${productos.length} productos`;
};

/* ---------- 6. ABRIR Y CERRAR LAS CAJAS ---------- */

// Abre una caja (`overlay`), deja la página de atrás bloqueada y pone el foco dentro
const abrirCaja = (overlay, boton, selectorFoco) => {
    cajaAbierta = overlay;
    botonOrigen = boton;
    overlay.hidden = false;                                // muestra la caja y el fondo oscuro
    document.body.classList.add("modal_abierto");          // evita que la página de atrás se desplace
    overlay.querySelector(selectorFoco).focus();           // el foco pasa a la caja (accesibilidad)
};

// Cierra la caja abierta y devuelve el foco al botón que la había abierto
const cerrarCaja = () => {
    if (!cajaAbierta) {
        return;
    }
    cajaAbierta.hidden = true;
    document.body.classList.remove("modal_abierto");
    if (botonOrigen) {
        botonOrigen.focus();
    }
    cajaAbierta = null;
    botonOrigen = null;
    productoElegido = null;
};

// Caja de detalle: el segundo parámetro es el botón "Comprar" que se tocó
const abrirDetalle = (producto, boton) => {
    productoElegido = producto;
    modalCaja.innerHTML = crearContenidoModal(producto);
    abrirCaja(modal, boton, ".boton_cancelar");
};

// Panel del carrito: se dibuja de nuevo cada vez que se abre
const abrirCarrito = () => {
    carritoCaja.innerHTML = crearContenidoCarrito();
    abrirCaja(modalCarrito, botonCarrito, ".carrito_cerrar");
};

/* ---------- 7. MENSAJES Y PEDIDO ---------- */

// Crea un ID de pedido, por ejemplo "PED-MI4X9Z2K-7QF".
// Combina la hora actual (en base 36) con unas letras al azar.
const generarIdPedido = () => {
    const marcaDeTiempo = Date.now().toString(36).toUpperCase();
    const azar = Math.random().toString(36).slice(2, 5).padEnd(3, "0").toUpperCase();
    return `PED-${marcaDeTiempo}-${azar}`;
};

// Muestra un mensaje abajo de la pantalla (recibe el HTML del texto)
const mostrarMensaje = (textoHtml) => {
    zonaMensaje.innerHTML = `
        <div class="mensaje_compra">
            <p>${textoHtml}</p>
            <button type="button" class="mensaje_cerrar" aria-label="Cerrar mensaje">×</button>
        </div>`;
};

// Quita el mensaje de la pantalla
const cerrarMensaje = () => {
    zonaMensaje.innerHTML = "";
};

/* ---------- 8. ACCIONES ---------- */

// "Confirmar" en la caja de detalle: el producto va al carrito
const confirmarAgregado = () => {
    const producto = productoElegido;
    agregarAlCarrito(producto);
    cerrarCaja();
    mostrarMensaje(`<strong>${producto.nombre}</strong> se agregó al carrito.`);
};

// "Eliminar" en una fila: saca ese producto y dibuja de nuevo el panel
const eliminarDelCarrito = (indice) => {
    carrito.splice(indice, 1);
    guardarCarrito();
    actualizarContador();
    carritoCaja.innerHTML = crearContenidoCarrito();

    // Como el botón que se tocó ya no existe, el foco pasa al "Eliminar" siguiente
    // (o al botón de cerrar si el carrito quedó vacío)
    const botones = carritoCaja.querySelectorAll(".boton_eliminar");
    const siguiente = botones[Math.min(indice, botones.length - 1)] || carritoCaja.querySelector(".carrito_cerrar");
    siguiente.focus();
};

// "Confirmar" en el carrito: se compra todo, se vacía el carrito y aparece el ID de pedido
const confirmarCarrito = () => {
    if (carrito.length === 0) {
        return;
    }
    const idPedido = generarIdPedido();
    vaciarCarrito();
    cerrarCaja();
    mostrarMensaje(`Compra realizada, aquí está su ID de pedido generado: <strong>${idPedido}</strong>.`);
};

// Mantiene el Tab dentro de la caja abierta (no deja salir hacia la página de atrás)
const mantenerFocoEnCaja = (evento) => {
    const botones = cajaAbierta.querySelectorAll("button:not([disabled])");
    const primero = botones[0];
    const ultimo = botones[botones.length - 1];

    if (evento.shiftKey && document.activeElement === primero) {
        evento.preventDefault();
        ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primero.focus();
    }
};

/* ---------- 9. EVENTOS ---------- */

// Un solo "escuchador" en toda la lista (delegación de eventos).
// closest() sube desde donde se hizo clic hasta encontrar el botón "Comprar".
lista.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".boton_comprar");
    if (!boton) {
        return;
    }
    const producto = productos.find((item) => item.id === Number(boton.dataset.id));
    abrirDetalle(producto, boton);
});

// Clics dentro de la caja de detalle: Confirmar, Cancelar o el fondo oscuro de atrás
modal.addEventListener("click", (evento) => {
    if (evento.target.closest(".boton_confirmar")) {
        confirmarAgregado();
    } else if (evento.target.closest(".boton_cancelar") || evento.target === modal) {
        cerrarCaja();
    }
});

// Clic en el ícono del carrito
botonCarrito.addEventListener("click", abrirCarrito);

// Clics dentro del panel del carrito: Eliminar, Confirmar, cerrar (×) o el fondo oscuro
modalCarrito.addEventListener("click", (evento) => {
    const botonEliminar = evento.target.closest(".boton_eliminar");

    if (botonEliminar) {
        eliminarDelCarrito(Number(botonEliminar.dataset.indice));
    } else if (evento.target.closest(".boton_confirmar_carrito")) {
        confirmarCarrito();
    } else if (evento.target.closest(".carrito_cerrar") || evento.target === modalCarrito) {
        cerrarCaja();
    }
});

// Cualquier cambio en los filtros (escribir un precio, elegir una opción) vuelve a dibujar la lista.
// El evento "input" sube desde cada campo hasta el formulario, así alcanza con un solo escuchador.
formularioFiltros.addEventListener("input", () => {
    lista.classList.add("sin_animacion"); // al filtrar, las tarjetas no se animan de nuevo
    actualizarVista();
});

// Si alguien aprieta Enter dentro de un campo, no se recarga la página
formularioFiltros.addEventListener("submit", (evento) => {
    evento.preventDefault();
});

botonLimpiarFiltros.addEventListener("click", () => {
    reiniciarCampos();
    lista.classList.add("sin_animacion");
    actualizarVista();
});

// Clic en la "×" del mensaje
zonaMensaje.addEventListener("click", (evento) => {
    if (evento.target.closest(".mensaje_cerrar")) {
        cerrarMensaje();
    }
});

// Teclado: Esc cierra la caja abierta y Tab queda atrapado dentro de ella
document.addEventListener("keydown", (evento) => {
    if (!cajaAbierta) {
        return;
    }
    if (evento.key === "Escape") {
        cerrarCaja();
    } else if (evento.key === "Tab") {
        mantenerFocoEnCaja(evento);
    }
});

/* ---------- 10. INICIO ---------- */
// El script se carga con "defer", así que el HTML ya está listo al ejecutarse
carrito = leerCarrito();        // recupera lo que quedó guardado de la visita anterior
actualizarContador();
botonCarrito.hidden = false;    // el ícono está oculto en el HTML y solo se muestra si hay JS

llenarCategorias();             // completa el <select> con las categorías de la lista
reiniciarCampos();              // valores iniciales de los filtros
formularioFiltros.hidden = false; // los filtros están ocultos en el HTML y solo se muestran si hay JS
actualizarVista();              // dibuja todos los productos por primera vez
