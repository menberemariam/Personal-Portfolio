/* ============================================
   CONTACT FORM MODULE
   ============================================ */

export class ContactForm {
  constructor() {
    this.contactForm = document.getElementById("contactForm");
    this.submitBtn = document.getElementById("submitBtn");
    
    this.init();
  }

  init() {
    this.setupFormSubmission();
  }

  setupFormSubmission() {
    this.contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Reset previous errors
      this.resetFormErrors();

      // Get form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validation flags
      let isValid = true;

      // Validate name
      if (!name) {
        this.showError("nameError", "Name is required");
        isValid = false;
      } else if (name.length < 2) {
        this.showError("nameError", "Name must be at least 2 characters");
        isValid = false;
      }

      // Validate email
      if (!email) {
        this.showError("emailError", "Email is required");
        isValid = false;
      } else if (!this.isValidEmail(email)) {
        this.showError("emailError", "Please enter a valid email address");
        isValid = false;
      }

      // Validate subject
      if (!subject) {
        this.showError("subjectError", "Subject is required");
        isValid = false;
      }

      // Validate message
      if (!message) {
        this.showError("messageError", "Message is required");
        isValid = false;
      } else if (message.length < 10) {
        this.showError("messageError", "Message must be at least 10 characters");
        isValid = false;
      }

      if (isValid) {
        // Show loading state
        this.submitBtn.classList.add("loading");

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
          // Reset form
          this.contactForm.reset();

          // Show success message
          this.showFormMessage(
            "Thank you for your message! I will get back to you soon.",
            "success"
          );

          // Reset button state
          this.submitBtn.classList.remove("loading");
        }, 2000);
      }
    });
  }

  resetFormErrors() {
    document.querySelectorAll(".error-message").forEach((el) => {
      el.textContent = "";
    });

    const formMessage = document.getElementById("formMessage");
    formMessage.className = "form-message";
    formMessage.style.display = "none";
  }

  showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
  }

  showFormMessage(message, type) {
    const formMessage = document.getElementById("formMessage");
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = "block";

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = "none";
    }, 5000);
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
