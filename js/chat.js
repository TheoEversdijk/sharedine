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
              `<a class="no-decoration" href="/pages/chatroom.html?chat_id=${data.id}">
              <div class="container py-3">
                <div class="card">
                  <p>${data.name}</p>
                  <small>Created on ${data.created_at}</small>
                </div>
              </div>
            </a>
            `
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

function StoreID(id) {
  sessionStorage.setItem("chatID", id);
}

async function getChat() {
  const queryParams = new URLSearchParams(window.location.search);
  const chat_id = queryParams.get('chat_id');
  // console.log(chat_id)
  const response = await fetch(`http://127.0.0.1:3004/chat/${chat_id}`);

  //store data in json
  let data = await response.json();
  // console.log(data)
  const body = document.getElementById('information')
  if (response) {
      data.forEach(data => {
              let listItem = document.createElement('div');
              listItem.innerHTML = 
              `<p>Message ID: ${data.id}</p>
              <p>Created at: ${data.created_at}</p>
              <p>Message: ${data.message}</p>
              <p>Chat ID: ${data.chat_id}</p>
              <p>Owner ID: ${data.owner_id}</p>
              <br>`
              body.append(listItem);
      });
  }
}