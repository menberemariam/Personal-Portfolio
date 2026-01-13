// script.js - COMPLETE UPDATED VERSION

// DOM Elements
const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const backToTop = document.getElementById("backToTop");
const currentYear = document.getElementById("currentYear");
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const videoModal = document.getElementById("videoModal");
const projectModal = document.getElementById("projectModal");
const closeModals = document.querySelectorAll(".close-modal");
const playButtons = document.querySelectorAll(".play-button");
const viewProjectButtons = document.querySelectorAll(".btn-view-project");
const testimonialDots = document.querySelectorAll(".slider-dots .dot");
const testimonialSlides = document.querySelectorAll(".testimonial");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const newsletterEmail = document.getElementById("newsletterEmail");
const subscribeBtn = document.getElementById("subscribeBtn");

// Current year for footer
currentYear.textContent = new Date().getFullYear();

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
    backToTop.style.display = "flex";
  } else {
    navbar.classList.remove("scrolled");
    backToTop.style.display = "none";
  }

  // Update active nav link based on scroll position
  updateActiveNavLink();
});

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Smooth scrolling for navigation links
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

// Back to top button
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
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

// Testimonial slider functionality
let currentSlide = 0;

function showSlide(index) {
  // Hide all slides
  testimonialSlides.forEach((slide) => {
    slide.classList.remove("active");
  });

  // Remove active class from all dots
  testimonialDots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Show the selected slide
  testimonialSlides[index].classList.add("active");
  testimonialDots[index].classList.add("active");
  currentSlide = index;
}

// Dot click event
testimonialDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.getAttribute("data-index"));
    showSlide(index);
  });
});

// Previous button
prevBtn.addEventListener("click", () => {
  currentSlide =
    (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
  showSlide(currentSlide);
});

// Next button
nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % testimonialSlides.length;
  showSlide(currentSlide);
});

// Auto slide testimonials
setInterval(() => {
  currentSlide = (currentSlide + 1) % testimonialSlides.length;
  showSlide(currentSlide);
}, 5000);

// ============================================
// UPDATED: Video modal functionality for LOCAL VIDEOS
// ============================================
playButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const videoId = button.getAttribute("data-video");
    const videoSource = document.getElementById("videoSource");
    const videoPlayer = document.getElementById("videoPlayer");

    // Set video source based on videoId (using LOCAL video files)
    let videoUrl = "";
    switch (videoId) {
      case "react-dashboard":
        videoUrl = "videos/react-dashboard.mp4";
        break;
      case "android-guide":
        videoUrl = "videos/android-guide.mp4";
        break;
      case "javascript-mastery":
        videoUrl = "videos/javascript-mastery.mp4";
        break;
      default:
        videoUrl = "videos/" + videoId + ".mp4";
    }

    // Set the video source and load it
    videoSource.src = videoUrl;
    videoPlayer.load();
    videoModal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent scrolling

    // Play video after modal opens
    setTimeout(() => {
      videoPlayer.play().catch((e) => console.log("Autoplay prevented:", e));
    }, 500);
  });
});

// Project modal functionality
viewProjectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-modal");
    const modalBody = document.getElementById("modalBody");

    // Get project details
    const projectCard = button.closest(".project-card");
    const projectImageSrc =
      projectCard.querySelector(".project-image img")?.src || "";
    const projectTitle = projectCard.querySelector("h3").textContent;
    const projectDescription = projectCard.querySelector("p").textContent;

    // Get project tags
    const tags = [];
    projectCard.querySelectorAll(".tag").forEach((tag) => {
      tags.push(tag.textContent);
    });

    modalBody.innerHTML = `
      <div class="modal-project-image">
        <img src="${projectImageSrc}" alt="${projectTitle}" />
      </div>
      <h2>${projectTitle}</h2>
      <p>${projectDescription}</p>
      <h3>Project Details</h3>
      <p>This is a detailed description of the project. It includes information about the technologies used, 
      challenges faced, solutions implemented, and the final outcome.</p>
      
      <h3>Technologies Used</h3>
      <div class="project-tech">
        ${tags.map((tag) => `<span class="tech-tag">${tag}</span>`).join("")}
      </div>
      
      <h3>Key Features</h3>
      <ul>
        <li>Responsive design for all devices</li>
        <li>Secure authentication system</li>
        <li>Real-time updates</li>
        <li>Performance optimized</li>
        <li>Scalable architecture</li>
      </ul>
      
      <div class="modal-buttons">
        <button class="btn btn-primary">View Live Demo</button>
        <button class="btn btn-secondary">View Source Code</button>
      </div>
    `;

    projectModal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent scrolling
  });
});

