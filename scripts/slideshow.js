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

    console.log(`Changing slide for slideshow ${slideshowId} to slide ${slideIndex[slideshowId]}`);
}

// Initialize slideshows
document.addEventListener('DOMContentLoaded', function () {
    const slideshows = document.getElementsByClassName("slideshow");

    Array.from(slideshows).forEach((slideshow, index) => {
        slideshow.dataset.id = index;
        slideIndex[index] = 1; // Set the initial slide index
        slideshows[index].querySelector('.slide').style.display = "block"; // Show the first slide
    });
});
