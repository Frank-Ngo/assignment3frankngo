// load and display cart items when page loads
document.addEventListener("DOMContentLoaded", function () {
  displayCartItems();
});

// function to display the cart items on the cart page

function displayCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItemsDiv = document.getElementById("cart-items");
  let itemTotalSpan = document.getElementById("item-total");
  let finalTotalSpan = document.getElementById("final-total");
  let cartCountText = document.querySelector(".cart-items-count");

  // clear existing items
  cartItemsDiv.innerHTML = "";

  // if cart is empty, show message and $0 total
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    itemTotalSpan.textContent = "0";
    finalTotalSpan.textContent = "0";
    cartCountText.textContent = "0 items";
    return;
  }

  // otherwise, render each item
  let total = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";

    // build item HTML
    itemDiv.innerHTML = `
            <div class="cart-item-left">
                <img src="${item.image}" alt="${
      item.name
    }" class="cart-item-image" />
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-qty">Qty: ${item.quantity}</p>
                    <div class="cart-qty-controls">
                        <button class="qty-btn" onclick="changeQuantity(${
                          item.id
                        }, 1)">+</button>
                        <span class="qty-number">${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQuantity(${
                          item.id
                        }, -1)">-</button>
                    </div>
                </div>
            </div>
            <div class="cart-item-price">$${item.price * item.quantity}</div>
        `;

    // add item to DOM
    cartItemsDiv.appendChild(itemDiv);

    total += item.price * item.quantity;
    totalItems += item.quantity;
  });

  itemTotalSpan.textContent = `$${total}`;
  finalTotalSpan.textContent = total;
  cartCountText.textContent = `${totalItems} item${totalItems > 1 ? "s" : ""}`;
}

function changeQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let item = cart.find((item) => item.id === productId);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    // Filter out the item to be removed
    cart = cart.filter((item) => item.id !== productId);
    showToast("Item removed from cart.", "error");
  } else {
    showToast("Cart updated.", "success");
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  // refresh cart display
  updateCartCount();
  displayCartItems();
}
