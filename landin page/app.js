document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.list .item');
    const thumbnails = document.querySelectorAll('.thumbnail .item');
    const timeElement = document.querySelector('.time');
    
 
    const SLIDE_INTERVAL = 5000; 
    const TRANSITION_DURATION = 1000; 
    let currentIndex = 0;
    let autoSlideTimer;
    
    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = 0;
        });
        
        slides[index].classList.add('active');
        
        setTimeout(() => {
            slides[index].style.opacity = 1;
        }, 50);
        
  
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        resetProgressBar();
    }
    
 
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }
    
   
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }
    
  
    function resetProgressBar() {
        timeElement.style.animation = 'none';
        void timeElement.offsetWidth; 
        timeElement.style.animation = `runningTime ${SLIDE_INTERVAL/1000}s linear forwards`;
    }
    
   
    function startAutoSlide() {
        autoSlideTimer = setInterval(nextSlide, SLIDE_INTERVAL);
    }
    

    function pauseAutoSlide() {
        clearInterval(autoSlideTimer);
    }
    
    nextBtn.addEventListener('click', function() {
        pauseAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    
    prevBtn.addEventListener('click', function() {
        pauseAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    carousel.addEventListener('mouseenter', pauseAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    // Inicialização
    showSlide(0);
    startAutoSlide();
});