async function findNewFriends() {
    const userData = sessionStorage.getItem('userData');
    const userObject = JSON.parse(userData);
    const user_id = userObject.user.id;
    const response = await fetch(userAPI);
    let users = await response.json();
    const filteredUsers = await checkIfInFriendsList(users);
    const filtered = await checkIfInRequestList(filteredUsers);
    const list = document.getElementById('users-list');
    if (filtered.length > 0) {
        filtered.forEach(user => {
            if (user.id != user_id) {
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
                        <h5 class="">${user.username}</h5>
                            <p class="">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum doloremque similique necessitatibus voluptates non architecto possimus ullam ea vitae commodi?
                            </p>
                    </div>
                    <div class="col-lg-2 center-text center">
                        <button onclick="{sendFriendRequest('${user.id}'), location.reload()}" class="btn btn-info">Send Friend Request</button>
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

async function checkIfInRequestList(users) {
    let friends = await getRequests();
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
    const userData = sessionStorage.getItem('userData');
    const userObject = JSON.parse(userData);
    const user_id = userObject.user.id;
    const from = user_id;
    console.log("Friend Request Send to " + id)
    const response = await fetch(friendsAPI + `/request`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            'from': from,
            'to': id
        }),
    });
    return response;
}

async function acceptRequest(id) {
    console.log("Friend Request Accepted")
    const response = await fetch(friendsAPI + `/request`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            'id': id
        }),
    });
    return response
}

async function declineRequest(id) {
    console.log("Friend Request Declined")
    const response = await fetch(friendsAPI + `/request`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({
            'id': id
        }),
    });
    return response
}

// Unblock still needs to be fixed
async function blockUser(id) {
    console.log("Friend Request Blocked")
    const response = await fetch(friendsAPI + `/request/block`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            'id': id
        }),
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


function alertFriend(id) {
    const result = confirm('Are you sure you want to delete this user as your friend?');
    if (result) {
        declineRequest(id);
        
    } else {
        // nothing happens
    }
    }