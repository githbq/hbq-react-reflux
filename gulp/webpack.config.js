var fs = require('fs');
var path = require('path');

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var config = require('./config');
var extend = require('./extend');
var loaders = require('./loaders');

module.exports = {
    entry: extend({
        app: [config.path.src + '/app.js']
    }),
    output: {
        path: __dirname + config.path.build,
        //publicePath: '/op/demo/build',
        filename: config.path.jsdir + '[name].js'
    },
    externals: [require('./externals')],
    resolve: require('./resolve'),
    watch: false,
    module: {
        loaders: loaders
    },
    postcss: function() {
      return [autoprefixer];
    },
    plugins: [
        // css打包
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        }),
        new webpack.optimize.DedupePlugin(),
        // html模板自动注入打包后的文件
        new HtmlWebpackPlugin({
            template: './build/index.html',
            filename: './index.html',
            inject: 'body'
        })
    ]
}