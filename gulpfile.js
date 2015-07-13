var gulp = require('gulp');
var sass = require('gulp-sass');
var spawn = require('child_process').spawn;
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var del = require('del');

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = '_site/'


// Run Jekyll Build Asynchronously
gulp.task('jekyll', ['sass', 'bower', 'scripts'], function () {
  var jekyll = spawn('jekyll', ['build']);

  jekyll.on('exit', function (code) {
    console.log('-- Finished Jekyll Build --');
    reload();
  })
});


// Compile SASS
gulp.task('sass', function(cb) {
  return gulp.src('_scss/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('css'))
  .pipe(gulp.dest('_site/css'))
  .pipe(reload({stream: true}, cb));
});

gulp.task('bower', function(cb) {
  return gulp.src([
    'bower_components/bootstrap-sass/assets/fonts/bootstrap/*',
    'bower_components/fontawesome/fonts/*',
    'bower_components/animate.css/animate.min.css',
    'bower_components/dropzone/dist/basic.css',
    'bower_components/dropzone/dist/dropzone.css'
  ], {base: '.'})
  .pipe(gulp.dest('css'), cb);
});

gulp.task('scripts', function(cb) {
  return gulp.src([
    'bower_components/jquery/dist/*.min.js',
    'bower_components/pace/*.min.js',
    'bower_components/bootstrap-sass/assets/javascripts/*.min.js',
    'bower_components/wow/dist/*.min.js',
    'bower_components/animated-header/js/animated-header.js',
    'bower_components/metisMenu/dist/*.min.js',
    'bower_components/slimscroll/*.min.js',
    'bower_components/flot/jquery.flot.js',
    'bower_components/flot.tooltip/js/jquery.flot.tooltip.min.js',
    'bower_components/flot-spline/js/jquery.flot.spline.min.js',
    'bower_components/flot/jquery.flot.resize.js',
    'bower_components/flot/jquery.flot.pie.js',
    'bower_components/flot/jquery.flot.symbol.js',
    'bower_components/flot.curvedlines/curvedLines.js',
    'bower_components/peity/jquery.peity.min.js',
    'bower_components/chartJs/chartJs.min.js'
  ])
  .pipe(gulp.dest('js/vendor'), cb);
});

gulp.task('clean', function (cb) {
  del([
    'css/*.css',
    'js/portal.*',
    '_site'
  ], cb);
});

gulp.task('portal', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './_includes/portal/js/portal.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('portal.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      // Add transformation tasks to the pipeline here.
      .pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./js/'));
});

  // Run static file server
  gulp.task('serve', ['jekyll'], function() {
    browserSync({
      open: false,
      server: {
        baseDir: EXPRESS_ROOT,
        port: EXPRESS_PORT
      }
    });
  });

  // Watch for changes
  gulp.task('watch', function () {
    // Manually compile and inject css to avoid jekyll overhead, and utilize livereload injection
    gulp.watch('./_scss/**/*.scss', ['sass']);

    gulp.watch('./_includes/portal/js/**', ['portal']);

    // Watch for changes to other files for jekyll compilation
    // Note: This will probably need to be updated with the files you want to watch
    // Second Note: MAKE SURE that the last to items in the watchlist are included or else infinite jekyll loop
    gulp.watch(['*.html', '**/*.html', 'js/*.js', '*/*.md', '!_site/**', '!_site/*/**'], ['jekyll']);
  })


  gulp.task('default', ['portal', 'jekyll', 'serve', 'watch']);
