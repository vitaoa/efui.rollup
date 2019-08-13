
import Utils from '../utils/utils';
import defaults from '../slide/defaults';
import $$ from '../dom7/dom';
import slide from '../slide/slide';

export function sliderLeftRight() {
    // var ele = $("#"+dom);
    // const slide = this;
    // slide.snapGrid=[0,424,448,1045,1147,1744,1768,2365,2389,2986,3010,3607,3631,4228,4252,4849,4873,5470,5494,6091,6115,6712,6736];
    // slide.slidesGrid=[0,424,1045,1744,2365,2986,3607,4228,4849,5470,6091,6712];

    let params;
    let el;
    if (arguments.length === 1 && arguments[0].constructor && arguments[0].constructor === Object) {
        params = arguments[0];
    } else {
        [el, params] = arguments;
    }

    if (!params) params = {};
    params = Utils.extend({}, params);
    if (el && !params.el) params.el = el;

    // Extend defaults with modules params
    const defaultsParams = Utils.extend({}, defaults);
    // Extend defaults with passed params
    slide.params = Utils.extend({}, defaultsParams, params);

    // Find el
    const $el = $$(slide.params.el);
    el = $el[0];
    if (!el) {
        return undefined;
    }
    el.slide = slide;
    $el.data('slide', slide);

    // Find Wrapper
    let $wrapperEl = $el.children(("." + (slide.params.wrapperClass)));
    if($wrapperEl.children()[0].tagName.toLowerCase()=='ul'){
        $wrapperEl = $wrapperEl.children();
    }

    Utils.extend(slide, {
        $el,
        el,
        $wrapperEl,
        wrapperEl: $wrapperEl[0],

        // Slides
        slides: $wrapperEl.children("." + (slide.params.slideClass)),
        slidesPerGroup:1,
        // isDirection
        isHorizontal() {
            return slide.params.direction === 'horizontal';
        },
        isVertical() {
            return slide.params.direction === 'vertical';
        },
        // RTL
        rtl: (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
        rtlTranslate: slide.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
        wrongRTL: $wrapperEl.css('display') === '-webkit-box',

        // Indexes
        activeIndex: 0,
        // Props
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,
        // Clicks
        allowClick: true,

        // Touches
        allowTouchMove: slide.params.allowTouchMove,

        touches: {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0,
        },
    });
    console.log(slide);

    // Init
    if (slide.params.init) {
        slide.init();
    }
    // var slider = ele.find(options.wrapper);
    // var sliderlen = ele.find(options.item).length;
    // var sliderBtns = ele.find(options.pagination + ' span');
    var slideprev = $el.children(slide.params.navigation.prevEl);
    var slidenext = $el.children(slide.params.navigation.nextEl);
    // var callbackfn = options.callback;
    // var _W = slider.find("li:first").outerWidth(true);
    // var _pW = slider.parent().outerWidth(true);
    // var _slice = sliderlen-Math.round(_pW/_W);

    // var _cur = options.cur || 0;

    slideprev[0].onclick=function () {
        slide.slidePrev()
        //sliderPrev(options.wipe);
    };
    slidenext[0].onclick=function () {
        slide.slideNext()
        //sliderNext(options.wipe);
    };

}