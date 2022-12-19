
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