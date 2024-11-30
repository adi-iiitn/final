// Initialize cart as an object to hold product IDs and quantities
let cart = {};

// Mock restaurant data (this could come from your server)
const restaurantId = new URLSearchParams(window.location.search).get('id');
const foodData = {
    1: [
        { id: 101, name: 'Margherita Pizza', price: 200, image: 'images/pizza1.jpg' },
        { id: 102, name: 'Veg Pizza', price: 250, image: 'images/pizza2.jpg' },
        { id: 103, name: 'Cheese Burger', price: 150, image: 'images/burger1.jpg' },
        { id: 104, name: 'Vegan Burger', price: 200, image: 'images/burger2.jpg' },
        { id: 105, name: 'Pasta', price: 180, image: 'images/pasta.jpg' }
    ],
    2: [
        { id: 201, name: 'Sushi Roll', price: 350, image: 'images/sushi1.jpg' },
        { id: 202, name: 'California Roll', price: 400, image: 'images/sushi2.jpg' },
        { id: 203, name: 'Veg Sashimi', price: 200, image: 'images/sashimi1.jpg' },
        { id: 204, name: 'Spicy Tuna', price: 450, image: 'images/sushi3.jpg' },
        { id: 205, name: 'Salmon Roll', price: 500, image: 'images/sushi4.jpg' }
    ],
    // Add more restaurant data here...
};

// Get menu items based on restaurant ID
const menuItems = foodData[restaurantId];

// Display menu items dynamically
const foodMenuContainer = document.getElementById('food-menu');
menuItems.forEach(item => {
    const foodItemElement = document.createElement('div');
    foodItemElement.classList.add('food-item');
    foodItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p class="price">₹${item.price}</p>
        <button class="add-to-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">
            Add to Cart
        </button>
    `;
    foodMenuContainer.appendChild(foodItemElement);
});

// Handle Add to Cart button click
document.querySelectorAll('.food-item button').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        const productName = this.getAttribute('data-name');
        const productPrice = this.getAttribute('data-price');

        // If product is already in cart, increase quantity
        if (cart[productId]) {
            cart[productId].quantity += 1;
        } else {
            // Otherwise, add new product to cart
            cart[productId] = { name: productName, price: productPrice, quantity: 1 };
        }

        // Update button text to "Added" with quantity
        this.textContent = `Added x${cart[productId].quantity}`;

        // Update cart count in header
        updateCartCount();
    });
});

// Update cart count in header
function updateCartCount() {
    const cartCount = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
}

// Redirect to Cart Page
function redirectToCartPage() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    window.location.href = 'finalpage4.html'; // Redirect to cart page
}

// Search functionality (if you want to add this feature)
function searchMenu() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const foodItems = document.querySelectorAll('.food-item');
    foodItems.forEach(item => {
        const name = item.querySelector('h3').textContent.toLowerCase();
        if (name.includes(query)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}
