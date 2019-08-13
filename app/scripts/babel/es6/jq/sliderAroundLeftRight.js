
export function sliderAroundLeftRight(dom,options) {
    var _this = $("#"+dom);
    options = $.extend({}, options || {});

    var slider = _this.find(options.wrapper);
    var slideprev = _this.find(options.prev);
    var slidenext = _this.find(options.next);

    var timeInterval = options.speed;
    var scrollTimer;

    var _liWidthFirst = _this.find("li:first").outerWidth(true);
    var _liWidthLast = _this.find("li:last").outerWidth(true);
    slider.hover(function(){
        clearInterval(scrollTimer);
    },function(){
        if (options.loop) {
            scrollTimer = setInterval(function(){
                scrollList();
            },timeInterval);
        }
    });

    slideprev.click(function () {
        clearInterval(scrollTimer);
        slider.stop(true).animate({ "left" : _liWidthLast},500 , function(){
            slider.css({"left":'0px'}).find("li:last").prependTo(slider);
            if (options.loop) {
                scrollTimer = setInterval(function(){
                    scrollList();
                },timeInterval);
            }
        });
    });
    slidenext.click(function () {
        clearInterval(scrollTimer);
        slider.stop(true).animate({ "left" : -_liWidthFirst +"px" },500 , function(){
            slider.css({"left":"0px"}).find("li:first").appendTo(slider);
            if (options.loop) {
                scrollTimer = setInterval(function(){
                    scrollList();
                },timeInterval);
            }
        })
    });
    slidenext.hover(function () {
        $(this).addClass('hover')
    },function () {
        $(this).removeClass('hover')
    });
    slideprev.hover(function () {
        $(this).addClass('hover')
    },function () {
        $(this).removeClass('hover')
    });

    function scrollList(){
        slider.stop(true).animate({ "left" : -_liWidthFirst +"px" },500 , function(){
            slider.css({"left":"0px"}).find("li:first").appendTo(slider);
        })
    }
    if (options.loop) {
        slider.trigger("mouseout");
    }
}