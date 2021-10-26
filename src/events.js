/**
 * Runs when the extensions is updated
 * @param {string} tabId
 * @param {*} changeInfo
 * @param {*} tab
 */
const updated = (details) => {
	chrome.scripting.executeScript(
		{
			target: { tabId: details.tabId },
			files: ['login.js'],
		},
		() => {}
	);
};

/**
 * Run when extension is installed
 */
const installed = (reason) => {
	if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
		chrome.tabs.create({
			url: '@pages/options.html',
		});
	}

	getAccounts((accounts) => {
		chrome.storage.sync.set({
			enabled: true,
			accounts: accounts || [],
		});
	});

	chrome.action.setBadgeText({
		text: 'ON',
	});
};

/**
 * Get the all the accounts that are currently added
 * @param {() => void} callback
 */
const getAccounts = (callback) => {
	chrome.storage.sync.get('accounts', ({ accounts }) => callback(accounts));
};

const filter = {
	url: [
		{
			urlMatches: 'https://accounts.magister.net/*',
		},
	],
};

chrome.webNavigation.onCompleted.addListener(updated, filter);
chrome.runtime.onInstalled.addListener(installed);
