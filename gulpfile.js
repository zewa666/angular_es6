var gulp = require('gulp');
var runSequence = require('run-sequence');
var to5 = require('gulp-babel');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var assign = Object.assign || require('object.assign');
var fs = require('fs');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var reload = browserSync.reload;

var path = {
  source:['src/*.js', 'src/**/*.js'],
  html: ['index.html', 'src/**/*.html'],
  output:'dist/',
};

var compilerOptions = {
  filename: '',
  filenameRelative: '',
  blacklist: [],
  modules: 'system',
  sourceMap: true,
  sourceMapName: '',
  sourceFileName: '',
  sourceRoot: '',
  moduleRoot: '',
  moduleIds: false,
  stage: 2,
  optional: [
    "es7.decorators"
  ]
};

var jshintConfig = {esnext:true};

gulp.task('build-system', function () {
  return gulp.src(path.source)
    .pipe(plumber())
    .pipe(changed(path.output, {extension: '.js'}))
    .pipe(to5(assign({}, compilerOptions, {modules:'system'})))
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('build-html', function () {
  return gulp.src(path.html)
    .pipe(changed(path.output, {extension: '.html'}))
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('lint', function() {
  return gulp.src(path.source)
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter(stylish));
});

gulp.task('build', function(callback) {
  return runSequence(
    ['build-system', 'build-html'],
    callback
  );
});

gulp.task('serve', ['build'], function(done) {
  browserSync({
    open: false,
    port: 9000,
    files: {
      src: 'styles/*.css'
    },
    server: {
      baseDir: ['.'],
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

gulp.task('css', function () {
    return gulp.src('styles/*.css')
        .pipe(reload({stream:true}));
});

gulp.task('watch', ['serve'], function() {
  var watcher = gulp.watch([path.source, path.html], ['build']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch("styles/*.css", ['css']);
});

gulp.task('prepare-release', function(callback){
  return runSequence(
    'build',
    'lint',
    callback
  );
});
