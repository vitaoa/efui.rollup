/**
 * Created by GA on 2018/11/14.
 */

import '../../styles/efui.scss'
import { getElementsByClassName } from './base.js';
import { ForEach } from './base.js';
import { toggleClass } from './base.js';
import { fnTimeCountDown } from './base.js';

window.onload = function(){
    document.getElementById('pageLoader').style.display='none';
    // classReg:'\b(i-panel-)([\w]+?)\b'
    var _regExp = /\b(i-panel-)([\w]+?)\b/g;

    var alink = getElementsByClassName('page-loader','div');
    ForEach(function (e) {
        toggleClass(e,true,'active');
    },alink);

    setTimeout(function () {
        fnTimeCountDown(document.getElementById("fnTimeCountDown"),"2018/11/30 23:59:59");
    },10);
};
