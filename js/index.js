const userAPI = "http://127.0.0.1:3001/users";
const appointmentAPI = "http://127.0.0.1:3002/appointments";

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value; 
    event.preventDefault()
    const response = await fetch(userAPI);

    //store data in json
    let data = await response.json();
    let accounts = [];
    accounts= data.data;
    if (response) {
        console.log(data)
    }
    accounts.forEach(account => {
        if (account.email === email && account.password === password){
            window.location = '/pages/homeScreen.html';
        }
    });
    if (data.data.includes(email, password)){
        console.log(data.data.includes(email, password))
    }

}

async function getAppointments() {
    const response = await fetch(appointmentAPI);

    //store data in json
    let data = await response.json();
    console.log(data)
    const body = document.getElementById('items')
    if (response) {
        data.forEach(data => {
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
        });
        console.log(data)
    }

}
