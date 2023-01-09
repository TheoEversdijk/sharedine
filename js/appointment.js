const appointmentAPI = "http://127.0.0.1:3002/appointments";
const chatAPI = "http://127.0.0.1:3004/chat";
const notificationAPI = "http://127.0.0.1:3005";

async function getPersonalAppointments() {
    const userData = sessionStorage.getItem('userData');
    const userObject = JSON.parse(userData);
    const user_id = userObject.user.id;
    const response = await fetch(appointmentAPI + `/${user_id}`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET',
    });

    //store data in json
    let data = await response.json();
    const body = document.getElementById('items')
    let appointmentsStatus = document.getElementById('homescreenEvents');
    const noContent = document.getElementById('no-content')
    if (response) {
        if (data.length != 0) {
            data.forEach(data => {
                // TODO: make this less janky
                appointmentsStatus.textContent = "You have the following appointments scheduled:";
                noContent.innerHTML = "";

                let listItem = document.createElement('div');
                listItem.innerHTML =
                    `<a href="/pages/appointmentDetails.html" onclick="StoreID(${data.id})" class="no-decoration">
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">${data.name}</h5>
                                <p class="card-text">Date: ${data.date}</p>
                                <p class="card-text">Location: ${data.location}</p>
                                <p class="card-text">Price per portion: €${data.price}</p>
                                <p class="card-text">Members: ${data.members.length}/${data.limit}</p>
                                <p class="card-text"><small class="text-muted">Time: ${data.time}</small></p>
                        </div>
                    </div>
                </a>`
                body.append(listItem);
            });
        }
    }
}

async function getAllAppointments() {
    const userData = sessionStorage.getItem('userData');
    const userObject = JSON.parse(userData);
    const user_id = userObject.user.id;
    const response = await fetch(appointmentAPI);

    //store data in json
    let data = await response.json();
    const body = document.getElementById('items')
    if (response) {
        data.forEach(data => {
            if (data.owner_id !== user_id && !data.members.includes(user_id)) {
                let listItem = document.createElement('div');
                listItem.innerHTML =
                    `<a href="/pages/appointmentDetails.html" onclick="StoreID(${data.id})" class="no-decoration">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">${data.name}</h5>
                                        <p class="card-text">Date: ${data.date}</p>
                                        <p class="card-text">Location: ${data.location}</p>
                                        <p class="card-text">Price per portion: €${data.price}</p>
                                        <p class="card-text">Members: ${data.members.length}/${data.limit}</p>
                                        <p class="card-text"><small class="text-muted">Time: ${data.time}</small></p>
                                </div>
                            </div>
                        </a>`
                body.append(listItem);
            }
        });
    }
}

