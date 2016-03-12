'use strict';
// const fs = require('fs');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

var lintPaths = [__dirname + '/test/*.js', __dirname + '/lib/*.js', __dirname + '/module.js'];

gulp.task('eslint', () => {
  gulp.src(lintPaths)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('test', ['eslint'], () => {
  gulp.src(__dirname + '/test/*.js')
  .pipe(mocha());
});

gulp.task('watch', () => {
  gulp.watch(lintPaths, ['test']);
});

gulp.task('default', ['test'], function(){
  console.log('running default tasks');
});
