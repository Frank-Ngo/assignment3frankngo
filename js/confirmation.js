document.addEventListener('DOMContentLoaded', () => {
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    document.getElementById('order-number').textContent = orderNumber;
});
