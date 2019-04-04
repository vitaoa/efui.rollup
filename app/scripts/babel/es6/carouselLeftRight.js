/**
 * 轮播插件-CAROUSEL
 */
export function carouselLeftRight(dom,options){
    let option = Object.assign({},options);

    let cArr = option.cArr;
    let index = option.index;
    let speed = option.speed;
    let arrLen = cArr.length;
    let _obj = getElementsByClassName(/.*/,'li',dom);

    //上一张
    function previmg(){
        cArr.unshift(cArr[arrLen-1]);
        cArr.pop();
        ForEach(function (e,i) {
            removeClass(e,e.className);
            addClass(e,cArr[i]);
        },_obj);
        index--;
        if (index<0) {
            index=arrLen-1;
        }
    }
    //下一张
    function nextimg(){
        cArr.push(cArr[0]);
        cArr.shift();
        var _obj = getElementsByClassName(/.*/,'li',dom);
        ForEach(function (e,i) {
            removeClass(e,e.className);
            addClass(e,cArr[i]);
        },_obj);
        index++;
        if (index>=arrLen) {
            index=0;
        }
    }

    getElementsByClassName(option.prev,'*',dom)[0].onclick=function () {
        previmg();
    };
    getElementsByClassName(option.next,'*',dom)[0].onclick=function () {
        nextimg();
    };

    let timer=setInterval(nextimg,speed);

    ForEach(function (e) {
        addEventHandle(e,'click',function () {
            let _index = e.className.replace(/.*li-(\d)/,'$1')*2;
            if(_obj.length+1>_index){
                previmg();
            }else if(_obj.length+1<_index){
                nextimg();
            }
            return false;
        });
        addEventHandle(e,'mouseover',function () {
            clearInterval(timer);
        });
        addEventHandle(e,'mouseleave',function () {
            timer=setInterval(nextimg,speed);
        });
    },_obj);

}
