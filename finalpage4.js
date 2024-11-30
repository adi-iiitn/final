// Get cart data from localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : {};
}

// Function to render cart items
function renderCartItems() {
    const cartItemsList = document.getElementById('cartItemsList');
    const cart = getCart();
    let totalAmount = 0;

    // Clear any existing cart items
    cartItemsList.innerHTML = '';

    // Loop through cart items and render them
    for (const productId in cart) {
        const item = cart[productId];
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>₹${item.price} x ${item.quantity}</p>
                <p>Total: ₹${itemTotal}</p>
            </div>
        `;
        cartItemsList.appendChild(cartItem);
    }

    // Update the total amount
    document.getElementById('totalAmount').textContent = totalAmount;
    document.getElementById('finalAmount').textContent = totalAmount; // Set initial final amount
}

// Function to apply a coupon
function applyCoupon() {
    const couponCode = document.getElementById('couponCode').value.trim();
    let totalAmount = parseFloat(document.getElementById('totalAmount').textContent);
    let discount = 0;
    let message = ''; // Variable for success or error message
    let messageType = ''; // Success or error message type

    // Check if coupon is valid
    if (couponCode === 'DISCOUNT10') {
        discount = totalAmount * 0.10; // 10% discount
        message = 'Coupon applied successfully! You get a 10% discount.';
        messageType = 'success';
    } else if (couponCode === 'DISCOUNT20') {
        discount = totalAmount * 0.20; // 20% discount
        message = 'Coupon applied successfully! You get a 20% discount.';
        messageType = 'success';
    } else if (couponCode === '') {
        message = 'Please enter a coupon code';
        messageType = 'error';
    } else {
        message = 'Invalid coupon code';
        messageType = 'error';
    }

    const finalAmount = totalAmount - discount;
    document.getElementById('finalAmount').textContent = finalAmount.toFixed(2);

    // Show the message
    const couponMessage = document.getElementById('couponMessage');
    couponMessage.textContent = message;
    couponMessage.className = 'coupon-message ' + messageType;
    couponMessage.style.display = 'block'; // Make message visible
}

// Event listener for apply coupon button
document.getElementById('applyCoupon').addEventListener('click', applyCoupon);

// Proceed to checkout functionality
document.getElementById('checkoutButton').addEventListener('click', function() {
    window.location.href = 'finalpage5.html'; // Assuming you have a checkout page
});

// Initialize the cart page
renderCartItems();
