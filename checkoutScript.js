
/* =========================================================
   SCRIPT PERSONALIZADO - CHECKOUT
   ========================================================= */

/**
 * Función para mostrar/ocultar opciones según el método de entrega seleccionado
 */
function mostrarOpciones() {
  const metodoDespacho = document.getElementById("metodoDespacho").checked;
  const camposDespacho = document.getElementById("camposDespacho");
  const camposRetiro = document.getElementById("camposRetiro");

  if (metodoDespacho) {
    camposDespacho.style.display = "block";
    camposRetiro.style.display = "none";
  } else {
    camposDespacho.style.display = "none";
    camposRetiro.style.display = "block";
  }

  actualizarTotal();
}

/**
 * Función para actualizar la forma de pago y mostrar campos correspondientes
 */
function actualizarFormaPago() {
  const metodoPago = document.querySelector(
    'input[name="metodoPago"]:checked',
  ).value;
  const contenidoDatosPago = document.getElementById("contenidoDatosPago");

  let htmlDatos = "";

  if (metodoPago === "debito") {
    htmlDatos = `
      <div class="campos-tarjeta">
        <p class="fw-semibold mb-3">Ingresa los datos de tu tarjeta de débito</p>
        
        <div class="mb-3">
          <label for="numeroTarjeta" class="form-label fw-semibold">Número de Tarjeta</label>
          <input type="text" class="form-control" id="numeroTarjeta" 
                 placeholder="1234 5678 9012 3456" maxlength="19" required />
          <div class="invalid-feedback">Por favor, ingresa un número de tarjeta válido.</div>
        </div>

        <div class="row">
          <div class="col-6">
            <div class="mb-3">
              <label for="fechaVencimiento" class="form-label fw-semibold">Vencimiento (MM/AA)</label>
              <input type="text" class="form-control" id="fechaVencimiento" 
                     placeholder="12/25" maxlength="5" required />
              <div class="invalid-feedback">Formato: MM/AA</div>
            </div>
          </div>
          <div class="col-6">
            <div class="mb-3">
              <label for="codigoSeguridad" class="form-label fw-semibold">CVV</label>
              <input type="text" class="form-control" id="codigoSeguridad" 
                     placeholder="123" maxlength="3" required />
              <div class="invalid-feedback">Ingresa el código de seguridad.</div>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="nombreTitular" class="form-label fw-semibold">Nombre del Titular</label>
          <input type="text" class="form-control" id="nombreTitular" 
                 placeholder="Juan Pérez" required />
          <div class="invalid-feedback">Por favor, ingresa el nombre del titular.</div>
        </div>

        <div class="row">
          <div class="col-6">
            <div class="mb-3">
              <label for="rutPago" class="form-label fw-semibold">RUT</label>
              <input type="text" class="form-control" id="rutPago" 
                     placeholder="12345678-9" required />
              <div class="invalid-feedback">Por favor, ingresa el RUT.</div>
            </div>
          </div>
          <div class="col-6">
            <div class="mb-3">
              <label for="numeroDocumento" class="form-label fw-semibold">Número de Documento</label>
              <input type="text" class="form-control" id="numeroDocumento" 
                     placeholder="12345678" required />
              <div class="invalid-feedback">Por favor, ingresa el número de documento.</div>
            </div>
          </div>
        </div>

        <div class="alert alert-info mt-3">
          <small><strong>⚠️ Seguridad:</strong> Tus datos de tarjeta serán procesados de forma segura.</small>
        </div>
      </div>
    `;
  } else if (metodoPago === "credito") {
    htmlDatos = `
      <div class="campos-tarjeta">
        <p class="fw-semibold mb-3">Ingresa los datos de tu tarjeta de crédito</p>
        
        <div class="mb-3">
          <label for="numeroTarjeta" class="form-label fw-semibold">Número de Tarjeta</label>
          <input type="text" class="form-control" id="numeroTarjeta" 
                 placeholder="1234 5678 9012 3456" maxlength="19" required />
          <div class="invalid-feedback">Por favor, ingresa un número de tarjeta válido.</div>
        </div>

        <div class="row">
          <div class="col-6">
            <div class="mb-3">
              <label for="fechaVencimiento" class="form-label fw-semibold">Vencimiento (MM/AA)</label>
              <input type="text" class="form-control" id="fechaVencimiento" 
                     placeholder="12/25" maxlength="5" required />
              <div class="invalid-feedback">Formato: MM/AA</div>
            </div>
          </div>
          <div class="col-6">
            <div class="mb-3">
              <label for="codigoSeguridad" class="form-label fw-semibold">CVV</label>
              <input type="text" class="form-control" id="codigoSeguridad" 
                     placeholder="123" maxlength="3" required />
              <div class="invalid-feedback">Ingresa el código de seguridad.</div>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="nombreTitular" class="form-label fw-semibold">Nombre del Titular</label>
          <input type="text" class="form-control" id="nombreTitular" 
                 placeholder="Juan Pérez" required />
          <div class="invalid-feedback">Por favor, ingresa el nombre del titular.</div>
        </div>

        <div class="row">
          <div class="col-6">
            <div class="mb-3">
              <label for="rutPago" class="form-label fw-semibold">RUT</label>
              <input type="text" class="form-control" id="rutPago" 
                     placeholder="12345678-9" required />
              <div class="invalid-feedback">Por favor, ingresa el RUT.</div>
            </div>
          </div>
          <div class="col-6">
            <div class="mb-3">
              <label for="numeroDocumento" class="form-label fw-semibold">Número de Documento</label>
              <input type="text" class="form-control" id="numeroDocumento" 
                     placeholder="12345678" required />
              <div class="invalid-feedback">Por favor, ingresa el número de documento.</div>
            </div>
          </div>
        </div>

        <div class="alert alert-info mt-3">
          <small><strong>⚠️ Seguridad:</strong> Tus datos de tarjeta serán procesados de forma segura.</small>
        </div>
      </div>
    `;
  } else if (metodoPago === "transbank") {
    htmlDatos = `
      <div class="campos-tarjeta">
        <p class="fw-semibold mb-3">Transbank Webpay</p>
        <div class="alert alert-info">
          <p class="mb-2">
            <strong>✓ Opción segura:</strong> Serás redirigido a la plataforma segura de Transbank 
            para completar el pago.
          </p>
          <small>No compartirás tus datos bancarios directamente con nosotros.</small>
        </div>
        <p class="text-muted mt-3">Los datos de pago se completarán en la siguiente pantalla.</p>
      </div>
    `;
  } else if (metodoPago === "klap") {
    htmlDatos = `
      <div class="campos-tarjeta">
        <p class="fw-semibold mb-3">Klap - Compra Ahora, Paga Después</p>
        <div class="alert alert-info">
          <p class="mb-2">
            <strong>✓ Flexibilidad:</strong> Paga tu compra en cuotas sin interés 
            a través de Klap.
          </p>
          <small>Serás redirigido a Klap para completar el proceso de pago.</small>
        </div>
        <p class="text-muted mt-3">Los datos se completarán en la siguiente pantalla.</p>
      </div>
    `;
  }

  contenidoDatosPago.innerHTML = htmlDatos;
}

