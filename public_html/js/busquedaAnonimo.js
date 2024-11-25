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
                    mostrarUsuarios(usuario);
                    hayUsuariosQueCumplen = true;
                }
                resultado.continue();
            } else {

                if (!hayUsuariosEnTabla) {
                    console.error("No hay usuarios");
                } else if (!hayUsuariosQueCumplen) {
Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "¡No hay usuarios que cumplan esas condiciones!"
                });                }
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
    imagen = "data:image/jpeg;base64,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";
    imgElemento.src = imagen;
    imgElemento.alt = "Foto de " + usuario.nombre;
    imgElemento.style.width = "100px";
    imgElemento.style.height = "100px";

    fotoCelda.appendChild(imgElemento);

    var detallesCelda = document.createElement("td");
    var botonDetalles = document.createElement("button");
    botonDetalles.textContent = "Ver más detalles";
    botonDetalles.onclick = function () {
        ponerLogin();
    };

    detallesCelda.appendChild(botonDetalles);

    filaUsuario.appendChild(nombreCelda);
    filaUsuario.appendChild(edadCelda);
    filaUsuario.appendChild(ciudadCelda);
    filaUsuario.appendChild(fotoCelda);
    filaUsuario.appendChild(detallesCelda);


    tablaUsuarios.appendChild(filaUsuario);
}

function ponerLogin() {
    window.location.href = 'login.html';
}



