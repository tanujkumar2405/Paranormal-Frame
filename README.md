# Anomalous Evidence Research & Media

**Independent Documentary & Observational Research**

A professional, production-ready static website for an independent research and media entity that documents unexplained locations, environmental anomalies, and observational evidence for educational purposes.

## Project Overview

Anomalous Evidence Research & Media is a documentary-style website designed to present rigorous observational research with a professional, calm, and trustworthy aesthetic. The site maintains scientific integrity while avoiding sensationalism or unfounded claims.

### Key Principles
- **Educational Focus**: All content is presented for educational and documentary purposes
- **No Supernatural Claims**: The organization does not claim to prove paranormal or unexplained phenomena
- **Transparent Methodology**: All research methods and limitations are clearly disclosed
- **Independent Research**: Unaffiliated with sensationalist media entities

## Technology Stack

- **HTML5**: Semantic markup for accessibility and SEO
- **CSS3**: Responsive design with no frameworks or dependencies
- **Vanilla JavaScript**: Mobile navigation and form handling
- **No External Libraries**: Pure HTML, CSS, and JavaScript

## Project Structure

```
anomalous-evidence/
├── index.html                 # Home page
├── about.html                # About the organization
├── investigations.html        # Case studies and investigations
├── methods.html              # Research methodology
├── submit-case.html          # Case submission form
├── contact.html              # Contact information
├── disclaimer.html           # Legal disclaimer
├── assets/
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   ├── js/
│   │   └── main.js           # JavaScript functionality
│   └── images/
│       └── logo.png          # Logo placeholder
└── README.md                 # This file
```

## Features

### Pages & Sections

1. **Home (index.html)**
   - Hero section with organization branding
   - Mission statement
   - What we do overview
   - Recent investigations preview
   - Call-to-action buttons

2. **About (about.html)**
   - Organization mission and values
   - Research philosophy
   - Ethical approach to investigations
   - Founder information
   - What sets us apart

3. **Investigations (investigations.html)**
   - Case study cards with detailed information
   - Investigation status indicators (Ongoing, Observed, Inconclusive)
   - Full case descriptions and methodologies
   - Status guide and disclaimer

4. **Methods (methods.html)**
   - Documentation protocols explained
   - Audio recording methodology
   - Environmental observation techniques
   - Electromagnetic field measurement
   - Visual documentation practices
   - Quality control and analysis standards
   - Report generation standards

5. **Submit Case (submit-case.html)**
   - Comprehensive case submission form
   - Submission guidelines
   - FAQ section
   - Legal disclaimer acknowledgment

6. **Contact (contact.html)**
   - Email addresses for different inquiry types
   - Contact form
   - Social media links
   - Response time information
   - Facility location details

7. **Disclaimer (disclaimer.html)**
   - Legal disclaimer and terms of use
   - Educational use statement
   - Privacy and data protection
   - Investigation safety and ethics
   - Intellectual property information

8. **Blog (blog/)**
   - Fully automated static blog system
   - Markdown-powered article publishing
   - **No manual build steps** — articles publish automatically
   - Categorized research journal with tags and search
   - RSS feed for subscribers
   - SEO-optimized article pages
   - See [blog/README.md](blog/README.md) for detailed instructions

### Design Features

- **Color Scheme**: Dark charcoal, deep navy, off-white, subtle cyan accent
- **Typography**: Clean system sans-serif fonts for optimal performance
- **Layout**: Mobile-first, fully responsive design
- **Accessibility**: WCAG compliant with semantic HTML
- **Performance**: Optimized for fast loading with no external dependencies

### Responsive Design

- **Desktop**: Full-featured layout with multi-column grids
- **Tablet**: Adjusted spacing and grid layouts
- **Mobile**: Single-column layout with hamburger navigation menu
- **Small Devices**: Optimized typography and spacing for small screens

### JavaScript Features

1. **Mobile Navigation Toggle**
   - Hamburger menu for mobile devices
   - Smooth open/close animation
   - Click-outside to close functionality

2. **Form Handling**
   - Case submission form with validation
   - Contact form with subject selection
   - Email format validation
   - Required field checking
   - Success message display

3. **User Experience**
   - Smooth scrolling for anchor links
   - Active navigation link highlighting
   - Header shadow on scroll
   - Keyboard navigation support
   - Double-submit prevention

4. **Accessibility**
   - Focus management for keyboard navigation
   - ARIA labels and roles
   - Semantic HTML structure

## SEO Optimization

