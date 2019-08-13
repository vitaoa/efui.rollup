import Utils from '../es6/utils/utils.js';

declare global {
    interface Window {
        searchKeywords: any
    }
}


let request = new XMLHttpRequest();
export const Search = (dom) => {
    request.onload = Utils.levelRequestListener;
    request.open("get", "js/data/route.json", false);//同步
    request.send();

    let _searchVal = dom as HTMLInputElement;
    let _url = Utils.JsonQuery(window.searchKeywords,{"keywords":_searchVal.value});
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