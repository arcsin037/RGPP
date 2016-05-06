'use strict'

// gulp plugin
import gulp from 'gulp'
import sass from 'gulp-sass'
import mocha from 'gulp-mocha'
import gutil from 'gulp-util'
import uglify from 'gulp-uglify'
import concat from 'gulp-concat'
import plumber from 'gulp-plumber'
import rename from 'gulp-rename'
import yuidoc from 'gulp-yuidoc'
import mustache from 'gulp-mustache'

// name of application
const app_name = 'RGPP',
    app_description = 'Rapid Prototyping Game Platform',
    app_version = '0.0.1',

    // Directory name
    dst_dir = './build/',
    src_dir = './src/',
    js_dir = src_dir + 'js/',

    // JS name
    test_js = js_dir + '**/*GPP.test.js',
    templete_js = js_dir + '**/*.template.js',
    all_js = js_dir + '**/*.js',
    compile_js = ['!' + test_js, '!' + templete_js, all_js],

    // Build directory name
    build_js_dir = dst_dir + 'js/',
    build_js_module_dir = build_js_dir + 'module/',
    build_js_min_dir = build_js_module_dir + 'min/',

    // Core
    core_src_dir = src_dir + 'js/Core/',
    core_script_name = app_name + '.core',
    concat_core_editor_js_name = core_script_name + '.editor.js',
    concat_core_game_js_name = core_script_name + '.game.js',
    compress_core_editor_js_name = core_script_name + '.editor.min.js',
    compress_core_game_js_name = core_script_name + '.game.min.js',
    core_src_editor_dir = [
        core_src_dir + '*.js',
        core_src_dir + 'Common/**/*.js',
        core_src_dir + 'Editor/*.js',
        '!' + core_src_dir + '**/*.test.js',
        '!' + core_src_dir + '**/*.template.js'
    ],
    core_src_game_dir = [
        core_src_dir + '*.js',
        core_src_dir + 'Common/**/*.js',
        core_src_dir + 'Game/*.js',
        '!' + core_src_dir + '**/*.test.js',
        '!' + core_src_dir + '**/*.template.js'
    ],

    // System
    system_script_name = app_name + '.system',
    concat_sytem_js_name = system_script_name + '.js',
    compress_system_js_name = system_script_name + '.min.js',
    system_src_dir = [src_dir + 'js/System/**/*.js', '!' + src_dir + 'js/System/**/*.test.js', '!' + src_dir + 'js/System/**/*.template.js'],

    // MW
    mw_script_name = app_name + '.mw',
    concat_mw_js_name = mw_script_name + '.js',
    compress_mw_js_name = mw_script_name + '.min.js',
    mw_src_dir = [src_dir + 'js/MW/**/*.js', '!' + src_dir + 'js/MW/**/*.test.js', '!' + src_dir + 'js/MW/**/*.template.js'],

    // User
    user_script_name = app_name + '.user',
    concat_user_js_name = user_script_name + '.js',
    compress_user_js_name = user_script_name + '.min.js',
    user_src_dir = [src_dir + 'js/User/**/*.js', '!' + src_dir + 'js/User/**/*.test.js', '!' + src_dir + 'js/User/**/*.template.js'],

    // Editor
    editor_script_name = app_name + '.editor',
    concat_editor_js_name = editor_script_name + '.js',
    compress_editor_js_name = editor_script_name + '.min.js',
    editor_src_dir = [
        build_js_module_dir + concat_core_editor_js_name,
        build_js_module_dir + concat_sytem_js_name,
        build_js_module_dir + concat_mw_js_name,
        build_js_module_dir + concat_user_js_name,
    ],

    // Game
    game_script_name = app_name + ".game",
    concat_game_js_name = game_script_name + '.js',
    compress_game_js_name = game_script_name + '.min.js',
    game_src_dir = [
        build_js_module_dir + concat_core_game_js_name,
        build_js_module_dir + concat_sytem_js_name,
        build_js_module_dir + concat_mw_js_name,
        build_js_module_dir + concat_user_js_name,
    ],

    // Template
    editor_template_name = "Editor.html",
    game_template_name = "Game.html",
    template_dir = src_dir + "templates/",
    template_config_json = template_dir + 'config.json',
    editor_template_src = [
        template_dir + 'Editor.mustache',
    ],
    game_template_src = [
        template_dir + 'Game.mustache',
    ],
    build_template_dir = dst_dir + 'html/',

    // function of concat
    concatJS = (src_path, dst_path, concat_name) => {
        console.log("[concat] src_path = " + src_path + " dst_path = " + dst_path + " concat_name = " + concat_name)
        return gulp.src(src_path)
            .pipe(plumber())
            .pipe(concat(concat_name))
            .pipe(gulp.dest(dst_path))
    },
    // function of compress
    compressJS = (src_path, src_name, dst_path, compress_name) => {
        console.log("[compress] src_path = " + src_path + " src_name = " + src_name + " dst_path = " + dst_path + " compress_name = " + compress_name)
        return gulp.src([src_path + src_name])
            .pipe(plumber())
            .pipe(uglify())
            .pipe(rename(compress_name))
            .pipe(gulp.dest(dst_path))
    },
    testJS = (dir_path) => {
        return gulp.src(dir_path, {
                read: false
            })
            .pipe(plumber())
            .pipe(mocha({
                reporter: 'spec',
                timeout: 15000,
            }))
            .pipe(plumber())
            .on('error', gutil.log)
    },
    createYUIdoc = (create_doc_js) => {
        gulp.src(create_doc_js)
            .pipe(yuidoc({
                project: {
                    "name": app_name,
                    "description": app_description,
                    "version": app_version,
                },
            }, {
                themedir: "./lib/blue_theme",
            }))
            .pipe(gulp.dest("./doc/"))
    },
    compileMustache = (template_src_dir, template_config_dir, template_name, build_template_dir) => {
        console.log(template_src_dir, template_config_dir, template_name, build_template_dir)
        gulp.src(template_src_dir)
            .pipe(plumber())
            .pipe(mustache(template_config_dir))
            .pipe(rename(template_name))
            .pipe(gulp.dest(build_template_dir))

    }

