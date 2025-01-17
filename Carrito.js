const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);
btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.container-items');// Lista de todos los contenedores de productos
let allProducts = [];// Variable de arreglos de Productos
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');
productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement;
		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h2').textContent,
			price: product.querySelector('p').textContent,
		};
		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);
		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}
		showHTML();
	}
});
rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;
		allProducts = allProducts.filter(
			product => product.title !== title
		);
		console.log(allProducts);
		showHTML();
	}
});
const showHTML = () => {// Funcion para mostrar  HTML
	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}
	// Limpiar HTML
	rowProduct.innerHTML = '';
	let total = 0;
	let totalOfProducts = 0;
	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');
		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;
		rowProduct.append(containerProduct);
		total = total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});
	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
    const finalizePurchaseButton = document.getElementById('finalize-purchase');
    finalizePurchaseButton.addEventListener('click', () => {
    if (!allProducts.length) {// Verificar si el carrito está vacío
        alert('Tu carrito está vacío. Por favor, agrega productos para continuar.');
        return;
    }
    let mensaje = "Gracias por tu compra. Has seleccionado:\n";
    let total = 0; // Inicializar el total
    allProducts.forEach(producto => {
        mensaje += `- ${producto.quantity}x ${producto.title} (${producto.price})\n`;
        total += parseInt(producto.quantity * producto.price.slice(1)); // Acumular el total
    });
    mensaje += `\nTotal: $${total}`;
    mensaje += `\nPronto recibirás un correo electrónico con los detalles de tu pedido.`;
    // Mostrar el mensaje de confirmación
    if (confirm(mensaje)) {
        alert('¡Tu compra se ha realizado con éxito!');
        localStorage.removeItem('carrito');
        allProducts = [];
        showHTML();
    }
});
}