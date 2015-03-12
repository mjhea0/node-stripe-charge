var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint');

gulp.task('lint', function () {
  gulp.src('./server/**/*.js')
    .pipe(jshint());
});

gulp.task('default', function () {
  nodemon({ script: './server/bin/www', ext: 'html js', ignore: ['ignored.js'] })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!');
    });
});