const friendsAPI = "http://127.0.0.1:3003/friends";


async function getFriendsList() {
    const friends = await getFriends();
    const accounts = await searchUsers(friends);
    console.log(accounts);
    const list = document.getElementById('friends-list');
    const statusText = document.getElementById('status-text');
    statusText.textContent = "Friends List";
    accounts.forEach(account => {
        console.log(account);
        const userCard = document.createElement('div');
        userCard.innerHTML = 
            `<a class="no-decoration">
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${account.user.name}</h5>
                    </div>
                </div>
            </a>`;
        list.append(userCard);
    });
}

async function getFriends() {
    const response = await fetch(friendsAPI);
    let data = await response.json();
    const friendlist = [];
    data.data.forEach(friend => {
        if (friend.from == sessionStorage.currentID || friend.to == sessionStorage.currentID) {
            if (sessionStorage.currentID == friend.from) {
                friendlist.push([friend.to]);
            } else {
                friendlist.push([friend.from]);
            }
        }});
    return friendlist;
}

async function searchUsers(friendIDs) {
    const response = await fetch(userAPI);
    let data = await response.json();
    let users = data.data;
    const userlist = [];
    users.forEach(user => {
        friendIDs.forEach(friendID => {
            if (user.id == friendID) {
                userlist.push({user});
            }
        })
    })
    return userlist;
}