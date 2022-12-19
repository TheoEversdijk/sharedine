const userAPI = "http://127.0.0.1:3001/users";

async function searchUser(id) {
    const response = await fetch(userAPI);
    let data = await response.json();
    let users = data.data;
    const userlist = [];
    return userlist;
}


async function getSpecificUser() {
    const response = await fetch()
}