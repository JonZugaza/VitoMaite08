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

    const solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        const db = evento.target.result;
        const transaccion = db.transaction(["Likes"], "readonly");
        const likesStore = transaccion.objectStore("Likes");

        var cursor = likesStore.openCursor();

        var hayLikes = false;
        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                console.log("Se encontró un like: ", resultado);
                hayLikes = true;
                var like = resultado.value;
                var emailUsuario = sessionStorage.getItem("email");
                if (emailUsuario === like.usuario1) {
                    console.log("tengo likes");
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
    const solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        const db = evento.target.result;
        const transaccion = db.transaction(["Usuarios"], "readonly");
        const usuariosStore = transaccion.objectStore("Usuarios");

        var cursor = usuariosStore.openCursor();

        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                var usuario = resultado.value;
                if (pretendiente === usuario.email) {
                    console.log("Encontre al pretendiente", usuario);
                    callback(usuario.id); 
                }
                resultado.continue();
            }
        };
    };
}


function conseguirNombre(pretendiente, callback) {
    const solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        const db = evento.target.result;
        const transaccion = db.transaction(["Usuarios"], "readonly");
        const usuariosStore = transaccion.objectStore("Usuarios");

        var cursor = usuariosStore.openCursor();

        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                var usuario = resultado.value;
                if (pretendiente === usuario.email) {
                    console.log("Encontre al pretendiente", usuario);
                    callback(usuario.nombre); 
                }
                resultado.continue();
            }
        };
    };
}

function conseguirEdad(pretendiente, callback) {
    const solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        const db = evento.target.result;
        const transaccion = db.transaction(["Usuarios"], "readonly");
        const usuariosStore = transaccion.objectStore("Usuarios");

        var cursor = usuariosStore.openCursor();

        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                var usuario = resultado.value;
                if (pretendiente === usuario.email) {
                    console.log("Encontre al pretendiente", usuario);
                    callback(usuario.edad); 
                }
                resultado.continue();
            }
        };
    };
}

function conseguirCiudad(pretendiente, callback) {
    const solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        const db = evento.target.result;
        const transaccion = db.transaction(["Usuarios"], "readonly");
        const usuariosStore = transaccion.objectStore("Usuarios");

        var cursor = usuariosStore.openCursor();

        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                var usuario = resultado.value;
                if (pretendiente === usuario.email) {
                    console.log("Encontre al pretendiente", usuario);
                    callback(usuario.ciudad); 
                }
                resultado.continue();
            }
        };
    };
}

function conseguirFoto(pretendiente, callback) {
    const solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        const db = evento.target.result;
        const transaccion = db.transaction(["Usuarios"], "readonly");
        const usuariosStore = transaccion.objectStore("Usuarios");

        var cursor = usuariosStore.openCursor();

        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                var usuario = resultado.value;
                if (pretendiente === usuario.email) {
                    console.log("Encontre al pretendiente", usuario);
                    callback(usuario.foto); 
                }
                resultado.continue();
            }
        };
    };
}