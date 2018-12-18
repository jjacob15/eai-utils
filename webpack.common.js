/**
 * Created by John.Doe on 7/9/2018.
 */
const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const outputDirectory = 'dist';

const config = {
    entry: {
        app: "./src/client/Root.jsx",
    },
    output: {
        path: path.join(__dirname, outputDirectory),
        publicPath: '/',
        filename: "./app.js"
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                use: [{
                    loader: "babel-loader",
                }]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './assets/images/'
                    }
                }]
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/,
                use: [{ loader: 'url-loader' }]
            }
        ]
    },
    externals: {
        d3: 'd3'
    },
    resolve: {
        mainFiles: ['index.js', 'Index.jsx'],
        modules: [path.resolve(__dirname, 'src/client'), 'node_modules'],
        extensions: ['.js', '.json', '.jsx'],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                API_PATH: JSON.stringify(process.env.API_PATH || 'http://localhost:3000') 
            }
        }),
        new CaseSensitivePathsPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "./assets/css/[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require('./' + outputDirectory + '/react-manifest.json')
        }),
        new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require('./' + outputDirectory + '/utility-manifest.json')
        }),

        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
    ]

};

module.exports = config;