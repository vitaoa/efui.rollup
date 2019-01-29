/**
 * Created by GA on 2018/11/14.
 */

import { Search } from '../ts/Search.ts';
import { fnTimeCountDown } from '../ts/CountDown.ts';
import { carouselLeftRight } from '../ts/Carousel.ts';


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


