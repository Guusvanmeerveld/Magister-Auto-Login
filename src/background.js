// Runs when the extensions is updated
const updated = (tabId, changeInfo, tab) => {
	if (changeInfo.status == 'complete' && tab.active) {
		chrome.tabs.executeScript(tab.ib, {
			file: 'login.js',
		});
	}
};

// Run when extensions is installed
const installed = () => {
	window.open('@pages/options.html', '_blank');

	chrome.storage.sync.get('accounts', (accounts) => {
		chrome.storage.sync.set({
			enabled: true,
			accounts: accounts || [],
		});
	});

	chrome.browserAction.setBadgeText({
		text: 'ON',
	});
};

chrome.tabs.onUpdated.addListener(updated);
chrome.runtime.onInstalled.addListener(installed);
