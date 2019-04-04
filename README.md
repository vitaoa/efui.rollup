
### gulp 4.0 升级指南
1.  gulp.task 移除了三参数语法，现在不能使用数组来指定一个任务的依赖。    
    指定一个任务的依赖:    
            
        gulp.task('my-tasks', gulp.series('a', 'b', 'c', function() {
          // Do something after a, b, and c are finished.
        }));

    gulp 4.0 加入了 gulp.series 和 gulp.parallel 来实现任务的串行化和并行化。
    gulp.series 用于串行（顺序）执行
    gulp.parallel 用于并行执行    
    
    任务函数中，如果任务是同步的，需要使用 done 回调。这样做是为了让 gulp 知道你的任务何时完成。类似这样：                

        gulp.task('a', function(done){
            done()
        })
        
1. gulp.dest 添加了 dirMode 参数，可以指定生成文件夹的模式。
1. gulp.src 添加 since 选项，只匹配在某个固定时间后有修改的文件，这可以用来做增量构建


### rollup
1. 终端命令参数

        // rollup main.js -o index.js -f iife
        // -f 指定输出文件类型：amd -- 异步模块定义，用于像RequestJS这样的模块加载器, cjs(nodejs使用), iife(浏览器使用), umd(浏览器与nodejs同时使用), es -- 将软件包保存为ES模块文件
        // -o 输出文件名
        // --watch rollup-watch插件，监听源文件是否有改动，如果有改动，重新打包
        // -c 指定配置文件，默认rollup.config.js

1. 配置文件rollup.config.js

        export default {
            input: 'app/scripts/module/rollup.js',
            output: {
                file: 'dist/js/rollup.js', // 打包后的路径
                format: 'iife',// 生成包的格式规范 包括 amd umd cjs es iife
                name: 'MyBundle',// 打包后的包名 iife / umd包 // -> var MyBundle = (function () {...
            },
            externals:[],
            plugins:[],
            globals: { 
                jquery: '$'
            },
            sourceMap: 'inline',
            strict: true
        };
        . input — 项目入口
        . output — 项目输出配置    
        . format — Rollup支持多种输出格式。因为我们是要在浏览器中使用，需要使用立即执行函数表达式(IIFE)  
        . externals — 外部引用 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖， 一般用于library开发
        . plugins — 插件项
        . globals — 全局模块 提供将外部模块ID转换为全局模块的功能
        . sourceMap — 调试时sourcemap是非常有用的。true: 会创建单独的 sourcemap 文件；inline: sourcemap将作为数据URI附加到生成的output文件中。
        . strict — 'use strict';严格模式，默认开启
    
    
### SourceMap 使用教程    

    SourceMap：一个存储源代码与编译代码对应位置映射的信息文件    
    在前端的工作中主要是用来解决以下三个方面出现的 debug 问题：
    a. 代码压缩混淆后
    b. 利用 sass 、typeScript 等其他语言编译成 css 或 JS 后
    c. 利用 webpack/rollup 等打包工具进行多文件合并后
    
    
### rollup 插件
1. **scss**: npm i -D node-sass rollup-plugin-postcss autoprefixer cssnano 

        import postcss from 'rollup-plugin-postcss';
        import autoprefixer from 'autoprefixer';
        import cssnano from 'cssnano';
    
        plugins: [
            postcss({
                plugins: [autoprefixer, cssnano],
                extract: 'dist/css/bundle.css' // 输出路径
            })
        ]
        缺点：scss引用进来（@import）的不方便同时监听修改，改用gulp-sass处理样式文件。     
                
1. **TypeScript**: 

        安装：npm i -D rollup-plugin-typescript typescript tslib
        TypeScript与Rollup集成：
        在配置文件rollup.config.js里写入：
        import typescript from 'rollup-plugin-typescript';
        export default {
          plugins: [
            typescript({lib: ["es5", "es6", "dom"], target: "es5"})
          ]
        }
        引用ts文件：import { fnTimeCountDown } from '../ts/CountDown.ts';
        
1. **Babel**: 

        安装：npm install --save-dev rollup-plugin-babel@latest @babel/core 
        npm install @babel/preset-env --save-dev //动态转换ES6代码至可执行的JS代码
        在配置文件rollup.config.js里写入：
        import babel from 'rollup-plugin-babel';
        export default {
            plugins: [
                babel({
                    presets: [
                        ["@babel/env"]
                    ]
                })
            ]
        }
1. **rollup-plugin-buble**

        用途是在rollup.js打包的过程中进行代码编译，将ES6+代码编译成ES2015标准，取代Babel
        安装：npm i -D rollup-plugin-buble

        
### gulp插件：       
1. **gulp-file-include**:   

        安装插件：npm install --save-dev gulp-file-include
        const fileinclude = require('gulp-file-include');            
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
  
