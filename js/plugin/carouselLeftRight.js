/**
 * 轮播插件-CAROUSEL
 */
var carouselLeftRight = function carouselLeftRight(dom, options) {
  var option = Object.assign({}, options);
  var cArr = option.cArr;
  var index = option.index;
  var speed = option.speed;
  var arrLen = cArr.length;

  var _obj = getElementsByClassName(/.*/, 'li', dom); //上一张


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
  } //下一张


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
      } else if (_obj.length + 1 < _index) {
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
};