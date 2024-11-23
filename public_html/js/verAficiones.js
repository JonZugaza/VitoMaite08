document.addEventListener('DOMContentLoaded', function () {
    const lista = document.getElementById("listaAficiones");
    var nombre = sessionStorage.getItem('nombre');
    var foto = sessionStorage.getItem('foto');
    var mensajeBienvenida = document.getElementById("mensajeBienvenida");
    var genero = sessionStorage.getItem('genero');
    console.log(genero);

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
