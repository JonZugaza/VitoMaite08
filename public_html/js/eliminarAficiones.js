document.addEventListener('DOMContentLoaded', function () {
    const lista = document.getElementById("listaAficiones");
    const botonEliminar = document.getElementById("botonEliminar");
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

    botonEliminar.addEventListener('click', function() {
        eliminarAficionesSeleccionadas();
    });
});

function cargarAficiones() {
    const lista = document.getElementById("listaAficiones");

    const solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        const db = evento.target.result;
        const transaccion = db.transaction(["AficionesUsuarios", "Aficiones"], "readonly");
        const aficionesUsuariosStore = transaccion.objectStore("AficionesUsuarios");
        const aficionesStore = transaccion.objectStore("Aficiones");

        const emailUsuario = sessionStorage.getItem('email');

        const cursor = aficionesUsuariosStore.index("email").openCursor(IDBKeyRange.only(emailUsuario));

        cursor.onsuccess = function (eventoCursor) {
            const resultado = eventoCursor.target.result;

            if (resultado) {
                const idAficion = resultado.value.aficion;
                const solicitudAficion = aficionesStore.get(idAficion);

                solicitudAficion.onsuccess = function (eventoAficion) {
                    const aficion = eventoAficion.target.result;

                    if (aficion) {
                        const li = document.createElement("li");

                        const checkbox = document.createElement("input");
                        checkbox.type = "checkbox";
                        checkbox.value = aficion.id;  

                        li.appendChild(checkbox);
                        li.appendChild(document.createTextNode(aficion.nombre));
                        lista.appendChild(li);
                    }
                };

                resultado.continue();
            } else {
                console.log("No se cargan las aficiones del usuario");
            }
        };
    };

    solicitud.onerror = function (evento) {
        console.error("No se abre la BD", evento.target.error);
    };
}

function eliminarAficionesSeleccionadas() {
    console.log("klk");
}



