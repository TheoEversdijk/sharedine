const userAPI = "http://127.0.0.1:3001/users";

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
