
import Support from '../utils/support';
export function minTranslate () {
    return (-this.snapGrid[0]);
}
export function maxTranslate () {
    return (-this.snapGrid[this.snapGrid.length - 1]);
}
export function setTranslate(translate, byController) {
    const swiper = this;
    const {
        rtlTranslate: rtl, params, $wrapperEl, progress,
    } = swiper;
    let x = 0;
    let y = 0;
    const z = 0;

    if (swiper.isHorizontal()) {
        x = rtl ? -translate : translate;
    } else {
        y = translate;
    }

    if (params.roundLengths) {
        x = Math.floor(x);
        y = Math.floor(y);
    }
    console.log("==========")
console.log($wrapperEl);

    if (Support.transforms3d) $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
    else $wrapperEl.transform(`translate(${x}px, ${y}px)`);

    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x : y;

}
