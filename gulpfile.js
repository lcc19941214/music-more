var gulp = require('gulp');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');
var shell = require('gulp-shell');

var devPath = './dev';
var distPath = './static';

gulp.task('webpack', function() {
  return gulp
    .src(devPath)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(distPath))
});

gulp.task('images', function() {
  return gulp
    .src(devPath + '/images/*.*')
    .pipe(gulp.dest(distPath + '/images'));
});

gulp.task('fonts', function() {
  return gulp
    .src(devPath + '/fonts/*.*')
    .pipe(gulp.dest(distPath + '/fonts'));
});

gulp.task('clean', function() {
  return gulp
    .src(distPath, { read: false })
    .pipe(shell('rm -rf ' + distPath));
});

gulp.task('start', ['images', 'fonts', 'webpack']);
