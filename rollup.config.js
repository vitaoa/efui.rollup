
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import typescript from 'rollup-plugin-typescript';

export default {
    input: 'app/scripts/module/rollup.js',
    output: {
        file: 'js/rollup.js',
        format: 'iife',
        name: 'MyBundle',
    },
    plugins: [
        postcss({
            extensions: [ '.css' ],
            // plugins: [autoprefixer, cssnano],
            extract: 'css/efui.css' // 输出路径
        }),
        typescript({lib: ["es5", "es6", "dom"], target: "es5"})
    ],
    sourceMap: false,
    strict: true
};
