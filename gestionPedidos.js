/* =========================================================
   GESTIÓN DE PEDIDOS
   ========================================================= */


/* =========================================================
   CARGAR PEDIDOS
   ========================================================= */

let datosGuardados =
    localStorage.getItem("pedidos");

let pedidos;


if (datosGuardados === null) {

    pedidos = [];

} else {

    pedidos =
        JSON.parse(datosGuardados);

}


/* =========================================================
   ELEMENTO DE LA TABLA
   ========================================================= */

let listaPedidos =
    document.getElementById("pedidoTableBody");


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
   DETERMINAR COLOR DEL ESTADO
   ========================================================= */

function obtenerClaseEstado(estado) {

    if (estado === "En preparación") {

        return "text-bg-warning";

    } else if (estado === "Despachado") {

        return "text-bg-info";

    } else if (estado === "Entregado") {

        return "text-bg-success";

    }

    return "text-bg-secondary";

}


/* =========================================================
   DIBUJAR TABLA
   ========================================================= */

function dibujarTabla() {

    let filasHTML = "";


    for (let i = 0; i < pedidos.length; i++) {

        let pedido = pedidos[i];


        let nombreCliente =
            pedido.cliente.nombre +
            " " +
            pedido.cliente.apellidos;


        let claseEstado =
            obtenerClaseEstado(pedido.estado);


        filasHTML += `

            <tr>


                <!-- Número -->

                <td>

                    <strong>
                        #${pedido.codigo}
                    </strong>

                </td>


                <!-- Fecha -->

                <td>

                    ${pedido.fecha}

                </td>


                <!-- Cliente -->

                <td>

                    ${nombreCliente}

                </td>


                <!-- Total -->

                <td>

                    <strong>
                        ${formatearMoneda(pedido.total)}
                    </strong>

                </td>


                <!-- Estado -->

                <td>

                    <span class="badge ${claseEstado}">
                        ${pedido.estado}
                    </span>

                </td>


                <!-- Acción -->

                <td>

                    <button
                        class="btn btn-outline-primary btn-sm me-1"
                        type="button"
                        onclick="verDetallePedido(${i})"
                    >
                        Ver detalle
                    </button>

                    <button
                        class="btn btn-outline-success btn-sm"
                        type="button"
                        onclick="abrirModalPedido(${i})"
                    >
                        Gestionar
                    </button>

                </td>


            </tr>

        `;
    }


    /* =====================================================
       SI NO EXISTEN PEDIDOS
       ===================================================== */

    if (pedidos.length === 0) {

        filasHTML = `

            <tr>

                <td
                    colspan="6"
                    class="text-center py-4"
                >

                    <strong>
                        No existen pedidos registrados.
                    </strong>

                </td>

            </tr>

        `;

    }


    listaPedidos.innerHTML =
        filasHTML;

}


/* =========================================================
   ABRIR MODAL
   ========================================================= */

function abrirModalPedido(indice) {

    let pedido =
        pedidos[indice];


    if (!pedido) {

        alert("No se encontró el pedido.");

        return;
    }


    /* Guardamos el índice */

    document.getElementById("indicePedido").value =
        indice;


    /* Número */

    document.getElementById("numeroPedido").value =
        "#" + pedido.codigo;


    /* Cliente */

    document.getElementById("clientePedido").value =
        pedido.cliente.nombre +
        " " +
        pedido.cliente.apellidos;


    /* Total */

    document.getElementById("totalPedido").value =
        formatearMoneda(pedido.total);


    /* Estado actual */

    document.getElementById("estadoPedido").value =
        pedido.estado;


    /* Mostrar modal */

    let modal =
        new bootstrap.Modal(
            document.getElementById("modalPedido")
        );

    modal.show();

}


/* =========================================================
   ACTUALIZAR ESTADO
   ========================================================= */

function actualizarEstadoPedido() {

    let indice =
        parseInt(
            document.getElementById("indicePedido").value
        );


    let nuevoEstado =
        document.getElementById("estadoPedido").value;


    if (
        nuevoEstado !== "En preparación" &&
        nuevoEstado !== "Despachado" &&
        nuevoEstado !== "Entregado"
    ) {

        alert("El estado seleccionado no es válido.");

        return;
    }


    if (!pedidos[indice]) {

        alert("No se encontró el pedido.");

        return;
    }


    /* Actualizar estado */

    pedidos[indice].estado =
        nuevoEstado;


    /* Guardar nuevamente */

    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );


    /* Actualizar tabla */

    dibujarTabla();


    /* Cerrar modal */

    let modal =
        bootstrap.Modal.getInstance(
            document.getElementById("modalPedido")
        );

    modal.hide();


    alert(
        "El estado del pedido #" +
        pedidos[indice].codigo +
        " fue actualizado correctamente."
    );

}


/* =========================================================
   CARGAR TABLA AL ABRIR
   ========================================================= */

dibujarTabla();

function verDetallePedido(indice) {

    let pedido = pedidos[indice];

    if (!pedido) {
        alert("No se encontró el pedido.");
        return;
    }

    localStorage.setItem(
        "pedidoSeleccionado",
        JSON.stringify(pedido)
    );

    window.location.href =
        "detalle-pedido-admin.html";
}