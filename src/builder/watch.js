const chokidar = require('chokidar');
const { join } = require('path');

const srcDir = join(process.cwd(), 'src');

const watcher = chokidar.watch(srcDir, {
    persistent: true
});

// Check for changes in the src directory
watcher.on('change', (path) => {
    const fileExtension = path.split('.').pop();
})