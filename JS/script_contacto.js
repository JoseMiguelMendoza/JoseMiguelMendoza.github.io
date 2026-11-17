/* ==========================================================================
    script_contacto.js - Página de Contacto
    1) Valida el formulario: al salir de cada campo, mientras se corrige y al enviar.
    2) Cada error se muestra debajo de su campo, y el foco va al primer campo con error.
    3) Si todo está bien, se muestra un mensaje de confirmación.
    NOTA: la página no tiene servidor, así que el envío es una simulación (ver
    la función `mostrarConfirmacion`, que es donde iría el envío real).
   ========================================================================== */

/* ---------- 1. DATOS ---------- */

const TAMANO_MAXIMO_ARCHIVO = 5 * 1024 * 1024;            // 5 MB expresados en bytes
const EXTENSIONES_PERMITIDAS = ["jpg", "jpeg", "png", "pdf"];

/* ---------- 2. REFERENCIAS AL DOM ---------- */
const formulario = document.querySelector("#formulario_contacto");
const campos = formulario.querySelectorAll("[data-validar]");   // los campos que se validan
const resumenErrores = document.querySelector("#resumen_errores");
const confirmacion = document.querySelector("#confirmacion");
const tituloConfirmacion = document.querySelector("#titulo_confirmacion");
const botonOtraConsulta = document.querySelector("#otra_consulta");
const campoFecha = document.querySelector("#fecha-nacimiento");

/* ---------- 3. REGLAS DE VALIDACIÓN ---------- */
// Cada regla recibe el campo y devuelve un texto con el error, o "" si está bien.

// Nombre y apellido: obligatorios, mínimo 2 letras, solo letras, espacios, guiones y apóstrofes.
// \p{L} significa "cualquier letra" (incluye acentos y la ñ).
const validarTexto = (etiqueta) => (campo) => {
    const valor = campo.value.trim();

    if (valor === "") {
        return `Ingrese su ${etiqueta}.`;
    }
    if (valor.length < 2) {
        return `El ${etiqueta} debe tener al menos 2 letras.`;
    }
    if (!/^\p{L}[\p{L}\s'’.-]*$/u.test(valor)) {
        return `El ${etiqueta} solo puede tener letras, espacios, guiones y apóstrofes.`;
    }
    return "";
};

// Fecha de nacimiento: es obligatorio, no puede ser futura ni anterior a 1900.
const validarFecha = (campo) => {
    if (campo.validity.badInput) {
        return "Ingrese una fecha completa y válida.";
    }
    if (campo.value === "") {
        return "Por favor, ingresar su fecha de nacimiento.";
    }

    const fecha = new Date(`${campo.value}T00:00:00`);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fecha > hoy) {
        return "La fecha de nacimiento no puede ser futura.";
    }
    if (fecha.getFullYear() < 1900) {
        return "Ingrese una fecha de nacimiento posterior a 1900.";
    }
    return "";
};

// Teléfono: es opcional, pero si se completa debe tener entre 8 y 15 dígitos.
const validarTelefono = (campo) => {
    const valor = campo.value.trim();

    if (valor === "") {
        return "";
    }
    if (!/^[\d\s()+-]+$/.test(valor)) {
        return "El teléfono solo puede tener números, espacios y los signos + - ( ).";
    }
    const cantidadDeDigitos = valor.replace(/\D/g, "").length;
    if (cantidadDeDigitos < 8 || cantidadDeDigitos > 15) {
        return "El teléfono debe tener entre 8 y 15 dígitos.";
    }
    return "";
};

// Email: obligatorio y con forma de dirección (algo@dominio.ext).
const validarEmail = (campo) => {
    const valor = campo.value.trim();

    if (valor === "") {
        return "Ingrese su email.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
        return "Ingrese un email válido, por ejemplo nombre@correo.com.";
    }
    return "";
};

// Descripción: obligatoria y con al menos 10 caracteres.
const validarDescripcion = (campo) => {
    const valor = campo.value.trim();

    if (valor === "") {
        return "Cuéntenos su situación.";
    }
    if (valor.length < 10) {
        return "Describa su situación con al menos 10 caracteres.";
    }
    return "";
};

// Archivo: es opcional, pero si se elige debe ser JPG, PNG o PDF y pesar hasta 5 MB.
const validarArchivo = (campo) => {
    const archivo = campo.files[0];

    if (!archivo) {
        return "";
    }
    const extension = archivo.name.split(".").pop().toLowerCase();

    if (!EXTENSIONES_PERMITIDAS.includes(extension)) {
        return "El archivo debe ser JPG, PNG o PDF.";
    }
    if (archivo.size > TAMANO_MAXIMO_ARCHIVO) {
        return "El archivo supera los 5 MB.";
    }
    return "";
};

