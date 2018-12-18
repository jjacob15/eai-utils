const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");

const outputDirectory = 'dist';

module.exports = merge(common, {
    // stats: {
    //     colors: true,
    //     hash: false,
    //     version: false,
    //     timings: false,
    //     assets: true,
    //     chunks: false,
    //     modules: true,
    //     reasons: false,
    //     children: false,
    //     source: false,
    //     errors: true,
    //     errorDetails: false,
    //     // warnings: false,
    //     publicPath: false
    // },

    mode: 'development',

    // plugins: [
    //     new webpack.EnvironmentPlugin({
    //         NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
    //         DEBUG: false,
    //       }),
    // ],

    devServer: {
        contentBase: path.join(__dirname, outputDirectory),
        publicPath: '/',
        port: 3001,
        historyApiFallback: true,
    },
});