const updateTheme = isDark => {
	if (isDark) {
		document.documentElement.classList.add('dark');
		document.documentElement.classList.remove('light');
		window.localStorage.setItem('mode', 'dark');
	} else {
		document.documentElement.classList.remove('dark');
		document.documentElement.classList.add('light');
		window.localStorage.setItem('mode', 'light');
	}
};

const initialDarkMode =
	localStorage.getItem('mode') === 'dark' ||
	(!('mode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

updateTheme(initialDarkMode);

const button = document.createElement('li');
button.id = 'theme-toggle';
button.classList.add('btn');

function updateButtonText() {
	const currentMode = window.localStorage.getItem('mode');
	button.dataset.state = currentMode || 'light';
}

updateButtonText();

button.addEventListener('click', event => {
	event.preventDefault();
	const currentMode = window.localStorage.getItem('mode');
	const newMode = currentMode === 'dark' ? 'light' : 'dark';
	updateTheme(newMode === 'dark');
	updateButtonText();
});

const navbar = document.querySelector('.container-fluid');
if (navbar) {
	navbar.prepend(button);
} else {
	console.warn(`Couldn't find element: ${navbar}`);
}

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addListener(e => {
	if (!localStorage.getItem('mode')) {
		updateTheme(e.matches);
		updateButtonText();
	}
});
