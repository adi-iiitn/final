// HTML Elements
const loginToggle = document.getElementById('loginToggle');
const signupToggle = document.getElementById('signupToggle');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginStatusMessage = document.getElementById('loginStatusMessage');
const signupStatusMessage = document.getElementById('signupStatusMessage');
const loader = document.getElementById('loader'); // Loader Element
const googleScriptURL = 'https://script.google.com/macros/s/AKfycbxKLm7UGrBs2wYFpq3-krpAQfGR_2r_b9dchGKoVNOV3H66bwZy_reZy9QvaNc2jhc/exec'; // Replace with your Google Apps Script URL

// Show login form and hide signup form
loginToggle.addEventListener('click', () => {
    loginToggle.classList.add('active');
    signupToggle.classList.remove('active');
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    loginStatusMessage.textContent = '';
    signupStatusMessage.textContent = '';
});

// Show signup form and hide login form
signupToggle.addEventListener('click', () => {
    signupToggle.classList.add('active');
    loginToggle.classList.remove('active');
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
    loginStatusMessage.textContent = '';
    signupStatusMessage.textContent = '';
});

// Handle login submission
document.getElementById('loginFormAction').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const data = {
        action: 'login',
        email: email,
        password: password
    };

    // Show loader
    loader.style.display = 'block';

    sendRequest(data, 'login');
});

// Handle signup submission
document.getElementById('signupFormAction').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    const data = {
        action: 'signup',
        email: email,
        password: password
    };

    // Show loader
    loader.style.display = 'block';

    sendRequest(data, 'signup');
});

// Function to send request to Google Apps Script
function sendRequest(data, action) {
    const statusMessageElement = action === 'login' ? loginStatusMessage : signupStatusMessage;

    fetch(googleScriptURL, {
        method: 'POST',
        body: new URLSearchParams(data)
    })
    .then(response => response.text())
    .then(responseText => {
        // Hide loader
        loader.style.display = 'none';

        statusMessageElement.textContent = responseText;
        if (responseText.includes('successful')) {
            window.location.href = 'finalpage2.html'; // Redirect to page2 on success
        }
    })
    .catch(error => {
        // Hide loader
        loader.style.display = 'none';

        statusMessageElement.textContent = 'An error occurred: ' + error;
    });
}
