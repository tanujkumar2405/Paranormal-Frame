# Deployment Guide

## Quick Start

This is a complete, static HTML5 website that requires no build process or backend. Simply upload the files as-is to any web hosting provider.

## Deployment Options

### 1. GitHub Pages (Free)

**Steps:**
1. Create a GitHub account (if you don't have one)
2. Create a new repository named `anomalous-evidence`
3. Clone the repository to your computer
4. Copy all project files into the repository folder
5. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit - Anomalous Evidence website"
   git push origin main
   ```
6. Go to Settings → Pages → Select "main" branch as source
7. Your site will be live at: `https://yourusername.github.io/anomalous-evidence`

### 2. Netlify (Free)

**Steps:**
1. Go to netlify.com
2. Click "New site from Git" or drag & drop the folder
3. Connect your GitHub repository or upload the folder
4. Configure:
   - Build command: (leave empty)
   - Publish directory: `/`
5. Click "Deploy"
6. Your site will be live at a Netlify subdomain

### 3. Vercel (Free)

**Steps:**
1. Go to vercel.com
2. Click "New Project"
3. Import the GitHub repository or upload folder
4. Framework: Select "Other"
5. Click "Deploy"
6. Your site will be live at a Vercel subdomain

### 4. Traditional Web Hosting (Bluehost, GoDaddy, etc.)

**Steps:**
1. Upload all files via FTP or cPanel File Manager
2. Maintain the exact folder structure:
   ```
   public_html/
   ├── index.html
   ├── about.html
   ├── investigations.html
   ├── methods.html
   ├── submit-case.html
   ├── contact.html
   ├── disclaimer.html
   ├── assets/
   │   ├── css/style.css
   │   ├── js/main.js
   │   └── images/logo.svg
   └── README.md
   ```
3. Your site will be live at: `https://yourdomain.com`

### 5. AWS S3 (Static Hosting)

**Steps:**
1. Create an S3 bucket with your domain name
2. Enable "Static website hosting" in bucket properties
3. Upload all files maintaining folder structure
4. Set bucket policy to allow public access
5. Enable CloudFront CDN (optional)
6. Your site will be live at the S3 endpoint

### 6. Local Testing

To test locally before deployment:
1. Open `index.html` in any web browser
2. All navigation and functionality should work
3. Mobile responsive design can be tested by resizing browser or using browser DevTools

## Custom Domain Setup

After deploying to any service:

1. **Purchase a domain** (Namecheap, GoDaddy, Google Domains, etc.)
2. **Update DNS records** to point to your hosting provider
3. **SSL Certificate** - Most hosting providers auto-enable HTTPS
4. **Verify DNS** - May take 24-48 hours for propagation

## Pre-Deployment Checklist

- [ ] All HTML files validate (use https://validator.w3.org/)
- [ ] CSS loads correctly (no 404 errors)
- [ ] JavaScript functions work (forms, navigation)
- [ ] Images display properly
- [ ] Mobile responsive design works
- [ ] All links point to correct pages
- [ ] Meta tags are accurate
- [ ] Forms show success messages
- [ ] Footer and header appear on all pages
- [ ] No console errors in DevTools

## Post-Deployment Testing

After deployment:

1. **Test all pages load** - Visit every page via navigation
2. **Test all links** - Click every link to verify destination
3. **Test forms** - Submit case and contact forms
4. **Test responsive** - Use https://responsivedesignchecker.com/
5. **Test SEO** - Use https://www.seobility.net/en/
6. **Check performance** - Use https://pagespeed.web.dev/
7. **Validate HTML** - Use https://validator.w3.org/
8. **Test accessibility** - Use https://www.axe-devtools.com/

## Performance Optimization (Optional)

If needed, optimize further with:

### Image Optimization
```bash
# Convert SVG logo to PNG and compress
# Use tools like TinyPNG or ImageOptim
```

### CSS Minification (Optional)
- Minify style.css for smaller file size
- Use online tools like https://cssminifier.com/

### JavaScript Minification (Optional)
- Minify main.js for smaller file size
- Use online tools like https://www.toptal.com/developers/javascript-minifier

## Monitoring & Maintenance

### Google Search Console
1. Register your domain
2. Add sitemap: `sitemap.xml`
3. Monitor search performance
4. Check for crawl errors

### Google Analytics (Optional)
Add tracking code if you want visitor analytics (not included by default)

### Regular Backups
- Download entire site quarterly
- Store backups in secure location
- Keep version history in Git

## Content Updates

To update website content:

1. **Edit HTML files** with any text editor
2. **Update CSS** if changing colors or layout
3. **Modify JavaScript** if adding new functionality
4. **Push changes** to GitHub (if using version control)
5. **Redeploy** site (automatic on most platforms)

## Troubleshooting

### Site not loading
- Check file paths are relative (not absolute)
- Verify all files are uploaded
- Check file permissions (644 for files, 755 for folders)

### CSS not loading
- Verify `assets/css/style.css` path is correct
- Check browser cache (Ctrl+Shift+Delete)
- Use DevTools Network tab to debug

### Forms not working
- Check `main.js` is loaded
- Open DevTools Console to see errors
- Verify form IDs match JavaScript selectors

### Mobile menu not working
- Check hamburger element exists
- Verify JavaScript console has no errors
- Test in incognito mode

## SSL Certificate

Most modern hosting providers provide FREE SSL certificates:
- GitHub Pages: Automatic
- Netlify: Automatic
- Vercel: Automatic
- Traditional hosting: Check with provider

Always use HTTPS (not HTTP) for security.

## DNS Configuration Example

For custom domain, update DNS records:

```
Type     Name              Value
A        @                 192.0.2.1       (your hosting IP)
CNAME    www               yourdomain.com.
TXT      @                 (verify ownership)
```

Exact values depend on your hosting provider.

## Questions?

For deployment support:
- GitHub Pages: https://docs.github.com/en/pages
- Netlify: https://docs.netlify.com/
- Vercel: https://vercel.com/docs
- Your hosting provider's documentation

---

**Site is now production-ready and can be deployed immediately!**
