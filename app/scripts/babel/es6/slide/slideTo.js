export default function (index = 0) {
    const swiper = this;
    let slideIndex = index;
    if (slideIndex < 0) slideIndex = 0;

    const {
        params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl,
    } = swiper;
    if (swiper.animating && params.preventInteractionOnTransition) {
        return false;
    }
    let snapIndex = Math.floor(slideIndex / params.slidesPerGroup);

    console.log(activeIndex+"=activeIndex，slideIndex="+slideIndex);
    console.log(snapGrid)

    const translate = -swiper.slides.eq(activeIndex).outerWidth(true)*snapIndex*params.slidesPerGroup;
    console.log("translate:"+translate)

    let direction;
    if (slideIndex > activeIndex) direction = 'next';
    else if (slideIndex < activeIndex) direction = 'prev';
    else direction = 'reset';
    console.log("当前方向:"+direction);
    console.log("激活序号:"+slideIndex);

    swiper.setTranslate(translate);
    swiper.updateActiveIndex(slideIndex);
    return true;
}