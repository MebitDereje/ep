# Ethiopian Police University (EPU) Official Website

A complete, modern, and responsive website for the Ethiopian Police University built with HTML5, CSS3, vanilla JavaScript, and a Node.js backend with SQLite database.

## Project Overview

This website serves as the main online presence for the Ethiopian Police University, providing information to prospective students, current students, faculty, law enforcement partners, researchers, and the general public.

## Two Versions Available

1. **Static Version** - Pure HTML/CSS/JS (no server needed)
2. **Dynamic Version** - With Node.js backend and database

## Features

### Pages
- **Home Page** (`index.html`) - Hero carousel, core values, latest news
- **About Us** (`about.html`) - History, mission, vision, values, leadership
- **Academics** (`academics.html`) - Programs with interactive tabs and accordions
- **Admissions** (`admissions.html`) - Requirements, application status checker
- **Contact** (`contact.html`) - Contact information, map placeholder, contact form

### Interactive Components
- **Responsive Navigation** - Hamburger menu for mobile devices
- **Hero Carousel** - Auto-rotating image slideshow with manual controls
- **Tabs** - Interactive program categories (Undergraduate, Postgraduate, TVET)
- **Accordions** - Expandable program details
- **Form Validation** - Client-side validation with error messages

## Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with CSS Grid and Flexbox
- **Vanilla JavaScript (ES6+)** - No frameworks or libraries
- **Mobile-First Design** - Fully responsive across all devices

### Backend (Optional)
- **Node.js** - Server runtime
- **Express** - Web framework
- **SQLite3** - Database
- **RESTful API** - For data management

## Color Palette

- Primary Blue: `#1e3a8a`
- Secondary Blue: `#3b82f6`
- Gold/Yellow: `#fbbf24`
- White: `#ffffff`
- Light Gray: `#f3f4f6`
- Dark Gray: `#374151`

## File Structure

```
epu-website/
├── index.html          # Home page
├── about.html          # About page
├── academics.html      # Programs page
├── admissions.html     # Admissions page
├── contact.html        # Contact page
├── styles.css          # All CSS styles
├── script.js           # All JavaScript functionality
└── README.md           # Documentation
```

## Quick Start

### Option 1: Static Version (No Installation)

1. Simply open `index.html` in any web browser
2. All features work without a server (forms show mock data)

### Option 2: Dynamic Version (With Backend)

#### Prerequisites
- **Node.js** must be installed ([Download here](https://nodejs.org/))

#### Windows Users - Easy Setup
1. Double-click **setup-and-run.bat**
2. The script will:
   - Check for Node.js
   - Install dependencies
   - Setup database
   - Start the server
3. Open browser to **http://localhost:3000**

#### Manual Setup (All Platforms)
```bash
# 1. Install dependencies
npm install

# 2. Initialize database
npm run init-db

# 3. Start server
npm start
```

Then open: **http://localhost:3000**

## Features Comparison

| Feature | Static Version | Dynamic Version |
|---------|---------------|-----------------|
| View pages | ✓ | ✓ |
| Responsive design | ✓ | ✓ |
| Carousel | ✓ | ✓ |
| Form validation | ✓ | ✓ |
| Save contact messages | ✗ | ✓ |
| Real application status | ✗ | ✓ |
| Admin dashboard | ✗ | ✓ |
| Database storage | ✗ | ✓ |

## Core Values

The website emphasizes EPU's four core values:
1. **Professionalism** - Highest standards of excellence
2. **Integrity** - Honesty and strong moral principles
3. **Respect for Diversity** - Embracing differences
4. **Respect for Human Rights** - Protecting fundamental freedoms

## Contact Information

**Ethiopian Police University**
- Address: Sendafa, Oromia, Ethiopia
- Phone: +251-11-XXX-XXXX
- Email: info@epu.edu.et

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Project Structure

```
epu-website/
├── Frontend Files
│   ├── index.html              # Home page
│   ├── about.html              # About page
│   ├── academics.html          # Programs page
│   ├── admissions.html         # Admissions page
│   ├── contact.html            # Contact page
│   ├── admin.html              # Admin dashboard
│   ├── styles.css              # All styles
│   ├── script.js               # Static version JS
│   └── script-api.js           # Dynamic version JS (with API calls)
│
├── Backend Files
│   ├── server.js               # Express server
│   ├── init-database.js        # Database setup
│   ├── package.json            # Dependencies
│   └── epu_database.db         # SQLite database (created on init)
│
├── Documentation
│   ├── README.md               # This file
│   ├── SERVER_SETUP.md         # Detailed server guide
│   ├── INSTALL_NODEJS.md       # Node.js installation
│   └── QUICKSTART.md           # Quick start guide
│
└── Utilities
    ├── setup-and-run.bat       # Windows auto-setup
    ├── start-server.bat        # Quick server start
    └── .gitignore              # Git ignore file
```

## Using the Dynamic Version

To enable backend features, update HTML files to use `script-api.js`:

```html
<!-- Change from -->
<script src="script.js"></script>

<!-- To -->
<script src="script-api.js"></script>
```

## Admin Dashboard

Access at: **http://localhost:3000/admin.html**

Features:
- View all applications
- View contact messages
- Real-time statistics
- Filter by status

## API Documentation

See **SERVER_SETUP.md** for complete API documentation including:
- GET /api/news
- GET /api/programs
- POST /api/contact
- POST /api/applications
- POST /api/application-status
- GET /api/admin/messages
- GET /api/admin/applications

## Database Schema

### Tables
1. **news** - Announcements and news items
2. **programs** - Academic programs
3. **contact_messages** - Contact form submissions
4. **applications** - Student applications

## Troubleshooting

### Node.js Not Installed
- See **INSTALL_NODEJS.md** for installation guide
- Download from: https://nodejs.org/

### Port Already in Use
Edit `server.js`:
```javascript
const PORT = 3001; // Change port number
```

### Database Issues
```bash
# Delete database and recreate
del epu_database.db
npm run init-db
```

### Dependencies Issues
```bash
npm cache clean --force
npm install
```

## Development

### Adding New Programs
1. Edit database directly, or
2. Add via SQL:
```sql
INSERT INTO programs (name, category, duration, description, requirements, career_opportunities)
VALUES ('Program Name', 'undergraduate', '4 Years', 'Description', 'Requirements', 'Careers');
```

### Adding News
```sql
INSERT INTO news (title, content, date)
VALUES ('Title', 'Content', '2025-11-27');
```

## Security Notes

⚠️ **This is a development setup**

For production:
- Add authentication/authorization
- Implement input sanitization
- Use environment variables
- Add HTTPS
- Use production database (PostgreSQL/MySQL)
- Add rate limiting
- Implement CSRF protection

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Notes

- Images use placeholder URLs (replace with real images)
- Google Maps integration is placeholder
- No external frameworks used
- All code is well-commented
- Fully responsive design

## Support

For detailed guides, see:
- **SERVER_SETUP.md** - Complete server documentation
- **INSTALL_NODEJS.md** - Node.js installation
- **QUICKSTART.md** - Quick testing guide

---

© 2025 Ethiopian Police University. All rights reserved.
