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
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('foto');
    sessionStorage.removeItem('genero');

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
                checkbox.dataset.nombre = aficion.nombre; // Opcional, guardar nombre para depuración

                const label = document.createElement("label");
                label.textContent = aficion.nombre;

                divCheckbox.appendChild(checkbox);
                divCheckbox.appendChild(label);
                checkboxAficiones.appendChild(divCheckbox);

                resultado.continue();
            }
        };
    };
}


function buscar() {
    console.log("klk");
}