const webpack = require('webpack');
const path = require('path'); //absolute path for output

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { //use css-loader to transform any stylesheets webpack comes across
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
                //first pipe css-loader to read css files second pipe style-loader to inject css to the html page
            }
        ]
    }


};