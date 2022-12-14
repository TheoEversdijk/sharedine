const userAPI = "http://127.0.0.1:3001/users";

async function register() {
    const name = document.getElementById('validationName').value;
    const email = document.getElementById('validationEmail').value;
    const password = document.getElementById('validationPassword').value;
    console.log("Registering...")
    console.log(email, password)
    const response = await fetch(userAPI + '/register', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        data: {
            'email': email,
            'password': password
        }
    }
    );

    // window.location = '../../index.html';

    return response
};