// ============================================
// UPDATED: Close modal functionality for LOCAL VIDEOS
// ============================================
closeModals.forEach((button) => {
  button.addEventListener("click", () => {
    videoModal.style.display = "none";
    projectModal.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling

    // Pause and reset video when closing modal
    const videoPlayer = document.getElementById("videoPlayer");
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    videoPlayer.src = "";
  });
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === videoModal) {
    videoModal.style.display = "none";
    document.body.style.overflow = "auto";

    // Pause and reset video
    const videoPlayer = document.getElementById("videoPlayer");
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    videoPlayer.src = "";
  }

  if (e.target === projectModal) {
    projectModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Form validation and submission
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Reset previous errors
  resetFormErrors();

  // Get form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validation flags
  let isValid = true;

  // Validate name
  if (!name) {
    showError("nameError", "Name is required");
    isValid = false;
  } else if (name.length < 2) {
    showError("nameError", "Name must be at least 2 characters");
    isValid = false;
  }

  // Validate email
  if (!email) {
    showError("emailError", "Email is required");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError("emailError", "Please enter a valid email address");
    isValid = false;
  }

  // Validate subject
  if (!subject) {
    showError("subjectError", "Subject is required");
    isValid = false;
  }

  // Validate message
  if (!message) {
    showError("messageError", "Message is required");
    isValid = false;
  } else if (message.length < 10) {
    showError("messageError", "Message must be at least 10 characters");
    isValid = false;
  }

  if (isValid) {
    // Show loading state
    submitBtn.classList.add("loading");

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Reset form
      contactForm.reset();

      // Show success message
      showFormMessage(
        "Thank you for your message! I will get back to you soon.",
        "success"
      );

      // Reset button state
      submitBtn.classList.remove("loading");
    }, 2000);
  }
});

// Newsletter subscription
subscribeBtn.addEventListener("click", () => {
  const email = newsletterEmail.value.trim();

  if (!email) {
    alert("Please enter your email address");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Simulate subscription
  newsletterEmail.value = "";
  alert("Thank you for subscribing to my newsletter!");
});

// Helper functions
function resetFormErrors() {
  document.querySelectorAll(".error-message").forEach((el) => {
    el.textContent = "";
  });

  const formMessage = document.getElementById("formMessage");
  formMessage.className = "form-message";
  formMessage.style.display = "none";
}

function showError(elementId, message) {
  const element = document.getElementById(elementId);
  element.textContent = message;
}

function showFormMessage(message, type) {
  const formMessage = document.getElementById("formMessage");
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = "block";

  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.style.display = "none";
  }, 5000);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Skill items hover effect
document.querySelectorAll(".skill-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    const skill = this.getAttribute("data-skill");
    this.style.borderColor = getSkillColor(skill);
  });

  item.addEventListener("mouseleave", function () {
    this.style.borderColor = "";
  });
});

function getSkillColor(skill) {
  const colors = {
    HTML5: "#E34F26",
    CSS3: "#1572B6",
    JavaScript: "#F7DF1E",
    React: "#61DAFB",
    TypeScript: "#3178C6",
    Tailwind: "#06B6D4",
    Android: "#3DDC84",
    Flutter: "#02569B",
    Responsive: "#FF6B6B",
    "UI/UX": "#6C63FF",
    NodeJS: "#339933",
    Python: "#3776AB",
    MongoDB: "#47A248",
    Firebase: "#FFCA28",
  };

  return colors[skill] || "#6C63FF";
}

// Image loading and error handling
function handleImageLoading() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    // Add loading class initially
    img.classList.add("loading");

    // Check if image is already loaded
    if (img.complete) {
      img.classList.remove("loading");
    } else {
      // Add load event listener
      img.addEventListener("load", () => {
        img.classList.remove("loading");
      });

      // Add error event listener
      img.addEventListener("error", () => {
        img.classList.remove("loading");
        console.warn(`Image failed to load: ${img.src}`);

        // Set placeholder for broken images
        const altText = img.alt || "Image";
        const placeholderColors = ["6C63FF", "FF6584", "36D1DC", "FF8E53"];
        const randomColor =
          placeholderColors[
            Math.floor(Math.random() * placeholderColors.length)
          ];

        img.src = `https://via.placeholder.com/800x600/${randomColor}/ffffff?text=${encodeURIComponent(
          altText
        )}`;
      });
    }
  });
}

// Gallery item click handler
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const imageSrc = item.querySelector("img").src;
    const title = item.querySelector("h3").textContent;

    // Create a modal for gallery image view
    const galleryViewer = document.createElement("div");
    galleryViewer.className = "gallery-viewer";
    galleryViewer.innerHTML = `
      <div class="gallery-viewer-content">
        <button class="close-gallery-viewer"><i class="fas fa-times"></i></button>
        <img src="${imageSrc}" alt="${title}" />
        <h3>${title}</h3>
      </div>
    `;

    document.body.appendChild(galleryViewer);
    document.body.style.overflow = "hidden";

    // Close gallery viewer
    const closeBtn = galleryViewer.querySelector(".close-gallery-viewer");
    closeBtn.addEventListener("click", () => {
      document.body.removeChild(galleryViewer);
      document.body.style.overflow = "auto";
    });

    // Close when clicking outside
    galleryViewer.addEventListener("click", (e) => {
      if (e.target === galleryViewer) {
        document.body.removeChild(galleryViewer);
        document.body.style.overflow = "auto";
      }
    });
  });
});

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Initial active nav link
  updateActiveNavLink();

  // Handle image loading
  handleImageLoading();

  // Add animation to skill items on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${
          entry.target.dataset.delay || 0
        }s`;
        entry.target.classList.add("animated");
      }
    });
  }, observerOptions);

  // Observe elements for animations
  document
    .querySelectorAll(".skill-item, .project-card, .gallery-item, .video-card")
    .forEach((el, index) => {
      el.dataset.delay = index * 0.1 + "s";
      observer.observe(el);
    });
});
