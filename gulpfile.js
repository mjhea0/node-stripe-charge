// gulp and plugins

const gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  eslint = require('gulp-eslint'),
  mocha = require('gulp-mocha'),
  babel = require('gulp-babel');


// tasks

gulp.task('lint', () => {
  gulp.src(['./src/server/**/*.js', './public/js/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('babel', () => {
  gulp.src('./src/client/src-js/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./src/client/js'));
});


// default task

gulp.task('default', ['lint', 'babel'], () => {
  nodemon({
    script: './src/server/bin/www',
    ext: 'html js',
    ignore: ['ignored.js']
  })
    .on('change', ['lint', 'babel'])
    .on('restart', () => {
      console.log('restarted!');
    });
});
