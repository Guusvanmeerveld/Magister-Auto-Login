const { join } = require('path');
const fs = require('fs-extra');

const srcDir = join(process.cwd(), 'src');
const distDir = join(process.cwd(), 'dist');

const config = require(join(process.cwd(), 'builder.config.js'));

const { builder, fileBuilder, sassBuilder } = require('./builders');

if (config.interpreter) {
	config.interpreter.forEach((interpreter) => {
		const input = join(srcDir, interpreter.input);
		const output = join(distDir, interpreter.output);

		if (interpreter.type === 'js' || interpreter.type === 'html' || interpreter.type === 'sass') {
			builder(input, output, interpreter.type);
		} else if (interpreter.type === 'file') {
			fileBuilder(input, output);
		} else if (interpreter.type === 'other') {
			fs.copy(input, output);
		}
	});
}
