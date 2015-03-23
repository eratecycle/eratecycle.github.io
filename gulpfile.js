var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var spawn = require('child_process').spawn;
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = '_site/'


// Run Jekyll Build Asynchronously
gulp.task('jekyll', function (cb) {
    var jekyll = spawn('jekyll', ['build']);

    jekyll.on('exit', function (code) {
        console.log('-- Finished Jekyll Build --');
        cb();
    })
});


// Compile SASS
gulp.task('sass', ['jekyll', 'bower'], function(cb) {
  return sass('_scss/styles.scss', { sourcemap: true })
    .pipe(gulp.dest('_site'))
    .pipe(reload({ stream:true }, cb));
});

gulp.task('bower', ['jekyll'], function(cb) {
  return gulp.src([
    'bower_components/bootstrap-sass/assets/fonts/bootstrap/*',
    'bower_components/fontawesome/fonts/*',
    'bower_components/animate.css/*.css'
  ], {base: '.'})
  .pipe(gulp.dest('_site/css'), cb);
});

// Run static file server
gulp.task('serve', ['jekyll', 'sass', 'bower'], function() {
  browserSync({
    server: {
      baseDir: EXPRESS_ROOT,
      port: EXPRESS_PORT
    }
  });
});

// Watch for changes
gulp.task('watch', function () {
    // Manually compile and inject css to avoid jekyll overhead, and utilize livereload injection
    gulp.watch('_scss/*.scss', ['sass']);

    // Watch for changes to other files for jekyll compilation
    // Note: This will probably need to be updated with the files you want to watch
    // Second Note: MAKE SURE that the last to items in the watchlist are included or else infinite jekyll loop
    gulp.watch(['*.html', '*/*.html', '*/*.md', '!_site/**', '!_site/*/**'], ['jekyll', 'sass']);

})


gulp.task('default', ['jekyll', 'sass', 'bower', 'serve', 'watch']);
