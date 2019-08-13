
import Utils from '../utils/utils';

export default function (newActiveIndex) {
    const swiper = this;
    const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

    const {
        slidesGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex,
    } = swiper;
    let activeIndex = newActiveIndex;
    let snapIndex;
    console.log("更新序号:"+activeIndex);
    if (typeof activeIndex === 'undefined') {
        console.log("**************")
        for (let i = 0; i < slidesGrid.length; i += 1) {
            if (typeof slidesGrid[i + 1] !== 'undefined') {
                if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - ((slidesGrid[i + 1] - slidesGrid[i]) / 2)) {
                    activeIndex = i;
                } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
                    activeIndex = i + 1;
                }
            } else if (translate >= slidesGrid[i]) {
                activeIndex = i;
            }
        }
        // Normalize slideIndex
        if (params.normalizeSlideIndex) {
            if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
        }
    }
    snapIndex = Math.floor(activeIndex / params.slidesPerGroup);

    console.log(activeIndex+"=activeIndex，previousIndex="+previousIndex);
    console.log(previousSnapIndex+"=previousSnapIndex，snapIndex="+snapIndex);

    if (activeIndex === previousIndex) {
        if (snapIndex !== previousSnapIndex) {
            swiper.snapIndex = snapIndex;
        }
        return;
    }

    // Get real index
    const realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);

    Utils.extend(swiper, {
        snapIndex,
        realIndex,
        previousIndex,
        activeIndex,
    });
}