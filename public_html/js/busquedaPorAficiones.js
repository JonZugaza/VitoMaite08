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
    var checkboxAficiones = document.getElementById("checkboxAficiones");
    var solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;
        var transaccion = db.transaction(["Aficiones"], "readonly");
        var aficionesStore = transaccion.objectStore("Aficiones");

        var cursor = aficionesStore.openCursor();
        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                var aficion = resultado.value;

                var divCheckbox = document.createElement("div");
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = aficion.id;
                checkbox.dataset.nombre = aficion.nombre;

                var label = document.createElement("label");
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
    var checkboxes = document.querySelectorAll("#checkboxAficiones input[type='checkbox']:checked");
    var aficionesSeleccionadas = Array.from(checkboxes).map((checkbox) => parseInt(checkbox.value));
    var resultadosContainer = document.getElementById("resultados");
    resultadosContainer.innerHTML = "";

    if (aficionesSeleccionadas.length === 0) {
        Swal.fire("No has seleccionado ninguna afición");
    }

    var solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;
        var transaccion = db.transaction(["AficionesUsuarios", "Usuarios"], "readonly");
        var aficionesUsuariosStore = transaccion.objectStore("AficionesUsuarios");

        var usuariosCoincidentes = new Set();

        var cursor = aficionesUsuariosStore.openCursor();
        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                var registro = resultado.value;

                if (aficionesSeleccionadas.includes(registro.aficion)) {
                    usuariosCoincidentes.add(registro.email);
                }

                resultado.continue();
            } else {
                if (usuariosCoincidentes.size > 0) {
                    cargarUsuarios(db, usuariosCoincidentes);
                } else {
                    var sinResultados = document.createElement("p");
                    sinResultados.textContent = "No se encontraron usuarios con las aficiones seleccionadas.";
                    resultadosContainer.appendChild(sinResultados);
                }
            }
        };

        cursor.onerror = function (error) {
            console.error("Error al iterar en AficionesUsuarios:", error);
        };
    };

    solicitud.onerror = function (evento) {
        console.error("Error al abrir la base de datos", evento.target.error);
    };
}

function cargarUsuarios(db, emailsUsuarios) {
    var usuariosStore = db.transaction(["Usuarios"], "readonly").objectStore("Usuarios");

    emailsUsuarios.forEach((email) => {

        var solicitudUsuario = usuariosStore.index("email").get(email);

        solicitudUsuario.onsuccess = function (eventoUsuario) {
            var usuario = eventoUsuario.target.result;

            if (usuario) {
                var emailUsuario = sessionStorage.getItem('email');
                if (emailUsuario !== usuario.email)
                {
                    mostrarUsuarios(usuario);
                }
            } else {
                console.log("No se encontró un usuario con el email:", email);
            }
        };

        solicitudUsuario.onerror = function (eventoUsuario) {
            console.error("Error al obtener usuario con email:", email, eventoUsuario.target.error);
        };
    });
}

function mostrarUsuarios(usuario) {
    var resultado = document.getElementById("resultados");

    var tablaUsuarios = document.querySelector(".tabla-usuarios");

    if (!tablaUsuarios) {
        tablaUsuarios = document.createElement("table");
        tablaUsuarios.className = "tabla-usuarios";

        var filaCabecera = document.createElement("tr");

        var nombreCabecera = document.createElement("th");
        nombreCabecera.textContent = "Nombre";

        var edadCabecera = document.createElement("th");
        edadCabecera.textContent = "Edad";

        var ciudadCabecera = document.createElement("th");
        ciudadCabecera.textContent = "Ciudad";

        var fotoCabecera = document.createElement("th");
        fotoCabecera.textContent = "Foto";

        var detallesCabecera = document.createElement("th");
        detallesCabecera.textContent = "Detalles";

        var alturaCabecera = document.createElement("th");
        alturaCabecera.textContent = "Altura";

        var colorPeloCabecera = document.createElement("th");
        colorPeloCabecera.textContent = "Color del pelo";

        var ubicacionCabecera = document.createElement("th");
        ubicacionCabecera.textContent = "Ubicación";

        filaCabecera.appendChild(nombreCabecera);
        filaCabecera.appendChild(edadCabecera);
        filaCabecera.appendChild(ciudadCabecera);
        filaCabecera.appendChild(fotoCabecera);
        filaCabecera.appendChild(detallesCabecera);
        filaCabecera.appendChild(alturaCabecera);
        filaCabecera.appendChild(colorPeloCabecera);
        filaCabecera.appendChild(ubicacionCabecera);



        tablaUsuarios.appendChild(filaCabecera);

        resultado.appendChild(tablaUsuarios);
    }

    var filaUsuario = document.createElement("tr");
    filaUsuario.id = usuario.id;

    var nombreCelda = document.createElement("td");
    nombreCelda.textContent = usuario.nombre;

    var edadCelda = document.createElement("td");
    edadCelda.textContent = usuario.edad;

    var ciudadCelda = document.createElement("td");
    ciudadCelda.textContent = usuario.ciudad;

    var fotoCelda = document.createElement("td");
    var imgElemento = document.createElement("img");

    imgElemento.src = usuario.foto;
    imgElemento.alt = "Foto de " + usuario.nombre;
    imgElemento.style.width = "100px";
    imgElemento.style.height = "100px";

    fotoCelda.appendChild(imgElemento);

    var detallesCelda = document.createElement("td");
    var botonDetalles = document.createElement("button");
    botonDetalles.textContent = "Ver más detalles";
    botonDetalles.onclick = function () {
        verDetalles(usuario);
    };

    detallesCelda.appendChild(botonDetalles);

    filaUsuario.appendChild(nombreCelda);
    filaUsuario.appendChild(edadCelda);
    filaUsuario.appendChild(ciudadCelda);
    filaUsuario.appendChild(fotoCelda);
    filaUsuario.appendChild(detallesCelda);


    tablaUsuarios.appendChild(filaUsuario);
}

function verDetalles(usuario) {
    var filaUsuario = document.getElementById(usuario.id);

    if (!filaUsuario) {
        return;
    }

    if (filaUsuario.querySelector(".detalles-columna")) {
        return;
    }
    var alturaCelda = document.createElement("td");
    alturaCelda.textContent = usuario.altura;

    var colorPeloCelda = document.createElement("td");
    colorPeloCelda.textContent = usuario.colorPelo;

    var mapaCelda = document.createElement("td");
    mapaCelda.className = "detalles-columna";
    var mapa = document.createElement("div");
    mapa.id = `mapa-${usuario.id}`;
    mapa.style.width = "250px";
    mapa.style.height = "200px";
    mapaCelda.appendChild(mapa);

    filaUsuario.appendChild(alturaCelda);
    filaUsuario.appendChild(colorPeloCelda);
    filaUsuario.appendChild(mapaCelda);

    var lat = parseFloat(usuario.lat);
    var lon = parseFloat(usuario.long);

    var map = new google.maps.Map(mapa, {
        center: {lat, lng: lon},
        zoom: 12
    });

    new google.maps.Marker({
        position: {lat, lng: lon},
        map,
        title: `Ubicación de ${usuario.nombre}`
    });
}

document.getElementById("botonCS").addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = 'index.html';
});
