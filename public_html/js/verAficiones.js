document.addEventListener('DOMContentLoaded', function () {
    
    var nombre = sessionStorage.getItem('nombre');
    var foto = sessionStorage.getItem('foto');
    var mensajeBienvenida = document.getElementById("mensajeBienvenida");
    var genero = sessionStorage.getItem('genero') ;
    console.log(genero);
    if (genero==='H'){
        mensajeBienvenida.textContent = "Bienvenido, " + nombre;
    }
    else{
        mensajeBienvenida.textContent = "Bienvenida, " + nombre;
    }
    var fotoUsuarioElement = document.getElementById("foto");
    fotoUsuarioElement.src = foto;
    
    verMisAficiones();
});




