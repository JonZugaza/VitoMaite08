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
const radio = 100; 
console.log(latUsuario);
console.log(longUsuario);

// Inicializar el mapa
function initMap() {
    // Crear el mapa centrado en la latitud y longitud de referencia
    const map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: latUsuario, lng: longUsuario},
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
        center: {lat: latUsuario, lng: longUsuario},
        radius: radio * 1000 // Convertir kilómetros a metros
    });


    // Añadir marcadores para los puntos dentro del radio

        const marker = new google.maps.Marker({
            position: {lat: latUsuario, lng: longUsuario},
            map
                             

        });


       

        // Evento para mostrar una alerta al hacer clic en el marcador
        marker.addListener("click", () => {
            alert(`Has hecho clic en la casa de ` + nombre);
        });
   
}

document.getElementById("botonCS").addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = 'index.html';
});


