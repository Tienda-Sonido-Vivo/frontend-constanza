/* =========================================================
   DETALLE DE PEDIDO - ADMINISTRACIÓN
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

    let pedido =
        JSON.parse(
            localStorage.getItem("pedidoSeleccionado")
        );


    if (!pedido) {

        alert("No se encontró el pedido.");

        window.location.href =
            "gestionPedidos.html";

        return;

    }


    /* =====================================================
       INFORMACIÓN GENERAL
       ===================================================== */

    document.getElementById("numeroPedido").textContent =
        "#" + pedido.codigo;


    document.getElementById("fechaPedido").textContent =
        pedido.fecha;


    document.getElementById("estadoPedido").textContent =
        pedido.estado;


    let badgeEstado =
        document.getElementById("estadoPedidoBadge");


    if (pedido.estado === "En preparación") {

        badgeEstado.className =
            "badge text-bg-warning fs-6";

    } else if (pedido.estado === "Despachado") {

        badgeEstado.className =
            "badge text-bg-info fs-6";

    } else if (pedido.estado === "Entregado") {

        badgeEstado.className =
            "badge text-bg-success fs-6";

    }


    badgeEstado.textContent =
        pedido.estado;


    /* =====================================================
       INFORMACIÓN DEL CLIENTE
       ===================================================== */

    document.getElementById("nombreCliente").textContent =
        pedido.cliente.nombre +
        " " +
        pedido.cliente.apellidos;


    document.getElementById("correoCliente").textContent =
        pedido.cliente.correo;


    document.getElementById("telefonoCliente").textContent =
        pedido.cliente.telefono;


    document.getElementById("comunaCliente").textContent =
        pedido.cliente.comuna;


    document.getElementById("regionCliente").textContent =
        pedido.cliente.region;


    document.getElementById("codigoPostal").textContent =
        pedido.cliente.codigoPostal ||
        "No especificado";


    /* =====================================================
       INFORMACIÓN DE ENTREGA
       ===================================================== */

    let metodoEntrega =
        document.getElementById("metodoEntrega");


    if (pedido.metodoEntrega === "despacho") {

        metodoEntrega.textContent =
            "Despacho a domicilio";


        document.getElementById("direccionEntrega").textContent =
            pedido.cliente.direccion +
            (
                pedido.cliente.numeroVivienda
                ? " " + pedido.cliente.numeroVivienda
                : ""
            );

    } else {

        metodoEntrega.textContent =
            "Retiro en tienda";


        document.getElementById("direccionEntrega").textContent =
            "Tienda Sonido Vivo - Viña del Mar";

    }


    /* =====================================================
       PRODUCTOS
       ===================================================== */

    let contenedorProductos =
        document.getElementById("productosPedido");


    contenedorProductos.innerHTML = "";


    for (
        let i = 0;
        i < pedido.productos.length;
        i++
    ) {

        let productoPedido =
            pedido.productos[i];


        let producto = null;


        /*
         * Buscamos el producto completo
         * utilizando su código.
         */

        for (
            let j = 0;
            j < productos.length;
            j++
        ) {

            if (
                productos[j].codigo ===
                productoPedido.codigo
            ) {

                producto =
                    productos[j];

                break;

            }

        }


        if (!producto) {
            continue;
        }


        let subtotalProducto =
            producto.precio *
            productoPedido.cantidad;


        contenedorProductos.innerHTML += `

            <div class="border rounded p-3 mb-3">

                <div class="row align-items-center g-3">


                    <!-- IMAGEN -->

                    <div class="col-4 col-md-2">

                        <img
                            src="${producto.imagen}"
                            alt="${producto.nombre}"
                            class="img-fluid rounded"
                        >

                    </div>


                    <!-- INFORMACIÓN -->

                    <div class="col-8 col-md-5">

                        <h3 class="h6 fw-bold mb-1">
                            ${producto.nombre}
                        </h3>

                        <p class="text-muted small mb-1">
                            Código:
                            ${producto.codigo}
                        </p>

                        <p class="text-muted small mb-0">
                            Categoría:
                            ${producto.categoria}
                        </p>

                    </div>


                    <!-- CANTIDAD -->

                    <div class="col-6 col-md-2">

                        <span class="text-muted small d-block">
                            Cantidad
                        </span>

                        <strong>
                            ${productoPedido.cantidad}
                        </strong>

                    </div>


                    <!-- SUBTOTAL -->

                    <div class="col-6 col-md-3 text-md-end">

                        <span class="text-muted small d-block">
                            Subtotal
                        </span>

                        <strong>
                            ${formatearMoneda(subtotalProducto)}
                        </strong>

                    </div>


                </div>

            </div>

        `;

    }


    /* =====================================================
       INFORMACIÓN DE PAGO
       ===================================================== */

    let nombrePago = "";


    if (pedido.metodoPago === "debito") {

        nombrePago =
            "Tarjeta de Débito";

    } else if (pedido.metodoPago === "credito") {

        nombrePago =
            "Tarjeta de Crédito";

    } else if (pedido.metodoPago === "transbank") {

        nombrePago =
            "Transbank Webpay";

    } else if (pedido.metodoPago === "klap") {

        nombrePago =
            "Klap";

    }


    document.getElementById("metodoPago").textContent =
        nombrePago;


    /* =====================================================
       RESUMEN
       ===================================================== */

    document.getElementById("subtotalPedido").textContent =
        formatearMoneda(pedido.subtotal);


    document.getElementById("ivaPedido").textContent =
        formatearMoneda(pedido.iva);


    document.getElementById("envioPedido").textContent =
        formatearMoneda(pedido.envio);


    document.getElementById("totalPedido").textContent =
        formatearMoneda(pedido.total);

}


/* =========================================================
   INICIAR
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        cargarPedido();

    }
);