const chokidar = require('chokidar');
const { join } = require('path');

const { fileBuilder } = require('./builders');

const config = require(join(process.cwd(), 'builder.config.js'));

const srcDir = join(process.cwd(), config.root);
const distDir = join(process.cwd(), config.out);

const watcher = chokidar.watch(srcDir, {
	persistent: true,
});

// Check for changes in the src directory
watcher.on('change', async (path) => {
	const relativePath = path.replace(srcDir + '/', '');

	const splittedPath = relativePath.split('/');

	splittedPath.pop();

	const conf = config.interpreter.find((conf) => conf.input == (splittedPath.join('/') || '.'));

	if (conf) {
		const fileType = path.split('.').pop();
		const outPath = join(distDir, conf.output);

		await fileBuilder(path, outPath, fileType);
	}
});
