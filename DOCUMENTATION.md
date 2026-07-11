# Complete Website Documentation

## 📂 Project Files Reference

### HTML Files (7 pages)

#### index.html - Home Page
- Hero section with tagline
- Mission statement section
- "What We Do" feature cards
- Recent investigations preview
- Call-to-action buttons
- Footer with links

#### about.html - About Page
- Mission statement expansion
- Research philosophy cards
- Ethical approach list
- Founder information
- What sets us apart section
- CTAs to other pages

#### investigations.html - Case Studies
- 6 detailed case studies
- Case status indicators (Ongoing/Observed/Inconclusive)
- Investigation cards with descriptions
- Status guide explanation
- Case submission CTA
- Comprehensive case information

#### methods.html - Research Methods
- Core investigative principles
- 4 documentation methods:
  - Audio Recording & Acoustic Analysis
  - Environmental Observation & Measurement
  - Electromagnetic Field Observation
  - Visual Documentation & Photographic Analysis
- Quality control standards
- Analysis standards
- Report generation standards

#### submit-case.html - Case Submission
- Submission guidelines
- Case submission form with fields:
  - Full Name
  - Email Address
  - Phone Number
  - Location
  - Date of Observation
  - Detailed Description
  - Evidence/Documentation
  - Property Access
  - Number of Witnesses
  - Disclaimer Checkbox
- FAQ section
- Pre-submission information

#### contact.html - Contact Information
- Email addresses for different inquiry types
- Social media links
- Contact form
- Response time information
- Location information
- FAQ section
- Facility information

#### disclaimer.html - Legal Disclaimer
- Main disclaimer section
- 7 detailed disclaimer sections
- Investigation safety standards
- User acknowledgment section
- Legal contact information

### CSS File

#### assets/css/style.css
- **Size**: ~7.2KB
- **Features**:
  - CSS variables for theming
  - Mobile-first responsive design
  - 4 breakpoints (480px, 768px, 1200px+)
  - Comprehensive component styles
  - Color palette system
  - Typography hierarchy
  - Spacing utilities
  - Button styles
  - Form styles
  - Grid layouts
  - Animation/transitions
  - Accessibility features
  - Print styles

### JavaScript File

#### assets/js/main.js
- **Size**: ~4.5KB
- **Features**:
  - Mobile navigation toggle
  - Form validation
  - Email validation
  - Success message handling
  - Smooth scrolling
  - Active nav highlighting
  - Header scroll effect
  - Keyboard navigation support
  - Click-outside menu close
  - Double-submit prevention
  - No external dependencies

### Assets

#### assets/images/logo.svg
- Professional geometric logo
- Cyan color accent
- Scalable vector format
- 200x200px default size
- Ready for customization

### Documentation Files

#### README.md
- Project overview
- Technology stack
- Project structure
- Feature list
- Deployment options
- Customization guide
- Legal information
- Version history

#### DEPLOYMENT.md
- Quick start guide
- 6 deployment options:
  - GitHub Pages
  - Netlify
  - Vercel
  - Traditional hosting
  - AWS S3
  - Local testing
- Custom domain setup
- Pre/post deployment checklists
- Performance optimization
- Monitoring & maintenance
- Content update instructions
- Troubleshooting guide

#### CHECKLIST.md
- Complete feature checklist
- Quality standards
- Design specifications
- Content statistics
- Special features
- Security features
- Mobile experience
- Business features

### Configuration Files

#### .gitignore
- OS file exclusions
- IDE exclusions
- Editor backups
- Environment files
- Build files
- Log files
- Node modules (future)
- Backup files

---

## 🎯 Using This Website

### Customization Quick Start

1. **Change Organization Name**
   - Find and replace "Anomalous Evidence" in all HTML files
   - Update in index.html, about.html, and footer sections

2. **Update Tagline**
   - Edit tagline in index.html hero section
   - Update meta descriptions in all <head> sections

3. **Add Your Logo**
   - Replace `assets/images/logo.svg` with your logo
   - Update the color to match your brand
   - Keep it under 50KB for performance

4. **Change Colors**
   - Edit CSS variables in `assets/css/style.css`:
     ```css
     --color-primary: your-color;
     --color-accent: your-color;
     ```

5. **Update Contact Information**
   - Edit email addresses in contact.html
   - Update social media links
   - Add real phone number

6. **Add Real Case Studies**
   - Replace placeholder cases in investigations.html
   - Update case descriptions with real data
   - Add real locations

7. **Configure Submission**
   - Update email address for form submissions (in main.js)
   - Add backend service if needed for email handling
   - Update form success message

### Content Areas to Update

**Immediate Updates Needed:**
1. Organization email addresses (contact.html)
2. Logo (assets/images/logo.svg)
3. Case studies (investigations.html)
4. Founder information (about.html)
5. Social media links (contact.html)
6. Location details (contact.html)

**Optional Updates:**
1. Color scheme (CSS variables)
2. Research methods details (methods.html)
3. FAQ responses (contact.html, submit-case.html)
4. Mission statement wording
5. About page content

### Form Handling

**Current Setup:**
- Forms show success message without backend
- Data not sent anywhere (frontend only)
- Console logs form data for testing

