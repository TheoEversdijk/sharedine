const userAPI = "http://127.0.0.1:3001/users";

/**
 * Register a new user
 * @returns Response in JSON format
 */
async function register() {

  // Validate input
  formValidation();
  if (document.querySelector('#emailForm').checkValidity()
    && document.querySelector('#passwordForm').checkValidity()) {

    // Send request
    displayLoading();
    const response = await fetchData(userAPI + '/register');

    // Server-side validation responses
    const serverDiv = document.querySelector("#serverDiv");
    if (response === "The account has been created.") {
      serverDiv.innerHTML =
        `<h5>${response}</h5>` +
        `<h5>Please check your email for a confirmation link.`;
    } else if ((response === "Unable to validate email address: invalid format") || (response === "Password should be at least 6 characters")) {
      serverDiv.innerHTML =
        `<h5>${response}.</h5>`;
    } else {
      serverDiv.innerHTML =
        `<h5>The server has run into trouble, please try again later.</h5>`;
    };
    hideLoading();
  };
};


/**
 * Log in to an existing account
 * @returns Response in JSON format
 */
async function login() {
  // Validate input
  formValidation();
  if (document.querySelector('#emailForm').checkValidity()
    && document.querySelector('#passwordForm').checkValidity()) {

    // Send request
    displayLoading();
    const response = await fetchData(userAPI + '/login');

    // Server-side validation responses
    const serverDiv = document.querySelector("#serverDiv");
    // If user exists, an object is returned
    // Store said object in session storage and move to the next page
    if (typeof (response) === 'object' && JSON.stringify(response).length !== 2) {
      sessionStorage.setItem('userData', JSON.stringify(response));
      window.location = '../pages/homeScreen.html'

      // Error handling for all other non-object responses
    } else if (response === "Email not confirmed") {
      serverDiv.innerHTML =
        `<h5>Please confirm your email before logging in.</h5>`;
    } else if (response === "Invalid login credentials") {
      serverDiv.innerHTML =
        `<h5>These credentials do not match. Are you sure you have typed them correctly?</h5>`;
    } else {
      serverDiv.innerHTML =
        `<h5>The server has run into trouble, please try again later.</h5>`;
    };
    hideLoading();
  };
};

async function verify() {
  // Validate input
  formValidation();
  if (document.querySelector('#userForm').checkValidity()
    && document.querySelector('#avatarForm').checkValidity()) {

    // Send request
    displayLoading();
    const data = sessionStorage.getItem('userData');
    const object = JSON.parse(data);
    const id = object.user.id;
    const username = document.querySelector('#userForm').value;
    const avatar = document.querySelector('#avatarForm').value;
    const response = await fetch(userAPI + '/verify', {
      signal: timeOut(10).signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        'id': id,
        'username': username,
        'avatar': avatar
      }),
    });
    if (response.status === 200) {
      window.location = '../homeScreen.html'
    } else {
      serverDiv.innerHTML =
        `<h5>The server has run into trouble, please try again later.</h5>`;
    };
  };
};


/**
 * Validates all input fields on the client side
 * @returns Boolean
 */
function formValidation() {
  // Form styling
  const forms = document.querySelectorAll('.has-validation');
  forms.forEach(form => {
    event.preventDefault();
    form.classList.add('was-validated');
  });
};

/**
 * Performs a POST request by supplying an email and password.
 * @param {*} url The API URL to fetch the data from
 * @returns Promise
 */
async function fetchData(url) {
  try {
    const { email, password } = getFormData();
    const response = await fetch(url, {
      signal: timeOut(10).signal,
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
  };
};

/**
 * Sets a timeout on a fetch request
 * @param {Number} time 
 * @returns Abort
 */
const timeOut = (time) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), time * 1000);
  return controller;
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
 * Display the loading circle and hide the button
 */
function displayLoading() {
  const loader = document.querySelector("#loader");
  const fetchButton = document.querySelector("#fetchButton");
  loader.classList.add("displayLoader");
  fetchButton.classList.add("displayButton");
}

/**
 * Hide the loading circle and display the button
 */
function hideLoading() {
  const loader = document.querySelector("#loader");
  const fetchButton = document.querySelector("#fetchButton");
  loader.classList.remove("displayLoader");
  fetchButton.classList.remove("displayButton");
}

/**
 * Verify that the user is logged in
 */
function checkLoggedIn() {
  if (!sessionStorage.userData) {
    window.location = '../index.html';
  };
};

/**
 * Checks if the user already has an ongoing session
 */
function checkUserData() {
  if (sessionStorage.userData) {
    window.location = './pages/homeScreen.html'
  };
};

/**
 * Removes user data from the session storage
 */
function logout() {
  sessionStorage.removeItem("userData");
  window.location = '../index.html';
};

/**
 * Checks whether the logged in user has verified their account and username
 * @returns Promise
 * @author Jesper Bertijn
 */
async function checkVerified() {
  try {
    const object = JSON.parse(sessionStorage.userData)
    const id = object.user.id
    const response = await fetch(userAPI + '/checkValidated', {
      signal: timeOut(10).signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        'id': id
      }),
    }).then((response) => response.json());
    if (JSON.stringify(response).length > 5) {
      window.location = './login/verify.html'
    };
  } catch (error) {
    console.log(error);
    return error;
  };
};
