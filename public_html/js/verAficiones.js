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
                        li.textContent = aficion.nombre;
                        lista.appendChild(li);
                    }
                };

                resultado.continue();
            } else {
                console.log("no se cargan las aficiones del usuario");
            }
        };
    };

    solicitud.onerror = function (evento) {
        console.error("no se abre la bd", evento.target.error);
    };
}

document.getElementById("botonCS").addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = 'index.html';
});