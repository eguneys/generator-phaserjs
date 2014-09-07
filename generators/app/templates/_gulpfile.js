'use strict';

// npm install --save-dev gulp gulp-load-plugins gulp-changed gulp-imagemin gulp-livereload gulp-webserver gulp-util gulp-jshint jshint-stylish rimraf mv merge-stream run-sequence bower-requirejs requirejs

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var rimraf = require('rimraf');
var runSequence = require('run-sequence');

var paths = {
    src: {
        common: 'app'
    },
    dist: 'public'
};

/** Build **/

gulp.task('clean', function(cb) {
    rimraf(paths.dist, cb);
});

gulp.task('build-data', function() {
    return gulp.src(paths.src.common + '/data/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(paths.dist + '/data'));
});

gulp.task('build-extras', function() {
    gulp.src(paths.src.common + '/*.*')
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build-commonjs', function() {
    var mergeStream = require('merge-stream');

    var bowers = gulp
            .src([paths.src.common + '/bower_components/**/*.js'])
            .pipe($.changed(paths.dist + '/scripts/lib'))
            .pipe(gulp.dest(paths.dist + '/scripts/lib'));

    var common = gulp.src([paths.src.common + '/scripts/**/*.js'])
            .pipe($.changed(paths.dist + '/scripts/app'))
            .pipe(gulp.dest(paths.dist + '/scripts/app'));

    return mergeStream([bowers, common]);
});

gulp.task('build-requirejs', ['build-scripts'], function(cb) {
    var requirejs = require('requirejs');

    var config = {
        baseUrl: paths.dist + '/scripts/lib',
        mainConfigFile: paths.src.common + '/scripts/common.js',
        include: ['almond', 'app/lib_main'],
        out: 'public/lib/common.js',
        wrap: {
            startFile: 'build/wrap.start',
            endFile: 'build/wrap.end'
        }
    };

    requirejs.optimize(config, function() {
        cb();
    });
});

gulp.task('build-scripts', ['build-commonjs']);

gulp.task('build', function(cb) {
    runSequence('clean', 'jshint-fail', 'build-requirejs', cb);
});

gulp.task('default', ['build']);

gulp.task('build-dev', function(cb) {
    runSequence('clean', 'jshint', 'build-scripts', 'build-extras', cb);
});

gulp.task('server', ['build-dev', 'watch']);

/** Lint, Inject **/

gulp.task('jshint', function() {
    return gulp.src(['gulpfile.js',
                     'app/**/*.js',
                     '!app/bower_components/**'])
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('jshint-fail', function() {
    return gulp.src(['gulpfile.js',
                     'app/**/*.js',
                     '!app/bower_components/**'])
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('bower-rjs', function(cb) {
    var bowerRjs = require('bower-requirejs');

    bowerRjs({
        config: paths.src.common + '/scripts/common.js',
        baseUrl: paths.src.common + '/bower_components'
    }, cb);
});

/** Serve, Watch **/

gulp.task('serve', ['build-dev'], function() {
    gulp.src('public')
        .pipe($.webserver({
            host: '0.0.0.0',
            port: 3000,
            livereload: true,
            fallback: 'index.html'
        }));
});

gulp.task('watch', ['serve'], function() {
    gulp.watch(paths.src.common + '/scripts/**/*.js', ['build-commonjs']);

    gulp.watch(paths.src.common + '/*.*', ['build-extras']);
    
    gulp.watch('bower.json', ['bower-rjs']);

    gulp.watch('gulpfile.js', function() {
        console.log($.util.colors.red('\n----------' +
                                      '\nRestart the Gulp process' +
                                      '\n----------'));
    });
});