1. **gulp-rollup**:
    
        安装：npm i -D gulp-rollup
        删除rollup.config.js，并把配置文件rollup.config.js里面的都改写到gulpfile.js文件里面：
        const typescript = require('rollup-plugin-typescript');
        gulp.task('bundle', function() {
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
              
1. **gulp-sass**:   

        安装插件：npm install --save-dev gulp-sass
        const sass = require('gulp-sass');
        gulp.task('sass', function(){
        	return gulp.src(fileinclude_DIR + 'styles/' + NAME + '.scss')
        		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        		.pipe(gulp.dest(DIST_DIR + 'css'))
        });    
        
1. **gulp-base64**
    
        安装：npm i -D gulp-base64
        const base64 = require('gulp-base64');
        gulp.task('sass:base64',gulp.series('sass',function () {
            return gulp.src(DIST_DIR + 'css/' + NAME + '.css')
                .pipe(base64({
                    extensions: ['png','svg',/\.jpg#datauri$/i],
                    include:    ['/base64/'],//(插件需优化：exclude改为include)
                    maxImageSize:100*1024, // bytes
                    debug: true
                }))
                .pipe(gulp.dest(DIST_DIR + 'css'));
        }));
        
1. **gulp-tinypng-nokey**
    
        安装：npm i -D gulp-tinypng-nokey
        const tinypng_nokey = require('gulp-tinypng-nokey');
        gulp.task('images:tinypng', gulp.series('copy:images',function() {
            return gulp.src(DIST_DIR + 'images/*.{png,jpg,gif,jpeg}')
                .pipe(tinypng_nokey()).on('error', function(err) {
                    console.error(err.message);
                })
                .pipe(gulp.dest(DIST_DIR + "images/"));
        }));

1. **gulp.spritesmith**
    
        安装：npm i -D gulp.spritesmith
        const glob = require("glob");
        const path = require("path");
        const spritesmith = require('gulp.spritesmith');(插件需优化：没有rem)
        
1. **gulp-babel**

        安装：npm install --save-dev gulp-babel@next @babel/core    
        npm install @babel/preset-env --save-dev //动态转换ES6代码至可执行的JS代码
        //npm install @babel/preset-es2015 --save-dev //['es2015']
        npm install --save-dev @babel/preset-typescript //babel v7支持typescript
        const babel = require("gulp-babel");
    
        gulp.task('babel:js', function(){
            return gulp.src(DIST_DIR + 'js/*.js')
                .pipe(babel({
                     presets: [ 
                        ['@babel/env',{}],
                        ['@babel/preset-typescript',{}]
                    ]
                }))
                .pipe(gulp.dest(DIST_DIR + 'js/'))
        });

        
### npm插件：  
1. **安装Browsersync实时刷新浏览器**: npm install --save-dev browser-sync

        BrowserSync 将启动一个小型服务器，并提供一个URL来查看网站。
        启动 BrowserSync：(在 gulpfile.js 中创建新任务)        
        const browserSync = require('browser-sync');
        gulp.task('server',function() {
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
        
            // gulp.watch(['*.*']).on('change', browserSync.reload);
        });
 
    
### Git 相关操作
1. 合并指定文件到另一个分支：
    
    1. 合并单个commit，用git cherry-pick命令：
    
            eg:将master分支的commit b169a68合并到gh-pages分支
            1: 先切换到分支gh-pages：git checkout gh-pages
            2: 合并commit b169a68：git cherry-pick b169a68
            现在b169a68就被合并到gh-pages分支，并在gh-pages中添加了commit（作为一个新的commit）。
        
    1. 合并一系列相连的commits，用git rebase更适合
            
            eg:合并feature分支的commit 76cada ~62ecb3 到master分支
            1: git checkout -b newbranch 62ecb3
            2: git rebase --onto master 76cada^ 
            3: git checkout master
            4：git merge newbranch
        
    1. 合并单个文件：
    
            eg:将dev分支上 f 文件追加补丁到master分支上 f文件
            1: git checkout dev
            2: git checkout --patch master f.txt


### 包管理工具    
1. Bower：npm install bower -g

    bower.json配置文件：bower init
    
    安装包： bower 默认情况都会去bower.com上面找最新的包，除非指定版本号（bower install jQuery --save-dev）
    
    .bowerrc 文件配置安装路径
    
1. browserify npm install browserify -save-dev
    
        var browserify = require('browserify');
        var gulp = require('gulp');
        var source = require('vinyl-source-stream');//将常规流转换为包含 Stream 的 vinyl 对象
        var buffer = require('vinyl-buffer');//将 vinyl 对象内容中的 Stream 转换为 Buffer    
        gulp.task('browserify', function() {
          return browserify('./src/js/app.js')
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(gulp.dest('./dist/js'));
        });