
document.addEventListener('DOMContentLoaded', function () {
    inicializar();
});

function inicializar() {
    var solicitud = indexedDB.open("vitomaite08", 1);

    solicitud.onerror = function (evento) {
        console.error("la BD no se ha abierto", evento.target.error);
    };

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;
        console.log("BD abierta", db);
    };
}

