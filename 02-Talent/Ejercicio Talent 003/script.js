// Referencias al DOM
const listadoPeliculas = document.getElementById("peliculas");
const generoSelect = document.getElementById("genero");
const accesosRapidos = document.getElementById("accesos-rapidos");

// Variable para almacenar las películas
let peliculas = [];

// Inicializar la página
function inicializar() {
    // Cargar las películas desde el archivo JSON
    fetch("peliculas.json")
        .then(response => response.json())
        .then(data => {
            peliculas = data; // Guardar las películas en la variable
            cargarGeneros();
            mostrarPeliculas(peliculas);
            generarBotonesAcceso();
        })
        .catch(error => console.error("Error al cargar las películas:", error));
}

function limpiarElementosHijos(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

function cargarGeneros() {
    limpiarElementosHijos(generoSelect); // Limpia el desplegable antes de agregar opciones
    const generos = [...new Set(peliculas.map(p => p.genero))];
    const optionTodos = document.createElement("option");
    optionTodos.value = "todos";
    optionTodos.textContent = "Todos";
    generoSelect.appendChild(optionTodos);

    generos.forEach(genero => {
        const option = document.createElement("option");
        option.value = genero;
        option.textContent = genero;
        generoSelect.appendChild(option);
    });

    generoSelect.addEventListener("change", filtrarPeliculas);
}

function generarBotonesAcceso() {
    limpiarElementosHijos(accesosRapidos); // Limpia botones duplicados
    const generos = [...new Set(peliculas.map(p => p.genero))];
    generos.forEach(genero => {
        const button = document.createElement("button");
        button.textContent = genero;
        button.addEventListener("click", () => filtrarPeliculasPorGenero(genero));
        accesosRapidos.appendChild(button);
    });
}

// Mostrar películas en la página
function mostrarPeliculas(lista) {
    listadoPeliculas.innerHTML = "";
    lista.forEach(pelicula => {
        const li = document.createElement("li");
        li.textContent = `${pelicula.titulo} - ${pelicula.genero}`;
        listadoPeliculas.appendChild(li);
    });
}

// Filtrar películas por género desde el desplegable
function filtrarPeliculas() {
    const generoSeleccionado = generoSelect.value;
    if (generoSeleccionado === "todos") {
        mostrarPeliculas(peliculas);
    } else {
        const filtradas = peliculas.filter(p => p.genero === generoSeleccionado);
        mostrarPeliculas(filtradas);
    }
}

// Filtrar películas por género usando botones
function filtrarPeliculasPorGenero(genero) {
    const filtradas = peliculas.filter(p => p.genero === genero);
    mostrarPeliculas(filtradas);
}

// Inicializar la aplicación
inicializar();
