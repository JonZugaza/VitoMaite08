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
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('foto');
    sessionStorage.removeItem('genero');

    window.location.href = 'index.html';
}
);



