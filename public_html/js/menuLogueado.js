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

document.getElementById("botonMP").addEventListener('click', function () {
    window.location.href = 'modificarPerfil.html';
}
);

document.getElementById("botonVA").addEventListener('click', function () {
    window.location.href = 'verAficiones.html';
}
);

document.getElementById("botonAA").addEventListener('click', function () {
    window.location.href = 'añadirAficiones.html';
}
);

document.getElementById("botonEA").addEventListener('click', function () {
    window.location.href = 'eliminarAficiones.html';
}
);

document.getElementById("botonBN").addEventListener('click', function () {
    window.location.href = 'busquedaNormal.html';
}
);

document.getElementById("botonBA").addEventListener('click', function () {
    window.location.href = 'busquedaPorAficiones.html';
}
);

document.getElementById("botonBG").addEventListener('click', function () {
    window.location.href = 'busquedaPorGeolocalizacion.html';
}
);

document.getElementById("botonLikes").addEventListener('click', function () {
    window.location.href = 'verLikes.html';
}
);

document.getElementById("botonMatches").addEventListener('click', function () {
    window.location.href = 'verMatches.html';
}
);

document.getElementById("botonCS").addEventListener('click', function () {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('foto');
    sessionStorage.removeItem('genero');

    window.location.href = 'index.html';
}
);
