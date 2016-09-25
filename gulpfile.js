/**
 * Created by enco on 24.9.16..
 */
var gulp = require('gulp');

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var tsify = require('tsify');
var del = require('del');

var config = {
    buildPath: __dirname + '/build',
    app: {
        path: __dirname + '/src',
        main: 'index.ts',
        result: 'application.js'
    }
};

gulp.task('clean', function(cb) {
    return del(['./build'], {
        force: true
    }, cb);
});

gulp.task('copy-index', ['clean'], function() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest(config.buildPath));
});

gulp.task('build', ['copy-index'], function() {
    var bundler = browserify({basedir: config.app.path, debug: true})
        .add(config.app.path + '/' + config.app.main)
        .plugin('minifyify', {map: 'application.js.map', output: config.buildPath + '/application.js.map'})
        .plugin(tsify);

    return bundler.bundle()
        .pipe(source(config.app.result))
        .pipe(gulp.dest(config.buildPath));
});

gulp.task('watch', function(){
    gulp.watch('./src/**/*.ts', ['build']);
});

gulp.task('default', ['build']);