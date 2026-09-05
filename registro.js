// Cargar regiones al iniciar la página
document.addEventListener("DOMContentLoaded", function() {
    let selectRegion = document.getElementById("region");
    if (selectRegion) {
        for (let region in datosRegiones) {
            let option = document.createElement("option");
            option.value = region;
            option.textContent = region;
            selectRegion.appendChild(option);
        }
    }

    // Cargar productos en el catálogo o mantenedor si existen los contenedores
    renderizarCatalogo();
    renderizarTablaAdmin();
});

// Función para actualizar el combo de comunas según la región seleccionada
function cargarComunas() {
    let regionSel = document.getElementById("region").value;
    let selectComuna = document.getElementById("comuna");
    
    if (!selectComuna) return;

    selectComuna.innerHTML = '<option value="">Seleccione Comuna...</option>';

    if (regionSel && datosRegiones[regionSel]) {
        datosRegiones[regionSel].forEach(comuna => {
            let option = document.createElement("option");
            option.value = comuna;
            option.textContent = comuna;
            selectComuna.appendChild(option);
        });
    }
}


// ==========================================
// REGISTRO DE USUARIO Y VALIDACIONES
// ==========================================
function registrarUsuario() {
    let run = document.getElementById("run").value.trim();
    let nombre = document.getElementById("nombre").value.trim();
    let apellidos = document.getElementById("apellidos").value.trim();
    let correo = document.getElementById("reg_correo").value.trim();
    let tipoUsuario = document.getElementById("tipo_usuario").value;
    let region = document.getElementById("region").value;
    let comuna = document.getElementById("comuna").value;
    let direccion = document.getElementById("direccion").value.trim();

    // Validar campos obligatorios
    if (!run || !nombre || !apellidos || !correo || !tipoUsuario || !region || !comuna || !direccion) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    // Validar RUN chileno sin puntos ni guion
    if (!validarRut(run)) {
        alert("El RUN ingresado no es válido (ingrese sin puntos ni guion).");
        return;
    }

    // Validar formato de correo
    let formatoCorreo = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!formatoCorreo.test(correo)) {
        alert("Ingrese un correo electrónico válido.");
        return;
    }

    alert("Usuario registrado con éxito.");
    window.location.href = "login.html";
}

// Algoritmo de validación de Dígito Verificador (RUT)
function validarRut(rut) {
    if (!/^[0-9]+[0-kK]$/.test(rut)) return false;
    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += multiplo * parseInt(cuerpo.charAt(i));
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    let dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    return dv === dvEsperado;
}