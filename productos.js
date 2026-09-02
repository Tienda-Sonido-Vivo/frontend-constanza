let productos = [

    {
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
        nombre: 'Caja Snare 14"',
        categoria: "Baterías",
        marca: "Pearl",
        modelo: "STE1450",
        precio: 89990,
        stock: 4,
        imagen: "imagenes/tarjetas/Bateria Pearl STE1450.jpeg",
        descripcion: 'Acero, 14x5", 10 tensores.'
    },

    {
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
        nombre: 'Caja Snare 14"',
        categoria: "Baterías",
        marca: "Pearl",
        modelo: "STE1450",
        precio: 89990,
        stock: 4,
        imagen: "imagenes/tarjetas/Bateria Pearl STE1450.jpeg",
        descripcion: 'Acero, 14x5", 10 tensores.'
    },

];

// Buscamos el div del HTML
let lista = document.getElementById("listaProductos");

// Recorremos el arreglo de productos
for (let i = 0; i < productos.length; i++) {

    lista.innerHTML += `

                    <!-- TARJETA N°n : Primera columna -->

                    <!-- COL: Este contenedor hara que cada imagen sea una columna individual de la fila -->

                    <div class="col-12 col-md-6 col-xl-4">

                        <div class="card h-100 w-100">

                            <a href="bajoFenderPlayerJazz.html">

                                <img
                                    src="${productos[i].imagen}"
                                    class="card-img-top"
                                    alt="producto"
                                >

                            </a>

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

                                <a
                                    href="bajoFenderPlayerJazz.html"
                                    class="btn btn-primary"
                                >
                                    Ver más
                                </a>

                            </div>

                        </div>

                    </div>

    `;
}