// create API documentation
gulp.task('yuidoc', () => {
    console.log('--------- create YUI document ----------')
    createYUIdoc(compile_js)
})

// unit test
gulp.task('test', () => {
    console.log('--------- Test ----------')
    return testJS([test_js])
})

gulp.task('mustache', () => {
    console.log('--------- compiling mustache ----------')
    compileMustache(editor_template_src, template_config_json, editor_template_name, build_template_dir)
    compileMustache(game_template_src, template_config_json, game_template_name, build_template_dir)
})

// concat core js files
gulp.task('core.concat', () => {
    console.log('--------- concat system js task ----------')
    concatJS(core_src_editor_dir, build_js_module_dir, concat_core_editor_js_name)
    concatJS(core_src_game_dir, build_js_module_dir, concat_core_game_js_name)
})

// compress core js file
gulp.task('core.compress', ['core.concat'], () => {
    console.log('--------- compress sytem task ----------')
    compressJS(build_js_module_dir, concat_core_editor_js_name, build_js_min_dir, compress_core_editor_js_name)
    compressJS(build_js_module_dir, concat_core_game_js_name, build_js_min_dir, compress_core_game_js_name)
})

// concat system js files
gulp.task('system.concat', () => {
    console.log('--------- concat system js task ----------')
    return concatJS(system_src_dir, build_js_module_dir, concat_sytem_js_name)
})

// compress system js file
gulp.task('system.compress', ['system.concat'], () => {
    console.log('--------- compress sytem task ----------')
    return compressJS(build_js_module_dir, concat_sytem_js_name, build_js_min_dir, compress_system_js_name)
})

// concat middle ware js files
gulp.task('mw.concat', () => {
    console.log('--------- concat mw task ----------')
    return concatJS(mw_src_dir, build_js_module_dir, concat_mw_js_name)
})

// compress middle ware js file
gulp.task('mw.compress', ['mw.concat'], () => {
    console.log('--------- compress mw task ----------')
    return compressJS(build_js_module_dir, concat_mw_js_name, build_js_min_dir, compress_mw_js_name)
})

// concat user js files
gulp.task('user.concat', () => {
    console.log('--------- concat mw task ----------')
    return concatJS(user_src_dir, build_js_module_dir, concat_user_js_name)
})

// compress user js file
gulp.task('user.compress', ['user.concat'], () => {
    console.log('--------- compress user task ----------')
    return compressJS(build_js_module_dir, concat_user_js_name, build_js_min_dir, compress_user_js_name)
})

// concat editor js files
gulp.task('editor.concat', ['core.compress', 'system.compress', 'mw.compress', 'user.compress'], () => {
    console.log('--------- concat editor task ----------')
    return concatJS(editor_src_dir, build_js_dir, concat_editor_js_name)
})

// compress editor js file
gulp.task('editor.compress', ['editor.concat'], () => {
    console.log('--------- compress editor task ----------')
    return compressJS(build_js_dir, concat_editor_js_name, build_js_dir, compress_editor_js_name)
})

// concat game js files
gulp.task('game.concat', ['core.compress', 'system.compress', 'mw.compress', 'user.compress'], () => {
    console.log('--------- concat game task ----------')
    return concatJS(game_src_dir, build_js_dir, concat_game_js_name)
})

// compress game js file
gulp.task('game.compress', ['game.concat'], () => {
    console.log('--------- compress game task ----------')
    return compressJS(build_js_dir, concat_game_js_name, build_js_dir, compress_game_js_name)
})


// compile sass file
gulp.task("sass", () => {
    gulp.src(src_dir + 'sass/**/*.scss')
        .pipe(plumber())
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(gulp.dest(dst_dir + 'css'))
})


// default (watch)
gulp.task('default', [
    'sass',
    'mustache',
    'editor.compress',
    'game.compress'
], () => {
    gulp.watch([src_dir + 'sass/**/*.scss'], ['sass'])
    gulp.watch([template_dir + '/**/*'], ['mustache'])
    gulp.watch([core_src_editor_dir, core_src_game_dir, system_src_dir, mw_src_dir, user_src_dir], ['editor.compress', 'game.compress'])
})
