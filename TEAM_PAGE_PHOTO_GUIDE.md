# AERM Team Page - Photo & Image Guide

## Image Upload Instructions

### Directory Structure
All images should be placed in: `assets/images/`

### Required Images

#### Team Member Photos
Create or upload profile photographs for the following team members:

1. **prince-sharma.jpg**
   - Team Member: Prince Sharma
   - Role: Lead Investigator
   - Dimensions: 300x300px (square)
   - Format: JPG/PNG

2. **anish-yadav.jpg**
   - Team Member: Anish Yadav
   - Role: Senior Investigator & Data Logger
   - Dimensions: 300x300px (square)
   - Format: JPG/PNG

3. **rohit-kachwaha.jpg**
   - Team Member: Rohit KacHHAWAHA
   - Role: Media & Documentation Officer
   - Dimensions: 300x300px (square)
   - Format: JPG/PNG

4. **isaac-joseph.jpg**
   - Team Member: Isaac Joseph
   - Role: Psychic Consultant & Tarot Reader / Psychic Trainer
   - Dimensions: 300x300px (square)
   - Format: JPG/PNG

5. **khushi-shekhawat.jpg**
   - Team Member: Khushi Shekhawat
   - Role: Psychic Consultant
   - Dimensions: 300x300px (square)
   - Format: JPG/PNG

#### Founder Photo
6. **founder-photo.jpg**
   - Team Member: Tanuj Kumar
   - Role: Founder & Director
   - Dimensions: 300x300px (square)
   - Format: JPG/PNG
   - Location: assets/images/

#### Team Group Photo (Optional)
7. **team-group-photo.jpg**
   - Full AERM team photograph
   - Dimensions: 1200x600px (landscape)
   - Format: JPG/PNG
   - Location: assets/images/

### Placeholder Behavior

When images are not yet uploaded:
- Placeholder icons (📸) will display
- Gray background with upload instructions
- Instructions show which file to upload and where
- Once images are uploaded to the correct location, they automatically replace placeholders

### Image Optimization Tips

1. **File Size**: Keep images under 200KB for web performance
2. **Format**: JPG for photographs (better compression), PNG for graphics
3. **Compression**: Use image compression tools before uploading
4. **Aspect Ratio**: Maintain square ratio (1:1) for profile photos
5. **Naming**: Use lowercase with hyphens (e.g., prince-sharma.jpg, NOT Prince Sharma.jpg)

### How to Replace Placeholder Images

1. Prepare your image (300x300px for profile, JPG format recommended)
2. Name file exactly as specified above
3. Save to: `c:\Users\Tanuj Kumar\Desktop\anomalous-evidence\assets\images\`
4. Refresh website - image will automatically display

### Responsive Image Display

- **Desktop**: Full size display (300x300 for profiles)
- **Tablet**: Scaled appropriately
- **Mobile**: Full-width responsive cards

### Example File Paths

```
c:\Users\Tanuj Kumar\Desktop\anomalous-evidence\
├── assets/
│   └── images/
│       ├── founder-photo.jpg ← Founder photo
│       ├── prince-sharma.jpg ← Prince Sharma profile
│       ├── anish-yadav.jpg ← Anish Yadav profile
│       ├── rohit-kachwaha.jpg ← Rohit KacHHAWAHA profile
│       ├── isaac-joseph.jpg ← Isaac Joseph profile
│       ├── khushi-shekhawat.jpg ← Khushi Shekhawat profile
│       └── team-group-photo.jpg ← (Optional) Team group photo
```

## Current Status

### Founder Page
- ✅ Photo placeholder added
- ⏳ Awaiting: founder-photo.jpg

### Team Page
- ⏳ Photo placeholders ready (when page is updated)
- ⏳ Awaiting: All 5 team member photos

### Images to Upload
- [ ] prince-sharma.jpg
- [ ] anish-yadav.jpg
- [ ] rohit-kachwaha.jpg
- [ ] isaac-joseph.jpg
- [ ] khushi-shekhawat.jpg
- [ ] founder-photo.jpg (for founder.html)
- [ ] team-group-photo.jpg (optional, for team.html header)

## Technical Notes

The team and founder pages use fallback display:
```html
<img 
    src="assets/images/[filename]" 
    alt="[Team Member Name] - [Role]"
    style="width: 100%; height: 100%; object-fit: cover; display: none;"
>
<!-- If image not found, placeholder displays instead -->
<div style="text-align: center; color: var(--text-muted);">
    <div style="font-size: 3rem;">📸</div>
    <p>[Member Name]</p>
    <p style="font-size: 0.85rem;">Upload: assets/images/[filename]</p>
</div>
```

This ensures:
- If image exists: displays normally
- If image missing: shows helpful placeholder with instructions
- No broken image icons
- Professional appearance either way
- Easy update process

## Support

For questions about image uploading or sizing, refer to this document for exact specifications.