// ** CAMBIO IMPORTANTE **: 
// Agregue esta funcion para cargar el resumen del carrito al checkout:

function cargarResumenCarrito() {

  let carrito = JSON.parse(localStorage.getItem("carrito"));

  if (!carrito) {
    carrito = [];
  }

  let resumenItems = document.getElementById("resumenItems");

  resumenItems.innerHTML = "";

  let subtotalProductos = 0;

  for (let i = 0; i < carrito.length; i++) {

    let producto = null;

    // Buscar el producto correspondiente por su código
    for (let j = 0; j < productos.length; j++) {
      if (productos[j].codigo === carrito[i].codigo) {
        producto = productos[j];
        break;
      }
    }

    // Si no encontramos el producto, lo ignoramos
    if (!producto) {
      continue;
    }

    let cantidad = carrito[i].cantidad;

    let subtotalProducto = producto.precio * cantidad;

    subtotalProductos += subtotalProducto;

    resumenItems.innerHTML += `
      <div class="d-flex justify-content-between mb-3">

        <div>
          <p class="mb-0 fw-semibold">
            ${producto.nombre}
          </p>

          <small class="text-muted">
            Cantidad: ${cantidad}
          </small>
        </div>

        <div class="text-end">
          <p class="mb-0">
            ${formatearMoneda(subtotalProducto)}
          </p>
        </div>

      </div>
    `;
  }

  return subtotalProductos;
}


