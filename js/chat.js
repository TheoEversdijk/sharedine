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
              `<a href="/pages/chatroom.html?chat_id=${data.id}">
              <p>Chat ID: ${data.id}</p>
              <p>Created at: ${data.created_at}</p>
              <p>Members: ${data.members}</p>
              <p>Owner ID: ${data.owner_id}</p>
              </a>
              <br>`
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

async function getAppointment() {
  const response = await fetch(chatAPI);

}