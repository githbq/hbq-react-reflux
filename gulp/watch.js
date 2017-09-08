/**
 *  监听src目录下文件变化
 */

var gulp = require('gulp');
var config = require('./config');

gulp.task('watch', function() {
    global.isWatch = true;
    gulp.watch(config.path.src + '/**').on('change', function(file) {
        gulp.start('reload');
    })
});
