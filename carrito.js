// Recuperamos el carrito guardado

let carrito = JSON.parse(
    localStorage.getItem("carrito")
);


// Si no existe un carrito, creamos uno vacío

if (!carrito) {
    carrito = [];
}


// Contenedor donde mostraremos los productos

let listaCarrito = document.getElementById("listaCarrito");


// ======================================================
// VALIDAR STOCK
// ======================================================

// Recorremos el carrito para comprobar que ninguna
// cantidad supere el stock disponible

for (let i = 0; i < carrito.length; i++) {

    // Buscamos el producto correspondiente

    let producto;

    for (let j = 0; j < productos.length; j++) {

        if (productos[j].codigo === carrito[i].codigo) {
            producto = productos[j];
        }

    }


    // Si encontramos el producto, comprobamos el stock

    if (producto) {

        // Si la cantidad guardada supera el stock,
        // la corregimos al máximo disponible

        if (carrito[i].cantidad > producto.stock) {

            carrito[i].cantidad = producto.stock;

        }

    }

}


// Guardamos el carrito corregido

localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
);


// ======================================================
// MOSTRAR CARRITO
// ======================================================

function mostrarCarrito() {

    // Limpiamos el contenedor antes de volver a mostrarlo

    listaCarrito.innerHTML = "";


    // Total de todos los productos

    let subtotalProductos = 0;


    // Recorremos los productos del carrito

    for (let i = 0; i < carrito.length; i++) {

        let codigo = carrito[i].codigo;
        let cantidad = carrito[i].cantidad;


        // Buscamos los datos completos del producto

        let producto;

        for (let j = 0; j < productos.length; j++) {

            if (productos[j].codigo === codigo) {
                producto = productos[j];
            }

        }


        // Si el producto no existe en productos.js,
        // lo eliminamos del carrito

        if (!producto) {

            carrito.splice(i, 1);

            i--;

            continue;

        }


        // Calculamos el subtotal de este producto

        let subtotalProducto =
            producto.precio * cantidad;


        // Lo sumamos al subtotal general

        subtotalProductos += subtotalProducto;


        // Mostramos el producto

        listaCarrito.innerHTML += `

            <div class="cart-item">

                <div class="row align-items-center g-3">

                    <div class="col-4 col-sm-3 col-md-2">

                        <img
                            src="${producto.imagen}"
                            alt="${producto.nombre}"
                            class="img-fluid rounded cart-product-image"
                        >

                    </div>


                    <div class="col-8 col-sm-9 col-md-4">

                        <h3 class="h6 fw-bold mb-1">
                            ${producto.nombre}
                        </h3>

                        <p class="text-muted small mb-1">
                            ${producto.categoria}
                        </p>

                        <span class="fw-semibold">
                            $${producto.precio.toLocaleString("es-CL")}
                        </span>

                    </div>


                    <div class="col-6 col-md-3">

                        <label class="form-label small fw-semibold mb-1">
                            Cantidad
                        </label>

                        <div class="input-group input-group-sm">

                            <button
                                class="btn btn-outline-secondary botonMenos"
                                type="button"
                                data-indice="${i}">
                                −
                            </button>


                            <input
                                type="number"
                                class="form-control text-center inputCantidad"
                                value="${cantidad}"
                                min="1"
                                max="${producto.stock}"
                                data-indice="${i}"
                            >


                            <button
                                class="btn btn-outline-secondary botonMas"
                                type="button"
                                data-indice="${i}">
                                +
                            </button>

                        </div>

                    </div>


                    <div class="col-4 col-md-2 text-md-end">

                        <span class="d-block small text-muted">
                            Subtotal
                        </span>

                        <span class="fw-bold">
                            $${subtotalProducto.toLocaleString("es-CL")}
                        </span>

                    </div>


                    <div class="col-2 col-md-1 text-end">

                        <button
                            type="button"
                            class="btn btn-outline-danger btn-sm botonEliminar"
                            title="Eliminar producto"
                            aria-label="Eliminar producto"
                            data-indice="${i}">

                            <i class="bi bi-trash"></i>

                        </button>

                    </div>

                </div>

            </div>

            <hr>

        `;
    }


    // ==================================================
    // IVA Y TOTAL
    // ==================================================

    let iva = Math.round(
        subtotalProductos * 19 / 119
    );


    // El precio ya incluye IVA

    let total = subtotalProductos;


    // Mostramos los valores en el resumen

    document.getElementById("subtotalProductos").textContent =
        "$" + subtotalProductos.toLocaleString("es-CL");


    document.getElementById("iva").textContent =
        "$" + iva.toLocaleString("es-CL");


    document.getElementById("total").textContent =
        "$" + total.toLocaleString("es-CL");


    // Guardamos cualquier cambio realizado

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );


    // Activamos los botones

    activarBotones();

}


