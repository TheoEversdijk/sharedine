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