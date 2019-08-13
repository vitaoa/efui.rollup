
/**
 * 轮播插件-CAROUSEL
 */
export function carouselLeftRight(dom,options){
    let $this = $("#"+dom);

    let option = $.extend({},options || {});
    let cArr = option.cArr;
    let index = option.index;
    let speed = option.speed;
    let arrLen = cArr.length;

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

    $this.find(option.next).hover(function () {
        $(this).find('i').toggleClass('arrow-next arrow-nexth')
    },function () {
        $(this).find('i').toggleClass('arrow-next arrow-nexth')
    });
    $this.find(option.prev).hover(function () {
        $(this).find('i').toggleClass('arrow-prev arrow-prevh')
    },function () {
        $(this).find('i').toggleClass('arrow-prev arrow-prevh')
    });
    $(document).on("click",".li-1",function(){
        previmg();
        return false;
    });
    $(document).on("click",".li-3",function(){
        nextimg();
        return false;
    });

    let timer=setInterval(nextimg,speed);
    $this.mouseover(function(){
        clearInterval(timer);
    });
    $this.mouseleave(function(){
        timer=setInterval(nextimg,speed);
    });

}
