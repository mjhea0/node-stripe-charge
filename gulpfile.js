// gulp and plugins

const gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  eslint = require('gulp-eslint'),
  mocha = require('gulp-mocha');


// tasks

gulp.task('lint', () => {
  gulp.src(['./src/server/**/*.js', './public/js/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


// default task

gulp.task('default', ['lint'], () => {
  nodemon({
    script: './src/server/bin/www',
    ext: 'html js',
    ignore: ['ignored.js']
  })
    .on('change', ['lint'])
    .on('restart', () => {
      console.log('restarted!');
    });
});
