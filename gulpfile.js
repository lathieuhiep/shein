'use strict';

let gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css'),
    concatCss = require('gulp-concat-css');


// Task sass style them
gulp.task('sass-style-theme', function () {
    return gulp.src('./assets/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'));
});

// Task sass library theme
gulp.task('sass-library-theme', function () {
    return gulp.src('./assets/css/library/*.css')
        .pipe(concatCss("library.min.css"))
        .pipe(minifyCss({
            compatibility: 'ie8',
            level: {1: {specialComments: 0}}
        }))
        .pipe(gulp.dest('./assets/css/'));
});

// Task compress lib js & mini file
gulp.task('compress-js', function () {
    return gulp.src( [
        './assets/js/library/*.js',
    ],  { allowEmpty: true } )
        .pipe(concat('library.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/'));
});