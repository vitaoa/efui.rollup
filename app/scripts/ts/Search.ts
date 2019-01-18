let _searchKeywords:any='';
let request = new XMLHttpRequest();
request.onload = levelRequestListener;
request.open("get", "/app/data/route.json", true);
request.send();

function levelRequestListener () {
    _searchKeywords = JSON.parse(this.responseText);
}

/*search*/
export function Search(dom){
    let _searchVal = dom as HTMLInputElement;
    let _url = JsonQuery(_searchKeywords,{"keywords":_searchVal.value});
    let _searchWrap = document.getElementById('searchResult');
    if(_url.length>0){
        _searchWrap.innerHTML='';
        for(let _v in _url){
            let _searchHtml = document.createElement('li');
            _searchHtml.innerHTML='<a href="pages/'+_url[_v].value+'">'+_url[_v].keywords+'</a>';
            _searchWrap.appendChild(_searchHtml)
        }
    }else{
        _searchWrap.innerHTML='';
        let _searchHtml = document.createElement('li');
        _searchHtml.innerHTML='搜索结果为：'+_url.length;
        _searchWrap.appendChild(_searchHtml);
    }
}
function JsonQuery(arr:Array<any>,obj:any):any{
    let _arr:any = [];
    for(let _jsonObj of arr){
        let _b:boolean = true;
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
}

