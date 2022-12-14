const userAPI = "http://127.0.0.1:3001/users";

function init() {
    if (sessionStorage.currentID) {
        window.location = '/pages/homeScreen.html';
    }
}

async function checkLoggedIn() {
    if (!sessionStorage.currentID) {
        window.location = '/index.html';
    }
}

async function account() {
    const response = await fetch(userAPI);
    let data = await response.json();
    let accounts = data.data;
    accounts.forEach(account => {
        if (account.id == sessionStorage.currentID) {
            document.getElementById('welcome').innerText = `Welcome, ${account.name}`;
        }
    })
}

async function login() {
    if(validation()) {
        const email = document.getElementById('validationEmail').value;
        const password = document.getElementById('validationPassword').value; 
        event.preventDefault()
        const messagebox = document.getElementById('message');
        const response = await fetch(userAPI + `/login?email=${email}&password=${password}`, {
            method: 'GET'
        });
        let login = await response.json();
        if (login.id) {
            sessionStorage.setItem('currentID', login.id);
            window.location = '../pages/homeScreen.html';
        } else {
            message.innerHTML = login.message;
            message.style.color = 'red'
            messagebox.append(message);
        }
    };
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
function validation() {
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

function logout() {
    sessionStorage.removeItem("currentID");
    window.location = '../index.html'
}