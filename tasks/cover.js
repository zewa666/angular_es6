var gulp = require('gulp')
  , istanbul = require('gulp-istanbul')
  , isparta = require('isparta');


var path;

module.exports = function (_path_) {
  path = _path_;
};

gulp.task('cover', function(cb) {
  gulp.src([path.scripts, '!src/**/*-spec.js'])
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true,
      babel: { stage: 0 }
    }))
    .pipe(istanbul.hookRequire())
    .pipe(istanbul.writeReports({
      dir: './coverage',
      reportOpts: {dir: './coverage'},
      reporters: ['html']
    }))
    .on('finish', cb)
});