
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default {
    input: 'app/scripts/module/rollup.js',
    output: {
        file: 'dist/js/rollup.js',
        format: 'iife',
        name: 'MyBundle',
    },
    plugins: [
        postcss({
            extensions: [ '.css' ],
            // plugins: [autoprefixer, cssnano],
            extract: 'dist/css/efui.css' // 输出路径
        }),
    ],
    sourceMap: true,
    strict: true
};
