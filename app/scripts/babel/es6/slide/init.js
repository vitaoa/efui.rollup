
export default function() {
    const swiper = this;
    console.log("Update size=----")
    console.log(swiper.$el)
    console.log(document.getElementById('fnswiperLeftRight').clientWidth)
    if (swiper.initialized) return;

    // Create loop
    if (swiper.params.loop) {
        // swiper.loopCreate();
    }

    // Update size
    swiper.updateSize();

    // Update slides
    swiper.updateSlides();

    // if (swiper.params.watchOverflow) {
    //     swiper.checkOverflow();
    // }
    //
    // // Set Grab Cursor
    // if (swiper.params.grabCursor) {
    //     swiper.setGrabCursor();
    // }
    //
    if (swiper.params.preloadImages) {
        swiper.preloadImages();
    }

    // Slide To Initial Slide
    if (swiper.params.loop) {
        swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
    } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
    }

    // Attach events
    // swiper.attachEvents();

    // Init Flag
    swiper.initialized = true;

}