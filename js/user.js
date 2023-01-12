const userAPI = "http://127.0.0.1:3001/users";

async function searchUser(id) {
    const response = await fetch(userAPI + `/${id}`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET',
    });
    let data = await response.json();
    return data;
}

async function getAllUsers() {
    const response = await fetch(userAPI, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET',
    });
    let data = await response.json();
    return data;
}

/**
 * Checks whether the logged in user has verified their account and username
 * @returns Promise
 * @author Jesper Bertijn
 */
async function checkVerified() {
    try {
      const object = JSON.parse(sessionStorage.userData)
      const id = object.user.id
      const response = await fetch(userAPI + '/checkValidated', {
        signal: timeOut(10).signal,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          'id': id
        }),
      }).then((response) => response.json());
      if (JSON.stringify(response).length > 5) {
        window.location = './login/verify.html'
      };
    } catch (error) {
      console.log(error);
      return error;
    };
  };
  

  /**
 * Sets a timeout on a fetch request
 * @param {Number} time 
 * @returns Abort
 */
const timeOut = (time) => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), time * 1000);
    return controller;
  };