const $ = document.querySelector.bind(document);

const getSettings = (callback) =>
	chrome.storage.sync.get(['accounts', 'primaryAccount'], ({ primaryAccount, accounts }) => {
		if (accounts && accounts.length != 0) {
			callback(accounts.find((account) => account.username == primaryAccount));
		}
	});

const login = () => {
	getSettings(async ({ school, username: number, password }) => {
		const schoolPicker = $('#scholenkiezer_value');

		if (schoolPicker) {
			if (school) {
				schoolPicker.value = school;
				schoolPicker.dispatchEvent(new Event('input'));
			} else {
				return;
			}

			const selected = '.selected';

			await awaitSelector(selected);

			$(selected).click();
		}

		const username = '#username';

		await awaitSelector(username);

		if (number) {
			$(username).value = number;
			$(username).dispatchEvent(new Event('input'));
		} else {
			return;
		}

		const usernameSubmit = '#username_submit';

		await awaitSelector(usernameSubmit);

		$(usernameSubmit).click();

		const rswpPassword = '#rswp_password';

		await awaitSelector(rswpPassword);

		if (password) {
			$(rswpPassword).value = password;
			$(rswpPassword).dispatchEvent(new Event('input'));
		} else {
			return;
		}

		await awaitSelector('[id*=_submit]');

		$('#rswp_submit').click();
	});
};

const awaitSelector = (selector) => {
	return new Promise((resolve, reject) => {
		const element = document.querySelector(selector);

		if (element) {
			resolve(element);
		} else {
			setTimeout(() => awaitSelector(selector).then(resolve, reject), 100);
		}
	});
};

chrome.storage.sync.get('enabled', (enabled) => {
	enabled ? login() : null;
});
