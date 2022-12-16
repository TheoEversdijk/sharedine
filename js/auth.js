const userAPI = "http://127.0.0.1:3001/users";

const email = document.getElementById('validationEmail').value;
const password = document.getElementById('validationPassword').value;

async function register() {
    if (registerValidation()) {
        // TODO: Show the user it is registering
        // TODO: Disable the submit button after click
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
            // TODO: Send the user the error message
            console.log(response)
        };
    };
};

async function login() {

}

function registerValidation() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.has-validation');
    const email = document.getElementById('validationEmail').value;
    const password = document.getElementById('validationPassword').value; 

    // Loop over them and prevent submission
    forms.forEach(form => {
        if (form.value == null || form.value == "") {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated');
      });

      if (email !== null && email !== "" && password !== null && password !== "") {
        return true
      }

  };