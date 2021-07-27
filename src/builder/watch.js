const chokidar = require('chokidar');
const { join } = require('path');

const { fileBuilder } = require('./builders');

const { interpreter } = require(join(process.cwd(), 'builder.config.js'));

const srcDir = join(process.cwd(), 'src');
const distDir = join(process.cwd(), 'dist');

const watcher = chokidar.watch(srcDir, {
	persistent: true,
});

// Check for changes in the src directory
watcher.on('change', async (path) => {
	const relativePath = path.replace(srcDir + '/', '');

	const splittedPath = relativePath.split('/');

	splittedPath.pop();


	const config = interpreter.find((conf) => conf.input == (splittedPath.join('/') || '.'));

	if (config) {
		const fileType = path.split('.').pop();
		const outPath = join(distDir, config.output);

		await fileBuilder(path, outPath, fileType);
	}
});
