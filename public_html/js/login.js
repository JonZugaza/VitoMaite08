document.getElementById("botonIS").addEventListener("click", function () {
iniciarSesion();
});

function iniciarSesion()
{
var email = document.getElementById("email").value;
        var contraseña = document.getElementById("contraseña").value;
        var solicitud = indexedDB.open("vitomaite08", 1);
        solicitud.onsuccess = function (evento)
        {
            console.error("klk");
        var db = evento.target.result;
                var transaccion = db.transaction(["Usuarios"], "readonly");
                var usuariosStore = transaccion.objectStore("Usuarios");
                var indiceEmail = usuariosStore.index("email");
                var cursor = indiceEmail.openCursor(IDBKeyRange.only(email));
                cursor.onsuccess = function (eventoCursor)
                {

                var resultado = eventoCursor.target.result;
                        if (resultado)
                {

                if (resultado.value.contraseña === contraseña)
                {

                sessionStorage.setItem('email', resultado.value.email);
                        sessionStorage.setItem('nombre', resultado.value.nombre);
                        sessionStorage.setItem('foto', resultado.value.foto);
                        sessionStorage.setItem('genero', resultado.value.genero);
                       if (resultado.value.esPremium === "0")
                        window.location.href = 'menuLogueado.html';
                        else
                        window.location.href = 'menuPremium.html';
                }
                else
                {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "¡Has escrito mal la contraseña!",
                }); }
                }
                else
                {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No se ha encontrado el usuario!",
                });                }
                };
        };
        };




