const gulp = require('gulp');

/*****typescript*****/
const ts = require('gulp-typescript');
const tsProject = ts.createProject("tsconfig.json");
/*****typescript*****/

//---------------------------------------参数声明----------------------------//
const fileinclude_DIR = './app/';   // 源文件目录
const DIST_DIR = './dist/';   // 文件输出目录
const SASS_DIR =   './scss/'; // 样式预处理文件目录

// 具体项目文件目录
const CUR_PATH =   '';

let TS_PATH = [];
let _TSpath = [];
if(TS_PATH.length>0){
    for(let i = 0;i<TS_PATH.length;i++){
        _TSpath.push(fileinclude_DIR + TS_PATH[i] + '.ts');
    }
}
console.log(_TSpath)


//---------------------------------------typeScript----------------------------//
gulp.task('typeScript', function () {
    if(_TSpath.length>0){
        return gulp.src(_TSpath,{base: fileinclude_DIR})
            .pipe(tsProject())
            .js.pipe(gulp.dest(DIST_DIR));
    }else{
        return gulp.src(fileinclude_DIR + CUR_PATH + '**/*.ts',{base: fileinclude_DIR})
            .pipe(tsProject())
            .js.pipe(gulp.dest(DIST_DIR));
    }
});
gulp.task('watchTS', function() {
    gulp.watch(fileinclude_DIR + CUR_PATH + '**/*.ts', gulp.series('typeScript'));
});
//---------------------------------------typeScript----------------------------//