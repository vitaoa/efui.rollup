const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass');

//---------------------------------------参数声明----------------------------//
const fileinclude_DIR = './app/';   // 源文件目录
const DIST_DIR = './';   // 文件输出目录，根目录
const SASS_DIR =   './scss/'; // 样式预处理文件目录

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
gulp.task('copy:datas',function (done) {
    return gulp.src(fileinclude_DIR + 'scripts/data/**/*.json')
        .pipe(gulp.dest(DIST_DIR + 'js/data/'));
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

gulp.task('package',gulp.series('fileInclude', 'fileIncludeIndex','copy:datas','sass'));

const browserSync = require('browser-sync');
gulp.task('server',gulp.series('fileInclude', 'fileIncludeIndex','copy:datas','sass',function() {
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
    gulp.watch(fileinclude_DIR + 'scripts/data/**/*.json',gulp.series('copy:datas'));
    gulp.watch(fileinclude_DIR + 'styles/**/*.*',gulp.series('sass'));
}));