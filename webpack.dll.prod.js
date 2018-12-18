const merge = require('webpack-merge');
const common = require('./webpack.dll.common.js');
const webpack = require('webpack');

module.exports = merge(common, {

    mode: 'production',

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
});