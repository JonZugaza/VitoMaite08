
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

    solicitud.onupgradeneeded = function (evento) {
        var db = evento.target.result;

        var aficionesStore = db.createObjectStore("Aficiones", {keyPath: "id", autoIncrement: true});
        aficionesStore.add({nombre: "Fútbol"});
        aficionesStore.add({nombre: "Escuchar música"});
        aficionesStore.add({nombre: "Viajar"});
        aficionesStore.add({nombre: "Programar"});
        aficionesStore.add({nombre: "VideoJuegos"});
        aficionesStore.add({nombre: "Salir a comer"});
        aficionesStore.add({nombre: "Natación"});
        aficionesStore.add({nombre: "Basket"});
        aficionesStore.add({nombre: "Ir al gym"});
        aficionesStore.add({nombre: "Cocinar"});
        aficionesStore.add({nombre: "Leer"});
        aficionesStore.add({nombre: "Ver series"});
        aficionesStore.add({nombre: "Salir de compras"});
        aficionesStore.add({nombre: "Tocar instrumentos"});
        aficionesStore.add({nombre: "Animales"});

        aficionesStore.createIndex("nombre", "nombre", {unique: true});
    };
}

