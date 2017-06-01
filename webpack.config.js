const webpack = require('webpack');
const path = require('path'); //absolute path for output

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    }
};