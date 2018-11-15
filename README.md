# efui.rollup


### 终端命令参数
    // rollup main.js -o index.js -f iife
    // -f 指定输出文件类型：cjs(nodejs使用), iife(浏览器使用), umd(浏览器与nodejs同时使用)
    // -o 输出文件名
    // --watch rollup-watch插件，监听源文件是否有改动，如果有改动，重新打包
    // -c 指定配置文件，默认rollup.config.js

### 配置文件rollup.config.js
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
    
    
### plugins 插件
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
        