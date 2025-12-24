# Server and Database Setup Guide

## Prerequisites

You need Node.js installed on your system. Download from: https://nodejs.org/

## Installation Steps

### 1. Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

This will install:
- **express** - Web server framework
- **sqlite3** - Database
- **body-parser** - Parse request bodies
- **cors** - Enable cross-origin requests

### 2. Initialize Database

Create and populate the database with sample data:

```bash
npm run init-db
```

This creates `epu_database.db` with tables for:
- News/Announcements
- Programs
- Contact Messages
- Applications

### 3. Start the Server

```bash
npm start
```

The server will start at: **http://localhost:3000**

## Using the Website

### Main Website
Open your browser and go to:
- **http://localhost:3000** - Home page
- **http://localhost:3000/about** - About page
- **http://localhost:3000/academics** - Programs
- **http://localhost:3000/admissions** - Admissions
- **http://localhost:3000/contact** - Contact form

### Admin Dashboard
- **http://localhost:3000/admin.html** - View applications and messages

## API Endpoints

### Public Endpoints

**GET /api/news**
- Get all news/announcements
- Response: `{ news: [...] }`

**GET /api/programs**
- Get all programs
- Query params: `?category=undergraduate|postgraduate|tvet`
- Response: `{ programs: [...] }`

**POST /api/contact**
- Submit contact form
- Body: `{ firstName, lastName, email, phone, subject, message }`
- Response: `{ success: true, message: "...", id: 123 }`

**POST /api/applications**
- Submit application
- Body: `{ firstName, lastName, email, phone, program, dateOfBirth }`
- Response: `{ success: true, applicationId: "EPU2025-12345" }`

**POST /api/application-status**
- Check application status
- Body: `{ applicationId, dateOfBirth }`
- Response: `{ success: true, application: {...} }`

### Admin Endpoints

**GET /api/admin/messages**
- Get all contact messages
- Response: `{ messages: [...] }`

**GET /api/admin/applications**
- Get all applications
- Response: `{ applications: [...] }`

## Using the API-Enabled Version

To use the version with backend integration:

1. Update your HTML files to use `script-api.js` instead of `script.js`:

```html
<!-- Change this -->
<script src="script.js"></script>

<!-- To this -->
<script src="script-api.js"></script>
```

2. The website will now:
   - Load news from database
   - Load programs from database
   - Save contact form submissions
   - Check real application status

## Testing the Backend

### Test Contact Form
1. Go to http://localhost:3000/contact
2. Fill out and submit the form
3. Check admin dashboard to see the message

### Test Application Status
1. First, you need to create an application (you can do this via API or add manually to database)
2. Go to http://localhost:3000/admissions
3. Enter application ID and date of birth
4. View status

### View Admin Dashboard
1. Go to http://localhost:3000/admin.html
2. See all applications and messages
3. Click "Refresh Data" to reload

## Database Management

The database file is `epu_database.db`. You can:

### View/Edit Database
Use a SQLite browser like:
- DB Browser for SQLite: https://sqlitebrowser.org/
- SQLite Viewer (VS Code extension)

### Reset Database
Delete `epu_database.db` and run:
```bash
npm run init-db
```

### Backup Database
Simply copy the `epu_database.db` file

## Troubleshooting

### Port Already in Use
If port 3000 is busy, edit `server.js`:
```javascript
const PORT = 3001; // Change to different port
```

### Database Errors
- Delete `epu_database.db`
- Run `npm run init-db` again

### CORS Errors
The server has CORS enabled. If you still get errors, check that you're accessing via `http://localhost:3000` not `file://`

### Module Not Found
Run `npm install` again

## Stopping the Server

Press **Ctrl+C** in the terminal where the server is running

## Production Deployment

For production, you would:
1. Use a production database (PostgreSQL, MySQL)
2. Add authentication/authorization
3. Use environment variables for configuration
4. Add input sanitization and security measures
5. Deploy to a hosting service (Heroku, AWS, DigitalOcean)

---

**Note**: This is a development setup. For production use, implement proper security measures, authentication, and use a production-grade database.
