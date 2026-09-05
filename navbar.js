// ==========================================
// CONTROL DE SESIÓN DEL NAVBAR
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    actualizarNavbar();

});


// ==========================================
// ACTUALIZAR OPCIONES DE "MI CUENTA"
// ==========================================

function actualizarNavbar() {

    const cuentaMenu = document.getElementById("menuCuenta");

    if (!cuentaMenu) return;

    const sesionIniciada = sessionStorage.getItem("usuarioLogueado");

    if (sesionIniciada === "true") {

        // Usuario con sesión iniciada
        cuentaMenu.innerHTML = `
            <li>
                <a class="dropdown-item" href="misPedidos.html">
                    Mis Pedidos
                </a>
            </li>

            <li>
                <hr class="dropdown-divider">
            </li>

            <li>
                <a class="dropdown-item" href="#" onclick="cerrarSesion()">
                    Cerrar Sesión
                </a>
            </li>
        `;

    } else {

        // Usuario sin sesión
        cuentaMenu.innerHTML = `
            <li>
                <a class="dropdown-item" href="login.html">
                    Iniciar Sesión
                </a>
            </li>

            <li>
                <a class="dropdown-item" href="registro.html">
                    Registrarme
                </a>
            </li>
        `;
    }
}


// ==========================================
// CERRAR SESIÓN
// ==========================================

function cerrarSesion() {

    sessionStorage.removeItem("usuarioLogueado");

    window.location.href = "SonidoVivo.html";
}