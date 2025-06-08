// total var for our cart
let total = 0;

// when the page loads, display Confirm Order button
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("confirm-order-btn")
    .addEventListener("click", function (event) {
      event.preventDefault();

      let isValid = true;

      // clear previous error messages
      document
        .querySelectorAll(".error-message")
        .forEach((el) => (el.textContent = ""));
      document
        .querySelectorAll("input")
        .forEach((el) => el.classList.remove("input-error"));

      const name = document.getElementById("card-name").value.trim();
      const number = document.getElementById("card-number").value.trim();
      const expiry = document.getElementById("expiry").value.trim();
      const cvv = document.getElementById("cvv").value.trim();
      const paymentSelected = document.querySelector(
        'input[name="payment-method"]:checked'
      );
      const nameRegex = /^[A-Za-z\s]+$/;

      // VALIDATIONS
      if (!paymentSelected) {
        document.getElementById("error-payment-method").textContent =
          "Please select a payment method.";
        isValid = false;
      } else {
        document.getElementById("error-payment-method").textContent = "";
      }

      if (name === "") {
        document.getElementById("error-card-name").textContent =
          "Name on card is required.";
        document.getElementById("card-name").classList.add("input-error");
        isValid = false;
      } else if (!nameRegex.test(name)) {
        document.getElementById("error-card-name").textContent =
          "Name must contain letters only.";
        document.getElementById("card-name").classList.add("input-error");
        isValid = false;
      } else {
        document.getElementById("error-card-name").textContent = "";
        document.getElementById("card-name").classList.remove("input-error");
      }

      if (number.length !== 16 || isNaN(number)) {
        document.getElementById("error-card-number").textContent =
          "Card number must be 16 digits.";
        document.getElementById("card-number").classList.add("input-error");
        isValid = false;
      }

      if (expiry === "") {
        document.getElementById("error-expiry").textContent =
          "Expiry date is required.";
        document.getElementById("expiry").classList.add("input-error");
        isValid = false;
      }

      if (cvv.length !== 3 || isNaN(cvv)) {
        document.getElementById("error-cvv").textContent =
          "CVV must be 3 digits.";
        document.getElementById("cvv").classList.add("input-error");
        isValid = false;
      }

      // if everything checks out, let's go
      if (isValid) {
        const selectedPaymentMethod = document.querySelector(
          'input[name="payment-method"]:checked'
        );
        const paymentMethod = selectedPaymentMethod
          ? selectedPaymentMethod.value
          : "Unknown";

        // recalculate total from cart
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let correctTotal = 0;

        cart.forEach((item) => {
          correctTotal += item.price * item.quantity;
        });

        localStorage.setItem("paymentMethod", paymentMethod);
        localStorage.setItem("finalTotal", correctTotal + 50);
        window.location.href = "confirmation.html";
      }
    });
});

// also show cart items when page loads
document.addEventListener("DOMContentLoaded", function () {
  displayPaymentCart();
});

// display items in payment page cart section
function displayPaymentCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let paymentItemsDiv = document.getElementById("payment-items");
  let totalPriceSpan = document.getElementById("checkout-total");

  paymentItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    paymentItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceSpan.textContent = "$0";
    return;
  }

  total = 0;

  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "checkout-item";
    itemDiv.innerHTML = `
            <div class="checkout-item-left">
                <img src="${item.image}" alt="${
      item.name
    }" class="checkout-item-image" />
                <div class="checkout-item-info">
                    <p class="checkout-item-name">${item.name}</p>
                    <p class="cart-item-qty">Qty: ${item.quantity}</p>
                    <div class="checkout-item-price">$${
                      item.price * item.quantity
                    }</div>
                </div>
            </div>
        `;

    paymentItemsDiv.appendChild(itemDiv);

    total += item.price * item.quantity;
  });

  // update total at bottom
  totalPriceSpan.textContent = `$${total + 50}`;
}
