Swal.fire("Bienvenidos a la tienda de Prodsumia-Pc")

const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carritoDeCompras')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioToral = document.getElementById('precioTotal')

const stockDeProductos = [
    {id: 1, nombre: "Mouse REDRAGON M607", cantidad: 1, precio: 1999, img:'./imagenes/Producto-1.png'},
    {id: 2, nombre: "Mouse TRUST GXT 960", cantidad: 1, precio: 2590, img:'./imagenes/Producto-9.png'},
    {id: 3, nombre: "Teclado REDRAGON SHIVA", cantidad: 1, precio: 4090, img:'./imagenes/Producto-7.png'},
    {id: 4, nombre: "Monitor 24 ASUS", cantidad: 1, precio: 36999, img:'./imagenes/Producto-4.jpg'},
    {id: 5, nombre: "Auriculares REDRAGON H220", cantidad: 1, precio: 2845, img:'./imagenes/Producto-6.png'},
    {id: 6, nombre: "Auriculares LOGITECH G G635", cantidad: 1, precio: 15999, img:'./imagenes/Producto-2.jpg'},
    {id: 7, nombre: "Placa d/Video GTX 1660", cantidad: 1, precio: 66999, img:'./imagenes/Producto-8.jpg'},
    {id: 8, nombre: "Placa de Video RX 6900", cantidad: 1, precio: 23999, img:'./imagenes/Producto-11.jpg'},
    {id: 9, nombre: "Disco SSD 2TB M2 XPG", cantidad: 1, precio: 37999, img:'./imagenes/Producto-5.png'},
    {id: 10, nombre: "Disco SSD 240GB M2", cantidad: 1, precio: 4899, img:'./imagenes/Producto-10.jpg'},
    {id: 11, nombre: "Microfono HYPERX", cantidad: 1, precio: 17490, img:'./imagenes/Producto-12.jpg'},
]

stockDeProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <div class="card cardTienda" style="width: 18rem; margin: 5px;">
        <img src=${producto.img} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">$${producto.precio}</p>
            <button id="agregar${producto.id}" class="buttonAgregar">Agregar al Carrito</button>
        </div>
    </div>
    `

    let btn = document.querySelector('.btn')

    btn.addEventListener('click', () => {
        Swal.fire({
            title: 'El Carrito se vacio con exito',
            position: 'top-end',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
    })

    const contenido = document.querySelector('.contenido')
    
    contenido.addEventListener('click', () => {
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Producto agregado al Carrito',
            showConfirmButton: false,
            timer: 1500
          })
    })

    contenedorProductos.appendChild(div)

    const boton = document.getElementById (`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})

let carrito = []

document.addEventListener('DOMContenetLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

const agregarAlCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId)

    if (existe){
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    }else {
    const item = stockDeProductos.find((prod) => prod.id === prodId)
    carrito.push(item)
    }
    actualizarCarrito()
}
const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>$${prod.precio}</p>
        <p>Cantidad : <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick = "eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="bi-trash3"></i></button>
        `
        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    contadorCarrito.innerText = carrito.length
    precioToral.innerText = carrito.reduce((acc, prod) => acc + prod.precio*prod.cantidad, 0)
}

const eliminarDelCarrito = (prodId) => {
    const item =carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
}

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})