/**
 **CAMBIO IMPORTANTE **: metodo actualizarTotal CORREGIDO:
 */

function actualizarTotal() {

  const metodoDespacho =
    document.getElementById("metodoDespacho").checked;

  const subtotal = cargarResumenCarrito();

  const costoEnvio = metodoDespacho ? 8990 : 0;

  // Los precios de los productos ya incluyen IVA
  const iva = Math.round(subtotal * 19 / 119);

  // No volvemos a sumar el IVA
  const total = subtotal + costoEnvio;

  document.getElementById("subtotal").textContent =
    formatearMoneda(subtotal);

  document.getElementById("costoEnvio").textContent =
    formatearMoneda(costoEnvio);

  document.getElementById("iva").textContent =
    formatearMoneda(iva);

  document.getElementById("totalPagar").textContent =
    formatearMoneda(total);
}

/**
 * Función auxiliar para formatear valores a moneda chilena
 */
function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(valor);
}

/* FUNCION DE VALIDAR FORMULARIO CLARIFICADA Y CORREGIDA */

function validarFormulario(form, event) {

  if (!form.checkValidity()) {

    event.preventDefault();
    event.stopPropagation();

  }

  form.classList.add("was-validated");
}

/* FUNCIÓN DE CREAR PEDIDO AÑADIDO */

