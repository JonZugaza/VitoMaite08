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

var latUsuario = parseFloat(sessionStorage.getItem('lat'));
var longUsuario = parseFloat(sessionStorage.getItem('long'));
var nombre = sessionStorage.getItem("nombre");
var map; // Variable global para guardar el mapa
var circle;

console.log(latUsuario);
console.log(longUsuario);

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: latUsuario, lng: longUsuario},
        zoom: 8

    });

    const marker = new google.maps.Marker({
        position: {lat: latUsuario, lng: longUsuario},
        map
    });

    marker.addListener("click", () => {
        alert(`Has hecho clic en la casa de ` + nombre);
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
    } else{
        console.log("50");
        radio = 50;
    }
    dibujarCirculo(radio);
}

function dibujarCirculo(radio) {
    // Eliminar el círculo anterior si existe
    if (circle) {
        circle.setMap(null); // Remueve el círculo del mapa
    }

    // Crear un nuevo círculo y asignarlo a la variable global
    circle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.2,
        map, // Usar el mapa global creado en `initMap`
        center: {lat: latUsuario, lng: longUsuario},
        radius: radio * 1000 // Convertir kilómetros a metros
    });
}