- Meta titles and descriptions on every page
- Open Graph tags for social media sharing
- Canonical URLs for duplicate prevention
- Semantic HTML5 markup
- Alt text for all images
- Sitemap-ready structure

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **No external CDNs**: All resources are local
- **Minimal CSS**: Single optimized stylesheet
- **Lightweight JavaScript**: Under 5KB minified
- **Image Optimization**: PNG logo placeholder ready for compression
- **Load Time**: Fast page loads with no dependencies

## Deployment

### GitHub Pages

1. Create a GitHub repository named `anomalous-evidence` or `username.github.io`
2. Upload all files maintaining the folder structure
3. Navigate to repository Settings → Pages
4. Select main branch as the source
5. Your site will be live at `https://username.github.io/anomalous-evidence`

### Static Hosting (Netlify, Vercel, etc.)

1. Connect repository to hosting service
2. Set build command: None (or skip)
3. Set publish directory: `/` (root)
4. Deploy

### Traditional Web Hosting

1. Connect via FTP or cPanel file manager
2. Upload entire folder structure to public_html
3. Site will be available at your domain

### Local Development

Simply open `index.html` in any web browser for local testing.

## Customization

### Colors

Edit the CSS variables in `assets/css/style.css`:

```css
:root {
    --color-charcoal: #2c3e50;
    --color-navy: #1a1f3a;
    --color-off-white: #f5f5f5;
    --color-cyan: #00bcd4;
}
```

### Content

Edit individual HTML files to update:
- Organization name and tagline
- Page content and case studies
- Contact information
- Social media links
- Legal terms and disclaimers

### Logo

Replace `assets/images/logo.png` with your actual logo file.

## Legal Information

This website includes comprehensive legal disclaimers regarding:
- Educational and documentary use only
- No paranormal or supernatural claims
- No professional advice (medical, legal, religious)
- Investigation limitations and safety protocols
- Privacy and data protection
- Intellectual property rights

All users must acknowledge and accept these terms before submitting cases or engaging with research content.

## Privacy

Personal information collected through case submissions and contact forms is:
- Protected according to applicable privacy laws
- Not shared without consent
- Used only for research purposes
- Stored securely with restricted access

For detailed privacy information, contact: `anomalouseevidence@gmail.com`

## Maintenance

### Regular Updates

- Review and update case information
- Refresh investigation statuses
- Update team information
- Maintain security practices
- Monitor form submissions

### Backups

- Maintain regular backups of content
- Store backups in secure location
- Test backup restoration procedures

## Support & Contact

For inquiries or support:
- Email: `anomalouseevidence@gmail.com`
- Partnerships: `anomalouseevidence@gmail.com`
- Legal: `anomalouseevidence@gmail.com`

## License & Attribution

This website template is provided as-is for use by Anomalous Evidence Research & Media. All content, images, and materials are the property of the organization or used under license.

## Accessibility

This website is designed to meet WCAG 2.1 AA standards:
- Semantic HTML markup
- Sufficient color contrast
- Keyboard navigation support
- Alt text for images
- Proper heading hierarchy
- Form labels and validation

## Performance Checklist

- ✅ No external CDN dependencies
- ✅ Single CSS file (optimized)
- ✅ Minimal JavaScript (vanilla only)
- ✅ Mobile-first responsive design
- ✅ Fast page load times
- ✅ SEO optimized
- ✅ Accessible design
- ✅ Production ready

## Publishing Research Articles

The website includes a fully automated blog system for publishing research journal articles. **New team members: Start here to publish content.**

### Quick Start

1. Open `blog/blog-data/`
2. Create a new `.md` file with your article
3. Add front matter (title, date, tags, etc.)
4. Write in Markdown
5. **Save** — the blog publishes automatically

No terminal commands needed. Everything updates in the background.

### For New Team Members

**Complete blog documentation**: See [blog/README.md](blog/README.md)

This includes:
- How to write and publish articles
- Front matter field reference
- Examples and templates
- Markdown syntax guide
- How scheduling future articles works
- Where to add images

### Key Features

- ✅ Markdown article publishing
- ✅ Automatic category and tag pages
- ✅ Live search across all articles
- ✅ RSS feed for subscribers
- ✅ SEO-optimized article pages
- ✅ Homepage preview cards
- ✅ Scheduled posts (publish on a specific date)
- ✅ Featured article highlighting
- ✅ Article drafts (hide before publishing)

## Version History

- **v1.0.0** (Initial Release) - Complete static website with all core features
- **v1.1.0** (Blog System) - Added fully automated Markdown blog with publishing pipeline

---

**Anomalous Evidence Research & Media**  
Independent Documentary & Observational Research  
© 2025 All Rights Reserved

For complete legal information, see [disclaimer.html](disclaimer.html)
