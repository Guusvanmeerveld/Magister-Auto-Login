chrome.storage.sync.get(
	'dark-mode',
	({ 'dark-mode': usingDarkMode }) => ($('#dark-mode-stylesheet').disabled = !usingDarkMode)
);
