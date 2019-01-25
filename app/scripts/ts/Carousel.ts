/**
 * 轮播插件-CAROUSEL
 */

export function carouselLeftRight(options){
    return this.each(function () {
        var option = $.extend({},options || {});
        var $this = $(this);

        var cArr = option.cArr;
        var index = option.index;
        var speed = option.speed;
        var arrLen = cArr.length;

        //上一张
        function previmg(){
            cArr.unshift(cArr[arrLen-1]);
            cArr.pop();
            $this.find('li').each(function(i,e){
                $(e).removeClass().addClass(cArr[i]);
            });
            index--;
            if (index<0) {
                index=arrLen-1;
            }
        }
        //下一张
        function nextimg(){
            cArr.push(cArr[0]);
            cArr.shift();
            $this.find("li").each(function(i,e){
                $(e).removeClass().addClass(cArr[i]);
            });
            index++;
            if (index>=arrLen) {
                index=0;
            }
        }

        $this.find(option.prev).click(function () {
            previmg();
        });
        $this.find(option.next).click(function () {
            nextimg();
        });
        $(document).on("click",".li-1",function(){
            previmg();
            return false;
        });
        $(document).on("click",".li-3",function(){
            nextimg();
            return false;
        });

        timer=setInterval(nextimg,speed);
        $this.mouseover(function(){
            clearInterval(timer);
        });
        $this.mouseleave(function(){
            timer=setInterval(nextimg,speed);
        });
    });
}