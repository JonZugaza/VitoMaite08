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

    botonEliminar.addEventListener('click', function () {
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
    const lista = document.getElementById("listaAficiones");
    const checkboxes = lista.querySelectorAll("input[type='checkbox']:checked");

    if (checkboxes.length === 0) {
        console.log("No se seleccionaron aficiones para eliminar.");
        return;
    }

    const aficionesAEliminar = Array.from(checkboxes).map(cb => parseInt(cb.value)); 
    const emailUsuario = sessionStorage.getItem("email");

    const solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        const db = evento.target.result;
        const transaccion = db.transaction(["AficionesUsuarios"], "readwrite");
        const aficionesUsuariosStore = transaccion.objectStore("AficionesUsuarios");

        const cursor = aficionesUsuariosStore.index("email").openCursor(IDBKeyRange.only(emailUsuario));

        cursor.onsuccess = function (eventoCursor) {
            const resultado = eventoCursor.target.result;

            if (resultado) {
                const idAficion = resultado.value.aficion;

                if (aficionesAEliminar.includes(idAficion)) {
                    aficionesUsuariosStore.delete(resultado.primaryKey); 
                }

                resultado.continue();
            } else {
                console.log("Eliminación en IndexedDB completada.");
                actualizarSessionStorage(aficionesAEliminar);
            }
        };
    };

    solicitud.onerror = function (evento) {
        console.error("No se pudo abrir la base de datos:", evento.target.error);
    };
}

function actualizarSessionStorage(aficionesAEliminar) {
    const aficionesPerfil = JSON.parse(sessionStorage.getItem("aficiones")) || [];
    const nuevasAficiones = aficionesPerfil.filter(
            aficion => !aficionesAEliminar.includes(aficion.id)
    );

    sessionStorage.setItem("aficiones", JSON.stringify(nuevasAficiones));
Swal.fire({
            icon: "success",
            title: "Eliminado correctamente",
            text: "¡Las aficiones se han eliminado correctamente de tu perfil!"
                });  
    const lista = document.getElementById("listaAficiones");
    lista.innerHTML = ""; 
    cargarAficiones(); 
}

document.getElementById("botonCS").addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = 'index.html';
});


