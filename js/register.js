const userAPI = "http://127.0.0.1:3001/users";

async function register() {
    const name = document.getElementById('validationName').value;
    const email = document.getElementById('validationEmail').value;
    const password = document.getElementById('validationPassword').value; 
    event.preventDefault();
    const response = await fetch(`http://127.0.0.1:3001/users?username=${name}&email=${email}&password=${password}`, {
        method: 'POST'
    });

    window.location = '../../index.html';
    
    return response
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.has-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()