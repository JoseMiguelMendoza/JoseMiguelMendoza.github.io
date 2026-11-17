/* ==========================================================================
    script_testimonios.js - Página de Comentarios
    Dibuja las tarjetas de comentarios a partir de la lista `comentarios`.
    PARA AGREGAR UN COMENTARIO NUEVO: sumá un objeto más a la lista (con coma
    entre objetos). No hace falta tocar el HTML ni el CSS.
   ========================================================================== */

/* ---------- 1. DATOS ---------- */

// Imágenes de avatar disponibles (las rutas salen de la carpeta Images/)
const avatares = {
    mujer: "../Images/woman-avatar-profile.png",
    hombre: "../Images/man-avatar-profile.png"
};

// Lista de comentarios. "estrellas" va de 1 a 5. "avatar" es "mujer" u "hombre".
const comentarios = [
    {
        nombre: "Lucía",
        edad: 14,
        avatar: "mujer",
        estrellas: 5,
        texto: "Empecé jugando Adopt Me! y terminé aprendiendo a programar mis propios juegos en Roblox Studio. Nunca pensé que iba a interesarme tanto por la programación."
    },
    {
        nombre: "Mateo",
        edad: 17,
        avatar: "hombre",
        estrellas: 3,
        texto: "Llevo varios años jugando Roblox y me sorprende cómo ha cambiado la plataforma. Los gráficos, los avatares y las posibilidades son mucho mejores."
    },
    {
        nombre: "Valentina",
        edad: 16,
        avatar: "mujer",
        estrellas: 5,
        texto: "Lo que más me gusta de Roblox es poder jugar con mis amigos, descubrir experiencias nuevas y compartir momentos divertidos."
    },
    {
        nombre: "Santiago",
        edad: 19,
        avatar: "hombre",
        estrellas: 3,
        texto: "Roblox tiene juegos muy entretenidos, aunque algunos se vuelven repetitivos. Me gustaría que hubiera más variedad en ciertas experiencias."
    },
    {
        nombre: "Camila",
        edad: 13,
        avatar: "mujer",
        estrellas: 4,
        texto: "Mi juego favorito es Dress to Impress. Me encanta poder crear diferentes estilos y competir con otros jugadores."
    },
    {
        nombre: "Tomás",
        edad: 21,
        avatar: "hombre",
        estrellas: 5,
        texto: "Comencé jugando obbies sencillos y ahora disfruto creando mis propios mapas. Roblox me permitió desarrollar mi creatividad."
    },
    {
        nombre: "Martina",
        edad: 15,
        avatar: "mujer",
        estrellas: 4,
        texto: "Me gusta que siempre haya algo nuevo para descubrir. Cada vez que entro encuentro juegos diferentes y nuevas actualizaciones."
    },
    {
        nombre: "Franco",
        edad: 18,
        avatar: "hombre",
        estrellas: 2,
        texto: "Disfruto mucho algunos juegos, pero creo que hay demasiadas experiencias que priorizan las compras con Robux."
    },
    {
        nombre: "Sofía",
        edad: 20,
        avatar: "mujer",
        estrellas: 5,
        texto: "Adopt Me! fue uno de los primeros juegos que conocí. Con el tiempo hice muchos amigos y descubrí una comunidad muy grande."
    },
    {
        nombre: "Lucas",
        edad: 16,
        avatar: "hombre",
        estrellas: 4,
        texto: "Me encantan los juegos de terror como Doors. La ambientación, los sonidos y la tensión hacen que cada partida sea diferente."
    },
    {
        nombre: "Isabella",
        edad: 17,
        avatar: "mujer",
        estrellas: 3,
        texto: "Roblox es una buena plataforma para pasar el tiempo, aunque siento que algunos juegos han perdido calidad con sus actualizaciones."
    },
    {
        nombre: "Nicolás",
        edad: 22,
        avatar: "hombre",
        estrellas: 5,
        texto: "Lo más interesante de Roblox es que cualquiera puede convertirse en desarrollador y compartir sus creaciones con millones de personas."
    },
    {
        nombre: "Julieta",
        edad: 14,
        avatar: "mujer",
        estrellas: 5,
        texto: "Me encanta personalizar mi avatar. Hay muchísimas opciones de ropa y accesorios para expresar mi estilo."
    },
    {
        nombre: "Benjamín",
        edad: 15,
        avatar: "hombre",
        estrellas: 3,
        texto: "Juego principalmente Blox Fruits. Me gusta su sistema de progresión, las habilidades y la posibilidad de jugar con amigos."
    },
    {
        nombre: "Agustina",
        edad: 18,
        avatar: "mujer",
        estrellas: 1,
        texto: "Me divertía mucho jugando antes, pero últimamente encuentro demasiadas experiencias similares y pocas ideas originales."
    },
    {
        nombre: "Thiago",
        edad: 13,
        avatar: "hombre",
        estrellas: 4,
        texto: "Mi parte favorita es jugar con mis amigos. Podemos pasar horas explorando mundos, superando obstáculos y compitiendo."
    },
    {
        nombre: "Florencia",
        edad: 23,
        avatar: "mujer",
        estrellas: 3,
        texto: "Me parece increíble que Roblox haya pasado de tener juegos bastante simples a ofrecer experiencias tan completas y variadas."
    },
    {
        nombre: "Joaquín",
        edad: 19,
        avatar: "hombre",
        estrellas: 3,
        texto: "La plataforma tiene mucho potencial, pero creo que debería mejorar la moderación y la seguridad para sus usuarios."
    },
    {
        nombre: "Micaela",
        edad: 16,
        avatar: "mujer",
        estrellas: 5,
        texto: "Me gusta descubrir juegos pequeños que todavía no son populares. A veces encuentro experiencias increíbles que muy pocas personas conocen."
    },
    {
        nombre: "Facundo",
        edad: 20,
        avatar: "hombre",
        estrellas: 4,
        texto: "Roblox Studio me parece una herramienta excelente. Aprendí conceptos básicos de programación mientras intentaba crear mi propio juego."
    },
    {
        nombre: "Renata",
        edad: 15,
        avatar: "mujer",
        estrellas: 3,
        texto: "Me gustan las opciones de personalización y la variedad de juegos, aunque algunos requieren demasiado tiempo para avanzar."
    },
    {
        nombre: "Agustín",
        edad: 17,
        avatar: "hombre",
        estrellas: 5,
        texto: "Natural Disaster Survival fue uno de los primeros juegos que me hicieron interesarme por Roblox. Todavía lo recuerdo con mucho cariño."
    },
    {
        nombre: "Emilia",
        edad: 21,
        avatar: "mujer",
        estrellas: 4,
        texto: "Considero que Roblox es mucho más que una plataforma de juegos. Es un espacio donde las personas pueden aprender, crear y compartir."
    },
    {
        nombre: "Bruno",
        edad: 14,
        avatar: "hombre",
        estrellas: 5,
        texto: "Me encanta la variedad de experiencias que ofrece Roblox. Puedo jugar carreras, aventuras, simuladores y juegos de terror sin cambiar de plataforma."
    }
];