async function getAppointment() {
    const response = await fetch(appointmentAPI + `/single/${sessionStorage.appointmentID}`);
    let data = await response.json();
    //store data in json
    const userData = sessionStorage.getItem('userData');
    const userObject = JSON.parse(userData);
    const user_id = userObject.user.id;
    let users = await getAllUsers();
    let members = [];
    let owner = await searchUser(data.owner_id);
    data.members.forEach(member => {
        users.forEach(user => {
            if (user.id == member) {
                members.push(user);
            }
        })
    })
    const appointmentName = document.getElementById('appointment-name')
    const body = document.getElementById('information')
    if (response) {
        let listItem = document.createElement('div');
        let listItem2 = document.createElement('div');
        let listItem3 = document.createElement('div');
        let listItem4 = document.createElement('div');
        let title = document.createElement('h1');
        title.textContent = `${data.name}`;

        listItem.innerHTML =
            `  
                <div class="container">
    <div class="row">
        <div class="col-lg-6 col-md-6" id="image">
            <img src="../../resources/images/Foodsel.jpg" alt="f" class="details-image">
        </div>
        <div class="col-lg-6 col-md-6 details-info" id="info">
            <p>Owner: ${owner.username}</p>
            <p>Location: ${data.location}</p>
            <p>Date: ${data.date}</p>
            <p>Time: ${data.time}</p>
            <p>Price: €${data.price}</p>
            </div>`

        if (data.owner_id !== user_id && !data.members.includes(user_id) && data.members.length < data.limit) {
            listItem2.innerHTML =
                `<div class="register-button">
                <a href="#"><button type="button" class="btn btn-info" onclick="appointmentRegister()">Register</button></a>
              </div>`
        }
        if (data.members.length >= data.limit) {
            listItem2.innerHTML =
                `<div class="register-button">
                <p>Room is full.</p>
              </div>`
        }

        if (data.owner_id !== user_id && data.members.includes(user_id)) {
            listItem2.innerHTML =
                `<div class="chat-button">
                <a href="#"><button type="button" class="btn btn-info" onclick="location.href='../pages/chat.html'">Chatroom</button></a>
              </div>`
        }

        if (data.owner_id == user_id) {
            listItem4.innerHTML = `
                <div class="p-2">
                <a class="btn btn-info" href="/pages/editAppointment.html">Edit</a>
              </div>`
            listItem2.innerHTML =
                `<div class="chat-button">
                <a href="#"><button type="button" class="btn btn-info" onclick="location.href='../pages/chat.html'">Chatroom</button></a>
              </div>`
        }

        listItem3.innerHTML =
            `
    </div>
    <div class="row content-row-2">
      <div class="col-lg-6 col-md-6 description">
        <h1>Description</h1>
        <p>${data.information}</p>
      </div>
      <div class="col-lg-6 col-md-6 participants">
        <h1>Participants</h1>
        <ul id="member-list">
        </ul>
      </div>
    </div>
  </div>
                `;
        appointmentName.append(title);
        body.append(listItem, listItem3);
        document.getElementById('info').appendChild(listItem2);
        document.getElementById('header-edit').appendChild(listItem4);
        const list = document.getElementById('member-list')
        members.forEach(member => {
            console.log(member)
            let user = document.createElement('li')
            user.innerHTML = `${member.username}`;
            console.log(user);
            list.append(user);
        })
    }
}

// Register for an appointment
async function appointmentRegister() {
    const userData = sessionStorage.getItem('userData');
    const userObject = JSON.parse(userData);
    const user_id = userObject.user.id;
    const user_email = userObject.user.email;
    const id = sessionStorage.appointmentID;

    // Register memebers for appointments
    const register = await fetch(appointmentAPI + `/${id}/register`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            'member': user_id,
        }),
    });

    // Get chat entry 
    if (register.status !== 304) {
        await fetch(chatAPI + "/register", {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                'appointment_id': id,
                'member': user_id,
            }),
        });
    // Get appointment
    const response = await fetch(appointmentAPI + `/single/${id}`)
    let appointment = await response.json();
    console.log(appointment)

    const response2 = await fetch(`${notificationAPI}/register?email=${email}&appointment=${appointment.name}&date=${appointment.date}&location=${appointment.location}&time=${appointment.time}`, {
        method: 'GET',
      });

    window.location = '/pages/homeScreen.html';
    } else {
        alert("Appointment is full");
        window.location = '/pages/appointments.html';
    }
}


function StoreID(id) {
    sessionStorage.setItem("appointmentID", id);
}

function wipeID() {
    sessionStorage.removeItem("appointmentID");
}

async function addAppointment() {
    if (validation()) {
        const userData = sessionStorage.getItem('userData');
        const userObject = JSON.parse(userData);
        const owner_id = userObject.user.id;
        const meal = document.getElementById('validationMeal').value;
        const date = document.getElementById('validationDate').value;
        const time = document.getElementById('validationTime').value;
        const limit = document.getElementById('validationLimit').value;
        const location = document.getElementById('validationLocation').value;
        let price = document.getElementById('validationPrice').value;
        const info = document.getElementById('validationInfo').value;
        if (price.includes(",")) {
            price = price.replace(",", ".");
        }
        event.preventDefault();

        const response = await fetch(appointmentAPI, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                'owner_id': owner_id,
                'name': meal,
                'date': date,
                'time': time,
                'limit': limit,
                'location': location,
                'price': price,
                'info': info
            }),
        });

        let appointment_id = await response.json();
        console.log(appointment_id);

        const response2 = await fetch(chatAPI, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                'owner_id': owner_id,
                'appointment_id': appointment_id.id,
                'meal': meal,
            }),
        }).then((response) => response.json('Chat Created'));

        window.location = '/pages/homeScreen.html';

        return response
    }
}

