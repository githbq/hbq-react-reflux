/**
 * 
 */

var gulp = require('gulp');
var webpack = require('webpack');
var $ = require('gulp-load-plugins')();
var config = require('./config');

var param = process.argv.slice(2);
var webpackMap = {
	dev: './webpack.config.js',
	build: './webpack.build.js'
};
var configFile = webpackMap[param];
configFile = configFile || './webpack.config.js';
var webpackConfig = require(configFile);

gulp.task('webpack', function() {
    if (global.isWatch) {
        webpackConfig.plugins = webpackConfig.plugins.slice(0, 2);
    }
    return gulp.src(webpackConfig.entry.app)
        .pipe($.webpack(webpackConfig, webpack))
        .pipe(gulp.dest(config.path.build));
});