const getAccounts = (accounts) => {
	if (accounts.length == 0) {
		$('.accounts').innerHTML = 'Je hebt nog geen accounts.';
		return;
	}
};

const accounts = chrome.storage.sync.get('accounts', getAccounts);
