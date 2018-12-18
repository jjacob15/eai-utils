const merge = require('webpack-merge');
const common = require('./webpack.dll.common.js');

module.exports = merge(common, {

    mode: 'development',

});