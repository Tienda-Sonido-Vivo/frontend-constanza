// =========================================================
// OBTENER CATEGORÍA DESDE LA URL
// =========================================================

let parametros =
    new URLSearchParams(window.location.search);

let categoriaSeleccionada =
    parametros.get("categoria");


// =========================================================
// CONTENEDOR DE PRODUCTOS
// =========================================================

let listaCatalogo =
    document.getElementById("listaCatalogo");


// =========================================================
// MOSTRAR PRODUCTOS
// =========================================================

let productosEncontrados = 0;

for (let i = 0; i < productos.length; i++) {

    if (
        !categoriaSeleccionada ||
        productos[i].categoria === categoriaSeleccionada
    ) {

        listaCatalogo.innerHTML += `

            <div class="col-12 col-md-6 col-xl-4">

                <div class="card h-100 w-100">

                    <img
                        src="${productos[i].imagen}"
                        class="card-img-top"
                        alt="producto"
                    >

                    <div class="card-body text-center">

                        <h5 class="card-title">
                            ${productos[i].nombre}
                        </h5>

                        <p class="card-text text-center">
                            ${productos[i].marca} |
                            ${productos[i].modelo}
                        </p>

                        <h3 class="card-title">
                            $${productos[i].precio}
                        </h3>

                        <button
                            class="btn btn-primary"
                            onclick="verDetalle('${productos[i].codigo}')"
                        >
                            Ver detalle
                        </button>

                    </div>

                </div>

            </div>

        `;

        productosEncontrados++;
    }
}


// =========================================================
// SI NO HAY PRODUCTOS
// =========================================================

if (
    categoriaSeleccionada &&
    productosEncontrados === 0
) {

    listaCatalogo.innerHTML = `
        <div class="col-12">

            <div class="alert alert-info text-center">

                <h5 class="fw-bold">
                    No hay productos disponibles
                    en esta categoría.
                </h5>

                <p class="mb-0">
                    Intenta seleccionar otra categoría.
                </p>

            </div>

        </div>
    `;
}


// =========================================================
// CAMBIAR TÍTULO DEL CATÁLOGO
// =========================================================

if (categoriaSeleccionada) {

    document.getElementById("tituloCatalogo").textContent =
        categoriaSeleccionada;

    document.getElementById("descripcionCatalogo").textContent =
        "Productos disponibles en la categoría seleccionada.";

}