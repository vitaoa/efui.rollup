/**
 * Created by GA on 2018/11/14.
 */

import '../../styles/efui.scss'
import { getElementsByClassName } from './base.js';
import { ForEach } from './base.js';
import { toggleClass } from './base.js';
import { fnTimeCountDown } from './base.js';

    var alink = getElementsByClassName('navbar-toggle','button');
    ForEach(function (e) {
        toggleClass(e,true,'active');
    },alink);


