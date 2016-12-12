"use strict";

/* global __dirname, console */
/* eslint-disable no-console */

const path = require('path')
const argv = require('yargs').argv

/* Common gulp module list */
const gulp = require('gulp')
const gulpif = require('gulp-if')
const connect = require('gulp-connect')

/* JS processing module list */
const babel = require('gulp-babel')

const CLIENT_JS_PATH = `${ __dirname }/client/src`
const SERVER_REL_STATIC_PATH = 'server/www'
const SERVER_REL_JS_PATH = `${ SERVER_REL_STATIC_PATH }/src`

const WATCH = argv._.includes('watch')
const STATIC_PORT = 8010

gulp.task('watch', () => {

    gulp.watch(path.join(CLIENT_JS_PATH, '**/*.js')).on('change', (evt) => {

        console.log(`${ evt.type }: ${ evt.path }`)
        return processJS(evt.path)
    })
    connect.server({

        root: SERVER_REL_STATIC_PATH,
        livereload: true,
        port: STATIC_PORT,
    })
})

gulp.task('js', () => processJS(`${ CLIENT_JS_PATH }/**/*.js`))

/**
 * Processes JS files.
 * @param {string} src
 * @return {Stream}
 */
function processJS(src) {

    let dest = SERVER_REL_JS_PATH
    if (WATCH) {

        const FILE_DIRNAME_PATH = path.dirname(src)
        const FILE_REL_PATH = path.relative(CLIENT_JS_PATH, FILE_DIRNAME_PATH)

        dest = path.join(SERVER_REL_JS_PATH, FILE_REL_PATH)
    }
    return gulp.src(src)
        .pipe(gulpif(argv.babel, babel()))
        .on('error', (err) => console.error(err.message))
        .pipe(gulp.dest(dest))
        .pipe(gulpif(WATCH, connect.reload()))
}

gulp.task('default', [ 'js' ], () => {

})
