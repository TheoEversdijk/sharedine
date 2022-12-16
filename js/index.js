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

function logout() {
    sessionStorage.removeItem("currentID");
    window.location = '../index.html'
}