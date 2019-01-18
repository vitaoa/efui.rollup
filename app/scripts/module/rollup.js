/**
 * Created by GA on 2018/11/14.
 */

import '../../styles/efui.scss'
import { Search } from '../ts/Search.ts';
import { fnTimeCountDown } from '../ts/CountDown.ts';

    let alink = getElementsByClassName('navbar-toggle','button');
    ForEach(function (e) {
        toggleClass(e,true,'active');
    },alink);

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

    //plugins
    /*倒计时：
    * @id:fnTimeCountDown
    * */
    let _countdown = document.getElementById("fnTimeCountDown");
    if(_countdown){
        fnTimeCountDown("fnTimeCountDown","2019/1/30 23:59:59");
    }


