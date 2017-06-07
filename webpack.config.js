const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const inProduction = process.env.NODE_ENV === 'production';


module.exports = {
    entry: {
            app: [
                './src/main.js',
                './src/main.scss'
            ]
        },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                use: 'file-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[hash].[ext]'
                        }
                    },
                    'img-loader'
                ],

            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].[hash].css'),

        new webpack.LoaderOptionsPlugin({
            minimize: inProduction,
        }),
        new HtmlWebpackPlugin ({
            inject: true,
            template: './index.html'
        }),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'index.html')),
            minimize: inProduction
        }),
        new CleanWebpackPlugin('dist', {
                root:     __dirname,
                verbose:  true,
                dry:      false
            }
        ),
    ]
};

// if production build it will minify the code.
if(inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin() //minify code
    )
}