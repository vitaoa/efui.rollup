var _searchKeywords = '';
var request = new XMLHttpRequest();

function levelRequestListener() {
  if (this.readyState === 4) {
    if (this.status === 200) {
      _searchKeywords = JSON.parse(this.responseText);
    } else {
      console.error(this.statusText);
    }
  }
}
/*search*/


var Search = function Search(dom) {
  request.onload = levelRequestListener;
  request.open("get", "js/data/route.json", false); //同步

  request.send();
  var _searchVal = dom;

  var _url = JsonQuery(_searchKeywords, {
    "keywords": _searchVal.value
  });

  var _searchWrap = document.getElementById('searchResult');

  if (_url.length > 0) {
    _searchWrap.innerHTML = '';

    for (var _v in _url) {
      var _searchHtml = document.createElement('li');

      _searchHtml.innerHTML = '<a href="pages/' + _url[_v].value + '">' + _url[_v].keywords + '</a>';

      _searchWrap.appendChild(_searchHtml);
    }
  } else {
    _searchWrap.innerHTML = '';

    var _searchHtml2 = document.createElement('li');

    _searchHtml2.innerHTML = '搜索结果为：' + _url.length;

    _searchWrap.appendChild(_searchHtml2);
  }
};

function JsonQuery(arr, obj) {
  var _arr = [];

  for (var _iterator = arr, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var _jsonObj = _ref;
    var _b = true;

    for (var prop in obj) {
      var _TEST = new RegExp(obj[prop] || null, "i");

      if (!_TEST.test(_jsonObj[prop])) {
        _b = false;
        break;
      }
    }

    if (_b) _arr.push(_jsonObj);
  }

  return _arr;
}