// ======================================================
// BOTONES DEL CARRITO
// ======================================================

function activarBotones() {


    // BOTONES -

    let botonesMenos =
        document.querySelectorAll(".botonMenos");


    for (let i = 0; i < botonesMenos.length; i++) {

        botonesMenos[i].addEventListener(
            "click",
            function() {

                let indice =
                    parseInt(this.dataset.indice);


                // Solo disminuimos si la cantidad
                // es mayor que 1

                if (carrito[indice].cantidad > 1) {

                    carrito[indice].cantidad--;

                    mostrarCarrito();

                }

            }
        );

    }


    // BOTONES +

    let botonesMas =
        document.querySelectorAll(".botonMas");


    for (let i = 0; i < botonesMas.length; i++) {

        botonesMas[i].addEventListener(
            "click",
            function() {

                let indice =
                    parseInt(this.dataset.indice);


                // Buscamos el producto

                let producto;

                for (let j = 0; j < productos.length; j++) {

                    if (
                        productos[j].codigo ===
                        carrito[indice].codigo
                    ) {

                        producto = productos[j];

                    }

                }


                // Comprobamos el stock

                if (
                    carrito[indice].cantidad <
                    producto.stock
                ) {

                    carrito[indice].cantidad++;

                    mostrarCarrito();

                } else {

                    alert(
                        "No puedes agregar más unidades. " +
                        "Stock disponible: " +
                        producto.stock
                    );

                }

            }
        );

    }


    // INPUT DE CANTIDAD

    let inputsCantidad =
        document.querySelectorAll(".inputCantidad");


    for (let i = 0; i < inputsCantidad.length; i++) {

        inputsCantidad[i].addEventListener(
            "change",
            function() {

                let indice =
                    parseInt(this.dataset.indice);


                // Convertimos el valor ingresado
                // en número

                let nuevaCantidad =
                    parseInt(this.value);


                // Buscamos el producto

                let producto;

                for (let j = 0; j < productos.length; j++) {

                    if (
                        productos[j].codigo ===
                        carrito[indice].codigo
                    ) {

                        producto = productos[j];

                    }

                }


                // Si el valor no es válido,
                // volvemos a la cantidad anterior

                if (
                    isNaN(nuevaCantidad) ||
                    nuevaCantidad < 1
                ) {

                    nuevaCantidad = 1;

                }


                // Si supera el stock,
                // usamos el stock máximo

                if (
                    nuevaCantidad >
                    producto.stock
                ) {

                    alert(
                        "El stock máximo disponible es de " +
                        producto.stock
                    );

                    nuevaCantidad =
                        producto.stock;

                }


                // Actualizamos la cantidad

                carrito[indice].cantidad =
                    nuevaCantidad;


                // Volvemos a mostrar el carrito

                mostrarCarrito();

            }
        );

    }


    // BOTONES ELIMINAR

    let botonesEliminar =
        document.querySelectorAll(".botonEliminar");


    for (let i = 0; i < botonesEliminar.length; i++) {

        botonesEliminar[i].addEventListener(
            "click",
            function() {

                let indice =
                    parseInt(this.dataset.indice);


                // Eliminamos el producto del arreglo

                carrito.splice(indice, 1);


                // Volvemos a mostrar el carrito

                mostrarCarrito();

            }
        );

    }

}


// ======================================================
// MOSTRAR EL CARRITO AL CARGAR LA PÁGINA
// ======================================================

mostrarCarrito();