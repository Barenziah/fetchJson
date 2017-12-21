'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;


gulp.task('jshint', function () {
    return gulp.src([
        'js/*.js',
        '*.html'
    ])
        .pipe(reload({ stream: true, once: true }))
        .pipe($.jshint.extract()) // Extract JS from .html files
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail'))); //don't really need 
});

gulp.task('serve', ['watch'] ,function () {
    browserSync({
        port: 5000,
        notify: false,
        logPrefix: 'Ajax Project',
        logConnections: true,
        browser:"google chrome",
        server: {
            baseDir: ['./'],
        }
    });
}); 
    
// Gulp should watch the changes RELOAD/JSHINT
gulp.task('watch', function () {
    gulp.watch(['*.html', 'css/*.css'], reload);
    gulp.watch(['js/*.js'], ['jshint', reload]);
});
