/* =========================================================
   MIS PEDIDOS
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
   MOSTRAR PEDIDOS
   ========================================================= */

function cargarPedidos() {

    let pedidos = JSON.parse(localStorage.getItem("pedidos"));

    let listaPedidos =
        document.getElementById("listaPedidos");


    /* Si no existen pedidos */

    if (!pedidos || pedidos.length === 0) {

        listaPedidos.innerHTML = `
            
            <div class="p-4 text-center">

                <h5 class="fw-bold">
                    No tienes pedidos registrados
                </h5>

                <p class="text-muted mb-0">
                    Cuando realices una compra, aparecerá aquí.
                </p>

            </div>

        `;

        return;
    }


    /* Limpiar lista */

    listaPedidos.innerHTML = "";


    /* =====================================================
       RECORRER PEDIDOS
       ===================================================== */

    for (let i = 0; i < pedidos.length; i++) {

        let pedido = pedidos[i];


        /* =================================================
           DETERMINAR COLOR DEL ESTADO
           ================================================= */

        let claseEstado = "text-bg-warning";


        if (pedido.estado === "Despachado") {

            claseEstado = "text-bg-info";

        } else if (pedido.estado === "Entregado") {

            claseEstado = "text-bg-success";

        }


        /* =================================================
           CREAR PEDIDO
           ================================================= */

        listaPedidos.innerHTML += `

            <div class="list-group-item pedido-item p-3 p-md-4">

                <div class="row align-items-center g-3">


                    <!-- Número de pedido -->

                    <div class="col-12 col-md-3">

                        <span class="text-muted small d-block">
                            Número de pedido
                        </span>

                        <strong>
                            #${pedido.codigo}
                        </strong>

                    </div>


                    <!-- Fecha -->

                    <div class="col-6 col-md-2">

                        <span class="text-muted small d-block">
                            Fecha
                        </span>

                        <span>
                            ${pedido.fecha}
                        </span>

                    </div>


                    <!-- Total -->

                    <div class="col-6 col-md-2">

                        <span class="text-muted small d-block">
                            Total
                        </span>

                        <strong>
                            ${formatearMoneda(pedido.total)}
                        </strong>

                    </div>


                    <!-- Estado -->

                    <div class="col-6 col-md-2">

                        <span class="text-muted small d-block mb-1">
                            Estado
                        </span>

                        <span class="badge ${claseEstado}">
                            ${pedido.estado}
                        </span>

                    </div>


                    <!-- Botón -->

                    <div class="col-6 col-md-3 text-md-end">

                        <button
                            class="btn btn-outline-primary btn-sm"
                            onclick="verDetallePedido(${i})"
                        >

                            Ver detalle

                            <i class="bi bi-arrow-right ms-1"></i>

                        </button>

                    </div>


                </div>

            </div>

        `;
    }

}


/* =========================================================
   VER DETALLE DEL PEDIDO
   ========================================================= */

function verDetallePedido(indice) {

    let pedidos =
        JSON.parse(localStorage.getItem("pedidos"));


    if (!pedidos || !pedidos[indice]) {

        alert("No se encontró el pedido.");

        return;
    }


    let pedidoSeleccionado =
        pedidos[indice];


    localStorage.setItem(
        "pedidoSeleccionado",
        JSON.stringify(pedidoSeleccionado)
    );


    window.location.href =
        "detalle-pedido.html";

}


/* =========================================================
   CARGAR AL ABRIR LA PÁGINA
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    cargarPedidos();

});