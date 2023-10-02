let slideIndex = {};

function changeSlide(n, btnElement) {
    const slideshow = btnElement.parentElement;
    const slides = slideshow.getElementsByClassName("slide");
    const slideshowId = slideshow.dataset.id;

    if (!slideIndex[slideshowId]) slideIndex[slideshowId] = 1;

    slideIndex[slideshowId] += n;

    if (slideIndex[slideshowId] > slides.length) slideIndex[slideshowId] = 1;
    if (slideIndex[slideshowId] < 1) slideIndex[slideshowId] = slides.length;

    Array.from(slides).forEach(slide => slide.style.display = "none");
    slides[slideIndex[slideshowId] - 1].style.display = "block";

    // Reset the timer
    if (slideshow.timer) {
        clearTimeout(slideshow.timer);
    }

    const videoElement = slides[slideIndex[slideshowId] - 1].querySelector('video');
    const duration = videoElement ? videoElement.duration * 1000 : 10000;

    slideshow.timer = setTimeout(() => {
        changeSlide(1, btnElement);
    }, duration);
}

// Initialize slideshows
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded fired!');
    const slideshows = document.getElementsByClassName("slideshow");

    Array.from(slideshows).forEach(slideshow => {
        changeSlide(1, slideshow.querySelector('.next'));
    });
});
