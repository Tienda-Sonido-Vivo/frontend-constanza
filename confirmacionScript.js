/* =========================================================
   CONFIRMACIÓN DE PEDIDO

   *** ACTUALIZADO! ***
   ========================================================= */


/* =========================================================
   FORMATEAR MONEDA
   ========================================================= */

function formatearMoneda(valor) {

    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0
    }).format(valor);

}


/* =========================================================
   CARGAR PEDIDO
   ========================================================= */

function cargarPedido() {

    let pedido = JSON.parse(localStorage.getItem("ultimoPedido"));

    if (!pedido) {

        alert("No se encontró información del pedido.");

        window.location.href = "SonidoVivo.html";

        return;
    }


    /* Número de pedido */

    document.getElementById("numeroPedido").textContent =
        "#" + pedido.codigo;


    /* Fecha */

    document.getElementById("fechaPedido").textContent =
        pedido.fecha;


    /* Correo */

    document.getElementById("correoPedido").textContent =
        pedido.cliente.correo;


    /* =====================================================
       DATOS DEL CLIENTE
       ===================================================== */

    document.getElementById("nombreCliente").textContent =
        pedido.cliente.nombre + " " + pedido.cliente.apellidos;

    document.getElementById("correoCliente").textContent =
        pedido.cliente.correo;

    document.getElementById("telefonoCliente").textContent =
        pedido.cliente.telefono;

    document.getElementById("regionCliente").textContent =
        pedido.cliente.region;

    document.getElementById("comunaCliente").textContent =
        pedido.cliente.comuna;


    /* =====================================================
       MÉTODO DE ENTREGA
       ===================================================== */

    if (pedido.metodoEntrega === "despacho") {

        document.getElementById("metodoEntrega").textContent =
            "Despacho a Domicilio";

        document.getElementById("direccionEntrega").innerHTML =
            "<strong>" +
            pedido.cliente.nombre + " " +
            pedido.cliente.apellidos +
            "</strong><br>" +
            pedido.cliente.direccion +
            "<br>" +
            pedido.cliente.comuna + ", " +
            pedido.cliente.region +
            "<br>" +
            "Código Postal: " +
            (pedido.cliente.codigoPostal || "No especificado");

    } else {

        document.getElementById("metodoEntrega").textContent =
            "Retiro en Tienda";

        document.getElementById("direccionEntrega").innerHTML =
            "<strong>Tienda Sonido Vivo</strong><br>" +
            "Viña del Mar<br>" +
            "Retiro presencial en tienda";

    }


    /* =====================================================
       PRODUCTOS
       ===================================================== */

    let contenedorProductos =
        document.getElementById("productosOrdenados");

    contenedorProductos.innerHTML = "";


    for (let i = 0; i < pedido.productos.length; i++) {

        let productoPedido = pedido.productos[i];

        let producto = null;


        for (let j = 0; j < productos.length; j++) {

            if (productos[j].codigo === productoPedido.codigo) {

                producto = productos[j];

                break;
            }
        }


        if (!producto) {
            continue;
        }


        let subtotalProducto =
            producto.precio * productoPedido.cantidad;


        contenedorProductos.innerHTML += `

            <div class="producto-item">

                <div class="row align-items-center">

                    <div class="col-12 col-md-8">

                        <h6 class="fw-semibold mb-1">
                            ${producto.nombre}
                        </h6>

                        <p class="text-muted small mb-0">
                            Código: ${producto.codigo}
                            |
                            Cantidad: ${productoPedido.cantidad}
                        </p>

                    </div>

                    <div class="col-12 col-md-4 text-md-end">

                        <p class="fw-bold text-success mb-0">
                            ${formatearMoneda(subtotalProducto)}
                        </p>

                    </div>

                </div>

            </div>

        `;


        if (i < pedido.productos.length - 1) {

            contenedorProductos.innerHTML += "<hr>";

        }

    }


    /* =====================================================
       RESUMEN FINANCIERO
       ===================================================== */

    document.getElementById("subtotalPedido").textContent =
        formatearMoneda(pedido.subtotal);

    document.getElementById("envioPedido").textContent =
        formatearMoneda(pedido.envio);

    document.getElementById("ivaPedido").textContent =
        formatearMoneda(pedido.iva);

    document.getElementById("totalPedido").textContent =
        formatearMoneda(pedido.total);


    /* =====================================================
       MÉTODO DE PAGO
       ===================================================== */

    let nombrePago = "";

    if (pedido.metodoPago === "debito") {

        nombrePago = "Tarjeta de Débito";

    } else if (pedido.metodoPago === "credito") {

        nombrePago = "Tarjeta de Crédito";

    } else if (pedido.metodoPago === "transbank") {

        nombrePago = "Transbank Webpay";

    } else if (pedido.metodoPago === "klap") {

        nombrePago = "Klap";

    }


    document.getElementById("metodoPago").textContent =
        nombrePago;


    /* =====================================================
       ESTADO
       ===================================================== */

    actualizarTimeline(pedido.estado);

}


/* =========================================================
   ACTUALIZAR TIMELINE
   ========================================================= */

function actualizarTimeline(estadoActual) {

    let estados = [
        "Confirmado",
        "En preparación",
        "Despachado",
        "Entregado"
    ];


    let indiceEstado =
        estados.indexOf(estadoActual);


    let timelineItems =
        document.querySelectorAll(".timeline-item");


    for (let i = 0; i < timelineItems.length; i++) {

        if (i <= indiceEstado) {

            timelineItems[i].classList.add("activo");

        } else {

            timelineItems[i].classList.remove("activo");

        }

    }

}


/* =========================================================
   CARGAR AL ABRIR LA PÁGINA
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    cargarPedido();


    /* Animación del timeline */

    let timelineItems =
        document.querySelectorAll(".timeline-item");


    for (let i = 0; i < timelineItems.length; i++) {

        setTimeout(function () {

            timelineItems[i].style.animation =
                "fadeInUp 0.6s ease";

        }, i * 200);

    }

});