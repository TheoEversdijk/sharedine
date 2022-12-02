const appointmentAPI = "http://127.0.0.1:3002/appointments";

async function getPersonalAppointments() {
    const response = await fetch(appointmentAPI);

    //store data in json
    let data = await response.json();
    console.log(data);
    const body = document.getElementById('items')
    if (response) {
        data.forEach(data => {
            if (sessionStorage.currentID == data.owner_id){
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

async function getAllAppointments() {
    const response = await fetch(appointmentAPI);

    //store data in json
    let data = await response.json();
    const body = document.getElementById('items')
    if (response) {
        data.forEach(data => {
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

async function getAppointment() {
    const response = await fetch(appointmentAPI);
    //store data in json
    let data = await response.json();
    const body = document.getElementById('information')
    if (response) {
        data.forEach(data => {
            if (sessionStorage.appointmentID == data.id){
                let listItem = document.createElement('div');
                listItem.innerHTML = 
                `  
                <div class="container">
    <div class="row">
        <div class="col-lg-6 col-md-6" id="image">
            <img src="../../resources/images/Foodsel.jpg" alt="dumb fuck" class="details-image">
        </div>
        <div class="col-lg-6 col-md-6 details-info" id="info">
            <h1>Meal: ${data.name}</h1>
            <p>Location: ${data.location}</p>
            <p>Date: ${data.date}</p>
            <p>Time: ${data.time}</p>
            <p>Price: €${data.price}</p>
            <div class="fucked-button">
              <a href="https://www.youtube.com/shorts/w1_u9uGchMY"><button type="button" class="btn btn-info">Register</button></a>
            </div>
          </div>
    </div>
    <div class="row content-row-2">
      <div class="col-lg-6 col-md-6 description">
        <h1>Description</h1>
        <p>${data.information}</p>
      </div>
      <div class="col-lg-6 col-md-6 participants">
        <h1>Participants</h1>
        <ul>
          <li>henk</li>
          <li>piet</li>
          <li>jochem</li>
          <li>Achmed Alijahardi Kulmar</li>
        </ul>
      </div>
    </div>
  </div>
                `;
                body.append(listItem);
            }
        });
    }
}

function StoreID(id) {
    sessionStorage.setItem("appointmentID", id);
}

function wipeID() {
    sessionStorage.removeItem("appointmentID");
}

async function addAppointment() {
    const owner_id = sessionStorage.currentID;
    const meal = document.getElementById('validationMeal').value;
    const date = document.getElementById('validationDate').value;
    const time = document.getElementById('validationTime').value; 
    const location = document.getElementById('validationLocation').value;
    const price = document.getElementById('validationPrice').value;
    const info = document.getElementById('validationInfo').value;
    event.preventDefault();
    const response = await fetch(`http://127.0.0.1:3002/appointments?owner_id=${owner_id}&name=${meal}&date=${date}&time=${time}&location=${location}&price=${price}&info=${info}`, {
        method: 'POST'
    });
        window.location = '/pages/homeScreen.html';
    
        return response
}

async function fetchOldAppointmentData() {
    const meal = document.getElementById('validationMeal');
    const date = document.getElementById('validationDate');
    const time = document.getElementById('validationTime'); 
    const location = document.getElementById('validationLocation');
    const price = document.getElementById('validationPrice');
    const info = document.getElementById('validationInfo');
    const response = await fetch(appointmentAPI);
    let data = await response.json();
    if (response) {
        data.forEach(data => {
            if (sessionStorage.appointmentID == data.id){
                meal.value = data.name;
                date.value = data.date;
                time.value = data.time;
                location.value = data.location;
                price.value = data.price;
                info.value = data.information;
            }
        })
    };
}

async function editAppointment() {
    const owner_id = sessionStorage.currentID;
    const id = sessionStorage.appointmentID;
    const meal = document.getElementById('validationMeal').value;
    const date = document.getElementById('validationDate').value;
    const time = document.getElementById('validationTime').value; 
    const location = document.getElementById('validationLocation').value;
    const price = document.getElementById('validationPrice').value;
    const info = document.getElementById('validationInfo').value;
    event.preventDefault();
    const response = await fetch(`http://127.0.0.1:3002/appointments/${id}?&name=${meal}&date=${date}&time=${time}&location=${location}&price=${price}&info=${info}`, {
        method: 'PUT'
    });
        window.location = '/pages/homeScreen.html';
    
        return response
}

async function removeAppointment() {
    const id = sessionStorage.appointmentID;
    event.preventDefault();
    const response = await fetch(`http://127.0.0.1:3002/appointments/${id}`, {
        method: 'DELETE'
    });
        window.location = '/pages/homeScreen.html';
    
        return response
}


// function validation() {
  
//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     const forms = document.querySelectorAll('.has-validation')
  
//     // Loop over them and prevent submission
//     Array.from(forms).forEach(form => {
//       form.addEventListener('submit', event => {
//         if (!form.checkValidity()) {
//           event.preventDefault()
//           event.stopPropagation()
//         }
  
//         form.classList.add('was-validated')
//       }, false)
//     })
//   }