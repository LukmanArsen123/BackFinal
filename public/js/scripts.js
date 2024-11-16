// Basic script for portfolio carousel
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
  
    carousels.forEach(carousel => {
      const slides = carousel.querySelectorAll('.carousel-slide');
      let currentIndex = 0;
  
      // Auto-slide every 3 seconds
      setInterval(() => {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
      }, 3000);
    });
  });
  