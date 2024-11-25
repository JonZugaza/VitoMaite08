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

var latUsuario = sessionStorage.getItem('lat');
var longUsuario = sessionStorage.getItem('long');
const latRef = 43.2630; // Latitud de referencia (Bilbao)
const lonRef = -2.9350; // Longitud de referencia (Bilbao)
const radio = 100; // Radio en kilómetros


function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en kilómetros
    const rad = Math.PI / 180;
    const dLat = (lat2 - lat1) * rad;
    const dLon = (lon2 - lon1) * rad;


    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);


    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));


    return R * c; // Distancia en kilómetros
}

const puntosDentro = puntos.filter((punto) => {
    const distancia = calcularDistancia(latRef, lonRef, punto.lat, punto.lon);
    return distancia <= radio;
});


// Inicializar el mapa
function initMap() {
   // Crear el mapa centrado en la latitud y longitud de referencia
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8, // Cambia el nivel de zoom. Valores más bajos = más lejos
        center: { lat: latRef, lng: lonRef }
    });


    // Dibujar un círculo indicando el radio
    new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.2,
        map,
        center: { lat: latRef, lng: lonRef },
        radius: radio * 1000 // Convertir kilómetros a metros
    });


    // Añadir marcadores para los puntos dentro del radio
    puntosDentro.forEach((punto) => {
        const marker = new google.maps.Marker({
            position: { lat: punto.lat, lng: punto.lon },
            map,
            title: punto.nombre
        });


        // Crear InfoWindow para mostrar información personalizada
        const infoWindow = new google.maps.InfoWindow({
            content: `<div style="font-size:14px;">
                        <strong>${punto.nombre}</strong><br>
                        ${punto.info}
                      </div>`
        });


        // Evento para mostrar la InfoWindow al pasar el mouse sobre el marcador
        marker.addListener("mouseover", () => {
            infoWindow.open(map, marker);
        });


        // Evento para cerrar la InfoWindow al salir del marcador
        marker.addListener("mouseout", () => {
            infoWindow.close();
        });


        // Evento para mostrar una alerta al hacer clic en el marcador
        marker.addListener("click", () => {
            alert(`Has hecho clic en: ${punto.nombre}\nInformación: ${punto.info}`);
        });
    });
}


// Inicializar el mapa al cargar la página
window.onload = initMap;



document.getElementById("botonCS").addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = 'index.html';
});


