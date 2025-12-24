# Getting Started - Ethiopian Police University Website

## Choose Your Path

### 🚀 Path 1: Quick View (No Installation)
**Best for:** Just want to see the website

1. Open `index.html` in your browser
2. Done! Browse the website

**Note:** Forms will show mock data (not saved)

---

### 💻 Path 2: Full Experience (With Backend)
**Best for:** Want to test all features including database

#### Step 1: Install Node.js
- Go to: https://nodejs.org/
- Download the **LTS version**
- Install it (keep all default settings)
- **Restart your computer**

#### Step 2: Setup Project

**Windows Users (Easy):**
1. Double-click: `setup-and-run.bat`
2. Wait for setup to complete
3. Browser will show: http://localhost:3000

**All Users (Manual):**
```bash
# Open terminal in project folder
npm install          # Install dependencies
npm run init-db      # Setup database
npm start            # Start server
```

#### Step 3: Open Website
- Go to: **http://localhost:3000**
- Explore all pages
- Try the contact form (it saves to database!)
- Check admin dashboard: **http://localhost:3000/admin.html**

---

## What Can You Do?

### 📱 Browse Website
- **Home** - Hero carousel, core values, latest news
- **About** - History, mission, vision, leadership
- **Academics** - Programs with interactive tabs
- **Admissions** - Requirements and status checker
- **Contact** - Contact form and information

### 📝 Test Features

#### Contact Form
1. Go to Contact page
2. Fill out the form
3. Submit
4. Check admin dashboard to see your message!

#### Application Status
1. Go to Admissions page
2. Enter any Application ID (e.g., EPU2025-12345)
3. Enter any date
4. Click "Check Status"
5. See mock status result

#### Admin Dashboard
1. Go to: http://localhost:3000/admin.html
2. View all applications
3. View all contact messages
4. See statistics

### 📊 View Database
The database file is: `epu_database.db`

You can view it with:
- DB Browser for SQLite: https://sqlitebrowser.org/
- SQLite Viewer (VS Code extension)

---

## File Guide

### 🌐 Website Pages
- `index.html` - Home page
- `about.html` - About page
- `academics.html` - Programs
- `admissions.html` - Admissions
- `contact.html` - Contact
- `admin.html` - Admin dashboard

### 🎨 Styling & Scripts
- `styles.css` - All styles
- `script.js` - Static version
- `script-api.js` - Dynamic version (with API)

### ⚙️ Backend
- `server.js` - Web server
- `init-database.js` - Database setup
- `package.json` - Dependencies

### 📚 Documentation
- `README.md` - Main documentation
- `SERVER_SETUP.md` - Server details
- `INSTALL_NODEJS.md` - Node.js help
- `QUICKSTART.md` - Testing guide
- `PROJECT_SUMMARY.md` - Complete overview
- `GETTING_STARTED.md` - This file

### 🔧 Utilities
- `setup-and-run.bat` - Auto setup (Windows)
- `start-server.bat` - Quick start (Windows)

---

## Common Issues

### ❌ "npm is not recognized"
**Solution:** 
1. Install Node.js from https://nodejs.org/
2. Restart your computer
3. Try again

### ❌ Port 3000 already in use
**Solution:** 
1. Open `server.js`
2. Change line: `const PORT = 3000;` to `const PORT = 3001;`
3. Save and restart server

### ❌ Database errors
**Solution:**
```bash
# Delete database and recreate
del epu_database.db
npm run init-db
```

### ❌ Installation fails
**Solution:**
```bash
npm cache clean --force
npm install
```

---

## Quick Commands

```bash
# Install everything
npm install

# Setup database
npm run init-db

# Start server
npm start

# Stop server
Press Ctrl+C
```

---

## Next Steps

1. ✅ Get the website running
2. ✅ Browse all pages
3. ✅ Test the contact form
4. ✅ Check admin dashboard
5. ✅ Customize content
6. ✅ Add real images
7. ✅ Deploy to production

---

## Need Help?

### Quick Help
- Can't install Node.js? → See `INSTALL_NODEJS.md`
- Server not starting? → See `SERVER_SETUP.md`
- Want to test features? → See `QUICKSTART.md`
- Need full details? → See `README.md`

### Check Your Setup
```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check if server is running
# Open browser to: http://localhost:3000
```

---

## Tips

💡 **Use the hamburger menu** on mobile (three lines icon)

💡 **Carousel auto-rotates** every 5 seconds (hover to pause)

💡 **Click program titles** to expand details

💡 **Admin dashboard** shows real-time data

💡 **All forms validate** before submission

💡 **Website is fully responsive** - try resizing your browser!

---

## Success Checklist

- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] Database created (`npm run init-db`)
- [ ] Server running (`npm start`)
- [ ] Website opens at http://localhost:3000
- [ ] All pages load correctly
- [ ] Contact form works
- [ ] Admin dashboard accessible

---

**Ready to start?** 

👉 **No installation:** Open `index.html`

👉 **Full experience:** Run `setup-and-run.bat` (Windows) or `npm install && npm run init-db && npm start`

---

Enjoy exploring the Ethiopian Police University website! 🎓
