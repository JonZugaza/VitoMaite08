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
const latRef = 43.2630; 
const lonRef = -2.9350; 
const radio = 100; 

// Inicializar el mapa
function initMap() {
    // Crear el mapa centrado en la latitud y longitud de referencia
    const map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 43.24260658476168, lng: -2.923762555397524},
                zoom: 8 

    });


    // Dibujar un círculo indicando el radio
    new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.2,
        map,
        center: {lat: latRef, lng: lonRef},
        radius: radio * 1000 // Convertir kilómetros a metros
    });


    // Añadir marcadores para los puntos dentro del radio

        const marker = new google.maps.Marker({
            position: {lat: 43.24260658476168, lng: -2.923762555397524},
            map,
                             

        });


       

        // Evento para mostrar una alerta al hacer clic en el marcador
        marker.addListener("click", () => {
            alert(`Has hecho clic en: la casa de eder`);
        });
   
}





document.getElementById("botonCS").addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = 'index.html';
});


