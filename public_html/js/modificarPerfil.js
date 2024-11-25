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


function cambiarCiudad() {
    var ciudadSeleccionada = document.getElementById("ciudadSeleccionada").value;
    
    if(!ciudadSeleccionada)
    {
        alert("Por favor, selecciona una ciudad.");
        return;
    }
    
    var emailUsuario = sessionStorage.getItem("email");
    if(!emailUsuario){
        alert("No se encontró al usuario. Inicia sesión primero.")
        return;
    }
    
     var solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;
        var transaccion = db.transaction(["Usuarios"], "readwrite");
        var usuariosStore = transaccion.objectStore("Usuarios");

    var solicitudUsuario = usuariosStore.get(emailUsuario);
        solicitudUsuario.onsuccess = function () {
            var usuario = solicitudUsuario.result;
            if (usuario) {
                usuario.ciudad = ciudadSeleccionada;
                usuariosStore.put(usuario); 
                sessionStorage.setItem("ciudad", ciudadSeleccionada); 

                Swal.fire({
                    icon: "success",
                    title: "Ciudad actualizada",
                    text: "Tu ciudad ha sido actualizada"
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Usuario no encontrado",
                    text: "No se encontró tu perfil en la base de datos."
                });
            }
        };
    solicitudUsuario.onerror = function () {
            Swal.fire({
                icon: "error",
                title: "Error al actualizar",
                text: "No se pudo actualizar la ciudad."
            });
        };
    };

    solicitud.onerror = function () {
        Swal.fire({
            icon: "error",
            title: "Error con la base de datos",
            text: "No se pudo abrir la base de datos."
        });
    };
}
    
        guardarCiudad.addEventListener("click", cambiarCiudad);

    
    
    
    
    
    




