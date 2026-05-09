/* ============================================
   MODALS MODULE (Video & Project)
   ============================================ */

export class Modals {
  constructor() {
    this.videoModal = document.getElementById("videoModal");
    this.projectModal = document.getElementById("projectModal");
    this.closeModals = document.querySelectorAll(".close-modal");
    this.playButtons = document.querySelectorAll(".play-button");
    this.viewProjectButtons = document.querySelectorAll(".btn-view-project");
    
    this.init();
  }

  init() {
    this.setupVideoModals();
    this.setupProjectModals();
    this.setupCloseButtons();
    this.setupOutsideClick();
  }

  setupVideoModals() {
    this.playButtons.forEach((button) => {
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
        this.videoModal.style.display = "flex";
        document.body.style.overflow = "hidden";

        // Play video after modal opens
        setTimeout(() => {
          videoPlayer.play().catch((e) => console.log("Autoplay prevented:", e));
        }, 500);
      });
    });
  }

  setupProjectModals() {
    this.viewProjectButtons.forEach((button) => {
      button.addEventListener("click", () => {
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

        this.projectModal.style.display = "flex";
        document.body.style.overflow = "hidden";
      });
    });
  }

  setupCloseButtons() {
    this.closeModals.forEach((button) => {
      button.addEventListener("click", () => {
        this.closeAllModals();
      });
    });
  }

  setupOutsideClick() {
    window.addEventListener("click", (e) => {
      if (e.target === this.videoModal) {
        this.closeAllModals();
      }

      if (e.target === this.projectModal) {
        this.projectModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  closeAllModals() {
    this.videoModal.style.display = "none";
    this.projectModal.style.display = "none";
    document.body.style.overflow = "auto";

    // Pause and reset video
    const videoPlayer = document.getElementById("videoPlayer");
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    videoPlayer.src = "";
  }
}
