const { join } = require('path');
const fs = require('fs-extra');
const util = require('util');

const minify = require('minify');
const sass = require('sass');
const chalk = require('chalk');

const sassRender = util.promisify(sass.render);

const { performance } = require('perf_hooks');

const sassExtension = '.sass';

const config = require(join(process.cwd(), 'builder.config.js'));

/**
 * Compiles files in a directory to a given directory
 * @param {string} dir - The input directory
 * @param {string} outPath - The output directory
 * @param {'sass' | 'js' | 'html' | 'other' | 'file'} fileType - The file type
 * @returns
 */
const builder = async (path, outPath, fileType) => {
	const isDirectory = (await fs.lstat(path)).isDirectory();

	if (isDirectory) {
		if (fileType === 'other') {
			await fs.copy(path, outPath);
			return;
		}

		let files = await fs.readdir(path);

		// Filter out other files
		files = files.filter((file) => file.endsWith(fileType));

		// Minify the files & write them to the build directory
		files.forEach((file) => fileBuilder(join(path, file), outPath, fileType));
	} else {
		fileBuilder(path, outPath, fileType);
	}
};

/**
 * Compiles a file
 * @param {string} file - The input files path
 * @param {'sass' | 'js' | 'html' | 'css' | 'file'} fileType - The file type
 */
const fileBuilder = async (file, outPath, fileType) => {
	const t0 = performance.now();

	const compiled = await compile(file, fileType);

	if (compiled) {
		if (fileType === 'sass') {
			file = file.replace(sassExtension, '.min.css');
		}

		const path = file.split('/');
		const fileName = path[path.length - 1];

		const withPaths = replaceFileContents(compiled);

		await fs.ensureDir(outPath);

		await fs.writeFile(join(outPath, fileName), withPaths);

		const t1 = performance.now();

		console.log(`${chalk.gray(fileName)} ${Math.round(t1 - t0)}ms`);
	}
};

/**
 * Compiles a string of data given its type.
 * @param {string} data
 * @param {'sass' | 'js' | 'html' | 'css' | 'file'} fileType
 * @returns {Promise<string>} The compiled data
 */
const compile = async (file, fileType) => {
	switch (fileType) {
		case 'sass':
			const data = await sassRender({ file, outputStyle: 'compressed' });

			return data.css.toString();
		case 'js':
		case 'css':
		case 'html':
			return await minify(file).catch((err) =>
				console.log('Error compiling file ' + file + ':' + err)
			);
		default:
			return await fs.readFile(file, { encoding: 'utf-8' });
	}
};

/**
 * Replaces all specified paths in builder.config.js with their definitions
 * @param {string} data - The data that needs its paths replaced
 * @returns
 */
const replaceFileContents = (data) => {
	if (config.paths) {
		Object.keys(config.paths).forEach((key) => {
			data = data.replace(new RegExp(key, 'g'), '/' + config.paths[key]);
		});
	}

	data = data.replace(new RegExp(sassExtension, 'g'), '.min.css');

	if (process.env.TARGET_BROWSER != 'chrome') {
		data = data.replace(new RegExp('chrome.', 'g'), 'browser.');
	}

	return data;
};

module.exports = {
	builder,
	fileBuilder,
};
