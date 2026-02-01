// ===== Anomalous Evidence - Main JavaScript =====

// Scroll to Explore Button
class ScrollExplore {
    constructor() {
        this.scrollIndicator = document.querySelector('.scroll-indicator');
        this.init();
    }
    
    init() {
        if (!this.scrollIndicator) return;
        
        this.scrollIndicator.addEventListener('click', () => this.scrollToNext());
        this.scrollIndicator.style.cursor = 'pointer';
    }
    
    scrollToNext() {
        const nextSection = document.querySelector('.investigate-section');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Mobile Navigation
class NavigationManager {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        if (!this.hamburger) return;
        
        // Ensure accessibility attributes are initialized
        this.hamburger.setAttribute('aria-expanded', 'false');
        if (this.navMenu) this.navMenu.setAttribute('aria-hidden', 'true');

        this.hamburger.addEventListener('click', () => this.toggleMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }
    
    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('mobile-open');

        // Update accessibility attributes
        const expanded = this.hamburger.classList.contains('active');
        this.hamburger.setAttribute('aria-expanded', expanded);
        if (this.navMenu) this.navMenu.setAttribute('aria-hidden', !expanded);
    }
    
    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('mobile-open');
        this.hamburger.setAttribute('aria-expanded', 'false');
        if (this.navMenu) this.navMenu.setAttribute('aria-hidden', 'true');
    }
    
    handleOutsideClick(event) {
        if (!this.navMenu) return;
        if (!this.navMenu.contains(event.target) && !this.hamburger.contains(event.target)) {
            if (this.navMenu.classList.contains('mobile-open')) {
                this.closeMenu();
            }
        }
    }
}

// Scroll Reveal Animation
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal-on-scroll');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Stagger animation delay for multiple elements
                        const delay = Math.min(index * 100, 300);
                        entry.target.style.animationDelay = `${delay}ms`;
                        entry.target.style.opacity = '1';
                        // Reset transform so reveal appears as a subtle upward slide (matches design system)
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, { 
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            });
            
            this.elements.forEach(el => observer.observe(el));
        }
    }
}

// Form Validation
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        let isValid = true;
        
        // Validate required fields
        for (let [key, value] of formData.entries()) {
            if (!value.trim()) {
                isValid = false;
                break;
            }
        }
        
        if (formData.get('email') && !this.validateEmail(formData.get('email'))) {
            isValid = false;
        }
        
        if (isValid) {
            this.showConfirmation();
            this.form.reset();
        }
    }
    
    showConfirmation() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-secondary);
            border: 2px solid var(--accent-cyan);
            color: var(--text-primary);
            padding: 2rem;
            border-radius: 8px;
            text-align: center;
            z-index: 10000;
            min-width: 300px;
        `;
        message.innerHTML = `
            <h3 style="margin-bottom: 1rem; color: var(--accent-cyan);">Thank You</h3>
            <p>Your submission has been received. We will review it and contact you if it meets our research criteria.</p>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transition = 'opacity 0.3s ease-out';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }
}

// Case Filters
class CaseFilter {
    constructor() {
        this.filters = document.querySelectorAll('[data-filter]');
        this.cases = document.querySelectorAll('[data-case-status]');
        this.init();
    }
    
    init() {
        this.filters.forEach(filter => {
            filter.addEventListener('click', (e) => this.filterCases(e));
        });
    }
    
    filterCases(e) {
        const filterValue = e.target.dataset.filter;
        
        // Update active filter button
        this.filters.forEach(f => f.classList.remove('active'));
        e.target.classList.add('active');
        
        // Filter cases
        this.cases.forEach(caseEl => {
            if (filterValue === 'all' || caseEl.dataset.caseStatus === filterValue) {
                caseEl.style.display = 'block';
                setTimeout(() => caseEl.style.opacity = '1', 10);
            } else {
                caseEl.style.opacity = '0';
                setTimeout(() => caseEl.style.display = 'none', 300);
            }
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    new ScrollExplore();
    new NavigationManager();
    new ScrollReveal();
    new FormValidator('case-form');
    new FormValidator('contact-form');
    new CaseFilter();
    initSmoothScroll();
});

// FAQ accordion handler (centralized) - toggles item and collapses other items in same section
function toggleFAQ(item) {
    const already = item.classList.contains('active');
    const parent = item.parentElement;
    if (parent) {
        parent.querySelectorAll('.faq-item.active').forEach(el => { if (el !== item) el.classList.remove('active'); });
    }
    if (already) item.classList.remove('active'); else item.classList.add('active');
}

// Auto-close announcement registration on 4 Feb 2026 (local date)
(function(){
    document.addEventListener('DOMContentLoaded', function(){
        try {
            const banner = document.getElementById('announcement-banner');
            if (!banner) return;

            const now = new Date();
            const closeDate = new Date(2026, 1, 4, 0, 0, 0); // Feb is month 1 (0-based)
            if (now >= closeDate) {
                banner.classList.add('announcement-closed');
                banner.innerHTML = '<div style="max-width:1100px;width:100%;margin:0 auto;display:flex;align-items:center;justify-content:center;font-weight:700;"><span>Bhangarh Day Tour — <strong style="color:var(--accent-cyan);">Registration Closed</strong></span></div>';
            }
        } catch (e) {
            console.error('Announcement auto-close check failed', e);
        }
    });
})();

/* Announcement banner script removed — using static banner only (no JS dependency) */

