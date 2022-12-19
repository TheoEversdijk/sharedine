async function findNewFriends() {
    const response = await fetch(userAPI);
    let data = await response.json();
    let users = data.data;
    const filteredUsers = await checkIfInFriendsList(users);
    const list = document.getElementById('users-list');
    if (filteredUsers.length > 0) {
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
                        <button onclick="{sendFriendRequest(${user.id}), location.reload();}" class="btn btn-info">Send Friend Request</button>
                    </div>
                    </div>
                </div>`;
                list.append(userCard);
            };
        });
    };
};

async function checkIfInFriendsList(users) {
    let friends = await getFriends();
    const filter = [];
    if (friends.length > 0) {
        friends.forEach(friend => {
            filter.push(friend.id);
        });
        friends.forEach(friend => {
            users = users.filter((user) => !filter.includes(user.id))
        })
    }
    return users;
}

async function sendFriendRequest(id) {
    const from = sessionStorage.currentID;
    console.log("Friend Request Send to " + id)
    const response = await fetch(friendsAPI + `?from=${from}&to=${id}`, {
        method: 'POST'
    });
    return response;
}

async function acceptRequest(id) {
    console.log("Friend Request Accepted")
    const response = await fetch(friendsAPI + `?id=${id}`, {
        method: 'PUT'
    });
    return response
}

async function declineRequest(id) {
    console.log("Friend Request Declined")
    const response = await fetch(friendsAPI + `?id=${id}`, {
        method: 'DELETE'
    });
    return response
}

// Unblock still needs to be fixed
async function blockUser(id) {
    console.log("Friend Request Blocked")
    const response = await fetch(friendsAPI + `/block?id=${id}`, {
        method: 'PUT'
    });
    return response
}

// Unblock still needs to be fixed
async function unBlockUser(id) {
    console.log("Friend Request Blocked")
    const response = await fetch(friendsAPI + `?id=${id}`, {
        method: 'DELETE'
    });
    return response
}