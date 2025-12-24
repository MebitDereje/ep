const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Database connection
const db = new sqlite3.Database('./epu_database.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// ===== API ROUTES =====

// Get all news/announcements
app.get('/api/news', (req, res) => {
    db.all('SELECT * FROM news ORDER BY date DESC LIMIT 10', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ news: rows });
    });
});

// Get all programs
app.get('/api/programs', (req, res) => {
    const category = req.query.category;
    let query = 'SELECT * FROM programs';
    let params = [];
    
    if (category) {
        query += ' WHERE category = ?';
        params.push(category);
    }
    
    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ programs: rows });
    });
});

// Submit contact form
app.post('/api/contact', (req, res) => {
    const { firstName, lastName, email, phone, subject, message } = req.body;
    
    const query = `INSERT INTO contact_messages 
                   (first_name, last_name, email, phone, subject, message, submitted_at) 
                   VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`;
    
    db.run(query, [firstName, lastName, email, phone, subject, message], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ 
            success: true, 
            message: 'Message received successfully',
            id: this.lastID 
        });
    });
});

// Submit application
app.post('/api/applications', (req, res) => {
    const { firstName, lastName, email, phone, program, dateOfBirth } = req.body;
    
    // Generate application ID
    const appId = 'EPU' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
    
    const query = `INSERT INTO applications 
                   (application_id, first_name, last_name, email, phone, program, date_of_birth, status, submitted_at) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', datetime('now'))`;
    
    db.run(query, [appId, firstName, lastName, email, phone, program, dateOfBirth], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ 
            success: true, 
            message: 'Application submitted successfully',
            applicationId: appId
        });
    });
});

// Check application status
app.post('/api/application-status', (req, res) => {
    const { applicationId, dateOfBirth } = req.body;
    
    const query = 'SELECT application_id, status, submitted_at FROM applications WHERE application_id = ? AND date_of_birth = ?';
    
    db.get(query, [applicationId, dateOfBirth], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Application not found' });
            return;
        }
        res.json({ 
            success: true,
            application: row
        });
    });
});

// Get contact messages (admin)
app.get('/api/admin/messages', (req, res) => {
    db.all('SELECT * FROM contact_messages ORDER BY submitted_at DESC', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ messages: rows });
    });
});

// Get all applications (admin)
app.get('/api/admin/applications', (req, res) => {
    db.all('SELECT * FROM applications ORDER BY submitted_at DESC', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ applications: rows });
    });
});

// ===== SERVE HTML PAGES =====
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/academics', (req, res) => {
    res.sendFile(path.join(__dirname, 'academics.html'));
});

app.get('/admissions', (req, res) => {
    res.sendFile(path.join(__dirname, 'admissions.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║   Ethiopian Police University Website Server          ║
║                                                        ║
║   Server running at: http://localhost:${PORT}         ║
║                                                        ║
║   Available endpoints:                                 ║
║   - GET  /api/news                                     ║
║   - GET  /api/programs                                 ║
║   - POST /api/contact                                  ║
║   - POST /api/applications                             ║
║   - POST /api/application-status                       ║
║   - GET  /api/admin/messages                           ║
║   - GET  /api/admin/applications                       ║
║                                                        ║
║   Press Ctrl+C to stop the server                     ║
╚════════════════════════════════════════════════════════╝
    `);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('\nDatabase connection closed.');
        console.log('Server stopped.');
        process.exit(0);
    });
});
