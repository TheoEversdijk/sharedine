const chatAPI = "http://127.0.0.1:3004/chat";

async function getAllChats() {
  const response = await fetch(chatAPI);

  //store data in json
  let data = await response.json();
  const body = document.getElementById('chats-list')
  if (response) {
      data.forEach(data => {
              let listItem = document.createElement('div');
              listItem.innerHTML = 
                `<btn class="no-decoration chat-button" onclick="loadChat(${data.id})">
                  <div class="container border py-3 row">
                    <div class="col-lg-3 center">
                      <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg" class="rounded-circle chat-img"
                      alt="" loading="lazy" />
                   </div>
                    <div class="col-lg-9">
                      <p>${data.name}</p>
                      <small>Created on ${data.created_at}</small>
                    </div>
                  </div>
                </btn>`
              body.append(listItem);
      });
  }
}

async function addChat() {
      const owner_id = sessionStorage.currentID;
      const members = document.getElementById('validationMembers').value;
      event.preventDefault();
      const response = await fetch(`${chatAPI}?owner_id=${owner_id}`, {
          method: 'POST'
      });
      window.location = '/pages/chat.html';

      return response
}

async function removeChat() {
  event.preventDefault();
  const response = await fetch(`${chatAPI}?chat_id=${id}`, {
      method: 'DELETE'
  });
      window.location = '/pages/chat.html';
  
      return response
}

function loadChat(id) {
  const chatscreen = document.getElementById('chatroom-content');
  chatscreen.innerHTML = `<iframe src="http://127.0.0.1:5500/pages/chatroom.html?chat_id=${id}" height="450px" class="col-lg-12 border" id="chatroom"></iframe>`
}

async function getChat() {
  const queryParams = new URLSearchParams(window.location.search);
  const chat_id = queryParams.get('chat_id');
  // console.log(chat_id)
  const response = await fetch(`http://127.0.0.1:3004/chat/${chat_id}`);

  //store data in json
  let data = await response.json();
  // console.log(data)
  const body = document.getElementById('messages')
  if (response) {
      data.forEach(data => {
              let listItem = document.createElement('div');
              listItem.innerHTML = 
              `<div class="card">
              <p>Owner ID: ${data.owner_id}</p>
              <p>${data.message}</p>
              <small><p>Created at: ${data.created_at}</p></small>`
              body.append(listItem);
      });
  }
}
