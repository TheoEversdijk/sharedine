const userAPI = "http://127.0.0.1:3001/users";

// const base64 = require('base-64');
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

/**
 * Encrypt an image to Base64
 */
let encryptedImage = ""
function encodeImageFileAsURL(element) {
  let file = element.files[0];
  let reader = new FileReader();
  reader.onloadend = function() {
    // console.log('RESULT', reader.result)
    encryptedImage = (reader.result)
  }
  reader.readAsDataURL(file);
}

async function uploadImage(event) {
  const avatarFile = document.getElementById("file").files[0];
  event.preventDefault();
  console.log(encryptedImage)

  // Retrieve items from session storage
  const userData = sessionStorage.getItem('userData');
  const userObject = JSON.parse(userData);
  const user_id = userObject.user.id;
  //   console.log(userObject.user.id)

  const response = await fetch(userAPI + `/changeImg`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      // 'id': JSON.stringify(user_id),
      'image': encryptedImage
    }),
  }).then((response) => response.json());
}

async function downloadimage() {
  const { data, error } = await supabase.storage.from('storage').download('public/img.png');
}