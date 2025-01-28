// Referencias al DOM
const listadoPeliculas = document.getElementById("peliculas");
const generoSelect = document.getElementById("genero");
const accesosRapidos = document.getElementById("accesos-rapidos");
const buscarInput = document.getElementById("buscar");
const buscarBtn = document.getElementById("buscar-button");
const ordenarAscBtn = document.getElementById("ordenar-ascendente");
const ordenarDescBtn = document.getElementById("ordenar-descendente");

// Variables para almacenar las películas
let peliculas = [];
let peliculasFiltradas = [];

// Función principal para cargar datos y configurar la página
function inicializar() {
    fetch("peliculas.json") // Cargar JSON
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar el JSON");
            return response.json();
        })
        .then(data => {
            peliculas = data; // Guardar datos en la variable global
            peliculasFiltradas = [...peliculas]; // Inicializar con todas las películas
            cargarGeneros();
            mostrarPeliculas(peliculasFiltradas);
            generarBotonesAcceso();
        })
        .catch(error => console.error("Error al inicializar la página:", error));
}

// Cargar géneros únicos en el desplegable
function cargarGeneros() {
    generoSelect.innerHTML = '<option value="todos">Todos</option>'; // Limpiar y añadir opción "Todos"
    const generos = [...new Set(peliculas.map(p => p.genero))];

    // Añadir opciones al <select>
    generos.forEach(genero => {
        const option = document.createElement("option");
        option.value = genero;
        option.textContent = genero;
        generoSelect.appendChild(option);
    });

    // Para filtrar por género desde el desplegable
    generoSelect.addEventListener("change", () => filtrarPeliculas(generoSelect.value));
}

// Generar botones rápidos para filtrar por género
function generarBotonesAcceso() {
    accesosRapidos.innerHTML = ""; // Limpiar botones previos
    const generos = [...new Set(peliculas.map(p => p.genero))];

    // Crear un botón para cada género
    generos.forEach(genero => {
        const button = document.createElement("button");
        button.textContent = genero;
        button.addEventListener("click", () => filtrarPeliculas(genero));
        accesosRapidos.appendChild(button);
    });
}

// Mostrar películas en la lista
function mostrarPeliculas(lista) {
    listadoPeliculas.innerHTML = ""; // Limpiar listado previo

    if (lista.length === 0) {
        listadoPeliculas.innerHTML = "<li>No se encontraron películas.</li>";
        return;
    }

    lista.forEach(pelicula => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="pelicula-contenedor">
                <div class="pelicula-imagen">
                    <img src="${pelicula.imagen}" alt="${pelicula.titulo}">
                </div>
                <div class="pelicula-detalles">
                    <h2>${pelicula.titulo}</h2>
                    <p>Género: ${pelicula.genero}</p>
                    <p>Año: ${pelicula.año}</p>
                </div>
            </div>
        `;
        listadoPeliculas.appendChild(li);
    });
}

// Filtrar películas por género
function filtrarPeliculas(genero) {
    if (genero === "todos") {
        peliculasFiltradas = [...peliculas];
    } else {
        peliculasFiltradas = peliculas.filter(p => p.genero === genero);
    }
    mostrarPeliculas(peliculasFiltradas);
}

// Buscar películas por título
function buscarPorTitulo() {
    const textoBusqueda = buscarInput.value.toLowerCase().trim();
    peliculasFiltradas = peliculas.filter(p =>
        p.titulo.toLowerCase().includes(textoBusqueda)
    );
    mostrarPeliculas(peliculasFiltradas);
}

// Ordenar películas por año
function ordenarPeliculas(ascendente = true) {
    peliculasFiltradas.sort((a, b) => (ascendente ? a.año - b.año : b.año - a.año));
    mostrarPeliculas(peliculasFiltradas);
}

// Eventos para los botones
buscarBtn.addEventListener("click", buscarPorTitulo);
ordenarAscBtn.addEventListener("click", () => ordenarPeliculas(true));
ordenarDescBtn.addEventListener("click", () => ordenarPeliculas(false));

// Inicializar la aplicación
inicializar();
