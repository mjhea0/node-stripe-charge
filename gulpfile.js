var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha');

gulp.task('lint', function () {
  gulp.src('./server/**/*.js')
    .pipe(jshint());
});

gulp.task('test', function () {
  return gulp.src('./test/*.js', {read: false})
    .pipe(mocha())
    .once('error', function () {
      process.exit(1);
    })
    .once('end', function () {
      process.exit(0);
    });
});

gulp.task('default', function () {
  nodemon({ script: './server/bin/www', ext: 'html js', ignore: ['ignored.js'] })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!');
    });
});