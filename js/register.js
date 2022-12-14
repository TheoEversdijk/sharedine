const userAPI = "http://127.0.0.1:3001/users";

async function register() {
    const name = document.getElementById('validationName').value;
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
            'name': name,
            'email': email,
            'password': password
        }),
    },
    ).then((response) => response.json());

    if (response === "The account has been created.") {
        // TODO: Send the user to a page to verify their email
        window.location = '../../index.html';
    } else {
        // TODO: Send the user the error message
        console.log(response)
    };
};
