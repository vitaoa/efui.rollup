
var global = function (jQ) {
//走模块化形式的直接绕过
    if(typeof exports === 'object' && typeof module !== 'undefined') return;
    var _jQ = window.jQ,// Map over jQ in case of overwrite
        _$$$ = window.$$$;// Map over the $ in case of overwrite
    jQ.noConflict = function( deep ) {
        //确保window.$没有再次被改写
        if ( window.$$$ === jQ ) {
            window.$$$ = _$$$;
        }
        //确保window.jQ没有再次被改写
        if ( deep && window.jQ === jQ ) {
            window.jQ = _jQ;
        }
        return jQ;  //返回 jQ 接口引用
    };
    window.jQ = window.$$$ = jQ;// Expose jQ and $ identifiers
}

export default global;
