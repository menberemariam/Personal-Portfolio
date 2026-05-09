/* ============================================
   UTILITY FUNCTIONS MODULE
   ============================================ */

export class Utils {
  constructor() {
    this.init();
  }

  init() {
    this.setCurrentYear();
    this.handleImageLoading();
    this.setupSkillHoverEffects();
    this.setupGalleryItems();
    this.setupScrollAnimations();
    this.setupCVDownload();
  }

  setupCVDownload() {
    const downloadCVBtn = document.getElementById('downloadCV');
    if (downloadCVBtn) {
      downloadCVBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Check if CV file exists by trying to fetch it
        fetch('assets/Menberemariyam-CV.pdf', { method: 'HEAD' })
          .then(response => {
            if (response.ok) {
              // File exists, proceed with download
              const link = document.createElement('a');
              link.href = 'assets/Menberemariyam-CV.pdf';
              link.download = 'Menberemariyam_Teshome_CV.pdf';
              link.target = '_blank';
              
              // Append to body, click, and remove
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              
              // Show success message
              this.showDownloadNotification('success');
            } else {
              // File doesn't exist
              this.showDownloadNotification('error');
            }
          })
          .catch(() => {
            // Error checking file
            this.showDownloadNotification('error');
          });
      });
    }
  }

  showDownloadNotification(type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    
    if (type === 'success') {
      notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>CV Download Started!</span>
      `;
      notification.style.background = 'linear-gradient(135deg, #6c63ff 0%, #8b84ff 100%)';
    } else {
      notification.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>CV file not found! Please add Menberemariyam-CV.pdf to assets folder.</span>
      `;
      notification.style.background = 'linear-gradient(135deg, #ff6584 0%, #ff8e53 100%)';
      notification.style.maxWidth = '400px';
    }
    
    document.body.appendChild(notification);
    
    // Add styles if not already present
    if (!document.getElementById('download-notification-styles')) {
      const style = document.createElement('style');
      style.id = 'download-notification-styles';
      style.textContent = `
        .download-notification {
          position: fixed;
          top: 100px;
          right: 20px;
          background: var(--gradient-primary);
          color: white;
          padding: 15px 25px;
          border-radius: var(--border-radius);
          box-shadow: 0 10px 30px rgba(108, 99, 255, 0.3);
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 10000;
          animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
          font-weight: 500;
        }
        
        .download-notification i {
          font-size: 1.2rem;
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeOut {
          to {
            opacity: 0;
            transform: translateX(400px);
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 3000);
  }

  setCurrentYear() {
    const currentYear = document.getElementById("currentYear");
    if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
    }
  }

  handleImageLoading() {
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

  setupSkillHoverEffects() {
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
        Java: "#007396",
        NestJS: "#E0234E",
        Git: "#F05032",
      };

      return colors[skill] || "#6C63FF";
    }
  }

  setupGalleryItems() {
    document.querySelectorAll(".gallery-item").forEach((item) => {
      item.addEventListener("click", () => {
        const imageSrc = item.querySelector("img")?.src;
        const title = item.querySelector("h3").textContent;

        if (!imageSrc) return;

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

        // Add styles for gallery viewer
        this.addGalleryViewerStyles();

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
  }

  addGalleryViewerStyles() {
    if (!document.getElementById("gallery-viewer-styles")) {
      const style = document.createElement("style");
      style.id = "gallery-viewer-styles";
      style.textContent = `
        .gallery-viewer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3000;
          padding: 20px;
        }
        .gallery-viewer-content {
          max-width: 90%;
          max-height: 90%;
          position: relative;
        }
        .gallery-viewer-content img {
          max-width: 100%;
          max-height: 80vh;
          border-radius: 10px;
        }
        .gallery-viewer-content h3 {
          color: white;
          text-align: center;
          margin-top: 20px;
        }
        .close-gallery-viewer {
          position: absolute;
          top: -40px;
          right: 0;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .close-gallery-viewer:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `;
      document.head.appendChild(style);
    }
  }

  setupScrollAnimations() {
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
        el.dataset.delay = (index * 0.1).toString();
        observer.observe(el);
      });
  }
}
