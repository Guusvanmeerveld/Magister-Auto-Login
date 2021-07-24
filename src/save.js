d('save').addEventListener('click', save);

qAll('.login').forEach((s) => {
	s.addEventListener('keydown', (e) => {
		if (e.key == 'Enter') {
			if (e.target.id == 'school') {
				d('number').focus();
			}
			if (e.target.id == 'number') {
				d('password').focus();
			}
			if (e.target.id == 'password') {
				save();
			}
		}
	});
});

function save() {
	var school = d('school').value;
	var number = d('number').value;
	var password = d('password').value;

	try {
		chrome.storage.sync.set({
			school: school,
			number: number,
			password: password,
		});

		d('save').innerHTML = 'Opgeslagen!';
	} catch (e) {
		d('save').innerHTML = 'Fout';
		d('save').className = 'btn btn-danger float-right';
		console.error(e);
	}
}

function onLoad() {
	chrome.storage.sync.get(['school', 'number', 'password'], function (result) {
		if (result.school !== undefined) {
			d('school').value = result.school;
		}

		if (result.number !== undefined) {
			d('number').value = result.number;
		}

		if (result.password !== undefined) {
			d('password').value = 'lolleukgeprobeerd';
		}
	});

	chrome.storage.sync.get(['enabled'], function (result) {
		d('switch').checked = result.enabled;
	});

	chrome.storage.sync.get(['darkmode'], function (result) {
		d('dark-mode').checked = result.darkmode;
		d('dark-link').disabled = !d('dark-mode').checked;
	});

	d('switch').addEventListener('click', toggle);
}

function toggle() {
	var checked = d('switch').checked;
	chrome.storage.sync.set({
		enabled: checked,
	});

	chrome.browserAction.setBadgeText({
		text: checked ? 'ON' : 'OFF',
	});
}

onLoad();
