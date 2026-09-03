
// Recuperamos el producto guardado en localStorage
let producto = JSON.parse(
    localStorage.getItem("producto")
);

// Establecemos que la cantidad seleccionada comenzará con 1
let cantidad = 1;


// Mostramos los datos en la columna principal del HTML

document.getElementById("imagen").src =
    producto.imagen;

document.getElementById("nombre").textContent =
    producto.nombre;

document.getElementById("precio").textContent =
    "Precio: $" + producto.precio;

document.getElementById("descripcion").textContent =
    producto.descripcion;

document.getElementById("marca").textContent =
    producto.marca;

document.getElementById("stock").textContent =
    "Stock: " + producto.stock;

document.getElementById("categoria").textContent =
    producto.categoria;


// Botón +

document.getElementById("botonMas").addEventListener("click", function() {

    if (cantidad < producto.stock) {
        cantidad++;
        document.getElementById("cantidad").textContent = cantidad;
    }

});


// Botón -

document.getElementById("botonMenos").addEventListener("click", function() {

    if (cantidad > 1) {
        cantidad--;
        document.getElementById("cantidad").textContent = cantidad;
    }
});

// Estas ids seran para mostrar los mismos datos
// Pero en el acordenon inferior de la pagina

document.getElementById("descripcionDetalle").textContent =
    producto.descripcion;

document.getElementById("marcaDetalle").textContent =
    producto.marca;

document.getElementById("modeloDetalle").textContent =
    producto.modelo;

document.getElementById("categoriaDetalle").textContent =
    producto.categoria;

document.getElementById("stockDetalle").textContent =
    producto.stock;

// Botón Agregar al carrito

document.getElementById("btnAgregarCarrito").addEventListener("click", function() {

    // Recuperamos el carrito guardado

    let carrito = JSON.parse(
        localStorage.getItem("carrito")
    );

    // Si no existe un carrito, creamos uno vacío

    if (!carrito) {
        carrito = [];
    }


    // Buscamos si el producto ya está en el carrito

    let productoExistente = false;

    for (let i = 0; i < carrito.length; i++) {

        if (carrito[i].codigo === producto.codigo) {

            // Comprobamos si la nueva cantidad supera el stock

            if (carrito[i].cantidad + cantidad > producto.stock) {

                alert(
                    "No puedes agregar más unidades. " +
                    "Stock disponible: " + producto.stock
                );

                return;
            }

            // Si hay stock suficiente, aumentamos la cantidad

            carrito[i].cantidad += cantidad;

            productoExistente = true;

        }

    }


    // Si el producto no estaba en el carrito,
    // comprobamos que la cantidad no supere el stock

    if (!productoExistente) {

        if (cantidad > producto.stock) {

            alert(
                "No puedes agregar esa cantidad. " +
                "Stock disponible: " + producto.stock
            );

            return;
        }

        carrito.push({
            codigo: producto.codigo,
            cantidad: cantidad
        });

    }


    // Guardamos nuevamente el carrito

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );


    // Vamos al carrito

    window.location.href = "carrito.html";

});