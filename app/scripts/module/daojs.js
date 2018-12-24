
+(function($) {
	'use strict';

	$.fn.extend({
        fnTimeCountDown:function (d) {
            this.each(function(){
                var EndTime = new Date(d);
                var t = EndTime.getTime() - new Date().getTime();

                var o = {
                    hm: $(this).find(".hm"),
                    sec: $(this).find(".sec"),
                    mini: $(this).find(".mini"),
                    hour: $(this).find(".hour"),
                    day: $(this).find(".day")
                };

                var timeout = function () {
                    t = EndTime.getTime() - new Date().getTime();
                    var totalSeconds = t/1000;
                    var _day = Math.floor(totalSeconds / (60 * 60 * 24));
                    var leftTime = totalSeconds % (60 * 60 * 24);
                    var _hour = Math.floor(leftTime / (60 * 60));
                    leftTime = leftTime % (60 * 60);
                    var _mini = Math.floor(leftTime / 60);
                    var _sec = Math.floor(leftTime % 60);

                    o.hm && (o.hm.html(Math.floor(t % 1000)));
                    o.sec && (o.sec.html(_sec));
                    o.mini && (o.mini.html(_mini));
                    o.hour && (o.hour.html(_hour));
                    o.day && (o.day.html(_day));
                };
                if(t > 0){
                    setInterval(timeout, 1);
                }
            });
        }
	});
})(jQuery);