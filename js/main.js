/* ============================================
   MAIN APPLICATION MODULE
   ============================================ */

import { Navigation } from './navigation.js';
import { TestimonialsSlider } from './testimonials.js';
import { Modals } from './modals.js';
import { ContactForm } from './contact-form.js';
import { Utils } from './utils.js';

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeModules());
    } else {
      this.initializeModules();
    }
  }

  initializeModules() {
    // Initialize all modules
    new Navigation();
    new TestimonialsSlider();
    new Modals();
    new ContactForm();
    new Utils();

    console.log('✨ Portfolio initialized successfully!');
  }
}

// Initialize the application
new PortfolioApp();
