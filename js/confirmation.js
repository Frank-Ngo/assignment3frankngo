document.addEventListener("DOMContentLoaded", () => {
  // generate random number
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  document.getElementById("order-number").textContent = orderNumber;

  const finalTotal = parseFloat(localStorage.getItem("finalTotal")) || 0;
  const discount = 0;
  const subtotal = finalTotal - 50 + discount;
  const shipping = 50;

  document.getElementById(
    "confirmation-item-total"
  ).textContent = `$${subtotal}`;
  document.getElementById("confirmation-shipping").textContent = `$${shipping}`;
  document.getElementById("confirmation-discount").textContent = `$${discount}`;
  document.getElementById("confirmation-total").textContent = `$${finalTotal}`;

  // display selected payment method
  const paymentMethod = localStorage.getItem("paymentMethod") || "-";
  document.getElementById("confirmation-payment-method").textContent =
    paymentMethod;

  // clears cart
  localStorage.removeItem("cart");
  localStorage.setItem("cartCount", "0");
  updateCartCount();
});
