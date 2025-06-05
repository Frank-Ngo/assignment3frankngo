function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let countElement = document.getElementById('cart-count');

    if (cart.length === 0) {
        countElement.style.display = 'none';  
    } else {
        countElement.style.display = 'inline-block';  
        countElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        alert(`${product.name} is already in your cart!`);
    } else {
        product.quantity = 1; 
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} added to cart!`);
    }
}

document.addEventListener('DOMContentLoaded', updateCartCount);
