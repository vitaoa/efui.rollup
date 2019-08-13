// 出口
import jQ from './core';
import init from './init';
import parseHTML from './core/parseHTML';
import Sizzle from './core/Sizzle';

// 弃用
import isFunction from './var/isFunction';


jQ.isFunction = isFunction;
jQ.parseHTML = parseHTML;
jQ.find = Sizzle;
import global from './global';
global(jQ);
if ( typeof define === "function" && define.amd ) {
    define( "jquery", [], function() {
        return jQ;
    } );
}
export default jQ;
