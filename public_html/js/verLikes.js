document.addEventListener('DOMContentLoaded', function () {
    const lista = document.getElementById("listaAficiones");
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

    cargarLikes();
});

function cargarLikes() {
    var resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    var solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;
        var transaccion = db.transaction(["Likes"], "readonly");
        var likesStore = transaccion.objectStore("Likes");

        var cursor = likesStore.openCursor();

        var hayLikes = false;
        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                hayLikes = true;
                var like = resultado.value;
                var emailUsuario = sessionStorage.getItem("email");
                if (emailUsuario === like.usuario1) {
                    var pretendiente = like.usuario2;
                    mostrarLikes(pretendiente);
                }
                resultado.continue();
            } else {
                if (!hayLikes) {
                    console.log("no hay likes");
                }
            }
        };
    };
}

function mostrarLikes(pretendiente) {
    conseguirInformacion(pretendiente, function (id) {
        conseguirNombre(pretendiente, function (nombre) {
            conseguirEdad(pretendiente, function (edad) {
                conseguirCiudad(pretendiente, function (ciudad) {
                    conseguirFoto(pretendiente, function (foto) {

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

                            filaCabecera.appendChild(nombreCabecera);
                            filaCabecera.appendChild(edadCabecera);
                            filaCabecera.appendChild(ciudadCabecera);
                            filaCabecera.appendChild(fotoCabecera);

                            tablaUsuarios.appendChild(filaCabecera);

                            resultado.appendChild(tablaUsuarios);
                        }

                        var filaUsuario = document.createElement("tr");
                        filaUsuario.id = id;

                        var nombreCelda = document.createElement("td");
                        nombreCelda.textContent = nombre;

                        var edadCelda = document.createElement("td");
                        edadCelda.textContent = edad;

                        var ciudadCelda = document.createElement("td");
                        ciudadCelda.textContent = ciudad;

                        var fotoCelda = document.createElement("td");
                        var imgElemento = document.createElement("img");

                        imgElemento.src = foto;
                        imgElemento.alt = "Foto de " + nombre;
                        imgElemento.style.width = "100px";
                        imgElemento.style.height = "100px";

                        filaUsuario.appendChild(nombreCelda);
                        filaUsuario.appendChild(edadCelda);
                        filaUsuario.appendChild(ciudadCelda);
                        filaUsuario.appendChild(fotoCelda);
                        fotoCelda.appendChild(imgElemento);

                        tablaUsuarios.appendChild(filaUsuario);
                    });
                });
            });
        });
    });
};


function conseguirInformacion(pretendiente, callback) {
    var solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;
        var transaccion = db.transaction(["Usuarios"], "readonly");
        var usuariosStore = transaccion.objectStore("Usuarios");

        var cursor = usuariosStore.openCursor();

        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                var usuario = resultado.value;
                if (pretendiente === usuario.email) {
                    callback(usuario.id); 
                }
                resultado.continue();
            }
        };
    };
}


function conseguirNombre(pretendiente, callback) {
    var solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;
        var transaccion = db.transaction(["Usuarios"], "readonly");
        var usuariosStore = transaccion.objectStore("Usuarios");

        var cursor = usuariosStore.openCursor();

        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                var usuario = resultado.value;
                if (pretendiente === usuario.email) {
                    callback(usuario.nombre); 
                }
                resultado.continue();
            }
        };
    };
}

function conseguirEdad(pretendiente, callback) {
    var solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;
        var transaccion = db.transaction(["Usuarios"], "readonly");
        var usuariosStore = transaccion.objectStore("Usuarios");

        var cursor = usuariosStore.openCursor();

        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                var usuario = resultado.value;
                if (pretendiente === usuario.email) {
                    callback(usuario.edad); 
                }
                resultado.continue();
            }
        };
    };
}

function conseguirCiudad(pretendiente, callback) {
    var solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;
        var transaccion = db.transaction(["Usuarios"], "readonly");
        var usuariosStore = transaccion.objectStore("Usuarios");

        var cursor = usuariosStore.openCursor();

        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                var usuario = resultado.value;
                if (pretendiente === usuario.email) {
                    callback(usuario.ciudad); 
                }
                resultado.continue();
            }
        };
    };
}

function conseguirFoto(pretendiente, callback) {
    var solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;
        var transaccion = db.transaction(["Usuarios"], "readonly");
        var usuariosStore = transaccion.objectStore("Usuarios");

        var cursor = usuariosStore.openCursor();

        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                var usuario = resultado.value;
                if (pretendiente === usuario.email) {
                    callback(usuario.foto); 
                }
                resultado.continue();
            }
        };
    };
}

document.getElementById("botonCS").addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = 'index.html';
});