// Qué regla usa cada campo (la clave es el id del campo)
const reglas = {
    "nombre": validarTexto("nombre"),
    "apellido": validarTexto("apellido"),
    "fecha-nacimiento": validarFecha,
    "telefono": validarTelefono,
    "email": validarEmail,
    "descripcion": validarDescripcion,
    "archivo": validarArchivo
};

/* ---------- 4. FUNCIONES ---------- */

// Muestra (o borra, si el mensaje está vacío) el error de un campo
const mostrarError = (campo, mensaje) => {
    document.querySelector(`#error_${campo.id}`).textContent = mensaje;

    if (mensaje === "") {
        campo.removeAttribute("aria-invalid");
    } else {
        campo.setAttribute("aria-invalid", "true");     // un lector de pantalla avisa que el campo es inválido
    }
    campo.closest(".campo").classList.toggle("campo_con_error", mensaje !== "");
};

// Valida UN campo y muestra su error. Devuelve true si está bien.
const validarCampo = (campo) => {
    const mensaje = reglas[campo.id](campo);
    mostrarError(campo, mensaje);
    return mensaje === "";
};

// Valida TODOS los campos y devuelve la lista de los que tienen error
const obtenerCamposConError = () => [...campos].filter((campo) => !validarCampo(campo));

// Quita los errores y vuelve a dejar el formulario vacío
const reiniciarFormulario = () => {
    formulario.reset();
    campos.forEach((campo) => mostrarError(campo, ""));
    resumenErrores.textContent = "";
};

// Oculta el formulario y muestra el agradecimiento.
// AQUÍ IRÍA EL ENVÍO REAL: por ejemplo, un fetch() a un servidor con los datos
// del formulario (new FormData(formulario)). Como el sitio no tiene servidor, solo se simula.
const mostrarConfirmacion = () => {
    const nombre = formulario.elements["nombre"].value.trim();

    tituloConfirmacion.textContent = `¡Gracias, ${nombre}!`;   // textContent: el nombre se muestra como texto, no como HTML
    reiniciarFormulario();
    formulario.hidden = true;
    confirmacion.hidden = false;
    tituloConfirmacion.focus();                                // el foco pasa al mensaje (accesibilidad)
};

// Vuelve a mostrar el formulario para enviar otra consulta
const mostrarFormulario = () => {
    confirmacion.hidden = true;
    formulario.hidden = false;
    formulario.elements["nombre"].focus();
};

/* ---------- 5. EVENTOS ---------- */

// Al enviar: se validan todos los campos. Si hay errores, se avisa y el foco va al primero.
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();                                   // evita que la página se recargue

    const camposConError = obtenerCamposConError();

    if (camposConError.length > 0) {
        const cantidad = camposConError.length;
        resumenErrores.textContent = cantidad === 1
            ? "Hay 1 campo para corregir. Revise el mensaje marcado."
            : `Hay ${cantidad} campos para corregir. Revise los mensajes marcados.`;
        camposConError[0].focus();
        return;
    }

    resumenErrores.textContent = "";
    mostrarConfirmacion();
});

// Al salir de un campo, se valida. "focusout" sube hasta el formulario, así alcanza con un solo escuchador.
formulario.addEventListener("focusout", (evento) => {
    if (evento.target.matches("[data-validar]")) {
        validarCampo(evento.target);
    }
});

// Mientras se escribe, solo se vuelve a validar un campo que ya tenía error (así se borra apenas se corrige)
formulario.addEventListener("input", (evento) => {
    if (evento.target.matches("[data-validar]") && evento.target.hasAttribute("aria-invalid")) {
        validarCampo(evento.target);
    }
});

// Un archivo o una fecha se eligen "de golpe" (sin escribir), así que se validan apenas se eligen
formulario.addEventListener("change", (evento) => {
    if (evento.target.matches("[data-validar]")) {
        validarCampo(evento.target);
    }
});

botonOtraConsulta.addEventListener("click", mostrarFormulario);

/* ---------- 6. INICIO ---------- */
// Con JS, la validación la hacen estas reglas (mensajes propios). Sin JS, el navegador usa
// la validación que trae (required, type="email"), porque noValidate solo se activa acá.
formulario.noValidate = true;

// El calendario de la fecha de nacimiento no deja elegir días futuros (fecha de hoy, en hora local)
const hoy = new Date();
campoFecha.max = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;
