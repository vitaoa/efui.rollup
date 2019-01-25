
import typescript from 'rollup-plugin-typescript';


export default {
    input: 'app/scripts/module/rollup.js',
    output: {
        file: 'js/rollup.js',
        format: 'iife',
        name: 'MyBundle',
    },
    plugins: [
        typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
    ],
    sourceMap: false,
    strict: true
};
