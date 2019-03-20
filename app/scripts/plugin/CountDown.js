/**
 * 倒计时插件-CountDown
 */
const fnTimeCountDown = (dom,time) =>{
    let oTime={
        msec:0,
        sec:0,
        mini:0,
        hour:0,
        day:0
    };
    let oDom = {
        hm: getElementsByClassName("hm",'*',dom),
        sec: getElementsByClassName("sec",'*',dom),
        mini: getElementsByClassName("mini",'*',dom),
        hour: getElementsByClassName("hour",'*',dom),
        day: getElementsByClassName("day",'*',dom)
    };

    let countdown = setInterval(()=> {
        let EndTime = new Date(time);
        let ms = EndTime.getTime() - new Date().getTime();//获取毫秒数
        if(ms>=1000){
            oTime.msec = ms % 1000;
            oTime.sec = Math.floor(ms / 1000);
            if(oTime.sec>=60){
                oTime.mini = Math.floor(oTime.sec / 60);
                oTime.sec = oTime.sec % 60;
                if(oTime.mini>=60){
                    oTime.hour = Math.floor(oTime.mini / 60);
                    oTime.mini = oTime.mini % 60;
                    if(oTime.hour>=24){
                        oTime.day = Math.floor(oTime.hour / 24);
                        oTime.hour = oTime.hour % 24;
                    }
                }
            }
        }else {
            oTime.msec = ms;
        }
        oDom.hm && (oDom.hm[0].innerHTML=oTime.msec);
        oDom.sec && (oDom.sec[0].innerHTML=oTime.sec);
        oDom.mini && (oDom.mini[0].innerHTML=oTime.mini);
        oDom.hour && (oDom.hour[0].innerHTML=oTime.hour);
        oDom.day && (oDom.day[0].innerHTML=oTime.day);

        ms--;
        if (ms <= 0) {
            clearInterval(countdown);
        }
    },1);
}
