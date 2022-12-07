const userAPI = "http://127.0.0.1:3001/users";

async function register() {
    if (validation()) {
        const name = document.getElementById('validationName').value;
        const email = document.getElementById('validationEmail').value;
        const password = document.getElementById('validationPassword').value; 
        const response = await fetch(userAPI + `/register?username=${name}&email=${email}&password=${password}`, {
            method: 'POST'
        });
    
          window.location = '../../index.html';
        
          return response
    }
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
function validation() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.has-validation');
    const name = document.getElementById('validationName').value;
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

      if (name !== null && name !== "" && email !== null && email !== "" && password !== null && password !== "") {
        return true
      }

  };