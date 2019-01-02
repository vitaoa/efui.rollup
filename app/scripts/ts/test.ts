var _searchKeywords='';
var request = new XMLHttpRequest();
request.onload = levelRequestListener;
request.open("get", "./app/data/route.json", true);
request.send();

function levelRequestListener () {
    _searchKeywords = JSON.parse(this.responseText);
}


/*search*/
function searchFn(){
    var _searchVal = document.getElementById('searchVal') as HTMLInputElement;
    // console.log(_searchVal.value);
    var _url = JsonQuery(_searchKeywords,{"keywords":_searchVal.value});
    if(_url.length>0){
        for(let _v in _url){
            console.log(_url[_v])
            let _searchWrap = document.getElementById('searchResult');
            var _searchHtml = document.createElement('li');
            _searchHtml.innerHTML='<a href="'+_url[_v].value+'">'+_url[_v].keywords+'</a>';
            _searchWrap.appendChild(_searchHtml)
        }
    }
    // window.location.href=_url[0].value
}
function JsonQuery(arr:Array<any>,obj:any):any{
    let _arr:any = [];
    for(let _jsonObj of arr){
        let _b:boolean = true;
        for(let prop in obj){
            var _TEST = new RegExp(obj[prop],"i");
            if(!_TEST.test(_jsonObj[prop])){
                _b = false;
                break;
            }
        }
        if(_b) _arr.push(_jsonObj)
    }
    return _arr;
}