async function editAppointment() {
    if (validation()) {
        const userData = sessionStorage.getItem('userData');
        const userObject = JSON.parse(userData);
        const owner_id = userObject.user.id;
        const email = userObject.user.email;
        const id = sessionStorage.appointmentID;
        const meal = document.getElementById('validationMeal').value;
        const date = document.getElementById('validationDate').value;
        const time = document.getElementById('validationTime').value;
        const limit = document.getElementById('validationLimit').value;
        const location = document.getElementById('validationLocation').value;
        let price = document.getElementById('validationPrice').value;
        const info = document.getElementById('validationInfo').value;
        if (price.includes(",")) {
            price = price.replace(",", ".");
        }
        event.preventDefault();
        const response = await fetch(appointmentAPI + `/${id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                'owner_id': owner_id,
                'name': meal,
                'date': date,
                'time': time,
                'limit': limit,
                'location': location,
                'price': price,
                'info': info
            }),
        });

        // await fetch(`${chatAPI}?chat_id=${chat_id}&meal=${meal}`, {
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     method: 'PUT',
        //     body: JSON.stringify({
        //         'owner_id': owner_id,
        //         'appointment_id': appointment_id.id,
        //         'meal': meal,
        //     }),
        // });

        // Get appointment
        const response2 = await fetch(appointmentAPI + `/single/${id}`)
        let appointment = await response2.json();
        console.log(appointment)

        //getEditEmail(user_email, appointment)
        const response3 = await fetch(`${notificationAPI}/edit?email=${email}&appointment=${appointment.name}&date=${appointment.date}&location=${appointment.location}&time=${appointment.time}`, {
            method: 'GET',
        });
    
        StoreID(id)
        window.location = '/pages/appointmentDetails.html';

        return response
    }
}

async function removeAppointment() {
    let id = sessionStorage.appointmentID;
    const userData = sessionStorage.getItem('userData');
    const userObject = JSON.parse(userData);
    const email = userObject.user.email;
    event.preventDefault();
    const response = await fetch(`${appointmentAPI}/${id}`, {
        method: 'DELETE'
    });

    // const chat_id = await fetch(`${chatAPI}/`)

    // await fetch(`${chatAPI}?chat_id=${chat_id}`, {
    //     method: 'DELETE'
    // });

    // Get appointment
    const response3 = await fetch(appointmentAPI + `/single/${id}`)
    let appointment = await response3.json();
    console.log(appointment)

    //getCancelationEmail(user_email, appointment)
    const response4 = await fetch(`${notificationAPI}/remove?email=${email}&appointment=${appointment.name}`, {
      method: 'GET',
    });

    window.location = '/pages/homeScreen.html';

    return response
}


function validation() {

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.has-validation')
    const meal = document.getElementById('validationMeal').value;
    const date = document.getElementById('validationDate').value;
    const time = document.getElementById('validationTime').value;
    // const limit = document.getElementById('validationLimit').value;
    const location = document.getElementById('validationLocation').value;
    const price = document.getElementById('validationPrice').value;
    const info = document.getElementById('validationInfo').value;

    // Loop over them and prevent submission
    forms.forEach(form => {
        if (form.value == null || form.value == "") {
            event.preventDefault()
            event.stopPropagation()
        }

        form.classList.add('was-validated')
    });

    if (meal !== null && meal !== "" && date !== null && date !== "" && time !== null && time !== "" && location !== null && location !== "" && price !== null && price !== "" && info !== null && info !== "") {
        return true
    }
}
async function fetchOldAppointmentData() {
    const meal = document.getElementById('validationMeal');
    const date = document.getElementById('validationDate');
    const time = document.getElementById('validationTime');
    const limit = document.getElementById('validationLimit');
    const location = document.getElementById('validationLocation');
    const price = document.getElementById('validationPrice');
    const info = document.getElementById('validationInfo');
    const response = await fetch(appointmentAPI);
    let data = await response.json();
    if (response) {
        data.forEach(data => {
            if (sessionStorage.appointmentID == data.id) {
                meal.value = data.name;
                date.value = data.date;
                time.value = data.time;
                location.value = data.location;
                price.value = data.price;
                info.value = data.information;
                limit.value = data.limit;
            }
        })
    };
}