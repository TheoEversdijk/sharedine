async function getAvatar(event) {
	const avatar = document.getElementById('file').value;
	console.log(avatar);
	const response = await fetch(userAPI + `/settings?avatar=${avatar}`, {
		method: 'POST' });
	event.preventDefault
	return response
}
