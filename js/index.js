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
            document.getElementById('welcome').innerText = `Welcome ${account.name}`;
        }
    })
}

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value; 
    event.preventDefault()
    const response = await fetch(userAPI);

    //store data in json
    let data = await response.json();
    let accounts = [];
    accounts= data.data;
    accounts.forEach(account => {
        if (account.email === email && account.password === password){
            sessionStorage.setItem('currentID', account.id);
            window.location = '/pages/homeScreen.html';
        }
    });
}

function logout() {
    sessionStorage.removeItem("currentID");
    window.location = '../index.html'
}