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
                    if ( emailUsuario !== usuario.email )
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
        nombreCabecera.textContent = "Nick";

        var edadCabecera = document.createElement("th");
        edadCabecera.textContent = "Edad";

        var ciudadCabecera = document.createElement("th");
        ciudadCabecera.textContent = "Ciudad";

        var fotoCabecera = document.createElement("th");
        fotoCabecera.textContent = "Foto";

        var detallesCabecera = document.createElement("th");
        detallesCabecera.textContent = "Detalles";

        filaCabecera.appendChild(nombreCabecera);
        filaCabecera.appendChild(edadCabecera);
        filaCabecera.appendChild(ciudadCabecera);
        filaCabecera.appendChild(fotoCabecera);
        filaCabecera.appendChild(detallesCabecera);


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
        verDetalles();
    };

    detallesCelda.appendChild(botonDetalles);

    filaUsuario.appendChild(nombreCelda);
    filaUsuario.appendChild(edadCelda);
    filaUsuario.appendChild(ciudadCelda);
    filaUsuario.appendChild(fotoCelda);
    filaUsuario.appendChild(detallesCelda);


    tablaUsuarios.appendChild(filaUsuario);
}

function verDetalles() {
    console.log("funciona");

}

