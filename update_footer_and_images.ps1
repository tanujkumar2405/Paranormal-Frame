# Update AERM Footer and Add Image Placeholders
# This script updates footer sections across all pages and adds team photo placeholders

$pages = @(
    "founder.html",
    "index.html",
    "about.html",
    "contact.html",
    "services.html",
    "team.html",
    "workshops.html",
    "media.html",
    "gallery.html",
    "faq.html",
    "why-aerm.html"
)

# Old footer resources section
$oldFooterResources = @"
                <div class="footer-section">
                    <h4>Resources</h4>
                    <ul class="footer-links">
                        <li><a href="services.html">Services</a></li>
                        <li><a href="workshops.html">Workshops</a></li>
                        <li><a href="media.html">Media</a></li>
                        <li><a href="gallery.html">Gallery</a></li>
                        <li><a href="faq.html">FAQ</a></li>
                    </ul>
                </div>
"@

# New footer connect section with official platforms
$newFooterConnect = @"
                <div class="footer-section">
                    <h4>Connect With AERM</h4>
                    <ul class="footer-links">
                        <li><a href="https://www.instagram.com/paranormal_frame.aerm" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        <li><a href="https://youtube.com/@paranormalframe-aerm" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                        <li><a href="https://www.facebook.com/share/18hMaC51t9/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><a href="https://chat.whatsapp.com/EUTGQ8h5XlaLeVBHJWXUXa" target="_blank" rel="noopener noreferrer">WhatsApp Community</a></li>
                        <li><a href="mailto:anomalouseevidence@gmail.com">Email</a></li>
                    </ul>
                </div>
"@

# Update footer on all pages
foreach ($page in $pages) {
    $filePath = "C:\Users\Tanuj Kumar\Desktop\anomalous-evidence\$page"
    
    if (Test-Path $filePath) {
        Write-Host "Updating footer in $page..."
        $content = Get-Content $filePath -Raw
        
        # Only update if Resources section exists
        if ($content -contains "Resources") {
            $updated = $content -replace [regex]::Escape($oldFooterResources), $newFooterConnect
            Set-Content $filePath -Value $updated
            Write-Host "✓ $page - Footer updated"
        } else {
            Write-Host "- $page - Resources section not found (may already be updated)"
        }
    } else {
        Write-Host "✗ $page - File not found"
    }
}

Write-Host "`nFooter updates complete!"
