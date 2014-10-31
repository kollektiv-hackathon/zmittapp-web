'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});

gulp.task('styles', function () {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.rubySass({style: 'expanded'}))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});

gulp.task('scripts', function () {
  return gulp.src('app/scripts/**/*.js')
    //.pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.size());
});

gulp.task('views', function () {
  return gulp.src('app/views/**/*.html')
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.ngHtml2js({
      moduleName: 'schiri',
      prefix: 'views/'
    }))
    .pipe(gulp.dest('.tmp/views'))
    .pipe($.size());
});

gulp.task('html', ['styles', 'scripts', 'views'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  return gulp.src('app/*.html')
    .pipe($.inject(gulp.src('.tmp/views/**/*.js'), {
      read: false,
      starttag: '<!-- inject:views -->',
      addRootSlash: false,
      addPrefix: '../'
    }))
    .pipe($.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    //.pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.replace('bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap','fonts'))
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe($.useref.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

gulp.task('videos', function () {
  return gulp.src('app/videos/**/*')
    .pipe(gulp.dest('dist/videos'))
    .pipe($.size());
});

gulp.task('videoshtaccess', function () {
  return gulp.src('app/videos/.htaccess')
    .pipe(gulp.dest('dist/videos'))
    .pipe($.size());
});

gulp.task('dunnoindex', function () {
  return gulp.src('app/robots.txt')
    .pipe(gulp.dest('dist/'))
    .pipe($.size());
});

gulp.task('actions', function () {
  return gulp.src('app/actions/**/*')
    .pipe(gulp.dest('dist/actions'))
    .pipe($.size());
});

gulp.task('rewrite', function () {
  return gulp.src('app/.htaccess')
    .pipe(gulp.dest('dist/'))
    .pipe($.size());
});

gulp.task('api', function () {
  return gulp.src('app/api/*')
    .pipe(gulp.dest('dist/api'))
    .pipe($.size());
});

gulp.task('static', function () {
  return gulp.src('app/static/**/*')
    .pipe(gulp.dest('dist/static'))
    .pipe($.size());
});

gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size());
});

gulp.task('clean', function () {
  return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.rimraf());
});

gulp.task('build', ['html', 'views', 'images', 'videos', 'videoshtaccess', 'actions', 'rewrite', 'dunnoindex', 'api', 'static', 'fonts']);
