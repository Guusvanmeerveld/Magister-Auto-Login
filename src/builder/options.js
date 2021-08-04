const { program } = require('commander');

const validBrowsers = ['chrome', 'firefox', 'edge'];

const target = () => {
	program.option(`-t, --target <${validBrowsers.join(' | ')}>`, 'set the target browser');

	program.parse(process.argv);

	const options = program.opts();

	const target = (options.target || 'chrome').toLowerCase();

	if (!validBrowsers.includes(target)) {
		console.log(
			'error: invalid target browser, please specify one of the following: ' +
				validBrowsers.join(', ')
		);
		process.exit();
	}

	process.env.TARGET_BROWSER = target;
};

module.exports = { target };
