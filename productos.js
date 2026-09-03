let productos = [

    {
        codigo: "BA002",
        nombre: "Bajo Eléctrico Jazz Bass",
        categoria: "Bajos Eléctricos",
        marca: "Fender",
        modelo: "Player Jazz",
        precio: 699990,
        stock: 2,
        imagen: "imagenes/tarjetas/Bajo Fender Player Jazz.jpg",
        descripcion: "Alder body, 2 Alnico V Jazz single-coil."
    },


    {
        codigo: "GA001",
        nombre: "Guitarra Acústica Folk",
        categoria: "Guitarras Acústicas",
        marca: "Yamaha",
        modelo: "F310",
        precio: 129990,
        stock: 8,
        imagen: "imagenes/tarjetas/Guitarra Acustica Yamaha F310.webp",
        descripcion: "Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes."
    },

    {
        codigo: "BT003",
        nombre: 'Caja Snare 14"',
        categoria: "Baterías",
        marca: "Pearl",
        modelo: "STE1450",
        precio: 89990,
        stock: 4,
        imagen: "imagenes/tarjetas/Bateria Pearl STE1450.jpeg",
        descripcion: 'Acero, 14x5", 10 tensores.'
    }

];

// Buscamos el div del HTML
let lista = document.getElementById("listaProductos");

// Recorremos el arreglo de productos
for (let i = 0; i < productos.length; i++) {

    lista.innerHTML += `

                    <!-- TARJETA | Columna -->

                    <!-- COL: Este contenedor hara que cada imagen sea una columna individual de la fila -->

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
                                    ${productos[i].marca} | ${productos[i].modelo}
                                </p>

                                <h3 class="card-title">
                                    $${productos[i].precio}
                                </h3>

                                <button
                                class="btn btn-primary"
                                onclick="verDetalle('${productos[i].codigo}')">
                                    Ver detalle
                                </button>

                            </div>

                        </div>

                    </div>

    `;
}

// Función que recibe el id del producto seleccionado
function verDetalle(codigo) {

    let productoSeleccionado;

    // Recorremos el arreglo buscando el producto
    for (let i = 0; i < productos.length; i++) {

        if (productos[i].codigo === codigo) {
            productoSeleccionado = productos[i];
        }
    }

    // Guardamos el producto seleccionado en localStorage
    localStorage.setItem(
        "producto",
        JSON.stringify(productoSeleccionado)
    );

    // Nos dirigimos al segundo HTML
    window.location.href = "detalle-producto.html";
}