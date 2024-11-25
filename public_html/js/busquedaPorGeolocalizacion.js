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

    ponerPersonas();
});
var latUsuario = parseFloat(sessionStorage.getItem('lat'));
var longUsuario = parseFloat(sessionStorage.getItem('long'));
var nombre = sessionStorage.getItem("nombre");
var map;
var circle;
console.log(latUsuario);
console.log(longUsuario);
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: latUsuario, lng: longUsuario},
        zoom: 8

    });

}

document.getElementById("botonCS").addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = 'index.html';
});
document.getElementById("botonBuscar").addEventListener("click", function () {
    cambiarCirculo();
});
function cambiarCirculo() {
    var cercania = document.getElementById("cercania").value;
    var radio;
    if (cercania === "0.5") {
        console.log("0.5");
        radio = 0.5;
    } else if (cercania === "1") {
        console.log("1");
        radio = 1;
    } else if (cercania === "1.5") {
        console.log("1.5");
        radio = 1.5;
    } else if (cercania === "2") {
        console.log("2");
        radio = 2;
    } else if (cercania === "5") {
        console.log("5");
        radio = 5;
    } else if (cercania === "10") {
        console.log("10");
        radio = 10;
    } else {
        console.log("50");
        radio = 50;
    }
    dibujarCirculo(radio);
}

function dibujarCirculo(radio) {
    if (circle) {
        circle.setMap(null);
    }

    circle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.2,
        map,
        center: {lat: latUsuario, lng: longUsuario},
        radius: radio * 1000
    });
}

function ponerPersonas() {
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

        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                hayUsuariosEnTabla = true;
                var usuario = resultado.value;
                var usuarioLat = parseFloat(usuario.lat);
                var usuarioLong = parseFloat(usuario.long);

                const marker = new google.maps.Marker({
                    position: {lat: usuarioLat, lng: usuarioLong},
                    map
                });

                marker.addListener("click", () => {
                    alert(`Has hecho clic en la casa de ` + usuario.nombre);
                });
                resultado.continue();
            } else {
                if (!hayUsuariosEnTabla) {
                    console.error("No hay usuarios.");
                } else if (!hayUsuariosQueCumplen) {
                    console.error("No se cumplen los criterios.");
                }
            }
        };

        cursor.onerror = function () {
            console.error("Error al recorrer el cursor.");
        };
    };

    solicitud.onerror = function () {
        console.error("No se pudo abrir la base de datos.");
    };
}


