'use strict'

var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    htmlMin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css'),
    imageMin = require('gulp-imagemin'),
    sourceMaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create()

gulp.task('serve', () => {
    startServer('production')
})

gulp.task('serve:development', () => {
    startServer('development')
})

gulp.task('watch', ['jade', 'sass', 'imageMin'], () => {
    gulp.watch('./src/*.jade', ['jade'])
    gulp.watch('./src/*.scss', ['sass'])
    gulp.watch('./src/*', ['imageMin'])
})

gulp.task('jade', () => {
    return gulp.src('./src/*.jade')
        .pipe(jade({ pretty: true }))
        .pipe(gulp.dest('./builds/development'))
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./builds/production'))
        .pipe(browserSync.stream())
})

gulp.task('sass', () => {
    return gulp.src('./src/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./builds/development'))
        .pipe(sourceMaps.write('./builds/development/maps'))
        .pipe(cleanCSS({ debug: true }, (details) => {
            console.log(details.name + ': ' + details.stats.originalSize)
            console.log(details.name + ': ' + details.stats.minifiedSize)
        }))
        .pipe(gulp.dest('./builds/production'))
        .pipe(browserSync.stream())
})

gulp.task('imageMin', () => {
    gulp.src('./src/images/*')
        .pipe(imageMin({ verbose: true }))
        .pipe(gulp.dest('./builds/development/images'))
        .pipe(gulp.dest('./builds/production/images'))
})

function startServer(type) {
    var env = type
    browserSync.init({
        server: {
            baseDir: './builds/' + env + '/'
        }
    })

    gulp.watch('./builds/' + env + '/images/**')
        .on('change', browserSync.reload)
}