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

function cargarLikes(){
    var resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; 
    
    const solicitud = indexedDB.open("vitomaite08", 1);
    
    solicitud.onsuccess = function (evento) {
        const db = evento.target.result;
        const transaccion = db.transaction(["Likes"], "readonly");
        const likesStore = transaccion.objectStore("Likes");
        
        var cursor = likesStore.openCursor();
        
        var hayLikes = false;
       cursor.onsuccess = function(eventoCursor){
    var resultado = eventoCursor.target.result;
    
    if(resultado){
        console.log("Se encontró un like: ", resultado);  
        hayLikes = true;
        var like = resultado.value;
        var emailUsuario = sessionStorage.getItem("email");
        if(emailUsuario === like.usuario1){
            console.log("tengo likes");
            var pretendiente = like.usuario2;
            mostrarLikes(pretendiente);
        }
        resultado.continue();
    } else {
        if(!hayLikes){
        console.log("no hay likes");
        }
    }
};


}

}

function  mostrarLikes(pretendiente){
    console.log(pretendiente);
}

        
        



