/**
 * 原生javascript函数库
 * Created by GA on 2018/11/6.
 */


/*
* @name:getElementsByClassName
* @param:cName,domTag,root
* 该函数有三个参数：第一个参数是class名（必选，字串形式）；第二个参数是该DOM节点的标签名(字串形式)；第三个参数是父容器（可选），默认为body节点，通过设置id获取。
* Eg:var adom = getElementsByClassName('title','h3'); ==>jQuery:var adom = $('h3.title');
* */
function getElementsByClassName (cName,domTag,root) {
    if (root) {
        root = typeof root == "string" ? document.getElementById(root) : root;
    } else{
        root = document;
    };
    domTag = domTag || "*";
    var els = root.getElementsByTagName(domTag);
    var arr = [];
    for (var i = 0,n = els.length; i < n; i++) {
        for (var j = 0,k = els[i].className.split(" "),l = k.length; j < l; j++) {
            if(cName instanceof RegExp){
                if(cName.test(k[j])){
                    arr.push(els[i]);
                    break;
                }
            }else{
                if (k[j] == cName) {
                    arr.push(els[i]);
                    break;
                }
            }
        }
    }
    return arr;
}

//callBack:回调函数,遍历数组中的一项,就要执行一次callBack
//context:改变callBack方法中的this指向
function ForEach(callBack, context) {
    typeof context === "undefined" ? context = window : null;

    if ("forEach" in Array.prototype) {
        context.forEach(callBack);
        return;
    }else{
        for (var i = 0; i < context.length; i++) {
            typeof callBack === "function" ? callBack(context[i]) : null;
        }
    }
}

//该函数有三个基本参数：第一个参数是DOM节点（必选）；第二个参数是事件是否是父元素（必选）；第三个参数是切换的class名（必选，字串或者正则形式）,正则形式时必须配置option参数("classActive"和"classDefault");
//第四个是扩展参数:子元素的相关参数,正则匹配替换的class变量.
function toggleClass(ele,toggleParent,toggleClass,option) {
    ele.onclick=function () {
        var isRegExp = toggleClass instanceof RegExp;
        var _toggleObj;
        if(toggleParent){
            _toggleObj = this.parentNode;
        }else{
            _toggleObj = this;
        }

        if(typeof toggleClass ==='string'){
            var re =new RegExp(toggleClass,"g");
            if(re.test(_toggleObj.className)){
                var _classRe = _toggleObj.className.replace(toggleClass,"");
                _toggleObj.className = _classRe.replace(/^\s*|\s*$/g,'');
            }else{
                var re2 =new RegExp('('+_toggleObj.className+')',"g");
                var _classRe = _toggleObj.className.replace(re2,"$1 "+toggleClass);
                _toggleObj.className = _classRe;
            }
        }else if(isRegExp){
            var _classActive = _toggleObj.className.replace(toggleClass,"$1"+option.classActive);
            var _classDefault = _toggleObj.className.replace(toggleClass,"$1"+option.classDefault);
            if(_toggleObj.className === _classActive){
                _toggleObj.className = _classDefault;
            }else{
                _toggleObj.className = _classActive;
            }
        }

        if(option){
            if(option.childElementTag){
                var _toggleObjChild = this.getElementsByTagName(option.childElementTag)[0];
                var _classActiveChild = _toggleObjChild.className.replace(option.classReg,"$1"+option.classActive);
                var _classDefaultChild = _toggleObjChild.className.replace(option.classReg,"$1"+option.classDefault);
                if(_toggleObjChild.className === _classActiveChild){
                    _toggleObjChild.className = _classDefaultChild;
                }else{
                    _toggleObjChild.className = _classActiveChild;
                }
            }
        }
    }
}

