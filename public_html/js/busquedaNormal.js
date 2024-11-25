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

});

document.getElementById("botonBuscar").addEventListener("click", function () {
    var resultado = document.getElementById("resultado");
    resultado.value = '';
    buscar();
});

function buscar() {

    var resultado = document.getElementById("resultado");
    resultado.innerHTML = "";


    var solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;


        if (!db.objectStoreNames.contains("Usuarios")) {
            console.error("El objectStore 'Usuarios' no existe.");
            console.error("No hay datos de usuarios disponibles.");
            return;
        }

        var transaccion = db.transaction(["Usuarios"], "readonly");
        var usuariosStore = transaccion.objectStore("Usuarios");

        var cursor = usuariosStore.index("edad").openCursor();

        var hayUsuariosEnTabla = false;
        var hayUsuariosQueCumplen = false;

        var generoSeleccionado = document.getElementById("genero").value;
        var edadMin = parseInt(document.getElementById("edadMin").value) || 18;
        var edadMax = parseInt(document.getElementById("edadMax").value) || 100;
        var ciudadSeleccionada = document.getElementById("ciudad").value;

        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                hayUsuariosEnTabla = true;

                var usuario = resultado.value;

                var cumpleCriterios =
                        ((generoSeleccionado === "ambos" || usuario.genero === generoSeleccionado) &&
                                (usuario.edad >= edadMin && usuario.edad <= edadMax) &&
                                (usuario.ciudad === ciudadSeleccionada)
                                );

                if (cumpleCriterios) {
                    console.log("se van a devolver personas");
                    var emailUsuario = sessionStorage.getItem('email');
                    if (emailUsuario !== usuario.email)
                    {
                        mostrarUsuarios(usuario);
                        hayUsuariosQueCumplen = true;
                    }
                }
                resultado.continue();
            } else {

                if (!hayUsuariosEnTabla) {
                    console.error("No hay usuarios");
                } else if (!hayUsuariosQueCumplen) {
                    console.error("No se cumplen los criterios");
                }
            }
        };
    };

    solicitud.onerror = function () {
        console.error("no se abre la bd.");
    };
}
function mostrarUsuarios(usuario) {
    var resultado = document.getElementById("resultado");

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
    imgElemento.style.width = "200px";
    imgElemento.style.height = "200px";

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
        console.error("No se encontró la fila para el usuario:", usuario);
        return;
    }

    if (filaUsuario.querySelector(".detalles-columna")) {
        console.log("Los detalles ya están visibles para este usuario.");
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

    const lat = parseFloat(usuario.lat);
    const lon = parseFloat(usuario.long);

    const map = new google.maps.Map(mapa, {
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
