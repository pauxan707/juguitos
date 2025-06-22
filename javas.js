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

// sing in java
  // Función para mostrar secciones
function mostrarSeccion(seccionId) {
    // Verificar autenticación antes de mostrar cualquier sección
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Debes iniciar sesión para acceder a esta función');
        window.location.href = 'login.html'; // Cambia por tu página de login
        return;
    }

    // Ocultar todas las secciones
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });

    // Mostrar la sección seleccionada
    const seccionSeleccionada = document.getElementById(seccionId);
    if (seccionSeleccionada) {
        seccionSeleccionada.style.display = 'block';
        
        // Si es la sección de logros, cargar los logros del usuario
        if (seccionId === 'logros') {
            cargarLogros();
        }
    }
}

// Función para cargar y mostrar logros
function cargarLogros() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    // Obtener logros del usuario (si existen)
    const userLogros = users[currentUser.username]?.logros || [];
    
    // Definir logros disponibles (puedes expandir esta lista)
    const logrosDisponibles = [
        {
            id: 'primer_login',
            nombre: 'Primer Paso',
            descripcion: 'Iniciaste sesión por primera vez',
            icono: '🎯'
        },
        {
            id: 'explorador',
            nombre: 'Explorador',
            descripcion: 'Visitaste todas las secciones',
            icono: '🔍'
        },
        {
            id: 'comparador_activo',
            nombre: 'Comparador Activo',
            descripcion: 'Usaste el comparador 5 veces',
            icono: '⚖️'
        },
        {
            id: 'lector_saludable',
            nombre: 'Lector Saludable',
            descripcion: 'Abriste 3 enlaces de la biblioteca',
            icono: '📚'
        }
    ];

    // Generar HTML de logros
    let logrosHTML = '<div class="logros-container">';
    
    logrosDisponibles.forEach(logro => {
        const conseguido = userLogros.includes(logro.id);
        const claseLogro = conseguido ? 'logro-conseguido' : 'logro-pendiente';
        
        logrosHTML += `
            <div class="logro ${claseLogro}">
                <div class="logro-icono">${logro.icono}</div>
                <div class="logro-info">
                    <h3>${logro.nombre}</h3>
                    <p>${logro.descripcion}</p>
                    <span class="logro-estado">${conseguido ? '✅ Conseguido' : '⏳ Pendiente'}</span>
                </div>
            </div>
        `;
    });
    
    logrosHTML += '</div>';
    
    // Actualizar el contenido de la sección logros
    const seccionLogros = document.getElementById('logros');
    seccionLogros.innerHTML = `
        <h2>LOGROS</h2>
        <p>¡Bienvenido ${currentUser.name}! Aquí tienes tus logros:</p>
        ${logrosHTML}
    `;
}

// Función para otorgar un logro
function otorgarLogro(logroId) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (!users[currentUser.username].logros) {
        users[currentUser.username].logros = [];
    }
    
    // Solo agregar si no lo tiene ya
    if (!users[currentUser.username].logros.includes(logroId)) {
        users[currentUser.username].logros.push(logroId);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Mostrar notificación (opcional)
        mostrarNotificacionLogro(logroId);
    }
}

// Función para mostrar notificación de logro nuevo
function mostrarNotificacionLogro(logroId) {
    const logrosDisponibles = {
        'primer_login': { nombre: 'Primer Paso', icono: '🎯' },
        'explorador': { nombre: 'Explorador', icono: '🔍' },
        'comparador_activo': { nombre: 'Comparador Activo', icono: '⚖️' },
        'lector_saludable': { nombre: 'Lector Saludable', icono: '📚' }
    };
    
    const logro = logrosDisponibles[logroId];
    if (logro) {
        alert(`🎉 ¡Nuevo logro desbloqueado!\n${logro.icono} ${logro.nombre}`);
    }
}

// Verificar sesión al cargar la página
function verificarSesion() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Debes iniciar sesión para acceder a esta página');
        window.location.href = 'login.html';
        return false;
    }
    
    // Otorgar logro de primer login si es la primera vez
    otorgarLogro('primer_login');
    
    return true;
}

// Inicializar al cargar la página
window.onload = function() {
    if (verificarSesion()) {
        // Ocultar todas las secciones al inicio
        const secciones = document.querySelectorAll('.seccion');
        secciones.forEach(seccion => {
            seccion.style.display = 'none';
        });
    }
};


document.head.insertAdjacentHTML('beforeend', estilosLogros);