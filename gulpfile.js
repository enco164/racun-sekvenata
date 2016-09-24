/**
 * Created by enco on 24.9.16..
 */
var gulp = require('gulp');

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var tsify = require('tsify');
var del = require('del');
var debowerify = require('debowerify')

var config = {
    buildPath: __dirname + '/build',
    app: {
        path: __dirname + '/src',
        main: 'index.ts',
        result: 'application.js'
    }
};

gulp.task('build', function() {
    var bundler = browserify({basedir: config.app.path})
        .add(config.app.path + '/' + config.app.main)
        .plugin(tsify)
        .transform(debowerify);

    return bundler.bundle()
        .pipe(source(config.app.result))
        .pipe(gulp.dest(config.buildPath));
});

gulp.task('clean', function(cb) {
    del(['./build'], {
        force: true
    }, cb);
});