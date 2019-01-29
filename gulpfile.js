const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass');
const rollup = require('gulp-rollup');
const typescript = require('rollup-plugin-typescript');
const base64 = require('gulp-base64');
const tinypng_nokey = require('gulp-tinypng-nokey');   //压缩图片 免费 不限制压缩次数，模拟用户上传和下载的行为
const glob = require("glob");
const path = require("path");
const spritesmith = require('gulp.spritesmith');

//---------------------------------------参数声明----------------------------//
const fileinclude_DIR = './app/';   // 源文件目录
const DIST_DIR = './';   // 文件输出目录，根目录

// html编译
//---------------------------------------file-include----------------------------//
let paramHtmlIndex={
    rootUrl:'/bag/en/',
    timestamp:[new Date().getTime(),Math.random().toFixed(0)],
    styles: ['css/efui.css'],
    js: ['js/lib/base.js','js/rollup.js']
}
let paramHtml={
    rootUrl:'/bag/en/',
    timestamp:[new Date().getTime(),Math.random().toFixed(0)],
    styles: ['../css/efui.css'],
    js: ['../js/lib/base.js','../js/rollup.js']
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
gulp.task('copy:images',function () {
    return gulp.src([fileinclude_DIR + 'images/**/*.{png,jpg,gif,jpeg}','!' + fileinclude_DIR + 'images/base64/**/*.*','!' + fileinclude_DIR + 'images/slice/**/*.*'])
        .pipe(gulp.dest(DIST_DIR + 'images/'));
});
gulp.task('images:tinypng', gulp.series('copy:images',function() {
    return gulp.src(DIST_DIR + 'images/*.{png,jpg,gif,jpeg}')
        .pipe(tinypng_nokey()).on('error', function(err) {
            console.error(err.message);
        })
        .pipe(gulp.dest(DIST_DIR + "images/"));
}));

// sprites
let spiresTime = (Math.random()*1000).toFixed(0);
const REMwidth = 750; //移动端设计稿宽
gulp.task('sprites:more',function(done){
    let dirs = glob.sync(fileinclude_DIR + "images/slice/*/*/");
    for(let i = 0;i<dirs.length;i++){
        let baseDir = dirs[i].split("/")[dirs[i].split("/").length-3];
        let basename = path.basename(dirs[i]);
        console.log(baseDir);
        console.log(basename);
        let spriteData = gulp.src(fileinclude_DIR + `images/slice/${baseDir}/${basename}/*.{png,jpg,gif,jpeg}`)//需要合并的图片地址
            .pipe(spritesmith({
                imgName: `sp_${baseDir}_${basename}.png`,//保存合并后图片的地址
                cssName: `sp-${baseDir}-${basename}.scss`,//保存合并后对于css样式的地址
                padding:10,//合并时两个图片的间距
                algorithm: 'top-down',
                cssTemplate: function(data){
                    let arr1,arr2,width1,width2,height1,height2;
                    let arr = ["/* ============ sprites ============ */","\n"],
                        width = data.spritesheet.px.width,
                        height = data.spritesheet.px.height,
                        url =  data.spritesheet.image;

                    let mVar = data.spritesheet.image.split("/")[data.spritesheet.image.split("/").length-1].replace(/-m_/,'_m_').indexOf('_m');
                    data.sprites.forEach(function(sprite) {
                        arr.push(
                            "."+sprite.name+
                            "{ "+
                            "width: "+sprite.px.width+";"+
                            "height: "+sprite.px.height+";"+
                            "background-image: url('"+url+"?="+spiresTime+"');"+
                            "background-position:"+sprite.px.offset_x+" "+sprite.px.offset_y+";"+
                            "background-size: "+ width+" "+height+";"+
                            "background-repeat:no-repeat;"+
                            " }\n"
                        );
                    });
                    if(mVar!==-1){
                        arr1 = ["\n","/* ============ sprites rem ============ */","\n"];
                        width1 = data.spritesheet.rem.width;
                        height1 = data.spritesheet.rem.height;

                        arr1.push('@media(max-width:'+REMwidth+'px){\n');
                        data.sprites.forEach(function(sprite) {
                            arr1.push(
                                "."+sprite.name+
                                "{ "+
                                "background-position:"+sprite.rem.offset_x+" "+sprite.rem.offset_y+";"+
                                "background-size: "+ width1+" "+height1+";"+
                                "width: "+sprite.rem.width+";"+
                                "height: "+sprite.rem.height+";"+
                                " }\n"
                            );
                        });
                        arr1.push('}');
                        return arr.join("")+(arr1.join(""));
                    }
                    return arr.join("");
                },
                imgPath: `../images/sp_${baseDir}_${basename}.png`,
                spritestamp: true
            }));
        spriteData.img.pipe(gulp.dest(DIST_DIR + "images"));
        spriteData.css.pipe(gulp.dest(fileinclude_DIR + 'styles/sprites/'));
    }
    done();
});
//---------------------------------------file-include----------------------------//

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

// scss编译
//---------------------------------------gulp-sass----------------------------//
const NAME = 'efui';
gulp.task('sass', function(){
	return gulp.src(fileinclude_DIR + 'styles/' + NAME + '.scss')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(gulp.dest(DIST_DIR + 'css'))
});
//---------------------------------------gulp-sass----------------------------//

// base64
//---------------------------------------gulp-base64----------------------------//
gulp.task('sass:base64',gulp.series('sass',function () {
    return gulp.src(DIST_DIR + 'css/' + NAME + '.css')
        .pipe(base64({
            extensions: ['png','svg',/\.jpg#datauri$/i],
            include:    ['/base64/'],
            maxImageSize:100*1024, // bytes
            debug: true
        }))
        .pipe(gulp.dest(DIST_DIR + 'css'));
}));
//---------------------------------------gulp-base64----------------------------//

// gulp.task('package',gulp.series('fileInclude', 'fileIncludeIndex','copy:datas','copy:js','rollup:js','sass'));

const browserSync = require('browser-sync');
gulp.task('server',gulp.series('fileInclude', 'fileIncludeIndex','copy:datas','copy:js','rollup:js','sass:base64',function() {
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
    gulp.watch(fileinclude_DIR + 'images/**/*.*',gulp.series('images:tinypng'));
}));