// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.



/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const user = "https://ctd-todo-api.herokuapp.com/v1/users/getMe";
  const tareas = "https://ctd-todo-api.herokuapp.com/v1/tasks";

  const btnCerrarSesion = this.document.getElementById("closeApp");
  const userName = this.document.querySelector(".user-info p");
  const formCrearTarea = this.document.querySelector("form");
  const nuevaTarea = this.document.getElementById("nuevaTarea");
  const tareasPendientes = this.document.querySelector(".tareas-pendientes");

  tareasPendientes.innerHTML = "";

  const config = {
    headers : {
      "content-type" : "application/json",
      authorization : localStorage.getItem("jwt")
    }
  }
  const config2 = {
    method : "POST",
    headers : config.headers
  }

  consultarTareas();
  let listado = JSON.parse(localStorage.getItem("tareas"));

  obtenerNombreUsuario();
  renderizarTareas(listado);

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    localStorage.removeItem("jwt");
    window.location.replace("./index.html");
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    fetch(user,config)
    .then(response => response.json())
    .then(data =>{
      userName.innerHTML = `${data.firstName} ${data.lastName}`;
    })
  };


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    fetch(tareas,config)
    .then(response => response.json())
    .then(data =>{
      localStorage.setItem("tareas",JSON.stringify(data));
    })
  };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    event.preventDefault();
    config2.body = JSON.stringify({
      "description" : nuevaTarea.value,
      "completed" : false
    });
    fetch(tareas,config2)
    .then(response => response.json())
    .then(data=>{
      console.log(data)
    })
  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    listado.forEach(e=>{
      tareasPendientes.innerHTML += `<div class="tarea">
      <p class="descripcion">${e.description}</p>
      <p class="timestamp">${e.createdAt}</p>
      </div>`;
    })
  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    
    



  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
   
    

    

  };

});