async function findNewFriends() {
    const response = await fetch(userAPI);
    let data = await response.json();
    let users = data.data;
    const filteredUsers = await checkIfInFriendsList(users);
    const list = document.getElementById('users-list');
    filteredUsers.forEach(user => {
        if (user.id != sessionStorage.currentID) {
                const userCard = document.createElement('div');
                userCard.innerHTML =
                    `<div class="card col-lg-12 d-flex">
                <div class="row">
                    <div class="col-lg-2">
                        <img
                        src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg"
                        class="rounded-circle friend-image center"
                        alt="Profile picture"
                        />
                    </div>
                <div class="col-lg-7 center-text">
                    <h5 class="">${user.name}</h5>
                        <p class="">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum doloremque similique necessitatibus voluptates non architecto possimus ullam ea vitae commodi?
                        </p>
                </div>
                <div class="col-lg-2 center-text center" id="${user.id}">
                    <button onclick="sendFriendRequest(${user.id})" class="btn btn-primary">Send Friend Request</button>
                </div>
                </div>
            </div>`;
                list.append(userCard);
            };
    });
};

async function checkIfInFriendsList(users) {
    let friends = await getFriends();
    console.log(friends);
    const filter = [];
    friends.forEach(friend => {
        filter.push(friend.id);
    });
    friends.forEach(friend => {
        users = users.filter( ( user ) => !filter.includes( user.id ) )
    })
    return users;
}

async function sendFriendRequest(id) {
    event.preventDefault();
    const from = sessionStorage.currentID;
    console.log("Friend Request Send to " + id)
    const reqBox = document.getElementById(String(id));
    reqBox.innerHTML = "<p>Request Send</p>";
    const response = await fetch(friendsAPI + `?from=${from}&to=${id}`, {
        method: 'POST'
    });
    return response
}

async function acceptRequest();

async function declineRequest();

async function blockUser();