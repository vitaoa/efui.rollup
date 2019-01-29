(function () {
'use strict';

var _searchKeywords = '';
var request = new XMLHttpRequest();
function levelRequestListener() {
    if (this.readyState === 4) {
        if (this.status === 200) {
            _searchKeywords = JSON.parse(this.responseText);
        }
        else {
            console.error(this.statusText);
        }
    }
}
/*search*/
function Search(dom) {
    request.onload = levelRequestListener;
    request.open("get", "js/data/route.json", false); //同步
    request.send();
    var _searchVal = dom;
    var _url = JsonQuery(_searchKeywords, { "keywords": _searchVal.value });
    var _searchWrap = document.getElementById('searchResult');
    if (_url.length > 0) {
        _searchWrap.innerHTML = '';
        for (var _v in _url) {
            var _searchHtml = document.createElement('li');
            _searchHtml.innerHTML = '<a href="pages/' + _url[_v].value + '">' + _url[_v].keywords + '</a>';
            _searchWrap.appendChild(_searchHtml);
        }
    }
    else {
        _searchWrap.innerHTML = '';
        var _searchHtml = document.createElement('li');
        _searchHtml.innerHTML = '搜索结果为：' + _url.length;
        _searchWrap.appendChild(_searchHtml);
    }
}
function JsonQuery(arr, obj) {
    var _arr = [];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var _jsonObj = arr_1[_i];
        var _b = true;
        for (var prop in obj) {
            var _TEST = new RegExp(obj[prop] || null, "i");
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

/**
 * 倒计时插件-CountDown
 */
function fnTimeCountDown(dom, time) {
    var oTime = {
        msec: 0,
        sec: 0,
        mini: 0,
        hour: 0,
        day: 0
    };
    var oDom = {
        hm: getElementsByClassName("hm", '*', dom),
        sec: getElementsByClassName("sec", '*', dom),
        mini: getElementsByClassName("mini", '*', dom),
        hour: getElementsByClassName("hour", '*', dom),
        day: getElementsByClassName("day", '*', dom)
    };
    var countdown = setInterval(function () {
        var EndTime = new Date(time);
        var ms = EndTime.getTime() - new Date().getTime(); //获取毫秒数
        if (ms >= 1000) {
            oTime.msec = ms % 1000;
            oTime.sec = Math.floor(ms / 1000);
            if (oTime.sec >= 60) {
                oTime.mini = Math.floor(oTime.sec / 60);
                oTime.sec = oTime.sec % 60;
                if (oTime.mini >= 60) {
                    oTime.hour = Math.floor(oTime.mini / 60);
                    oTime.mini = oTime.mini % 60;
                    if (oTime.hour >= 24) {
                        oTime.day = Math.floor(oTime.hour / 24);
                        oTime.hour = oTime.hour % 24;
                    }
                }
            }
        }
        else {
            oTime.msec = ms;
        }
        oDom.hm && (oDom.hm[0].innerHTML = oTime.msec);
        oDom.sec && (oDom.sec[0].innerHTML = oTime.sec);
        oDom.mini && (oDom.mini[0].innerHTML = oTime.mini);
        oDom.hour && (oDom.hour[0].innerHTML = oTime.hour);
        oDom.day && (oDom.day[0].innerHTML = oTime.day);
        ms--;
        if (ms <= 0) {
            clearInterval(countdown);
        }
    }, 1);
}

/**
 * 轮播插件-CAROUSEL
 */
function carouselLeftRight(dom, options) {
    var option = Object.assign({}, options);
    var cArr = option.cArr;
    var index = option.index;
    var speed = option.speed;
    var arrLen = cArr.length;
    var _obj = getElementsByClassName(/.*/, 'li', dom);
    //上一张
    function previmg() {
        cArr.unshift(cArr[arrLen - 1]);
        cArr.pop();
        ForEach(function (e, i) {
            removeClass(e, e.className);
            addClass(e, cArr[i]);
        }, _obj);
        index--;
        if (index < 0) {
            index = arrLen - 1;
        }
    }
    //下一张
    function nextimg() {
        cArr.push(cArr[0]);
        cArr.shift();
        var _obj = getElementsByClassName(/.*/, 'li', dom);
        ForEach(function (e, i) {
            removeClass(e, e.className);
            addClass(e, cArr[i]);
        }, _obj);
        index++;
        if (index >= arrLen) {
            index = 0;
        }
    }
    getElementsByClassName(option.prev, '*', dom)[0].onclick = function () {
        previmg();
    };
    getElementsByClassName(option.next, '*', dom)[0].onclick = function () {
        nextimg();
    };
    var timer = setInterval(nextimg, speed);
    ForEach(function (e) {
        addEventHandle(e, 'click', function () {
            var _index = e.className.replace(/.*li-(\d)/, '$1') * 2;
            if (_obj.length + 1 > _index) {
                previmg();
            }
            else if (_obj.length + 1 < _index) {
                nextimg();
            }
            return false;
        });
        addEventHandle(e, 'mouseover', function () {
            clearInterval(timer);
        });
        addEventHandle(e, 'mouseleave', function () {
            timer = setInterval(nextimg, speed);
        });
    }, _obj);
}

/**
 * Created by GA on 2018/11/14.
 */

// /*base*////////////////////////////////////////
let alink = getElementsByClassName('navbar-toggle','button');
ForEach(function (e) {
    toggleClass(e,true,'active');
},alink);

/*目录切换*/
let menutit = getElementsByClassName('arrow-group','div','mlist');
ForEach(function (e) {
    toggleClass(e,true,'active');
},menutit);
let menulist = getElementsByClassName(/.*/,'a','mlist');
let menuswitch = getElementsByClassName('mswitch','div');
ForEach(function (e,i,arr) {
    e.onclick=function () {
        addClass(this.parentNode,'current');
        ForEach(function (e) {
            removeClass(e,'current');
        },siblings(this.parentNode));
        menuswitch[i].style.display='block';
        ForEach(function (e) {
            e.style.display='none';
        },siblings(menuswitch[i],'mswitch'));
    };
},menulist);

// /*search*////////////////////////////////////////
if(!!document.getElementById('searchBtn')){
    document.getElementById('searchBtn').onclick=function () {
        Search(document.getElementById('searchVal'));
    };
}
if(!!document.getElementById('searchVal')) {
    document.getElementById('searchVal').onkeydown = function (event) {
        let e = event || window.event;
        if (e && e.keyCode == 13) { //回车键的键值为13
            Search(this);
        }
    };
}

// /*plugins*////////////////////////////////////////
/*倒计时：
* @id:fnTimeCountDown
* */
let _countdown = document.getElementById("fnTimeCountDown");
if(_countdown){
    fnTimeCountDown("fnTimeCountDown","2019/2/30 23:59:59");
}
/*轮播图：
 * @id:fnCarousel
 * */
let _carousel = document.getElementById("fnCarousel");
if(_carousel){
    carouselLeftRight("fnCarousel",{
        cArr: ["li-3","li-2","li-1"],
        prev:'arrow-prev',
        next:'arrow-next',
        index : 0,
        speed:3000
    });
}

}());
