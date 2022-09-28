window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const base = "https://ctd-todo-api.herokuapp.com/v1/users/login";
    const form = document.querySelector('form');
    const e = document.getElementById("inputEmail");
    const p = document.getElementById("inputPassword");

    const config = {
        "method" : "POST",
        "headers" : {
            "content-type" : "application/json"
        }
    }

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        mostrarSpinner();
        const datos = {
            "email" : e.value,
            "password" : p.value
        }

        config.body = JSON.stringify(datos);

       realizarLogin(config);
    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
       fetch(base,settings)
       .then(response=>response.json())
       .then(data=>{
        ocultarSpinner();
        if(data.jwt){
            localStorage.setItem('jwt',data.jwt);
            window.location.replace('./mis-tareas.html')
        }
        else{
            form.reset();
            alert("Los datos son incorrectos");
        }
       })
    };
});