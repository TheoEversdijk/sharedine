const friendsAPI = "http://127.0.0.1:3003/friends";

async function getFriendsList() {
    const friends = await getFriends();
    const accounts = await searchUsers(friends);
    console.log(accounts)
    const list = document.getElementById('friends-list');
    const statusText = document.getElementById('status-text');
    const statusText2 = document.getElementById('status-text2');
    accounts.forEach(account => {
        if (accounts.length > 0) {
            statusText.textContent = "";
            statusText2.textContent = "";
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
                        <h5 class="">${account.user.username}</h5>
                            <p class="">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum doloremque similique necessitatibus voluptates non architecto possimus ullam ea vitae commodi?
                            </p>
                    </div>
                    <div class="col-lg-2 center-text center">
                        <a href="#" class="btn btn-info">Invite to an appointment</a>
                    </div>
                    </div>
                </div>`;
            list.append(userCard);
        };
    });
};

async function getRequestList() {
    const requests = await getRequests();
    const accounts = await searchUsers(requests);
    const pendinglist = document.getElementById('pending-list');
    const statusText3 = document.getElementById('status-text3');
    accounts.forEach(account => {
        if (accounts.length > 0) {
            if (account.status === "pending") {
                statusText3.textContent = "";
                const userCard = document.createElement('div');
                if (account.requester === "they") {
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
                    <h5 class="">${account.user.username}</h5>
                </div>
                <div class="col-lg-2 center-text center">
                    <btn onclick="{acceptRequest(${account.request}), location.reload();}" class="btn btn-success center">Accept Request</btn>
                    <btn onclick="{declineRequest(${account.request}), location.reload();}" class="btn btn-danger center">Decline Request</btn>
                    <btn onclick="{blockUser(${account.request}), location.reload();}" class="btn btn-warning center">Block User</btn>
                </div>
                </div>
            </div>`;
                } if (account.requester === "me") {
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
                    <h5 class="">${account.user.username}</h5>
                </div>
                <div class="col-lg-2 center-text center">
                    <p>Waiting for Approval</p>
                </div>
                </div>
            </div>`;
                }
                pendinglist.append(userCard);
            }
        }
    });

}


async function getFriends() {
    const userData = sessionStorage.getItem('userData');
    const userObject = JSON.parse(userData);
    const user_id = userObject.user.id;
    const response = await fetch(friendsAPI + `/${user_id}`);
    // TODO: Change existing variables to this format
    let data = await response.json();
    const friends = data.data;

    if (friends.length > 0) {
        const friendlist = [];
        friends.forEach(friend => {
            if (friend.from == user_id || friend.to == user_id) {
                if (user_id == friend.from) {
                    friendlist.push({ request: friend.id, id: friend.to, status: friend.status, requester: "me" });
                } else {
                    friendlist.push({ request: friend.id, id: friend.from, status: friend.status, requester: "they" });
                }
            }
        });
        return friendlist;
    } else {
        return 0;
    }
}

async function getRequests() {
    const userData = sessionStorage.getItem('userData');
    const userObject = JSON.parse(userData);
    const user_id = userObject.user.id;
    const response = await fetch(friendsAPI + `/requests/${user_id}`);
    // TODO: Change existing variables to this format
    let data = await response.json();
    const requests = data.data;

    if (requests.length > 0) {
        const requestList = [];
        requests.forEach(friend => {
            if (friend.from == user_id || friend.to == user_id) {
                if (user_id == friend.from) {
                    requestList.push({ request: friend.id, id: friend.to, status: friend.status, requester: "me" });
                } else {
                    requestList.push({ request: friend.id, id: friend.from, status: friend.status, requester: "they" });
                }
            }
        });
        return requestList;
    } else {
        return 0;
    }
}

async function searchUsers(friends) {
    const response = await fetch(userAPI);
    let data = await response.json();
    console.log(data)
    const userlist = [];
    if (friends.length > 0) {
        data.forEach(user => {
            friends.forEach(friend => {
                if (user.id == friend.id) {
                    userlist.push({ user, request: friend.request, status: friend.status, requester: friend.requester });
                }
            })
        })
    }
    return userlist;
}