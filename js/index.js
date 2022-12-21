
/**
 * Verify that the user is logged in
 */
function checkLoggedIn() {
    // console.log(sessionStorage.userData)
    if (!sessionStorage.userData) {
        window.location = '/index.html';
    }
}

async function account() {
    const userData = sessionStorage.getItem('userData');
    const userObject = JSON.parse(userData);
    const user_id = userObject.user.id;
    const response = await searchUser(user_id);
    document.getElementById('welcome').innerText = `Welcome ${response.username}`;
}

/**
 * Removes user data from the session storage
 */
function logout() {
    sessionStorage.removeItem("userData");
    window.location = '../index.html'
}