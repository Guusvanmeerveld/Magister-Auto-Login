const fs = require('fs-extra');
const { join } = require('path');

const minify = require('minify');
const sass = require('sass');
const chalk = require('chalk');

const { performance } = require('perf_hooks');

const sassExtension = '.sass';

const config = require(join(process.cwd(), 'builder.config.js'));

/**
 * Compiles files in a directory to a given directory
 * @param {string} dir - The input directory
 * @param {string} outDir - The output directory
 * @param {string} fileExtension - The file extension
 * @returns
 */
const builder = (dir, outDir, fileExtension) =>
    dirChecker(outDir, () =>
        fs.readdir(dir, (err, files) => {
            if (err) throw new Error(err);

            // Filter out other files
            files = files.filter((file) => file.endsWith(fileExtension));

            // Minify the files & write them to the build directory
            files.forEach((file) => {
                const t0 = performance.now();

                compile(join(dir, file), fileExtension, (data) => {
                    const withPaths = replacePaths(data);

                    if (fileExtension === 'sass') {
                        file = file.replace(sassExtension, '.min.css');
                    }

                    fs.writeFile(join(outDir, file), withPaths, (err) => {
                        if (err) throw new Error(err);

                        const t1 = performance.now();

                        console.log(`${chalk.gray(file)} ${Math.round(t1 - t0)}ms`);
                    });
                });
            });
        })
    );

/**
 * Compiles a string of data.
 * @param {string} data
 * @param {'sass' | 'js' | 'html'} type
 * @param {(data) => void}  callback
 */
const compile = (file, type, callback) => {
    switch (type) {
        case 'sass':
            sass.render({ file, outputStyle: 'compressed' }, (err, data) =>
                callback(data.css.toString())
            );

            return;
        default:
            return minify(file).then(callback).catch((err) => console.log('Error compiling file ' + file + ':' + err))

    }
};

/**
 * Compiles a file
 * @param {string} file - The input file
 */
const fileBuilder = (file, output) =>
    fs.readFile(file, { encoding: 'utf-8' }, (err, data) => {
        if (err) throw new Error(err);

        const t0 = performance.now();

        const withPaths = replacePaths(data);

        fs.writeFile(output, withPaths, (err) => {
            if (err) throw new Error(err);

            const t1 = performance.now();

            const path = file.split('/');
            const fileName = path[path.length - 1];

            console.log(`${chalk.gray(fileName)} ${Math.round(t1 - t0)}ms`);
        });
    });

/**
 * Replaces all specified paths in builder.config.js with their definitions
 * @param {string} data - The data that needs its paths replaced
 * @returns
 */
const replacePaths = (data) => {
    if (config.paths) {
        Object.keys(config.paths).forEach((key) => {
            data = data.replace(new RegExp(key, 'g'), '/' + config.paths[key]);
        });

        data = data.replace(sassExtension, '.min.css');
    }

    return data;
};

/**
 * Checks if a directory exists and creates it if it doesn't.
 * @param {string} dir - The directory to check
 * @param {() => void} callback - The callback function
 */
const dirChecker = (dir, callback) => {
    if (!fs.existsSync(dir)) {
        fs.mkdir(dir, { recursive: true }, () => callback());
    } else {
        callback();
    }
};

module.exports = {
    builder,
    fileBuilder,
};
