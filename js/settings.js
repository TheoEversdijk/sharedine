const userAPI = "http://127.0.0.1:3001/users";
// async function uploadToBucket(event) {
// 	const avatarFile = event.target.files[0]
// 	const { data, error } = await supabase
// 	  .storage
// 	  .from('avatars')
// 	  .upload('public/avatar1.png', avatarFile, {
// 		cacheControl: '3600',
// 		upsert: false
// 	  })

// };

async function testAvatar() {
  if (validation()) {
    const avatar = document.getElementById('avatar').value;
    const response = await fetch(userAPI + `/settings?avatar=${avatar}`, {
      method: 'POST'
    });

    window.location = '../../index.html';

    return response
  }
  console.log(avatar);
  // event.preventDefault();
}

async function uploadImage(event) {
  event.preventDefault();
  const avatarFile = event.target.files;
  console.log(sessionStorage.userData.user.id);
  const response = await fetch(userAPI + `/changeImg`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      'id': sessionStorage.userData.user.id,
      'image': avatarFile
    }),
  }).then((response) => response.json());
}

async function downloadimage() {
  const { data, error } = await supabase.storage.from('storage').download('public/avatar1.png')
}