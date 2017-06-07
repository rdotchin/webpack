const webpack = require('webpack');
const path = require('path'); //absolute path for output
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const inProduction = process.env.NODE_ENV === 'production';


module.exports = {
    entry: {
            app: [
                './src/main.js',
                './src/main.scss' //main.scss entry point
            ]
        },
    output: {
        path: path.resolve(__dirname, './dist'), //would be path.resolve(__dirname, './dist') if sourcing to index.html in root
        filename: '[name].js' //will take the app name from entry
    },
    module: {
        rules: [
            {
                //using code splitting to extras the css
                test: /\.s[ac]ss$/, //extract files with .sass or .scss
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'], //sass-loader compiles Sass to css
                    fallback: 'style-loader' //any css that is not extracted we will fallback to use style-loader
                })
                /*in webpack it goes right to left.
                *sass-loader: This will compile Sass files to CSS (sass-loader),
                *css-loader: updates imports and urls calls wraps css in a common js file so wepback can read it
                * style-loader: physically injects it into the DOM*/
            },

            /*look for these file types and use either:
            *url-loader: if file is small enough it will load directly to css file, anything over a certain
            size you can instruct where to move it.
            *file-loader: allows you to move a file and will rewrite url in css/js to point to image
            * raw-loader:
            */
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[hash].[ext]' //can add hash for cache busting
                }
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
        new ExtractTextPlugin('[name].css'), //extract CSS to a dedicated traditional stylesheet

        new webpack.LoaderOptionsPlugin({
            minimize: inProduction, //if inProduction is true the css will minimize
        }),
        new HtmlWebpackPlugin ({
            inject: true,
            template: './index.html'
        }),
        //clean up any unused css code
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'index.html')),
            minimize: inProduction
        })
    ]
};

// if production build it will minify the code.
if(inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin() //minify code
    )
}


/*
SASS
{
    test: /\.s[ac]ss$/, //look for either .sass or .scss
        use: ['style-loader', 'css-loader', 'sass-loader'] //sass-loader compiles Sass to css
    /!*in webpack it goes right to left.
     *sass-loader: This will compile Sass files to CSS (sass-loader),
     *css-loader: updates imports and urls calls wraps css in a common js file so wepback can read it
     * style-loader: physically injects it into the DOM*!/
}*/

/*
CSS (inline all CSS into the page using style-loader)
{
    //use css-loader to transform any stylesheets webpack comes across
     test: /\.css$/,
     use: ['style-loader', 'css-loader']
     //first pipe css-loader to read css files second pipe style-loader to inject css to the html page
 },*/

/*
 //ex. if you have images in dist folder but not src, this will ignore urls in .js and .scss files
use: [
    {
        loader: 'css-loader',
        options: {url: false}
    },
    'sass-loader'
],  */