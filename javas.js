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

// Función para buscar jugo por código ingresado
function buscarJugo() {
    const codigo = document.getElementById("codigo").value.trim();
    if (!codigo) {
        alert("Por favor, ingresa un código.");
        return;
    }

    // Leer archivo JSON con los jugos
    fetch("data/jugos.json")
        .then(res => res.json())
        .then(data => {
            const jugo = data.find(j => j.codigo === codigo);
            if (jugo) {
                alert(`${jugo.nombre} - ${jugo.marca}\nAzúcar: ${jugo.azucar}\nCalorías: ${jugo.calorias}`);
            } else {
                alert("Jugo no encontrado con ese código.");
            }
        })
        .catch(error => {
            console.error("Error al leer el archivo JSON:", error);
            alert("Error al cargar los datos. Verifica que el archivo jugos.json existe.");
        });
}

// Función para buscar jugo por código ingresado
function buscarJugo() {
    const codigo = document.getElementById("codigo").value.trim();
    if (!codigo) {
        alert("Por favor, ingresa un código.");
        return;
    }

    // Leer archivo JSON con los jugos
    fetch("data/jugos.json")
        .then(res => res.json())
        .then(data => {
            const jugo = data.find(j => j.codigo === codigo);
            if (jugo) {
                const cucharadas = calcularCucharadas(jugo.azucar);
                const recomendacion = darRecomendacion(jugo.azucar, jugo.calorias);
                
                const mensaje = `
🧃 ${jugo.nombre} - ${jugo.marca}

📊 INFORMACIÓN NUTRICIONAL (por 200ml):
• Azúcar: ${jugo.azucar}
• Equivale a: ${cucharadas} cucharadas de azúcar 🥄
• Calorías: ${jugo.calorias}
• Volumen: ${jugo.volumen}
• Tipo: ${jugo.tipo}

${recomendacion}

💡 DATO: La OMS recomienda máximo 25g de azúcar añadida por día (6 cucharadas)

🔍 Ingredientes: ${jugo.ingredientes}`;

                alert(mensaje);
            } else {
                alert("🔍 Jugo no encontrado con ese código.\n\nVerifica que el código esté bien ingresado o prueba con otro producto.");
            }
        })
        .catch(error => {
            console.error("Error al leer el archivo JSON:", error);
            alert("❌ Error al cargar los datos.\n\nVerifica tu conexión a internet o que el archivo jugos.json existe.");
        });
}
