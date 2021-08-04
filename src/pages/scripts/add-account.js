$('#newAccountForm').addEventListener('submit', (e) => {
	e.preventDefault();

	chrome.storage.sync.get('accounts', ({ accounts }) => {
		const school = $('#school').value;
		const username = $('#username').value;

		if (accounts.find((account) => account.username == username && account.school == school)) {
			const _errorMessage = create('p');

			_errorMessage.innerHTML = 'Account bestaat al.';
			_errorMessage.classList.add('error-message');

			$('#message').innerHTML = '';

			$('#message').appendChild(_errorMessage);

			return;
		}

		const newAccount = {
			school,
			username,
			password: $('#password').value,
		};

		if (accounts.length == 0 || $('#primaryAccount').checked) {
			chrome.storage.sync.set({ primaryAccount: username });
		}

		chrome.storage.sync.set(
			{
				accounts: [...accounts, newAccount],
			},
			() => {
				location.href = '@pages/options.html';
			}
		);
	});
});
