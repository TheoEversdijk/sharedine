const appointmentAPI = "http://127.0.0.1:3002/appointments";
const chatAPI = "http://127.0.0.1:3004/chat";

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
            console.log(data);
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
    const response = await fetch(appointmentAPI);
    //store data in json
    const userData = sessionStorage.getItem('userData');
    const userObject = JSON.parse(userData);
    const user_id = userObject.user.id;
    let data = await response.json();
    const appointmentName = document.getElementById('appointment-name')
    const body = document.getElementById('information')
    if (response) {
        data.forEach(data => {
            if (sessionStorage.appointmentID == data.id) {
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
            <p>Location: ${data.location}</p>
            <p>Date: ${data.date}</p>
            <p>Time: ${data.time}</p>
            <p>Price: €${data.price}</p>
            </div>`

            if (data.owner_id !== user_id && !data.members.includes(user_id)) {
            listItem2.innerHTML =
            `<div class="register-button">
                <a href="#"><button type="button" class="btn btn-info" onclick="appointmentRegister()">Register</button></a>
              </div>`
            }

            if (data.owner_id == user_id) {
                listItem4.innerHTML = `
                <div class="p-2">
                <a class="btn btn-info" href="/pages/editAppointment.html">Edit</a>
              </div>`
              listItem2.innerHTML =
            `<div class="register-button">
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
        <ul>
          <li>Owner: Noo</li>
        </ul>
      </div>
    </div>
  </div>
                `;
                appointmentName.append(title);
                body.append(listItem, listItem3);
                document.getElementById('info').appendChild(listItem2);
                document.getElementById('header-edit').appendChild(listItem4);
            }
        });
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
    const response = await fetch(appointmentAPI + `/${id}/register`, {
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

    getRegistrationEmail(user_email)
    

    window.location = '/pages/homeScreen.html';
    return response
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
        // const limit = document.getElementById('validationLimit').value;
        const location = document.getElementById('validationLocation').value;
        const price = document.getElementById('validationPrice').value;
        const info = document.getElementById('validationInfo').value;

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
                // 'limit': limit,
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
        // const owner_id = sessionStorage.currentID;
        const id = sessionStorage.appointmentID;
        const meal = document.getElementById('validationMeal').value;
        const date = document.getElementById('validationDate').value;
        const time = document.getElementById('validationTime').value;
        // const limit = document.getElementById('validationLimit').value;
        const location = document.getElementById('validationLocation').value;
        const price = document.getElementById('validationPrice').value;
        const info = document.getElementById('validationInfo').value;
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

        // const chat_id = sessionStorage.appointmentID - 203; //TODO: DO THIS LIKE A SANE PERSON

        // const response2 = await fetch(`${chatAPI}?chat_id=${chat_id}&meal=${meal}`, {
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

        window.location = '/pages/homeScreen.html';

        return response
    }
}

async function removeAppointment() {
    let id = sessionStorage.appointmentID;
    event.preventDefault();
    const response = await fetch(`http://127.0.0.1:3002/appointments/${id}`, {
        method: 'DELETE'
    });

    const chat_id = sessionStorage.appointmentID - 203; //TODO: DO THIS LIKE A SANE PERSON

    const response2 = await fetch(`${chatAPI}?chat_id=${chat_id}`, {
        method: 'DELETE'
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