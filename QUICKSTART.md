# Quick Start Guide

## Getting Started

1. **Open the website**: Double-click `index.html` or right-click and select "Open with Browser"

2. **Navigate**: Use the navigation menu to explore all pages:
   - Home
   - About Us
   - Academics
   - Admissions
   - Contact

## Testing Features

### Hero Carousel (Home Page)
- Click left/right arrows to manually navigate
- Click indicator dots at the bottom
- Wait 5 seconds for auto-rotation
- Hover over carousel to pause auto-rotation

### Mobile Menu
- Resize browser to mobile width (< 768px)
- Click hamburger icon (three lines) to open menu
- Click any link to close menu

### Program Tabs (Academics Page)
- Click "Undergraduate Programs", "Postgraduate Programs", or "TVET/Diploma Programs"
- Content changes without page reload

### Program Accordions (Academics Page)
- Click any program title to expand details
- Click again to collapse
- Only one accordion open at a time

### Contact Form (Contact Page)
- Try submitting empty form to see validation
- Enter invalid email to see email validation
- Fill all required fields correctly to see success message

### Application Status (Admissions Page)
- Enter any application ID and date
- Click "Check Status" to see mock result

## Responsive Testing

Test on different screen sizes:
- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px - 1199px (adjusted grid)
- **Mobile**: < 768px (hamburger menu, stacked layout)

## Customization Tips

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-blue: #1e3a8a;
    --secondary-blue: #3b82f6;
    --gold: #fbbf24;
}
```

### Add Real Images
Replace placeholder URLs in HTML files:
```html
<!-- Current -->
<img src="https://via.placeholder.com/..." alt="...">

<!-- Replace with -->
<img src="images/your-image.jpg" alt="...">
```

### Modify Content
- Edit text directly in HTML files
- Update contact information in all pages
- Add more programs in `academics.html`

## Browser Developer Tools

Press F12 to open developer tools:
- **Console**: Check for JavaScript errors
- **Elements**: Inspect HTML/CSS
- **Network**: Monitor resource loading
- **Responsive Design Mode**: Test different screen sizes

## Need Help?

All code is well-commented. Look for:
- `/* ===== SECTION NAME ===== */` in CSS
- `// ===== SECTION NAME =====` in JavaScript

Enjoy exploring the Ethiopian Police University website!
