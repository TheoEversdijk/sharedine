const userAPI = "http://127.0.0.1:3001/users";

/**
 * Function to send an API request to the Users microservice
 * @author Jesper Bertijn
 */
async function register() {
    if (registerValidation()) {
        const email = document.getElementById('validationEmail').value;
        const password = document.getElementById('validationPassword').value;
        // TODO: Show the user it is registering
        console.log("Registering...")
        const response = await fetch(userAPI + '/register', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                'email': email,
                'password': password
            }),
        },
        ).then((response) => response.json());

        if (response === "The account has been created.") {
            // TODO: Send the user to a page to verify their email
            window.location = '../../index.html';
        } else {
            console.log(response)
        };
    };
};

/**
 * Function to validate all fields on the client side
 * @returns Boolean
 * @author Jesper Bertijn
 * @author Kevin Wang
 */
function registerValidation() {
    // Variables needed to process
    const forms = document.querySelectorAll('.has-validation');
    const email = document.getElementById('validationEmail').value;
    const password = document.getElementById('validationPassword').value;
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Apply response styling on click
    forms.forEach(form => {
        form.classList.add('was-validated');
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