**To Enable Email Submissions:**

Option 1: Use Formspree.io (Free)
- Sign up at formspree.io
- Replace form action in HTML
- Get email notifications

Option 2: Use Basin.com (Free)
- Sign up at usebasin.com
- Add form endpoint
- Get email submissions

Option 3: Custom Backend
- Add your own backend service
- Update form handling in main.js
- Store submissions in database

**Simple Backend Example (Node.js):**
```javascript
// Add to your backend
app.post('/submit-case', (req, res) => {
  const { name, email, description } = req.body;
  // Send email and save to database
  res.json({ success: true });
});
```

---

## 🚀 Deployment Steps

### Fastest Deployment (Netlify)

1. Go to netlify.com
2. Click "Add new site" → "Import an existing project"
3. Select GitHub/GitLab or drag & drop folder
4. Deploy (automatic)
5. Site live in seconds

### GitHub Pages

1. Create GitHub repo
2. Upload files
3. Settings → Pages → Enable
4. Wait 1 minute
5. Site live

---

## 📊 File Sizes

| File | Size |
|------|------|
| style.css | ~7.2 KB |
| main.js | ~4.5 KB |
| index.html | ~6.5 KB |
| about.html | ~5.8 KB |
| investigations.html | ~9.2 KB |
| methods.html | ~8.5 KB |
| submit-case.html | ~7.3 KB |
| contact.html | ~6.8 KB |
| disclaimer.html | ~9.1 KB |
| logo.svg | ~1.2 KB |
| **Total** | **~66 KB** |

**Deployed size** (gzipped): ~20 KB

---

## 🔧 Troubleshooting

### Form doesn't submit
- Check browser console for errors (F12 → Console)
- Verify main.js is loading
- Check form field IDs match JavaScript

### Styles don't load
- Verify `assets/css/style.css` path is correct
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser cache

### Mobile menu doesn't open
- Check hamburger icon loads
- Verify main.js loads without errors
- Test in different browser

### Images don't show
- Verify image file exists in assets/images/
- Check image path in HTML
- Ensure image file size <500KB

### Forms not working
- Check no form submission errors
- Verify email format validation
- Check form IDs are correct

---

## 📋 SEO Checklist

Before going live:

- [ ] Update all title tags with real organization name
- [ ] Update all meta descriptions
- [ ] Replace "anomalousevidence.com" with your real domain
- [ ] Update Open Graph images
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Check mobile friendliness (Google Mobile-Friendly Test)
- [ ] Check page speed (PageSpeed Insights)

**Add to robots.txt:**
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

---

## 🔐 Security Best Practices

Implemented:
- ✅ No external scripts (no XSS risk)
- ✅ Form validation (prevent invalid data)
- ✅ HTTPS ready
- ✅ No user data stored
- ✅ Legal disclaimers
- ✅ Privacy statement

Recommended additions:
- Add SSL certificate (free via Let's Encrypt)
- Set up CORS headers
- Add rate limiting (if using backend)
- Regular security audits
- Keep disclaimer updated

---

## 📈 Analytics Setup (Optional)

### Google Analytics

Add this to <head> of all pages:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Hotjar (Optional)

Add this before </head>:
```html
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:YOUR_ID,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');
        r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

---

## 🎨 Design Customization Guide

### Change Main Color

Edit CSS variables:
```css
:root {
    --color-cyan: #your-color;
    --color-cyan-light: #your-color-light;
}
```

### Change Font

Replace in CSS:
```css
--font-family: 'Your Font', sans-serif;
```

### Add Custom Font

Add to <head>:
```html
<link href="https://fonts.googleapis.com/css?family=YourFont" rel="stylesheet">
```

### Adjust Spacing

Modify spacing variables:
```css
--spacing-md: 24px; /* Change to desired value */
```

---

## 📱 Mobile Testing Checklist

- [ ] All text readable on small screens
- [ ] Buttons are touch-friendly (48px min)
- [ ] Navigation menu works on mobile
- [ ] Forms are easy to fill on mobile
- [ ] Images scale properly
- [ ] No horizontal scrolling
- [ ] Fast loading on slow 4G
- [ ] All pages accessible on mobile

---

## 🎯 Next Steps After Deployment

1. **SEO Optimization**
   - Submit sitemap to Google
   - Add analytics
   - Monitor search rankings

2. **Content Updates**
   - Add real case studies
   - Update investigation progress
   - Publish research findings

3. **User Engagement**
   - Review case submissions
   - Respond to contacts
   - Update FAQ based on questions

4. **Technical Maintenance**
   - Monitor uptime
   - Update contact info
   - Back up database/forms
   - Keep disclaimer current

5. **Marketing**
   - Share on social media
   - Build backlinks
   - Create blog content
   - Email newsletter

---

## 📞 Support Resources

- **HTML/CSS Help**: https://developer.mozilla.org/
- **JavaScript Help**: https://javascript.info/
- **Hosting Questions**: Your provider's support
- **SEO**: https://moz.com/beginners-guide-to-seo
- **Accessibility**: https://www.w3.org/WAI/

---

**Website is complete and ready to serve your organization!**

For questions or customization help, refer to the specific page's HTML or consult web development documentation.
