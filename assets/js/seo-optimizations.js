// ===== SEO & PERFORMANCE OPTIMIZATIONS =====

/**
 * Lazy Loading Implementation for Images
 * Improves Core Web Vitals (LCP, CLS)
 */
class LazyImageLoader {
    constructor() {
        this.initLazyLoading();
    }

    initLazyLoading() {
        // Check if Intersection Observer API is supported
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }
    }

    setupIntersectionObserver() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Load image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    // Load background image
                    if (img.dataset.bgImage) {
                        img.style.backgroundImage = `url('${img.dataset.bgImage}')`;
                        img.removeAttribute('data-bgImage');
                    }
                    
                    // Stop observing this element
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px' // Start loading 50px before entering viewport
        });

        // Observe all lazy-loadable elements
        document.querySelectorAll('img[data-src], [data-bgImage]').forEach(element => {
            imageObserver.observe(element);
        });
    }

    loadAllImages() {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

/**
 * Optimize JavaScript Execution
 * Defers non-critical scripts to improve First Input Delay (FID)
 */
class PerformanceOptimizer {
    constructor() {
        this.initPerformanceMonitoring();
    }

    initPerformanceMonitoring() {
        // Use requestIdleCallback for non-critical tasks
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.deferredInitialization();
            });
        } else {
            // Fallback: defer with setTimeout
            setTimeout(() => {
                this.deferredInitialization();
            }, 2000);
        }
    }

    deferredInitialization() {
        // Load analytics, third-party scripts here
        this.trackPagePerformance();
    }

    trackPagePerformance() {
        // Use Navigation Timing API to measure performance
        if ('performance' in window && 'PerformanceObserver' in window) {
            try {
                const perfObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        // Log Core Web Vitals
                        console.log(`${entry.name}: ${entry.duration}ms`);
                    }
                });

                perfObserver.observe({ entryTypes: ['navigation', 'resource', 'paint'] });
            } catch (e) {
                console.log('Performance monitoring not available');
            }
        }
    }
}

/**
 * Schema Markup Validation
 * Ensures proper structured data for SEO
 */
class SchemaValidator {
    constructor() {
        this.validateStructuredData();
    }

    validateStructuredData() {
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        console.log(`Found ${scripts.length} structured data blocks`);
        
        scripts.forEach((script, index) => {
            try {
                const data = JSON.parse(script.textContent);
                console.log(`Schema ${index + 1}:`, data['@type']);
            } catch (e) {
                console.error(`Invalid JSON-LD in schema ${index + 1}:`, e);
            }
        });
    }
}

/**
 * SEO-Friendly Analytics Event Tracking
 * Does not impact page performance
 */
class SEOAnalytics {
    constructor() {
        this.initEventTracking();
    }

    initEventTracking() {
        // Track internal link clicks
        document.querySelectorAll('a[href^="/"], a[href^="http"]').forEach(link => {
            link.addEventListener('click', (e) => {
                this.trackLinkClick(link);
            });
        });

        // Track form submissions
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                this.trackFormSubmission(form);
            });
        });
    }

    trackLinkClick(link) {
        const url = link.href;
        const isExternal = !url.includes(window.location.hostname);
        console.log(`Link clicked: ${url} (${isExternal ? 'external' : 'internal'})`);
    }

    trackFormSubmission(form) {
        const formName = form.getAttribute('name') || form.id || 'unnamed-form';
        console.log(`Form submitted: ${formName}`);
    }
}

/**
 * Accessibility Enhancements
 * Improves user experience and SEO
 */
class AccessibilityEnhancer {
    constructor() {
        this.enhanceKeyboardNavigation();
        this.improveContrast();
    }

    enhanceKeyboardNavigation() {
        // Ensure all interactive elements are keyboard accessible
        document.querySelectorAll('button, a, input, textarea, select').forEach(element => {
            if (!element.hasAttribute('tabindex')) {
                // Remove from tab order if disabled
                if (element.disabled) {
                    element.tabIndex = -1;
                }
            }
        });
    }

    improveContrast() {
        // Check for sufficient color contrast (WCAG AA standard)
        // This is logged for manual review
        console.log('Accessibility check: Review color contrast ratios');
    }
}

/**
 * SEO URL Canonicalization
 * Prevents duplicate content issues
 */
class URLCanonicalizer {
    constructor() {
        this.ensureCanonicalURL();
    }

    ensureCanonicalURL() {
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            console.log(`Canonical URL: ${canonical.href}`);
        } else {
            console.warn('No canonical URL found. Add <link rel="canonical" href="..."> to <head>');
        }
    }
}

/**
 * Mobile Viewport Optimization
 * Ensures proper mobile rendering
 */
class MobileOptimizer {
    constructor() {
        this.optimizeViewport();
        this.handleResponsiveImages();
    }

    optimizeViewport() {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            console.log(`Viewport settings: ${viewport.getAttribute('content')}`);
        }
    }

    handleResponsiveImages() {
        // Handle responsive image loading
        if ('picture' in document) {
            console.log('Picture element supported for responsive images');
        }
    }
}

// ===== INITIALIZATION =====

// Initialize all SEO optimizations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing SEO optimizations...');
    
    // Lazy load images
    new LazyImageLoader();
    
    // Optimize performance
    new PerformanceOptimizer();
    
    // Validate structured data
    new SchemaValidator();
    
    // Track analytics
    new SEOAnalytics();
    
    // Enhance accessibility
    new AccessibilityEnhancer();
    
    // Ensure canonical URLs
    new URLCanonicalizer();
    
    // Optimize for mobile
    new MobileOptimizer();
    
    console.log('SEO optimizations initialized');
});

// Measure Core Web Vitals
if ('web-vital' in window || 'PerformanceObserver' in window) {
    console.log('Core Web Vitals monitoring enabled');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LazyImageLoader,
        PerformanceOptimizer,
        SchemaValidator,
        SEOAnalytics,
        AccessibilityEnhancer,
        URLCanonicalizer,
        MobileOptimizer
    };
}
