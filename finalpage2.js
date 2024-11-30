// Function to handle restaurant search functionality
function searchRestaurant() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const restaurantList = document.getElementById('restaurantList');
    const restaurants = restaurantList.getElementsByClassName('restaurant');

    for (let i = 0; i < restaurants.length; i++) {
        const restaurantName = restaurants[i].getElementsByTagName('h2')[0].textContent.toLowerCase();
        if (restaurantName.indexOf(input) > -1) {
            restaurants[i].style.display = "";
        } else {
            restaurants[i].style.display = "none";
        }
    }
}

// Event Listener for restaurant selection
document.getElementById('restaurantList').addEventListener('click', function(event) {
    if (event.target.closest('.restaurant-card')) {
        const restaurantId = event.target.closest('.restaurant-card').parentElement.getAttribute('data-id');
        // Pass the selected restaurant ID to the next page
        window.location.href = `finalpage3.html?id=${restaurantId}`;
    }
});


