// check the media query
const colorScheme =
	localStorage.getItem('prefers-color-scheme') ||
	matchMedia('(prefers-color-scheme: dark');
// function to set up the color theme based on system preferences.
function setColorMode() {
	if (colorScheme.matches) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('light');
	}
}
setColorMode();
colorScheme.onchange = setColorMode;
