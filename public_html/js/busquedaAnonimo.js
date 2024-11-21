document.getElementById("botonBuscar").addEventListener("click", function () {
buscar();
});

function buscar() {
    
    var resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; // Limpiar resultados previos

    
    var solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;

        
        if (!db.objectStoreNames.contains("Usuarios")) {
            console.error("El objectStore 'Usuarios' no existe.");
            console.error("No hay datos de usuarios disponibles.");
            return;
        }

        var transaccion = db.transaction(["Usuarios"], "readonly");
        var usuariosStore = transaccion.objectStore("Usuarios");

        var cursor = usuariosStore.openCursor();

        var hayUsuariosEnTabla = false;
        var hayUsuariosQueCumplen = false;

        var generoSeleccionado = document.getElementById("genero").value;
        var edadMin = parseInt(document.getElementById("edadMin").value) || 18; 
        var edadMax = parseInt(document.getElementById("edadMax").value) || 100; 
        var ciudadSeleccionada = document.getElementById("ciudad").value;

        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                hayUsuariosEnTabla = true;

                var usuario = resultado.value;

                var cumpleCriterios =
                    (usuario.genero === generoSeleccionado && 
                    usuario.edad >= edadMin && usuario.edad <= edadMax &&
                    usuario.ciudad === ciudadSeleccionada
                    ); 
            
                if (cumpleCriterios) {
                    console.log("se van a devolver personas");
                    //función donde se muestran los usuarios
                    hayUsuariosQueCumplen = true;
                }
                resultado.continue();
            } 
            else {
                
                if (!hayUsuariosEnTabla) {
                    console.error("No hay usuarios");
                } else if (!hayUsuariosQueCumplen) {
                    console.error("No se cumplen los criterios");
                }
            }
        };
    };

    solicitud.onerror = function () {
        console.error("no se abre la bd.");
    };
}