function crearPedido() {

  let carrito = JSON.parse(localStorage.getItem("carrito"));

  if (!carrito || carrito.length === 0) {

    alert("El carrito está vacío.");

    return false;
  }


  // =====================================================
  // OBTENER PEDIDOS EXISTENTES
  // =====================================================

  let pedidos = JSON.parse(localStorage.getItem("pedidos"));

  if (!pedidos) {

    pedidos = [];

  }


  // =====================================================
  // GENERAR CÓDIGO DEL PEDIDO
  // =====================================================

  let numeroPedido = pedidos.length + 1;

  let codigoPedido =
    "SV-" +
    new Date().getFullYear() +
    "-" +
    String(numeroPedido).padStart(4, "0");


  // =====================================================
  // OBTENER MÉTODO DE ENTREGA
  // =====================================================

  let metodoEntrega =
    document.querySelector(
      'input[name="metodoEntrega"]:checked'
    ).value;


  // =====================================================
  // OBTENER MÉTODO DE PAGO
  // =====================================================

  let metodoPago =
    document.querySelector(
      'input[name="metodoPago"]:checked'
    ).value;


  // =====================================================
  // CALCULAR TOTALES
  // =====================================================

  let subtotal = cargarResumenCarrito();

  let envio =
    metodoEntrega === "despacho" ? 8990 : 0;

  // El precio ya incluye IVA
  let iva =
    Math.round(subtotal * 19 / 119);

  let total =
    subtotal + envio;


  // =====================================================
  // OBTENER DATOS DEL CLIENTE
  // =====================================================

  let cliente = {

    nombre:
      document.getElementById("nombre").value,

    apellidos:
      document.getElementById("apellidos").value,

    telefono:
      document.getElementById("telefono").value,

    correo:
      document.getElementById("correo").value,

    region:
      document.getElementById("region").value,

    comuna:
      document.getElementById("comuna").value,

    direccion:
      document.getElementById("direccion").value,

    numeroVivienda:
      document.getElementById("numeroVivienda").value,

    codigoPostal:
      document.getElementById("codigoPostal").value

  };


  // =====================================================
  // COPIAR PRODUCTOS DEL CARRITO
  // =====================================================

  let productosPedido = [];

  for (let i = 0; i < carrito.length; i++) {

    productosPedido.push({

      codigo: carrito[i].codigo,

      cantidad: carrito[i].cantidad

    });

  }


  // =====================================================
  // VALIDAR STOCK ANTES DE CONFIRMAR
  // =====================================================

  for (let i = 0; i < productosPedido.length; i++) {

    let producto = null;

    for (let j = 0; j < productos.length; j++) {

      if (
        productos[j].codigo ===
        productosPedido[i].codigo
      ) {

        producto = productos[j];

        break;

      }

    }


    if (!producto) {

      alert(
        "Uno de los productos del carrito ya no existe."
      );

      return false;

    }


    if (
      productosPedido[i].cantidad >
      producto.stock
    ) {

      alert(
        "No hay suficiente stock de " +
        producto.nombre +
        ". Stock disponible: " +
        producto.stock
      );

      return false;

    }

  }


  // =====================================================
  // CREAR OBJETO PEDIDO
  // =====================================================

  let pedido = {

    codigo: codigoPedido,

    fecha:
      new Date().toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }),

    estado: "En preparación",

    productos: productosPedido,

    subtotal: subtotal,

    envio: envio,

    iva: iva,

    total: total,

    metodoEntrega: metodoEntrega,

    metodoPago: metodoPago,

    cliente: cliente

  };


  // =====================================================
  // RESTAR STOCK
  // =====================================================

  let stockProductos = JSON.parse(
    localStorage.getItem("stockProductos")
  );

  if (!stockProductos) {

    stockProductos = {};

  }


  for (let i = 0; i < productosPedido.length; i++) {

    for (let j = 0; j < productos.length; j++) {

      if (
        productos[j].codigo ===
        productosPedido[i].codigo
      ) {

        productos[j].stock -=
          productosPedido[i].cantidad;


        stockProductos[productos[j].codigo] =
          productos[j].stock;

      }

    }

  }


  // =====================================================
  // GUARDAR STOCK ACTUALIZADO
  // =====================================================

  localStorage.setItem(
    "stockProductos",
    JSON.stringify(stockProductos)
  );


  // =====================================================
  // GUARDAR PEDIDO EN EL HISTORIAL
  // =====================================================

  pedidos.push(pedido);

  localStorage.setItem(
    "pedidos",
    JSON.stringify(pedidos)
  );


  // =====================================================
  // GUARDAR ÚLTIMO PEDIDO
  // =====================================================

  localStorage.setItem(
    "ultimoPedido",
    JSON.stringify(pedido)
  );


  // =====================================================
  // VACIAR CARRITO
  // =====================================================

  localStorage.removeItem("carrito");


  return true;
}

/**
 * Evento al cargar la página
 */
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar método de pago (por defecto débito)
  document.getElementById("pagoDebito").checked = true;
  actualizarFormaPago();

  // Inicializar método de entrega
  mostrarOpciones();

  // Manejar el envío del formulario
  const formCheckout = document.getElementById("formCheckout");
  
  /* ENVIO DE FORMULARIO CORREGIDO */

  formCheckout.addEventListener("submit", function (event) {

    validarFormulario(this, event);


    if (!this.checkValidity()) {

      return;

    }


    event.preventDefault();
    event.stopPropagation();


    // Crear y guardar el pedido
    let pedidoCreado = crearPedido();


    if (!pedidoCreado) {

      return;

    }


    // Ir a la página de confirmación
    window.location.href = "confirmacion-pedido.html";

  });
  
});

/**
 * Validación en tiempo real del número de tarjeta
 */
document.addEventListener("input", function (e) {
  if (
    e.target.id === "numeroTarjeta" &&
    e.target.value.length > 0 &&
    !e.target.value.includes(" ")
  ) {
    // Agregar espacios cada 4 dígitos
    let value = e.target.value.replace(/\s/g, "");
    let formattedValue = value.replace(/(\d{4})/g, "$1 ").trim();
    e.target.value = formattedValue;
  }

  // Validación de fecha
  if (
    e.target.id === "fechaVencimiento" &&
    e.target.value.length === 2 &&
    !e.target.value.includes("/")
  ) {
    e.target.value = e.target.value + "/";
  }
});
