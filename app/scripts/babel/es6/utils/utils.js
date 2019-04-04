const Utils = {
    // /*Search*/
    levelRequestListener () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                window.searchKeywords = JSON.parse(this.responseText);
            } else {
                console.error(this.statusText);
            }
        }
    },
    /*Search*/
    JsonQuery(arr,obj){
        let _arr = [];
        for(let i = 0; i < arr.length;i++){
            let _jsonObj = arr[i];
            let _b = true;
            for(let prop in obj){
                var _TEST = new RegExp(obj[prop]||null,"i");
                if(!_TEST.test(_jsonObj[prop])){
                    _b = false;
                    break;
                }
            }
            if(_b) _arr.push(_jsonObj)
        }
        return _arr;
    },
    parseUrlQuery(url) {
        const query = {};
        let urlToParse = url || window.location.href;
        let i;
        let params;
        let param;
        let length;
        if (typeof urlToParse === 'string' && urlToParse.length) {
            urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
            params = urlToParse.split('&').filter(paramsPart => paramsPart !== '');
            length = params.length;

            for (i = 0; i < length; i += 1) {
                param = params[i].replace(/#\S+/g, '').split('=');
                query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
            }
        }
        return query;
    },
    extend(...args) {
        const to = Object(args[0]);
        for (let i = 1; i < args.length; i += 1) {
            const nextSource = args[i];
            if (nextSource !== undefined && nextSource !== null) {
                const keysArray = Object.keys(Object(nextSource));
                for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                    const nextKey = keysArray[nextIndex];
                    const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                            Utils.extend(to[nextKey], nextSource[nextKey]);
                        } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                            to[nextKey] = {};
                            Utils.extend(to[nextKey], nextSource[nextKey]);
                        } else {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
        }
        return to;
    }
};

export default Utils;