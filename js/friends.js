const friendsAPI = "http://127.0.0.1:3003/friends";

async function getFriendsList() {
    const friends = await getFriends();
    const accounts = await searchUsers(friends);
    const pendinglist = document.getElementById('pending-list');
    const list = document.getElementById('friends-list');
    const statusText = document.getElementById('status-text');
    accounts.forEach(account => {
        if (accounts.length > 0) {
            if (account.status === "Pending") {
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
                        <div class="col-lg-8 center-text">
                            <h5 class="">${account.user.name}</h5>
                        </div>
                        <div class="col-lg-1 center-text center">
                            <a href="#" class="btn btn-primary">Invite to an appointment</a>
                        </div>
                        </div>
                    </div>`;
                pendinglist.append(userCard);
            } if (account.status === "Friends") {
                statusText.textContent = "Friends List";
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
                    <div class="col-lg-8 center-text">
                        <h5 class="">${account.user.name}</h5>
                            <p class="">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum doloremque similique necessitatibus voluptates non architecto possimus ullam ea vitae commodi?
                            </p>
                    </div>
                    <div class="col-lg-1 center-text center">
                        <a href="#" class="btn btn-primary">Invite to an appointment</a>
                    </div>
                    </div>
                </div>`;
                list.append(userCard);
            };
        };
    });
};

    async function getFriends() {
        const response = await fetch(friendsAPI);
        let data = await response.json();
        const friendlist = [];
        data.data.forEach(friend => {
            if (friend.from == sessionStorage.currentID || friend.to == sessionStorage.currentID) {
                if (sessionStorage.currentID == friend.from) {
                    friendlist.push({ id: friend.to, status: friend.status });
                } else {
                    friendlist.push({ id: friend.from, status: friend.status });
                }
            }
        });
        return friendlist;
    }

    async function searchUsers(friends) {
        const response = await fetch(userAPI);
        let data = await response.json();
        let users = data.data;
        const userlist = [];
        users.forEach(user => {
            friends.forEach(friend => {
                if (user.id == friend.id) {
                    userlist.push({user, status: friend.status});
                }
            })
        })
        return userlist;
    }

    async function findNewFriends() {
        const response = await fetch(userAPI);
        let data = await response.json();
        const list = document.getElementById('users-list');
        console.log(data.data);
        data.data.forEach(user => {
            if (user.id != sessionStorage.currentID) {
                if (checkIfInFriendsList(user) === false) {
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
            };
        });
    };

    async function checkIfInFriendsList(user) {
        let friends = await getFriends();
        friends.forEach(friend => {
            if (user.id === friend.id) {
                return true
            } else {
                return false
            }
        })
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