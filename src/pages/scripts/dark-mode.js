const toggleDarkMode = () => {
	const checked = $('.dark-mode').checked;

	chrome.storage.sync.set({
		'dark-mode': checked,
	});

	$('#dark-mode-stylesheet').disabled = !checked;
};

const initDarkMode = () =>
	chrome.storage.sync.get('dark-mode', (usingDarkMode) => {
		$('#dark-mode-stylesheet').disabled = !usingDarkMode;
		$('.dark-mode').checked = usingDarkMode;
	});

$('.dark-mode').addEventListener('click', toggleDarkMode);

initDarkMode();
