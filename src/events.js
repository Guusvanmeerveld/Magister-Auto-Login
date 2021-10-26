/**
 * Runs when the extensions is updated
 * @param {string} tabId
 * @param {*} changeInfo
 * @param {*} tab
 */
const updated = (tabId, changeInfo, tab) => {
	if (changeInfo.status == 'complete' && tab.active) {
		chrome.tabs.executeScript(tab.ib, {
			file: 'login.js',
		});
	}
};

/**
 * Run when extension is installed
 */
const installed = () => {
	window.open('@pages/options.html', '_blank');

	getAccounts((accounts) => {
		chrome.storage.sync.set(
			{
				enabled: true,
				accounts: accounts || [],
			},
			() => getAccounts(console.log)
		);
	});

	chrome.browserAction.setBadgeText({
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

chrome.tabs.onUpdated.addListener(updated);
chrome.runtime.onInstalled.addListener(installed);
