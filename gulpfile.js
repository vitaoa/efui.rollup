const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass');
const rollup = require('gulp-rollup');
const typescript = require('rollup-plugin-typescript');

//---------------------------------------参数声明----------------------------//
const fileinclude_DIR = './app/';   // 源文件目录
const DIST_DIR = './';   // 文件输出目录，根目录

// html编译
//---------------------------------------file-include----------------------------//
let paramHtmlIndex={
    rootUrl:'/bag/en/',
    timestamp:[new Date().getTime(),Math.random().toFixed(0)],
    styles: ['css/efui.css']
}
let paramHtml={
    rootUrl:'/bag/en/',
    timestamp:[new Date().getTime(),Math.random().toFixed(0)],
    styles: ['../css/efui.css']
}
gulp.task('fileIncludeIndex',function(done) {
    gulp.src(fileinclude_DIR + 'views/**/index.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent:true,
            context: paramHtmlIndex
        }))
        .pipe(gulp.dest(DIST_DIR));
    done();
});
gulp.task('fileInclude',function(done) {
    gulp.src([fileinclude_DIR + 'views/**/*.html','!' + fileinclude_DIR + 'views/**/index.html','!' + fileinclude_DIR + 'views/includes/**/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent:true,
            context: paramHtml
        }))
        .pipe(gulp.dest(DIST_DIR + 'pages/'));
    done();
});
// copy assets
gulp.task('copy:datas',function () {
    return gulp.src(fileinclude_DIR + 'scripts/data/**/*.json')
        .pipe(gulp.dest(DIST_DIR + 'js/data/'));
});
gulp.task('copy:js',function () {
    return gulp.src(fileinclude_DIR + 'scripts/lib/**/*.js')
        .pipe(gulp.dest(DIST_DIR + 'js/lib/'));
});
//---------------------------------------file-include----------------------------//


// scss编译
//---------------------------------------gulp-sass----------------------------//
const NAME = 'efui';
gulp.task('sass', function(){
	return gulp.src(fileinclude_DIR + 'styles/' + NAME + '.scss')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(gulp.dest(DIST_DIR + 'css'))
});
//---------------------------------------gulp-sass----------------------------//

// rollup
//---------------------------------------gulp-rollup----------------------------//
gulp.task('rollup:js', function() {
    return gulp.src(fileinclude_DIR + 'scripts/**/*.*',{base:fileinclude_DIR + 'scripts/module/'})
        .pipe(rollup({
            input: fileinclude_DIR + 'scripts/module/rollup.js',
            output: {
                format: 'iife',
                name: 'MyBundle',
            },
            plugins: [
                typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
            ],
        }))
        .pipe(gulp.dest(DIST_DIR + 'js'));
});
//---------------------------------------gulp-rollup----------------------------//

// gulp.task('package',gulp.series('fileInclude', 'fileIncludeIndex','copy:datas','copy:js','rollup:js','sass'));

const browserSync = require('browser-sync');
gulp.task('server',gulp.series('fileInclude', 'fileIncludeIndex','copy:datas','copy:js','rollup:js','sass',function() {
    let files = [
        fileinclude_DIR + 'views/**/*.*',
        fileinclude_DIR + 'scripts/**/*.*',
        fileinclude_DIR + 'styles/**/*.*'
    ];
    browserSync.init({
        files:files,
        host: "172.30.10.52",
        port:'9999',
        server: {
            baseDir:'./',  // 设置服务器的根目录
            index:'pages/plugin.html' // 指定默认打开的文件
        },
        open:false
    });

    gulp.watch(fileinclude_DIR + 'views/**/*.*',gulp.parallel('fileInclude', 'fileIncludeIndex'));
    gulp.watch(fileinclude_DIR + 'scripts/**/*.*',gulp.parallel('copy:datas','copy:js','rollup:js'));
    gulp.watch(fileinclude_DIR + 'styles/**/*.*',gulp.series('sass'));
}));