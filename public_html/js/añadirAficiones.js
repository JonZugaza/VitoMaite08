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

    const botonAñadir = document.getElementById("botonAñadir");
    botonAñadir.addEventListener("click", añadirAficiones);
});

document.getElementById("botonCS").addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = 'index.html';
});

function cargarAficiones() {
    const solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        const db = evento.target.result;
        const transaccionUsuario = db.transaction(["AficionesUsuarios"], "readonly");
        const aficionesUsuariosStore = transaccionUsuario.objectStore("AficionesUsuarios");

        const emailUsuario = sessionStorage.getItem("email");
        const aficionesDelUsuario = new Set();

        const cursorUsuario = aficionesUsuariosStore.index("email").openCursor(IDBKeyRange.only(emailUsuario));
        cursorUsuario.onsuccess = function (eventoCursorUsuario) {
            const resultadoUsuario = eventoCursorUsuario.target.result;

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
    const checkboxAficiones = document.getElementById("checkboxAficiones");
    const transaccion = db.transaction(["Aficiones"], "readonly");
    const aficionesStore = transaccion.objectStore("Aficiones");

    const cursor = aficionesStore.openCursor();
    cursor.onsuccess = function (eventoCursor) {
        const resultado = eventoCursor.target.result;

        if (resultado) {
            const aficion = resultado.value;

            if (!aficionesDelUsuario.has(aficion.id)) {
                const divCheckbox = document.createElement("div");
                divCheckbox.classList.add("aficion-item");
                divCheckbox.dataset.aficionId = aficion.id;

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = aficion.id;
                checkbox.dataset.nombre = aficion.nombre;

                const label = document.createElement("label");
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
    const checkboxes = document.querySelectorAll("#checkboxAficiones input[type='checkbox']:checked");
    const aficionesSeleccionadas = Array.from(checkboxes).map((checkbox) => ({
        id: parseInt(checkbox.value),
        nombre: checkbox.dataset.nombre
    }));

    if (aficionesSeleccionadas.length === 0) {
        alert("No has seleccionado ninguna afición.");
        return;
    }

    const emailUsuario = sessionStorage.getItem("email");
    const solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        const db = evento.target.result;
        const transaccion = db.transaction(["AficionesUsuarios"], "readwrite");
        const aficionesUsuariosStore = transaccion.objectStore("AficionesUsuarios");

        const aficionesPerfil = JSON.parse(sessionStorage.getItem("aficiones")) || [];
        const aficionesPerfilIds = aficionesPerfil.map((aficion) => aficion.id);

        aficionesSeleccionadas.forEach((aficion) => {
            if (!aficionesPerfilIds.includes(aficion.id)) {
                aficionesUsuariosStore.add({
                    email: emailUsuario,
                    aficion: aficion.id
                });

                aficionesPerfil.push(aficion);

                const checkboxItem = document.querySelector(`.aficion-item[data-aficion-id='${aficion.id}']`);
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

