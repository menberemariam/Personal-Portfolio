/* ============================================
   TESTIMONIALS SLIDER MODULE
   ============================================ */

export class TestimonialsSlider {
  constructor() {
    this.testimonialDots = document.querySelectorAll(".slider-dots .dot");
    this.testimonialSlides = document.querySelectorAll(".testimonial");
    this.prevBtn = document.querySelector(".slider-btn.prev");
    this.nextBtn = document.querySelector(".slider-btn.next");
    this.currentSlide = 0;
    this.autoSlideInterval = null;
    
    this.init();
  }

  init() {
    this.setupDotNavigation();
    this.setupArrowNavigation();
    this.startAutoSlide();
  }

  showSlide(index) {
    // Hide all slides
    this.testimonialSlides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Remove active class from all dots
    this.testimonialDots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Show the selected slide
    this.testimonialSlides[index].classList.add("active");
    this.testimonialDots[index].classList.add("active");
    this.currentSlide = index;
  }

  setupDotNavigation() {
    this.testimonialDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = parseInt(dot.getAttribute("data-index"));
        this.showSlide(index);
        this.resetAutoSlide();
      });
    });
  }

  setupArrowNavigation() {
    // Previous button
    this.prevBtn.addEventListener("click", () => {
      this.currentSlide =
        (this.currentSlide - 1 + this.testimonialSlides.length) %
        this.testimonialSlides.length;
      this.showSlide(this.currentSlide);
      this.resetAutoSlide();
    });

    // Next button
    this.nextBtn.addEventListener("click", () => {
      this.currentSlide = (this.currentSlide + 1) % this.testimonialSlides.length;
      this.showSlide(this.currentSlide);
      this.resetAutoSlide();
    });
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.testimonialSlides.length;
      this.showSlide(this.currentSlide);
    }, 5000);
  }

  resetAutoSlide() {
    clearInterval(this.autoSlideInterval);
    this.startAutoSlide();
  }
}
