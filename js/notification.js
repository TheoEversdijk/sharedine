const notificationAPI = "http://127.0.0.1:3005";

async function getRegistrationEmail(email) {
  // console.log(email);
    const response = await fetch(`${notificationAPI}/register?email=${email}`, {
      method: 'GET',
  });
    return response;
}

async function getCancelationEmail() {
    const response = await fetch(`${notificationAPI}/remove`, {
        method: 'GET'
      });
    return response;
}

async function getEditEmail() {
    const response = await fetch(`${notificationAPI}/edit`, {
        method: 'GET'
      });
    return response;
}