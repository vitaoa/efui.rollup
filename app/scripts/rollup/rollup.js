import Utils from '../babel/es6/utils/utils';
import { Search } from '../babel/ts/Search.ts';
import { carouselLeftRight } from '../babel/es6/jq/carouselLeftRight';
import { sliderAroundLeftRight } from '../babel/es6/jq/sliderAroundLeftRight';
import { sliderLeftRight } from '../babel/es6/jq/sliderLeftRight';
import { fnTimeCountDown } from '../babel/es6/CountDown';

/* init */
Utils.remCompute(750, true);

// /*base*////////////////////////////////////////
/*菜单切换*/
var alink = getElementsByClassName('navbar-toggle','button');
ForEach(function (e) {
    toggleClass(e,true,'active');
},alink);

/*目录切换*/
var menutit = getElementsByClassName('arrow-group','div','mlist');
ForEach(function (e) {
    toggleClass(e,true,'active');
},menutit);
var menulist = getElementsByClassName(/.*/,'a','mlist');
var menuswitch = getElementsByClassName('mswitch','div');
ForEach(function (e,i,arr) {
    e.onclick=function () {
        window.location.hash=menuswitch[i].id;
        addClass(this.parentNode,'current');
        ForEach(function (e) {
            removeClass(e,'current');
        },siblings(this.parentNode));
        menuswitch[i].style.display='block';
        ForEach(function (e) {
            e.style.display='none';
        },siblings(menuswitch[i],'mswitch'));
    }
},menulist);

// /*search*////////////////////////////////////////
if(!!document.getElementById('searchBtn')){
    document.getElementById('searchBtn').onclick=function () {
        Search(document.getElementById('searchVal'));
    };
}
if(!!document.getElementById('searchVal')) {
    document.getElementById('searchVal').onkeydown = function (event) {
        var e = event || window.event;
        if (e && e.keyCode == 13) { //回车键的键值为13
            Search(this);
        }
    };
}

// /*plugins*////////////////////////////////////////


/*倒计时：
* @id:fnTimeCountDown
* */
var _countdown = document.getElementById("fnTimeCountDown");
if(_countdown){
    fnTimeCountDown("fnTimeCountDown","2020/2/30 23:59:59");
}
/*层叠轮播图：
 * @id:fnCarousel
 * */
var _carousel = document.getElementById("fnCarousel");
if(_carousel){
    carouselLeftRight("fnCarousel",{
        cArr: ["li-3","li-2","li-1"],
        prev:'.arrow-prev',
        next:'.arrow-next',
        index : 0,
        speed:300000
    });
}
/*循环切换轮播图：
 * @id:fnsliderLeftRight
 * */
var _sliderLeftRight = document.getElementById("fnsliderLeftRight");
if(_sliderLeftRight){
    sliderAroundLeftRight("fnsliderLeftRight",{
        wrapper: '.picswitch-itmes ul',
        speed: 300000,
        loop: true,
        prev: '.btn-prev',
        next: '.btn-next'
    });
}
/*滑动切换轮播图：
 * @id:fnswiperLeftRight
 * */
var _swiperLeftRight = document.getElementById("fnswiperLeftRight");
if(_swiperLeftRight){
    var _ = new sliderLeftRight('#fnswiperLeftRight', {
        wrapperClass:'swiper-wrapper',
        slideClass: "swiper-slide",
        speed:300000,
        slidesPerGroup:2,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: function(){
                //Swiper初始化了
                alert('当前的slide序号是'+this.activeIndex);
            },
        },
        item:'li',
        loop:false,
        wipe:true,
        etouch:true,
    });
}


