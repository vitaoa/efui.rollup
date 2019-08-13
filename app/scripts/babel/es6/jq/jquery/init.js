
import jQ from './core';
import rsingleTag from './var/rsingleTag';

// A central reference to the root jQ(document)
var rootjQ,

    // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    // Strict HTML recognition (#11290: must start with <)
    // Shortcut simple #id case for speed
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
    init = jQ.fn.init = function (selector, context, root) {
    var match, elem;
console.log(selector)
    // HANDLE: $$$(""), $$$(null), $$$(undefined), $$$(false)
    if (!selector) {
        return this;
    }
    root = root || rootjQ;
    // Handle HTML strings
    if ( typeof selector === "string" ) {
        if ( selector[ 0 ] === "<" &&
            selector[ selector.length - 1 ] === ">" &&
            selector.length >= 3 ) {

            // Assume that strings that start and end with <> are HTML and skip the regex check
            match = [ null, selector, null ];

        } else {
            //　   此正则rquickExpr匹配后，会出现以下几种情况：
            //　　1. match = null;　　　　　　　　　　　$(".box"), $("div"), $("#div1 div.box")
            //　　2. match = ["#div1",null,"div1"];　　  $("#div1")
            //　　3. match = ["<li>aaa","<li>",null];　　$("<li>aaa")　　
            match = rquickExpr.exec( selector );
        }
        // Match html or make sure no context is specified for #id
        if ( match && ( match[ 1 ] || !context ) ) {

            // HANDLE: $(html) -> $(array)
            if ( match[ 1 ] ) {
                context = context instanceof jQ ? context[ 0 ] : context;

                // Option to run scripts is true for back-compat
                // Intentionally let the error be thrown if parseHTML is not present
                jQ.merge( this, jQ.parseHTML(
                    match[ 1 ],
                    context && context.nodeType ? context.ownerDocument || context : document,
                    true
                ) );

                // HANDLE: $(html, props)
                if ( rsingleTag.test( match[ 1 ] ) && jQ.isPlainObject( context ) ) {
                    for ( match in context ) {

                        // Properties of context are called as methods if possible
                        if ( isFunction( this[ match ] ) ) {
                            this[ match ]( context[ match ] );

                            // ...and otherwise set as attributes
                        } else {
                            this.attr( match, context[ match ] );
                        }
                    }
                }

                return this;

                // HANDLE: $(#id)
            } else {
                elem = document.getElementById( match[ 2 ] );

                if ( elem ) {

                    // Inject the element directly into the jQ object
                    this[ 0 ] = elem;
                    this.length = 1;
                }
                return this;
            }

            // HANDLE: $(expr, $(...))
        } else if ( !context || context.jquery ) {
            console.log(context.jquery)
            console.log(( context || root ))
            return ( context || root ).find( selector );

            // HANDLE: $(expr, context)
            // (which is just equivalent to: $(context).find(expr)
        } else {
            console.log(context)
            return this.constructor( context ).find( selector );
        }

        // HANDLE: $(DOMElement)
    }else if ( selector.nodeType ) {
        this[ 0 ] = selector;
        this.length = 1;
        return this;

        // HANDLE: $(function)
        // Shortcut for document ready
    } else if ( jQ.isFunction( selector ) ) {
        return root.ready !== undefined ?
            root.ready( selector ) :
            // Execute immediately if ready is not present
            selector( jQ );
    }

    return jQ.makeArray( selector, this );
};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQ.fn;

// Initialize central reference
rootjQ = jQ( document );

export default init;