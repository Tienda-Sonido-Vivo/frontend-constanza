/* =========================================================
   DETALLE DEL PEDIDO
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

    let pedido =
        JSON.parse(
            localStorage.getItem("pedidoSeleccionado")
        );


    /* =====================================================
       VERIFICAR SI EXISTE EL PEDIDO
       ===================================================== */

    if (!pedido) {

        alert("No se encontró el pedido.");

        window.location.href =
            "misPedidos.html";

        return;
    }


    /* =====================================================
       INFORMACIÓN DEL PEDIDO
       ===================================================== */

    document.getElementById("numeroPedido").textContent =
        "#" + pedido.codigo;


    document.getElementById("fechaPedido").textContent =
        pedido.fecha;


    document.getElementById("estadoPedido").textContent =
        pedido.estado;


    /* =====================================================
       ESTADO - COLOR DEL BADGE
       ===================================================== */

    let badgeEstado =
        document.getElementById("estadoPedidoBadge");


    if (pedido.estado === "En preparación") {

        badgeEstado.className =
            "badge text-bg-warning pedido-estado";

    } else if (pedido.estado === "Despachado") {

        badgeEstado.className =
            "badge text-bg-info pedido-estado";

    } else if (pedido.estado === "Entregado") {

        badgeEstado.className =
            "badge text-bg-success pedido-estado";

    }


    badgeEstado.textContent =
        pedido.estado;


    /* =====================================================
       PRODUCTOS
       ===================================================== */

    let contenedorProductos =
        document.getElementById("productosPedido");


    contenedorProductos.innerHTML = "";


    for (let i = 0; i < pedido.productos.length; i++) {

        let productoPedido =
            pedido.productos[i];


        let producto = null;


        /* Buscar producto completo */

        for (let j = 0; j < productos.length; j++) {

            if (
                productos[j].codigo ===
                productoPedido.codigo
            ) {

                producto = productos[j];

                break;
            }

        }


        /* Si el producto no existe */

        if (!producto) {
            continue;
        }


        /* Calcular subtotal */

        let subtotalProducto =
            producto.precio *
            productoPedido.cantidad;


        /* =================================================
           MOSTRAR PRODUCTO
           ================================================= */

        contenedorProductos.innerHTML += `

            <div class="detalle-producto">

                <div class="row align-items-center g-3">


                    <!-- Imagen -->

                    <div class="col-4 col-sm-3 col-md-2">

                        <img
                            src="${producto.imagen}"
                            alt="${producto.nombre}"
                            class="img-fluid rounded detalle-producto-imagen"
                        >

                    </div>


                    <!-- Información -->

                    <div class="col-8 col-sm-9 col-md-5">

                        <h3 class="h6 fw-bold mb-1">
                            ${producto.nombre}
                        </h3>

                        <p class="text-muted small mb-1">
                            ${producto.categoria}
                        </p>

                        <span class="small">
                            Precio unitario:
                            ${formatearMoneda(producto.precio)}
                        </span>

                    </div>


                    <!-- Cantidad -->

                    <div class="col-6 col-md-2">

                        <span class="text-muted small d-block">
                            Cantidad
                        </span>

                        <span>
                            ${productoPedido.cantidad}
                        </span>

                    </div>


                    <!-- Subtotal -->

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


        /* Separador */

        if (
            i <
            pedido.productos.length - 1
        ) {

            contenedorProductos.innerHTML +=
                "<hr>";

        }

    }


    /* =====================================================
       RESUMEN FINANCIERO
       ===================================================== */

    document.getElementById("subtotalPedido").textContent =
        formatearMoneda(pedido.subtotal);


    document.getElementById("ivaPedido").textContent =
        formatearMoneda(pedido.iva);


    document.getElementById("totalPedido").textContent =
        formatearMoneda(pedido.total);

}


/* =========================================================
   CARGAR AL ABRIR LA PÁGINA
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        cargarPedido();

    }
);