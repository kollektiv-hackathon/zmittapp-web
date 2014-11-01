'use strict';

var gulp = require('gulp');

gulp.task('watch', ['wiredep', 'styles'] ,function () {
  gulp.watch('app/styles/**/*.scss', ['html']);
  gulp.watch('app/scripts/**/*.js', ['html']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch('app/views/*.html', ['html']);
  gulp.watch('app/index.html', ['html']);
  gulp.watch('bower.json', ['wiredep']);
});
