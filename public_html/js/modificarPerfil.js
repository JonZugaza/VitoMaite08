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

document.getElementById("botonCS").addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = 'index.html';
});

var selectCiudad = document.createElement('select');
selectCiudad.id = 'ciudadSeleccionada';

var ciudades = ['bilbao', 'donosti', 'vitoria'];
ciudades.forEach(ciudad => {
    const option = document.createElement('option');
    option.value = ciudad.toLowerCase();
    option.textContent = ciudad;
    selectCiudad.appendChild(option);
});



var botonGuardar = document.getElementById('botonGuardar');


function cambiarCiudad(){
    
    var selectCiudad = document.getElementById("ciudadSeleccionada").value;
    }
 

