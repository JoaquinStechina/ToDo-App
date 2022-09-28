window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const base = "https://ctd-todo-api.herokuapp.com/v1/users";
    const form = document.querySelector('form');
    const nombre = document.getElementById('inputNombre');
    const apellido = document.getElementById('inputApellido');
    const email = document.getElementById('inputEmail');
    const password = document.getElementById('inputPassword');
    const passwordRepetida = document.getElementById('inputPasswordRepetida');
    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if(password.value == passwordRepetida.value){
            const config = {
                method : "POST",
                body : JSON.stringify({
                    firstName: nombre.value,
                    lastName: apellido.value,
                    email: email.value,
                    password: password.value
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }

            realizarRegister(config);
        }
        else{
            alert('Las contraseñas ingresadas no coinciden');
        }
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        fetch(base,settings)
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            if(data.jwt){
                alert("Se ha registrado el usuario");
                window.location.replace("./index.html");
            }
            else{
                alert('Ocurrio un error durante el registro');
                console.log(data);
            }
        })
    };
});