"use strict";
var _searchKeywords = '';
var request = new XMLHttpRequest();
request.onload = levelRequestListener;
request.open("get", "./app/data/route.json", true);
request.send();
function levelRequestListener() {
    _searchKeywords = JSON.parse(this.responseText);
}
/*search*/
function searchFn() {
    var _searchVal = document.getElementById('searchVal');
    // console.log(_searchVal.value);
    var _url = JsonQuery(_searchKeywords, { "keywords": _searchVal.value });
    if (_url.length > 0) {
        for (var _v in _url) {
            console.log(_url[_v]);
            var _searchWrap = document.getElementById('searchResult');
            var _searchHtml = document.createElement('li');
            _searchHtml.innerHTML = '<a href="' + _url[_v].value + '">' + _url[_v].keywords + '</a>';
            _searchWrap.appendChild(_searchHtml);
        }
    }
    // window.location.href=_url[0].value
}
function JsonQuery(arr, obj) {
    var _arr = [];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var _jsonObj = arr_1[_i];
        var _b = true;
        for (var prop in obj) {
            var _TEST = new RegExp(obj[prop], "i");
            if (!_TEST.test(_jsonObj[prop])) {
                _b = false;
                break;
            }
        }
        if (_b)
            _arr.push(_jsonObj);
    }
    return _arr;
}
