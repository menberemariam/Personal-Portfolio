/* ============================================
   NAVIGATION MODULE
   ============================================ */

export class Navigation {
  constructor() {
    this.navbar = document.querySelector(".navbar");
    this.menuToggle = document.querySelector(".menu-toggle");
    this.navLinks = document.querySelector(".nav-links");
    this.backToTop = document.getElementById("backToTop");
    
    this.init();
  }

  init() {
    this.setupScrollEffects();
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupBackToTop();
  }

  setupScrollEffects() {
    window.addEventListener("scroll", () => {
      // Navbar scroll effect
      if (window.scrollY > 100) {
        this.navbar.classList.add("scrolled");
        this.backToTop.style.display = "flex";
      } else {
        this.navbar.classList.remove("scrolled");
        this.backToTop.style.display = "none";
      }

      // Update active nav link
      this.updateActiveNavLink();
    });
  }

  setupMobileMenu() {
    this.menuToggle.addEventListener("click", () => {
      this.navLinks.classList.toggle("active");
      this.menuToggle.innerHTML = this.navLinks.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        this.navLinks.classList.remove("active");
        this.menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      });
    });
  }

  setupBackToTop() {
    this.backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }
}
