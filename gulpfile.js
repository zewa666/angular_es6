var gulp = require('gulp'),
  path = {
    source:'src/**/*.js',
    html: ['index.html', 'src/**/*.html'],
    output:'dist/',
    sourceMapPaths: '../src/',
    css: 'css/*.css',
    bundle: 'bundle/',
    appmodule: 'src/app'
  },
  bundleTask = require('./tasks/bundle')(path),
  watchTask = require('./tasks/watch')(path);

gulp.task('default', ['watch']);
