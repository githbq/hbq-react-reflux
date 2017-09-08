var fs = require('fs');
var path = require('path');

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var config = require('./config');
var extend = require('./extend');
var loaders = require('./loaders');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: extend({
        app: [config.path.src + '/app.js']
    }),
    output: {
        path: __dirname + config.path.build,
        // 根据线上环境添加域名及base路径前缀
        // publicPath: '/op/demo/build/',
        filename: config.path.jsdir + '[name]-[chunkhash:10].js',
    },
    externals: [require('./externals')],
    resolve: require('./resolve'),
    watch: false,
    module: {
        loaders: loaders
    },
    postcss: function () {
        return [autoprefixer];
    },
    plugins: [
        // css打包
        new ExtractTextPlugin('[name]-[chunkhash:10].css', {
            allChunks: true
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false,
                drop_console: true
            },
            output: {
                comments: false
            }
        }),
        // html模板自动注入打包后的文件
        new HtmlWebpackPlugin({
            template: './build/index.html',
            filename: './index.html',
            inject: 'body'
        })
    ]
}