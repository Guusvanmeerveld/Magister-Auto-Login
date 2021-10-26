const removeAccount = ({ school, username }, onFinished) => {
	chrome.storage.sync.get('accounts', ({ accounts }) => {
		const newAccounts = accounts.filter(
			(account) => !(account.username == username && account.school == school)
		);

		chrome.storage.sync.set({ accounts: newAccounts }, onFinished);
	});
};

const makePrimaryAccount = (username, onFinished) => {
	chrome.storage.sync.set({ primaryAccount: username }, onFinished);
};

const createAccountElement = ({ username, school }, primaryAccount) => {
	const _account = create('div');

	_account.id = username;
	_account.classList.add('account');
	_account.classList.add('bg-secondary');

	/**
	 * Display username
	 */
	const _name = create('h1');

	_name.innerHTML = username || 'Onbekend';

	/**
	 * Display school
	 */
	const _school = create('h3');

	_school.innerHTML = school || 'Geen school';

	if (primaryAccount != username) {
		/**
		 * A button to remove the account
		 */
		const _removeButton = create('a');

		_removeButton.innerHTML = 'Verwijder';
		_removeButton.classList.add('remove-button');

		_removeButton.addEventListener('click', (e) => {
			e.preventDefault();

			removeAccount({ username, school }, () => location.reload());
		});

		/**
		 * Display wether this is the primary account
		 */
		const _primaryAccount = create('a');

		_primaryAccount.innerHTML = 'Maak hoofd account';
		_primaryAccount.classList.add('make-primary-account');

		_primaryAccount.addEventListener('click', (e) => {
			e.preventDefault();

			makePrimaryAccount(username, () => location.reload());
		});

		_account.appendChild(_primaryAccount);
		_account.appendChild(_removeButton);
	} else {
	}

	_account.appendChild(_name);
	_account.appendChild(_school);

	$('.accounts').appendChild(_account);
};

const getSettings = ({ accounts, primaryAccount }) => {
	if (!accounts) accounts = [];

	const _addAccountLink = create('a');

	_addAccountLink.classList.add('button');
	_addAccountLink.href = '@pages/account.html';

	if (!accounts.length) {
		/**
		 * Display message saying no accounts are added
		 */
		const _noAccounts = create('p');

		_noAccounts.innerHTML = 'Je hebt nog geen accounts.';

		_addAccountLink.innerHTML = 'Voeg er een toe';

		$('.accounts').appendChild(_noAccounts);
	} else {
		accounts.forEach((account) => createAccountElement(account, primaryAccount));

		_addAccountLink.innerHTML = 'Voeg er nog een toe';
	}

	$('.accounts').appendChild(_addAccountLink);
};

const accounts = chrome.storage.sync.get(['accounts', 'primaryAccount'], getSettings);
