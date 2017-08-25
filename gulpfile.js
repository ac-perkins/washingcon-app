/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    postcss = require('gulp-postcss'),
    cssnano = require('cssnano'),
    autoprefixer = require('autoprefixer');

// create a default task and just log a message

gulp.task('copyHtml', function() {
  // copy any html files in src/ to build/
  return gulp.src('src/*.html').pipe(gulp.dest('build'));
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-js', function() {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

// gulp.task('build-css', function() {
//   return gulp.src('source/scss/**/*.scss')
//   .pipe(sourcemaps.init())  // Process the original sources
//     .pipe(sass())
//   .pipe(sourcemaps.write()) // Add the map to modified source.
//   .pipe(gulp.dest('public/assets/stylesheets'));
// });

gulp.task('build-css', function () {
    var processors = [
        autoprefixer,
        cssnano
    ];
    return gulp.src('source/scss/**/*.scss')
        .pipe(sourcemaps.init())  // Process the original sources
          .pipe(sass().on('error', sass.logError))
          .pipe(postcss(processors))
        .pipe(sourcemaps.write()) // Add the map to modified source.
        .pipe(gulp.dest('build/css'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['jshint']);
  gulp.watch('src/**/*.js', ['build-js']);
  gulp.watch('src/scss/**/*.scss', ['build-css']);
});
