const userAPI = "http://127.0.0.1:3001/users";

/**
 * Register a new user
 * @returns Response in JSON format
 */
async function register() {
    if (formValidation()) {
        displayLoading();

        // Retrieve data from Users
        const response = await fetchData(userAPI + '/register');

        // Place to put the server-side validation errors
        const serverDiv = document.querySelector("#serverDiv");

        if(response === "The account has been created.") {
            serverDiv.innerHTML = 
            `<h5>${response}</h5>` +
            `<h5>Please check your email for a confirmation link.`
        }
        hideLoading()
    };
};

/**
 * Log in to an existing account
 * @returns Response in JSON format
 */
async function login() {
    if (formValidation()) {
        displayLoading();

        // Retrieve data from Users
        const response = await fetchData(userAPI + '/login');

        // Place to put the server-side validation errors
        const serverDiv = document.querySelector("#serverDiv");

        // If user exists, an object is returned
        // Store said object in session storage and move to the next page
        if (typeof (response) === 'object') {
            sessionStorage.setItem('userData', JSON.stringify(response))
            window.location = '../pages/homeScreen.html'

            // Error handling for all other non-object responses
        } else if (response === "Email not confirmed") {
            serverDiv.innerHTML =
                `<h5>Please confirm your email before logging in.</h5>`
        } else if (response === "Invalid login credentials") {
            serverDiv.innerHTML =
                `<h5>These credentials do not match. Are you sure you have typed them correctly?</h5>`
        } else {
            serverDiv.innerHTML =
                `<h5>The server has run into trouble, please try again later.</h5>`
        };
        hideLoading();
    };
};
/**
 * Function to validate all input fields on the client side
 * @returns Boolean
 */
function formValidation() {
    // Form styling
    const forms = document.querySelectorAll('.has-validation');
    forms.forEach(form => {
        event.preventDefault()
        form.classList.add('was-validated');
    });

    // Conditions to check against
    const { email, password } = getFormData()
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
        (email && password) !== null
        && (email && password) !== ""
        && email.match(mailformat) !== null
        && password.length >= 6
    ) {
        return true;
    } return false;
};

/**
 * Function to perform a POST request by supplying an email and password.
 * @param {*} url The API URL to fetch the data from
 * @returns Promise
 */
async function fetchData(url) {
    try {
        const { email, password } = getFormData()
        const response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                'email': email,
                'password': password
            }),
        }).then((response) => response.json());
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

/**
 * Retrieve form data from specified HTML form elements.
 * @returns Object containing email and password, if present.
 */
function getFormData() {
    const email = document.getElementById('emailForm').value;
    const password = document.getElementById('passwordForm').value;
    return { email, password };
};

/**
 * Function to display the loading circle
 */
function displayLoading() {
    const loader = document.querySelector("#loading")
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}

/**
 * Function to hide the loading circle
 */
function hideLoading() {
    const loader = document.querySelector("#loading")
    loader.classList.remove("display")
}