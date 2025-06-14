// toast popup message function
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `show ${type}`;

  // auto-hide after 3 seconds
  setTimeout(() => {
    toast.className = "";
  }, 3000);
}

// keeping that cart count updated
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let countElements = document.querySelectorAll(".cart-count");

  countElements.forEach((countElement) => {
    if (cart.length === 0) {
      countElement.style.display = "none";
    } else {
      countElement.style.display = "inline-block";
      countElement.textContent = cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
    }
  });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    showToast(`${product.name} is already in your cart!`, "error");
  } else {
    product.quantity = 1;
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showToast(`${product.name} added to cart!`, "success");
  }
}

// run update cart count when page loads
document.addEventListener("DOMContentLoaded", updateCartCount);

// setting up the filter buttons
document.addEventListener("DOMContentLoaded", function () {
  const priceFilter = document.getElementById("filter-price");
  const bestSellingFilter = document.getElementById("filter-best-selling");
  const topRatedFilter = document.getElementById("filter-top-rated");

  if (priceFilter) {
    priceFilter.addEventListener("click", sortProductsByPrice);
  }
  if (bestSellingFilter) {
    bestSellingFilter.addEventListener("click", sortProductsByBestSelling);
  }
  if (topRatedFilter) {
    topRatedFilter.addEventListener("click", sortProductsByTopRated);
  }
});

function sortProductsByPrice() {
  const productCards = Array.from(document.querySelectorAll(".product-card"));
  const productSection = document.querySelector(".browse-product-cards");

  productCards.sort((a, b) => {
    const priceA = parseFloat(
      a.querySelector(".product-price").textContent.replace("$", "")
    );
    const priceB = parseFloat(
      b.querySelector(".product-price").textContent.replace("$", "")
    );
    return priceA - priceB;
  });

  // re-render the sorted cards

  productSection.innerHTML = "";
  productCards.forEach((card) => {
    productSection.appendChild(card);
  });
}

function sortProductsByBestSelling() {
  const productCards = Array.from(document.querySelectorAll(".product-card"));
  const productSection = document.querySelector(".browse-product-cards");

  productCards.sort((a, b) => {
    const reviewsA = parseInt(
      a
        .querySelector(".product-rating")
        .textContent.match(/\((\d+) reviews\)/)[1]
    );
    const reviewsB = parseInt(
      b
        .querySelector(".product-rating")
        .textContent.match(/\((\d+) reviews\)/)[1]
    );
    return reviewsB - reviewsA; // descending
  });

  productSection.innerHTML = "";
  productCards.forEach((card) => {
    productSection.appendChild(card);
  });
}

function sortProductsByTopRated() {
  const productCards = Array.from(document.querySelectorAll(".product-card"));
  const productSection = document.querySelector(".browse-product-cards");

  productCards.sort((a, b) => {
    const ratingA = parseFloat(
      a.querySelector(".product-rating").textContent.match(/([\d.]+)\/5/)[1]
    );
    const ratingB = parseFloat(
      b.querySelector(".product-rating").textContent.match(/([\d.]+)\/5/)[1]
    );
    return ratingB - ratingA; // descending
  });

  productSection.innerHTML = "";
  productCards.forEach((card) => {
    productSection.appendChild(card);
  });
}

// basic search filter
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-input");
  const productSection = document.querySelector(".browse-product-cards");

  if (searchInput && productSection) {
    searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.toLowerCase();
      const productCards = document.querySelectorAll(".product-card");

      productCards.forEach((card) => {
        const name = card
          .querySelector(".product-name")
          .textContent.toLowerCase();
        card.style.display = name.includes(searchTerm) ? "" : "none";
      });
    });
  }
});
