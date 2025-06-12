// Mostrar/ocultar secciones (biblioteca, comparador, logros)
function mostrarSeccion(id) {
    document.querySelectorAll('.seccion').forEach(function(seccion) {
        seccion.classList.remove('activa');
    });
    var activa = document.getElementById(id);
    if (activa) {
        activa.classList.add('activa');
    } else {
        console.log("No se encontró la sección con id:", id);
    }
}

