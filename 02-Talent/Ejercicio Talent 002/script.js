// Referencias a elementos del DOM
const contenedorPeliculas = document.getElementById('contenedor-peliculas');
const contenedorTitulos = document.getElementById('contenedor-titulos');
const botonMostrarTitulos = document.getElementById('mostrar-titulos');
const inputGenero = document.getElementById('input-genero');
const botonFiltrarGenero = document.getElementById('filtrar-genero');

// Cargar el JSON y mostrar las películas
fetch('peliculas.json')
  .then((response) => response.json())
  .then((data) => {
    // Guardar el JSON en una variable global para reutilizar
    window.peliculas = data;

    // Mostrar todas las películas
    let htmlContent = '';
    for (let i = 0; i < data.length; i++) {
      htmlContent += `<p><strong>${data[i].titulo}</strong> - Año: ${data[i].año}, Género: ${data[i].genero}</p>`;
    }
    contenedorPeliculas.innerHTML = htmlContent;
  });

// Mostrar solo los títulos de las películas
botonMostrarTitulos.addEventListener('click', () => {
  if (!window.peliculas) return;

  let htmlContent = '';
  for (let i = 0; i < window.peliculas.length; i++) {
    htmlContent += `<p>${window.peliculas[i].titulo}</p>`;
  }
  contenedorTitulos.innerHTML = htmlContent;
});

// Filtrar películas por género
botonFiltrarGenero.addEventListener('click', () => {
  if (!window.peliculas) return;

  // Obtener el género ingresado por el usuario
  const genero = inputGenero.value.trim();

  if (genero) {
    // Filtrar las películas por el género ingresado
    const peliculasFiltradas = window.peliculas.filter(pelicula => pelicula.genero.toLowerCase() === genero.toLowerCase());

    // Mostrar las películas filtradas
    let htmlContent = '';
    if (peliculasFiltradas.length > 0) {
      peliculasFiltradas.forEach(pelicula => {
        htmlContent += `<p><strong>${pelicula.titulo}</strong> - Año: ${pelicula.año}, Género: ${pelicula.genero}</p>`;
      });
    } else {
      htmlContent = `<p>No se encontraron películas para el género: ${genero}</p>`;
    }
    contenedorPeliculas.innerHTML = htmlContent;
  } else {
    alert('Por favor, ingresa un género válido.');
  }
});