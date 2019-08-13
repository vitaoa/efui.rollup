/*第一个参数传入标签字符串"<li>"，
第二个参数传入执行上下文document，
第三个参数true代表可以新建script标签"<script><\/script>"（script前面的反斜杠需要转义，其他标签不需要），false代表不能。
返回值是一个数组：$("<li>")　->   ["li"],  $("<li>1</li><li>2</li>")　->["li","li"]*/
import rsingleTag from '../var/rsingleTag';
export default function( data, context, keepScripts ) {
    if ( typeof data !== "string" ) {
        return [];
    }
    if ( typeof context === "boolean" ) {
        keepScripts = context;
        context = false;
    }

    var base, parsed, scripts;
console.log(context)
    if ( !context ) {

        // Stop scripts or inline event handlers from being executed immediately
        // by using document.implementation
        if ( support.createHTMLDocument ) {
            context = document.implementation.createHTMLDocument( "" );

            // Set the base href for the created document
            // so any parsed elements with URLs
            // are based on the document's URL (gh-2965)
            base = context.createElement( "base" );
            base.href = document.location.href;
            context.head.appendChild( base );
        } else {
            context = document;
        }
    }

    parsed = rsingleTag.exec( data );
    scripts = !keepScripts && [];

    // Single tag
    if ( parsed ) {
        return [ context.createElement( parsed[ 1 ] ) ];
    }

    parsed = buildFragment( [ data ], context, scripts );

    if ( scripts && scripts.length ) {
        jQ( scripts ).remove();
    }

    return jQ.merge( [], parsed.childNodes );
}