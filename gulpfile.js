/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    browserSync = require('browser-sync').create(),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    postcss = require('gulp-postcss'),
    cssnano = require('cssnano'),
    autoprefixer = require('autoprefixer');

// create a default task and just log a message

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
  });
});

gulp.task('copyHtml', function() {
  // copy any html files in src/ to build/
  return gulp.src('src/**/*.html').pipe(gulp.dest('build'));
});

gulp.task('copy-images', function() {
  return gulp.src('src/**/*.{png,jpg}').pipe(gulp.dest('build'));
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-js', function() {
  return gulp.src(['src/app/app.module.js', 'src/**/*.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('app.js', {newLine: ';'}))
      .pipe(uglify())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('build/js'));
});


gulp.task('build-css', function () {
    var processors = [
        autoprefixer,
        cssnano
    ];
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())  // Process the original sources
          .pipe(sass().on('error', sass.logError))
          .pipe(postcss(processors))
        .pipe(sourcemaps.write('../maps')) // Add the map to modified source.
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({
          stream: true
        }));
});

gulp.task('build', ['jshint', 'copyHtml', 'copy-images', 'build-css', 'build-js']);

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', ['browserSync', 'build-css'], function() {
  gulp.watch('src/**/*.js', ['jshint']);
  gulp.watch('src/**/*.html', ['copyHtml']);
  gulp.watch('src/**/*.{png,jpg}', ['copy-images']);
  gulp.watch('src/**/*.js', ['build-js']);
  gulp.watch('src/scss/**/*.scss', ['build-css']);
  gulp.watch('build/**/*.html', browserSync.reload);
  gulp.watch('build/**/*.js', browserSync.reload);
});
