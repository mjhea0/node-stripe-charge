// gulp

var gulp = require('gulp');

// plugins

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha');


// lint

gulp.task('lint', function() {
  gulp.src(['./src/server/**/*.js', './public/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});


// default task

gulp.task('default', ['lint'], function () {
  nodemon({ script: './src/server/bin/www', ext: 'html js', ignore: ['ignored.js'] })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!');
    });
});