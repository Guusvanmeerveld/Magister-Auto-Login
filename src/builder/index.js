const { join } = require('path');
const fs = require('fs-extra');

const srcDir = join(process.cwd(), 'src');
const distDir = join(process.cwd(), 'dist');

const config = require(join(process.cwd(), 'builder.config.js'));

const { builder } = require('./builders');

if (config.interpreter) {
	config.interpreter.forEach((interpreter) => {
		const input = join(srcDir, interpreter.input);
		const output = join(distDir, interpreter.output);

		builder(input, output, interpreter.type);
	});
}
