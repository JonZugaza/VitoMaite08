document.addEventListener('DOMContentLoaded', function () {
    var lista = document.getElementById("listaAficiones");
    var botonEliminar = document.getElementById("botonEliminar");
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
    var lista = document.getElementById("listaAficiones");

    var solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;
        var transaccion = db.transaction(["AficionesUsuarios", "Aficiones"], "readonly");
        var aficionesUsuariosStore = transaccion.objectStore("AficionesUsuarios");
        var aficionesStore = transaccion.objectStore("Aficiones");

        var emailUsuario = sessionStorage.getItem('email');

        var cursor = aficionesUsuariosStore.index("email").openCursor(IDBKeyRange.only(emailUsuario));

        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                var idAficion = resultado.value.aficion;
                var solicitudAficion = aficionesStore.get(idAficion);

                solicitudAficion.onsuccess = function (eventoAficion) {
                    var aficion = eventoAficion.target.result;

                    if (aficion) {
                        var li = document.createElement("li");

                        var checkbox = document.createElement("input");
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
    var lista = document.getElementById("listaAficiones");
    var checkboxes = lista.querySelectorAll("input[type='checkbox']:checked");

    if (checkboxes.length === 0) {
        console.log("No se seleccionaron aficiones para eliminar.");
        return;
    }

    var aficionesAEliminar = Array.from(checkboxes).map(cb => parseInt(cb.value)); 
    var emailUsuario = sessionStorage.getItem("email");

    var solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;
        var transaccion = db.transaction(["AficionesUsuarios"], "readwrite");
        var aficionesUsuariosStore = transaccion.objectStore("AficionesUsuarios");

        var cursor = aficionesUsuariosStore.index("email").openCursor(IDBKeyRange.only(emailUsuario));

        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                var idAficion = resultado.value.aficion;

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
    var aficionesPerfil = JSON.parse(sessionStorage.getItem("aficiones")) || [];
    var nuevasAficiones = aficionesPerfil.filter(
            aficion => !aficionesAEliminar.includes(aficion.id)
    );

    sessionStorage.setItem("aficiones", JSON.stringify(nuevasAficiones));
Swal.fire({
            icon: "success",
            title: "Eliminado correctamente",
            text: "¡Las aficiones se han eliminado correctamente de tu perfil!"
                });  
    var lista = document.getElementById("listaAficiones");
    lista.innerHTML = ""; 
    cargarAficiones(); 
}

document.getElementById("botonCS").addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = 'index.html';
});


