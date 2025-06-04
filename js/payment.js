document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('confirm-order-btn').addEventListener('click', function (event) {
        event.preventDefault();

        let isValid = true;

        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('input').forEach(el => el.classList.remove('input-error'));

        const name = document.getElementById('card-name').value.trim();
        const number = document.getElementById('card-number').value.trim();
        const expiry = document.getElementById('expiry').value.trim();
        const cvv = document.getElementById('cvv').value.trim();
        const paymentSelected = document.querySelector('input[name="payment-method"]:checked');
        const nameRegex = /^[A-Za-z\s]+$/;


        if (!paymentSelected) {
            document.getElementById('error-payment-method').textContent = 'Please select a payment method.';
            isValid = false;
        } else {
            document.getElementById('error-payment-method').textContent = '';
        }
        
        if (name === '') {
            document.getElementById('error-card-name').textContent = 'Name on card is required.';
            document.getElementById('card-name').classList.add('input-error');
            isValid = false;
        } else if (!nameRegex.test(name)) {
            document.getElementById('error-card-name').textContent = 'Name must contain letters only.';
            document.getElementById('card-name').classList.add('input-error');
            isValid = false;
        } else {
            document.getElementById('error-card-name').textContent = '';
            document.getElementById('card-name').classList.remove('input-error');
        }

        if (number.length !== 16 || isNaN(number)) {
            document.getElementById('error-card-number').textContent = 'Card number must be 16 digits.';
            document.getElementById('card-number').classList.add('input-error');
            isValid = false;
        }

        if (expiry === '') {
            document.getElementById('error-expiry').textContent = 'Expiry date is required.';
            document.getElementById('expiry').classList.add('input-error');
            isValid = false;
        }

        if (cvv.length !== 3 || isNaN(cvv)) {
            document.getElementById('error-cvv').textContent = 'CVV must be 3 digits.';
            document.getElementById('cvv').classList.add('input-error');
            isValid = false;
        }

        // If everything is valid then lets go to confirmation page
        if (isValid) {
            window.location.href = 'confirmation.html';
        }
    });
});
