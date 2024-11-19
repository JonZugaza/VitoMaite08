
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

        var usuariosStore = db.createObjectStore("Usuarios", {keyPath: "id", autoIncrement: true});
        usuariosStore.createIndex("nombre", "nombre", {unique: false});
        usuariosStore.createIndex("email", "email", {unique: true});
        usuariosStore.createIndex("contraseña", "contraseña", {unique: false});
        usuariosStore.createIndex("genero", "genero", {unique: false});
        usuariosStore.createIndex("edad", "edad", {unique: false});
        usuariosStore.createIndex("foto", "foto", {unique: false});
        usuariosStore.createIndex("esPremium", "esPremium", {unique: false});
        usuariosStore.createIndex("ciudad", "ciudad", {unique: false});
        usuariosStore.createIndex("altura", "altura", {unique: false});
        usuariosStore.createIndex("colorPelo", "colorPelo", {unique: false});

        usuariosStore.add({nombre: "Eder", email: "eder@gmail.com", contraseña: "1234", foto: "avatar01", edad: 48, genero: "H", esPremium: "1", ciudad: "Bilbao", altura: 175, colorPelo: "Castaño"});
        usuariosStore.add({nombre: "Maeb", email: "maeb@gmail.com", contraseña: "1234", foto: "avatar02", edad: 29, genero: "M", esPremium: "0", ciudad: "Donostia", altura: 165, colorPelo: "Rubio"});
        usuariosStore.add({nombre: "Antoñanza", email: "antoñanza@gmail.com", contraseña: "1234", foto: "avatar03", edad: 35, genero: "H", esPremium: "1", ciudad: "Vitoria", altura: 180, colorPelo: "Negro"});
        usuariosStore.add({nombre: "Marta", email: "marta@gmail.com", contraseña: "1234", foto: "avatar04", edad: 27, genero: "M", esPremium: "0", ciudad: "Donostia", altura: 170, colorPelo: "Pelirrojo"});
        usuariosStore.add({nombre: "Ana", email: "ana@gmail.com", contraseña: "1234", foto: "avatar05", edad: 24, genero: "M", esPremium: "1", ciudad: "Bilbao", altura: 160, colorPelo: "Castaño"});
        usuariosStore.add({nombre: "UnaiSkibidi", email: "unaiSkibidi@gmail.com", contraseña: "1234", foto: "avatar06", edad: 22, genero: "H", esPremium: "0", ciudad: "Vitoria", altura: 172, colorPelo: "Rubio"});
        usuariosStore.add({nombre: "Marcoan", email: "marcoan@gmail.com", contraseña: "1234", foto: "avatar07", edad: 31, genero: "H", esPremium: "1", ciudad: "Vitoria", altura: 178, colorPelo: "Negro"});
        usuariosStore.add({nombre: "Paula", email: "paula@gmail.com", contraseña: "1234", foto: "avatar08", edad: 26, genero: "M", esPremium: "0", ciudad: "Bilbao", altura: 168, colorPelo: "Rubio"});
        usuariosStore.add({nombre: "Momo", email: "momo@gmail.com", contraseña: "1234", foto: "avatar09", edad: 38, genero: "H", esPremium: "0", ciudad: "Donostia", altura: 182, colorPelo: "Castaño"});
        usuariosStore.add({nombre: "Sara", email: "sara@gmail.com", contraseña: "1234", foto: "avatar10", edad: 34, genero: "M", esPremium: "1", ciudad: "Vitoria", altura: 165, colorPelo: "Negro"});
        usuariosStore.add({nombre: "Energuia", email: "Energuia@gmail.com", contraseña: "1234", foto: "avatar11", edad: 37, genero: "H", esPremium: "1", ciudad: "Bilbao", altura: 180, colorPelo: "Pelirrojo"});
        usuariosStore.add({nombre: "Lucía", email: "lucia@gmail.com", contraseña: "1234", foto: "avatar12", edad: 33, genero: "M", esPremium: "0", ciudad: "Donostia", altura: 170, colorPelo: "Rubio"});
        usuariosStore.add({nombre: "Luis", email: "luis@gmail.com", contraseña: "1234", foto: "avatar13", edad: 29, genero: "H", esPremium: "1", ciudad: "Vitoria", altura: 176, colorPelo: "Negro"});
        usuariosStore.add({nombre: "Isabel", email: "isabel@gmail.com", contraseña: "1234", foto: "avatar14", edad: 40, genero: "M", esPremium: "1", ciudad: "Bilbao", altura: 162, colorPelo: "Castaño"});
        usuariosStore.add({nombre: "Fernando", email: "fernando@gmail.com", contraseña: "1234", foto: "avatar15", edad: 28, genero: "H", esPremium: "0", ciudad: "Donostia", altura: 181, colorPelo: "Negro"});
        usuariosStore.add({nombre: "Elena", email: "elena@gmail.com", contraseña: "1234", foto: "avatar16", edad: 32, genero: "M", esPremium: "0", ciudad: "Vitoria", altura: 164, colorPelo: "Pelirrojo"});
    };
    document.getElementById("botonIS").addEventListener("click", function () {
        iniciarSesion();
    });


    function iniciarSesion()
    {
        var email = document.getElementById("email").value;
        var contraseña = document.getElementById("contraseña").value;


    }

