'use strict';

// Require our Gulp Plugins
const gulp        = require('gulp'),
      sourcemaps  = require('gulp-sourcemaps'),
      source      = require('vinyl-source-stream'),
      buffer      = require('vinyl-buffer'),
      browserify  = require('browserify'),
      notify      = require('gulp-notify'),
      babel       = require('babelify'),
      chalk       = require('chalk'),
      sass        = require('gulp-sass'),
      sassImport  = require('sass-module-importer'),
      plumber     = require('gulp-plumber'),
      watch       = require('gulp-watch'),
      browserSync = require('browser-sync').create();

// Function to handle errors.
// Prevents Gulp from stopping.
var handleError = function(err) {
  notify.onError("Error, check terminal for details.")(err);
  console.log(chalk.white.bgRed(' ------------------------------ '));
  console.log(chalk.white(err.message));
  console.log(chalk.white.bgRed(' ------------------------------ '));
  this.emit('end');
}

// Converts SASS into CSS
gulp.task('sass', () => {
  gulp.src('./src/sass/style.scss')
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass({ importer: sassImport() }).on('error', handleError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/css'));
});

// Converts ES2015+ to ES5 & Supports Modules
gulp.task('browserify', () => {
  return browserify('./src/js/app.js', {debug: true})
    .transform(babel)
    .bundle()
    .on('error', handleError)
    .pipe(source('./bundle.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/js'));
});

//  .html files
gulp.task('views', () => {
  return gulp.src(['./src/*.html'])
    .pipe(gulp.dest('./app'));
});

// Watches our .scss & .js files for change
gulp.task('watch', () => {
  console.log('watch running');
  watch('./src/sass/**/*.scss', () => gulp.start('sass'));
  watch(['./src/js/**/*.js', './package.json'], () => gulp.start('browserify'));
  watch('./src/*.html', () => gulp.start('views'));
  watch('./app/**/**', () => browserSync.reload());
});

// Runs a simple browser sync server
gulp.task('server', function(done) {
  browserSync.init({
    server: "./app",
    port: 8080,
    open: false,
    notify: false
  });
});

// Builds our app
gulp.task('build', ['sass', 'browserify', 'views']);

// Starts the development process
gulp.task('start', ['build', 'watch', 'server']);

// Default
gulp.task('default', ['build']);