const userAPI = "http://127.0.0.1:3001/users";
const appointmentAPI = "http://127.0.0.1:3002/appointments";

function init() {
    if (sessionStorage.currentID) {
        window.location = '/pages/homeScreen.html';
    }
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

async function getAppointments() {
    const response = await fetch(appointmentAPI);

    //store data in json
    let data = await response.json();
    const body = document.getElementById('items')
    if (response) {
        data.forEach(data => {
            if (sessionStorage.currentID == data.owner_id){
                let listItem = document.createElement('div');
                listItem.innerHTML = 
                `<div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${data.name}</h5>
                        <p class="card-text">${data.date}</p>
                        <p class="card-text"><small class="text-muted">${data.time}</small></p>
                    </div>
                </div>`
                body.append(listItem);
            }
        });
    }

}

function logout() {
    sessionStorage.removeItem("currentID");
    window.location = '../index.html'
}