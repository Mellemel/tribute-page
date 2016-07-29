'use strict'

var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    htmlMin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css'),
    imageMin = require('gulp-imagemin'),
    jsmin = require('gulp-jsmin'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create()

gulp.task('serve', () => {
    browserSync.init({
        files: './builds/production/**',
        server: {
            baseDir: './builds/production/'
        },
        watchOptions: {
            usePolling: true
        }
    })

    gulp.watch('./builds/production/images/**')
        .on('change', browserSync.reload)
})

gulp.task('watch', ['jade', 'sass', 'imageMin', 'jsmin', 'movefont'], () => {
    gulp.watch('./src/*.jade', ['jade'])
    gulp.watch('./src/*.scss', ['sass'])
    gulp.watch('./src/images/*', ['imageMin'])
    gulp.watch('./src/js/*.js', ['jsmin'])
    gulp.watch('./src/fonts/*', ['movefont'])
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
    return gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./builds/development/css'))
        .pipe(cleanCSS({ debug: true }, (details) => {
            console.log(details.name + ': ' + details.stats.originalSize)
            console.log(details.name + ': ' + details.stats.minifiedSize)
        }))
        .pipe(gulp.dest('./builds/production/css'))
        .pipe(browserSync.stream())
})

gulp.task('imageMin', () => {
    return gulp.src('./src/images/*')
        .pipe(imageMin({ verbose: true }))
        .pipe(gulp.dest('./builds/development/images'))
        .pipe(gulp.dest('./builds/production/images'))
})

gulp.task('jsmin', () => {
    return gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./builds/development/js'))  
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./builds/production/js'))
})

gulp.task('movefont', ()=>{
    return gulp.src('./src/fonts/*')
        .pipe(gulp.dest('./builds/development/font'))
        .pipe(gulp.dest('./builds/production/font'))
})