const webpack = require('webpack');
const path = require('path'); //absolute path for output
const inProduction = process.env.NODE_ENV === 'production';

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
            },
            {
                //All js files except node_modules will be transformed through babel-loader
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    //webpack plugins
    plugins: [

    ]
};

// if production build it will minify the code.
if(inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin() //minify code
    )
}

