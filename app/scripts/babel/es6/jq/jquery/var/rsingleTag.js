/*匹配单标签，$("<li>")，$("<li></li>")*/
const rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );
export default rsingleTag;
