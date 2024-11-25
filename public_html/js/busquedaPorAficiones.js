document.addEventListener('DOMContentLoaded', function () {
    var nombre = sessionStorage.getItem('nombre');
    var foto = sessionStorage.getItem('foto');
    var mensajeBienvenida = document.getElementById("mensajeBienvenida");
    var genero = sessionStorage.getItem('genero');

    if (genero === 'H') {
        mensajeBienvenida.textContent = "Bienvenido, " + nombre;
    } else {
        mensajeBienvenida.textContent = "Bienvenida, " + nombre;
    }
    var fotoUsuarioElement = document.getElementById("foto");
    fotoUsuarioElement.src = foto;

    cargarAficiones();

    const btnBuscar = document.getElementById("botonBuscar");
    btnBuscar.addEventListener("click", buscar);

});

document.getElementById("botonCS").addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = 'index.html';
});

function cargarAficiones() {
    const checkboxAficiones = document.getElementById("checkboxAficiones");
    const solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        const db = evento.target.result;
        const transaccion = db.transaction(["Aficiones"], "readonly");
        const aficionesStore = transaccion.objectStore("Aficiones");

        const cursor = aficionesStore.openCursor();
        cursor.onsuccess = function (eventoCursor) {
            const resultado = eventoCursor.target.result;

            if (resultado) {
                const aficion = resultado.value;

                const divCheckbox = document.createElement("div");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = aficion.id; // El valor coincide con el identificador en AficionesUsuarios
                checkbox.dataset.nombre = aficion.nombre;

                const label = document.createElement("label");
                label.textContent = aficion.nombre;

                divCheckbox.appendChild(checkbox);
                divCheckbox.appendChild(label);
                checkboxAficiones.appendChild(divCheckbox);

                resultado.continue();
            } else {
                console.log("Todas las aficiones cargadas");
            }
        };

        cursor.onerror = function (error) {
            console.error("Error al cargar aficiones:", error);
        };
    };
}

function buscar() {
    const checkboxes = document.querySelectorAll("#checkboxAficiones input[type='checkbox']:checked");
    const aficionesSeleccionadas = Array.from(checkboxes).map((checkbox) => parseInt(checkbox.value));

    console.log("Aficiones seleccionadas:", aficionesSeleccionadas);  // Verifica que se estén capturando las aficiones correctamente

    if (aficionesSeleccionadas.length === 0) {
        alert("No has seleccionado ninguna afición.");
        return;
    }

    const resultadosContainer = document.getElementById("resultados");
    resultadosContainer.innerHTML = ""; // Limpiar resultados previos

    const solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        const db = evento.target.result;
        const transaccion = db.transaction(["AficionesUsuarios", "Usuarios"], "readonly");

        const aficionesUsuariosStore = transaccion.objectStore("AficionesUsuarios");
        const usuariosStore = transaccion.objectStore("Usuarios");

        const usuariosCoincidentes = new Set();

        const cursor = aficionesUsuariosStore.openCursor();
cursor.onsuccess = function (eventoCursor) {
    const resultado = eventoCursor.target.result;

    if (resultado) {
        const registro = resultado.value;
        console.log("Registro AficionesUsuarios:", registro);  // Verifica el registro

        if (aficionesSeleccionadas.includes(registro.aficion)) {
            usuariosCoincidentes.add(registro.email);
        }

        resultado.continue();
    } else {
        if (usuariosCoincidentes.size > 0) {
            cargarUsuarios(db, usuariosCoincidentes);
        } else {
            const sinResultados = document.createElement("p");
            sinResultados.textContent = "No se encontraron usuarios con las aficiones seleccionadas.";
            resultadosContainer.appendChild(sinResultados);
        }
    }
};

    solicitud.onerror = function (evento) {
        console.error("Error al abrir la base de datos", evento.target.error);
    };
    };
}
function cargarUsuarios(db, emailsUsuarios) {
    const resultadosContainer = document.getElementById("resultados");
    const usuariosStore = db.transaction(["Usuarios"], "readonly").objectStore("Usuarios");

    emailsUsuarios.forEach((email) => {
        const solicitudUsuario = usuariosStore.get(email);

        solicitudUsuario.onsuccess = function (eventoUsuario) {
            const usuario = eventoUsuario.target.result;

            console.log("Usuario encontrado:", usuario);  // Verifica que se encuentra el usuario

            if (usuario) {
                const divUsuario = document.createElement("div");
                divUsuario.classList.add("resultado-usuario");

                const nombreUsuario = document.createElement("p");
                nombreUsuario.textContent = `Nombre: ${usuario.nombre}`;

                const emailUsuario = document.createElement("p");
                emailUsuario.textContent = `Email: ${usuario.email}`;

                divUsuario.appendChild(nombreUsuario);
                divUsuario.appendChild(emailUsuario);

                resultadosContainer.appendChild(divUsuario);
            }
        };

        solicitudUsuario.onerror = function (eventoUsuario) {
            console.error("Error al obtener usuario:", eventoUsuario.target.error);
        };
    });
}
