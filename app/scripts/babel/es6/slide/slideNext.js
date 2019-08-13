export default function () {
    const swiper = this;
    const { params, animating,rtlTranslate } = swiper;

    if (params.loop) {
        if (animating) return false;
    }
    return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup);
}