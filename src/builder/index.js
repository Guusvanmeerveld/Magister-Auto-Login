const { join } = require('path');

const { program } = require('commander');

const config = require(join(process.cwd(), 'builder.config.js'));

const validBrowsers = ['chrome', 'firefox', 'edge']

const srcDir = join(process.cwd(), config.root);
const distDir = join(process.cwd(), config.out);

const { builder } = require('./builders');

program
	.option(`-t, --target <${validBrowsers.join(' | ')}>`, 'set the target browser')

program.parse(process.argv);

const options = program.opts();

const target = options.target.toLowerCase() || 'chrome'

if (!validBrowsers.includes(target)) {
	console.log('Error: invalid target browser, please specify one of the following: ' + validBrowsers.join(', '));
	process.exit();
}

process.env.TARGET_BROWSER = target;

if (config.interpreter) {
	config.interpreter.forEach((interpreter) => {
		const input = join(srcDir, interpreter.input);
		const output = join(distDir, interpreter.output);

		builder(input, output, interpreter.type);
	});
}
