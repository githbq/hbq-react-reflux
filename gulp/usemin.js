var path = require('path');
var gulp = require('gulp');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var collector = require('gulp-rev-collector');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var config = require('./config');
var buildPath = config.path.build;

gulp.task('usemin', function() {
    return gulp.src(config.path.html)
        .pipe(usemin())
        .pipe(gulp.dest('build/'));
});

gulp.task('md5', function() {
    return gulp.src('./build/**/vendors.js')
        .pipe(clean())
        .pipe(rev())
        .pipe(uglify())
        .pipe(gulp.dest(buildPath))
        .pipe(rev.manifest())
        .pipe(gulp.dest(buildPath + '/rev/'));
});

gulp.task('collector', function() {
    return gulp.src([buildPath + '/rev/*.json', buildPath + '/*.html'])
        .pipe(collector({
            replaceReved: true
        }))
        .pipe(gulp.dest(buildPath));
});