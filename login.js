// ==========================================
// INICIO DE SESIÓN
// ==========================================
function ingresar() {
    let correo = document.getElementById("correo").value;
    let clave = document.getElementById("clave").value;

    if (correo === "" || clave === "") {
        alert("Debe completar todos los campos");
        return;
    }

    let formatoCorreo = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!formatoCorreo.test(correo)) {
        alert("Ingrese un correo válido");
        return;
    }

    if (clave.length < 4 || clave.length > 10) {
        alert("La clave debe tener entre 4 y 10 caracteres");
        return;
    }

    // ==========================================
    // REDIRECCIÓN POR ROLES
    // ==========================================

    if (correo === "admin@demo.cl" && clave === "1234") {

        sessionStorage.setItem("usuarioLogueado", "true");
        window.location.href = "InicioAdmin.html";

    } else if (correo === "vendedor1@demo.cl" && clave === "1234") {

        sessionStorage.setItem("usuarioLogueado", "true");
        window.location.href = "gestionProductos.html";

    } else if (correo === "vendedor2@demo.cl" && clave === "1234") {

        sessionStorage.setItem("usuarioLogueado", "true");
        window.location.href = "gestionPedidos.html";

    } else if (correo === "usuario@demo.cl" && clave === "1234") {

        sessionStorage.setItem("usuarioLogueado", "true");
        window.location.href = "SonidoVivo.html";

    } else {

        alert("Correo o clave incorrectos");

    }
}


