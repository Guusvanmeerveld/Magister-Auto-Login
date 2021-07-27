module.exports = {
    root: 'src',
    out: 'dist',
    paths: {
        "@stylesheets": "css",
        "@scripts": "js",
        "@pages": "html",
        "@icons": "icons",
        "@libraries": "lib"
    },
    interpreter: [
        {
            input: '.',
            output: '.',
            type: 'js',
        },
        {
            input: 'pages/scripts',
            output: 'js',
            type: 'js',
        },
        {
            input: 'pages',
            output: 'html',
            type: 'html',
        },
        {
            input: 'stylesheets',
            output: 'css',
            type: 'sass',
        },
        {
            input: 'icons',
            output: 'icons',
            type: 'other',
        },
        {
            input: 'libraries',
            output: 'lib',
            type: 'css',
        },
        {
            input: 'manifest.json',
            output: '.',
            type: 'file',
        }
    ]
}