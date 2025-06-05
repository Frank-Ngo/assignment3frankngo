function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `show ${type}`;

    // auto-hide after 3 seconds
    setTimeout(() => {
        toast.className = '';
    }, 3000);
}


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
        showToast(`${product.name} is already in your cart!`, 'error');
    } else {
        product.quantity = 1;
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showToast(`${product.name} added to cart!`, 'success');
    }
}

document.addEventListener('DOMContentLoaded', updateCartCount);

document.addEventListener('DOMContentLoaded', function() {
    const priceFilter = document.getElementById('filter-price');
    const bestSellingFilter = document.getElementById('filter-best-selling');
    const topRatedFilter = document.getElementById('filter-top-rated');

    if (priceFilter) {
        priceFilter.addEventListener('click', sortProductsByPrice);
    }
    if (bestSellingFilter) {
        bestSellingFilter.addEventListener('click', sortProductsByBestSelling);
    }
    if (topRatedFilter) {
        topRatedFilter.addEventListener('click', sortProductsByTopRated);
    }
});

function sortProductsByPrice() {
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    const productSection = document.querySelector('.product-cards');

    productCards.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
        const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
        return priceA - priceB;
    });

    productSection.innerHTML = '';
    productCards.forEach(card => {
        productSection.appendChild(card);
    });
}

function sortProductsByBestSelling() {
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    const productSection = document.querySelector('.product-cards');

    productCards.sort((a, b) => {
        const reviewsA = parseInt(a.querySelector('.product-rating').textContent.match(/\((\d+) reviews\)/)[1]);
        const reviewsB = parseInt(b.querySelector('.product-rating').textContent.match(/\((\d+) reviews\)/)[1]);
        return reviewsB - reviewsA; // descending
    });

    productSection.innerHTML = '';
    productCards.forEach(card => {
        productSection.appendChild(card);
    });
}

function sortProductsByTopRated() {
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    const productSection = document.querySelector('.product-cards');

    productCards.sort((a, b) => {
        const ratingA = parseFloat(a.querySelector('.product-rating').textContent.match(/([\d.]+)\/5/)[1]);
        const ratingB = parseFloat(b.querySelector('.product-rating').textContent.match(/([\d.]+)\/5/)[1]);
        return ratingB - ratingA; // descending
    });

    productSection.innerHTML = '';
    productCards.forEach(card => {
        productSection.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const productSection = document.querySelector('.product-cards');

    if (searchInput && productSection) {
        searchInput.addEventListener('input', function() {
            const searchTerm = searchInput.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');

            productCards.forEach(card => {
                const name = card.querySelector('.product-name').textContent.toLowerCase();
                card.style.display = name.includes(searchTerm) ? '' : 'none';
            });
        });
    }
});

