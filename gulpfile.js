var gulp = require('gulp'),
  path = {
    source: 'src',
    scripts: 'src/**/*.js',
    html: ['index.html', 'src/**/*.html'],
    output:'dist/',
    css: 'css/*.css',
    bundle: 'bundle/',
    appmodule: 'src/app'
  },
  bundleTask = require('./tasks/bundle')(path),
  watchTask = require('./tasks/watch')(path),
  coverTask = require('./tasks/cover')(path);

gulp.task('default', ['watch']);