/* ---------- 2. FUNCIONES ---------- */

// Arma el texto de las estrellas: por ejemplo 3 -> "★★★☆☆"
const crearEstrellas = (cantidad) => "★".repeat(cantidad) + "☆".repeat(5 - cantidad);

// Arma el HTML de UNA tarjeta a partir de un comentario
const crearTarjeta = (comentario) => `
    <article class="testimonio">
        <div class="testimonio_cabecera">
            <img class="avatar" src="${avatares[comentario.avatar]}" alt="" width="60" height="60">
            <div>
                <p class="autor_nombre">${comentario.nombre}</p>
                <p class="autor_edad">${comentario.edad} años</p>
                <span class="estrellas" role="img" aria-label="Calificación: ${comentario.estrellas} de 5">${crearEstrellas(comentario.estrellas)}</span>
            </div>
        </div>
        <blockquote>
            <p>${comentario.texto}</p>
        </blockquote>
    </article>`;

// Dibuja todas las tarjetas dentro del contenedor de la página
const mostrarComentarios = () => {
    const contenedor = document.querySelector("#lista_testimonios");
    contenedor.innerHTML = comentarios.map(crearTarjeta).join("");
};

/* ---------- 3. INICIO ---------- */
// El script se carga con "defer", así que el HTML ya está listo al ejecutarse
mostrarComentarios();
