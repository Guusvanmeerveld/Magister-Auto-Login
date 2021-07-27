const { join } = require('path');
const fs = require('fs-extra');

const config = require(join(process.cwd(), 'builder.config.js'));

const srcDir = join(process.cwd(), config.root);
const distDir = join(process.cwd(), config.out);

const { builder } = require('./builders');

if (config.interpreter) {
	config.interpreter.forEach((interpreter) => {
		const input = join(srcDir, interpreter.input);
		const output = join(distDir, interpreter.output);

		builder(input, output, interpreter.type);
	});
}
