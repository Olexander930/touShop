document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const sliders = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".prev-btn"); 
    const nextBtn = document.querySelector(".next-btn"); 
    let currentSlideIndex = 0;

    if (sliders.length > 0) {
        function showsSlide(i){
            if(slider) slider.style.transform = `translateX(-${i * 100}%)`;
            dots.forEach(dot => dot.classList.remove("active"));
            if(dots[i]) dots[i].classList.add("active");
            currentSlideIndex = i;
        }

        function nextSlider(){
            currentSlideIndex = (currentSlideIndex === sliders.length - 1) ? 0 : currentSlideIndex + 1;
            showsSlide(currentSlideIndex);
        }

        if(nextBtn) nextBtn.addEventListener("click", nextSlider);
        if(prevBtn) prevBtn.addEventListener("click", () => {
            currentSlideIndex = (currentSlideIndex === 0) ? sliders.length - 1 : currentSlideIndex - 1;
            showsSlide(currentSlideIndex);
        });

        dots.forEach((dot, i) => dot.addEventListener("click", () => showsSlide(i)));
        setInterval(nextSlider, 3000);
    }
    document.querySelectorAll('.products-grid').forEach(grid => {
        const carousel = grid.querySelector('.products-carusel');
        const prevCarousel = grid.querySelector('.btn-carusel.prev');
        const nextCarousel = grid.querySelector('.btn-carusel.next');
        
        if (carousel && prevCarousel && nextCarousel) {
            const scrollAmount = 250;
            prevCarousel.addEventListener('click', () => {
                carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
            nextCarousel.addEventListener('click', () => {
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }
    });
});