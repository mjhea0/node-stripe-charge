// *** dependencies *** //

const path = require('path');
const gulp = require('gulp');
const jshint = require('gulp-jshint');
const jscs = require('gulp-jscs');
const runSequence = require('run-sequence');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const server = require('tiny-lr')();

// *** config *** //

const paths = {
  scripts: [
    path.join('src', '**', '*.js'),
    path.join('src', '*.js')
  ],
  styles: [
    path.join('src', 'client', 'css', '*.css')
  ],
  views: [
    path.join('src', 'server', '**', '*.html'),
    path.join('src', 'server', '*.html')
  ],
  server: path.join('src', 'server', 'server.js')
};

const lrPort = 35729;

const nodemonConfig = {
  script: paths.server,
  ext: 'html js css',
  ignore: ['node_modules'],
  env: {
    NODE_ENV: 'development'
  }
};

// *** default task *** //

gulp.task('default', () => {
  runSequence(
    ['jshint'],
    ['jscs'],
    ['lr'],
    ['nodemon'],
    ['watch']
  );
});

// *** sub tasks ** //

gulp.task('jshint', () => {
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(jshint({
      esnext: true
    }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', () => {
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'));
});

gulp.task('styles', () => {
  return gulp.src(paths.styles)
    .pipe(plumber());
});

gulp.task('views', () => {
  return gulp.src(paths.views)
    .pipe(plumber());
});

gulp.task('lr', () => {
  server.listen(lrPort, (err) => {
    if (err) {
      return console.error(err);
    }
  });
});

gulp.task('nodemon', () => {
  return nodemon(nodemonConfig);
});

gulp.task('watch', () => {
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.scripts, ['jshint', 'jscs']);
  gulp.watch(paths.styles, ['styles']);
});
