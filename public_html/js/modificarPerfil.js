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
    
        var guardarCiudad = document.getElementById("guardarCiudad");
        guardarCiudad.addEventListener("click", cambiarCiudad);

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
        alert("No se encontró al usuario. Inicia sesión primero.");
        return;
    }
    
     var solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;
        var transaccion = db.transaction(["Usuarios"], "readwrite");
        var usuariosStore = transaccion.objectStore("Usuarios");
        
        var cursor = usuariosStore.index("email").openCursor(IDBKeyRange.only(emailUsuario));
        
        cursor.onsuccess = function (eventoCursor) {
            
         var resultado = eventoCursor.target.result;
         
         if(resultado){
             var usuario1 = resultado.value;
             usuario1.ciudad = ciudadSeleccionada;
             sessionStorage.setItem("ciudad", ciudadSeleccionada);
         }};
        };
}

function actualizarSessionStorage(ciudadSeleccionada){
    
     const ciudadActual = sessionStorage.getItem("ciudad");

    // Comprobar si la ciudad es diferente de la actual
    if (ciudadActual === ciudadSeleccionada) {
        Swal.fire({
            icon: "info",
            title: "Sin cambios",
            text: "La ciudad seleccionada ya está en tu perfil.",
        });
        return;
    }

    // Actualizar la ciudad en sessionStorage
    sessionStorage.setItem("ciudad", ciudadSeleccionada);

    // Mostrar mensaje de éxito
    Swal.fire({
        icon: "success",
        title: "Ciudad actualizada",
        text: "Tu ciudad ha sido actualizada."
    });

    // Actualizar cualquier elemento de la interfaz que muestre la ciudad
    const ciudadElemento = document.getElementById("ciudadActual");
    if (ciudadElemento) {
        ciudadElemento.textContent = ciudadSeleccionada;
    }
    
}