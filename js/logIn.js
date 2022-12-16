const userAPI = "http://127.0.0.1:3001/users";
const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

/**
 * Log in to an existing account
 * @returns Response in JSON format
 * @author Jesper Bertijn
 */
async function login() {
    if (loginValidation()) {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        console.log(email, password)

        console.log("Logging in...")
        const response = await fetch(userAPI + '/login', {
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
        console.log(response);
        // TODO: Add error messages
        // TODO: Add redirect
    }
};

/**
 * Function to validate all login fields on the client side
 * @returns Boolean
 * @author Jesper Bertijn
 */
function loginValidation() {
    // Variables needed to process
    const forms = document.querySelectorAll('.has-validation');
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Apply response styling on click
    forms.forEach(form => {
        form.classList.add('was-validated');
        event.preventDefault()
    });

    // Conditions to check against
    if (
        email !== null
        && email !== ""
        && email.match(mailformat) !== null
        && password !== null
        && password !== ""
        && password.length >= 6
    ) {
        return true
    };
};
