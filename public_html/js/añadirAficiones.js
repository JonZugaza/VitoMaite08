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

    var botonAñadir = document.getElementById("botonAñadir");
    botonAñadir.addEventListener("click", añadirAficiones);
});

document.getElementById("botonCS").addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = 'index.html';
});

function cargarAficiones() {
    var solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;
        var transaccionUsuario = db.transaction(["AficionesUsuarios"], "readonly");
        var aficionesUsuariosStore = transaccionUsuario.objectStore("AficionesUsuarios");

        var emailUsuario = sessionStorage.getItem("email");
        var aficionesDelUsuario = new Set();

        var cursorUsuario = aficionesUsuariosStore.index("email").openCursor(IDBKeyRange.only(emailUsuario));
        cursorUsuario.onsuccess = function (eventoCursorUsuario) {
            var resultadoUsuario = eventoCursorUsuario.target.result;

            if (resultadoUsuario) {
                aficionesDelUsuario.add(resultadoUsuario.value.aficion); 
                resultadoUsuario.continue();
            } else {
                cargarAficionesExcluyendoUsuario(db, aficionesDelUsuario);
            }
        };
    };

    solicitud.onerror = function (evento) {
        console.error("Error al abrir la base de datos", evento.target.error);
    };
}

function cargarAficionesExcluyendoUsuario(db, aficionesDelUsuario) {
    var checkboxAficiones = document.getElementById("checkboxAficiones");
    var transaccion = db.transaction(["Aficiones"], "readonly");
    var aficionesStore = transaccion.objectStore("Aficiones");

    var cursor = aficionesStore.openCursor();
    cursor.onsuccess = function (eventoCursor) {
        var resultado = eventoCursor.target.result;

        if (resultado) {
            var aficion = resultado.value;

            if (!aficionesDelUsuario.has(aficion.id)) {
                var divCheckbox = document.createElement("div");
                divCheckbox.classList.add("aficion-item");
                divCheckbox.dataset.aficionId = aficion.id;

                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = aficion.id;
                checkbox.dataset.nombre = aficion.nombre;

                var label = document.createElement("label");
                label.textContent = aficion.nombre;

                divCheckbox.appendChild(checkbox);
                divCheckbox.appendChild(label);
                checkboxAficiones.appendChild(divCheckbox);
            }

            resultado.continue();
        }
    };

    cursor.onerror = function (evento) {
        console.error("Error al recorrer las aficiones", evento.target.error);
    };
}

function añadirAficiones() {
    var checkboxes = document.querySelectorAll("#checkboxAficiones input[type='checkbox']:checked");
    var aficionesSeleccionadas = Array.from(checkboxes).map((checkbox) => ({
        id: parseInt(checkbox.value),
        nombre: checkbox.dataset.nombre
    }));

    if (aficionesSeleccionadas.length === 0) {
        alert("No has seleccionado ninguna afición.");
        return;
    }

    var emailUsuario = sessionStorage.getItem("email");
    var solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;
        var transaccion = db.transaction(["AficionesUsuarios"], "readwrite");
        var aficionesUsuariosStore = transaccion.objectStore("AficionesUsuarios");

        var aficionesPerfil = JSON.parse(sessionStorage.getItem("aficiones")) || [];
        var aficionesPerfilIds = aficionesPerfil.map((aficion) => aficion.id);

        aficionesSeleccionadas.forEach((aficion) => {
            if (!aficionesPerfilIds.includes(aficion.id)) {
                aficionesUsuariosStore.add({
                    email: emailUsuario,
                    aficion: aficion.id
                });

                aficionesPerfil.push(aficion);

                var checkboxItem = document.querySelector(`.aficion-item[data-aficion-id='${aficion.id}']`);
                if (checkboxItem) {
                    checkboxItem.remove();
                }
            }
        });

        sessionStorage.setItem("aficiones", JSON.stringify(aficionesPerfil));
        Swal.fire({
            icon: "success",
            title: "Añadido correctamente",
            text: "¡Las aficiones se han añadido correctamente a tu perfil!"
                });    };

    solicitud.onerror = function (evento) {
        console.error("No se pudo abrir la base de datos:", evento.target.error);
    };
}

