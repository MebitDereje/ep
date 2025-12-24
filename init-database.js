const sqlite3 = require('sqlite3').verbose();

// Create/connect to database
const db = new sqlite3.Database('./epu_database.db', (err) => {
    if (err) {
        console.error('Error creating database:', err);
        return;
    }
    console.log('Database created/connected successfully');
});

// Create tables
db.serialize(() => {
    // News/Announcements table
    db.run(`CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        date TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) console.error('Error creating news table:', err);
        else console.log('✓ News table created');
    });

    // Programs table
    db.run(`CREATE TABLE IF NOT EXISTS programs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        duration TEXT,
        description TEXT,
        requirements TEXT,
        career_opportunities TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) console.error('Error creating programs table:', err);
        else console.log('✓ Programs table created');
    });

    // Contact messages table
    db.run(`CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'unread'
    )`, (err) => {
        if (err) console.error('Error creating contact_messages table:', err);
        else console.log('✓ Contact messages table created');
    });

    // Applications table
    db.run(`CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        application_id TEXT UNIQUE NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        program TEXT NOT NULL,
        date_of_birth TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) console.error('Error creating applications table:', err);
        else console.log('✓ Applications table created');
    });

    // Insert sample news
    const newsData = [
        ['New Master\'s Program in Cybercrime Investigation Launched', 'EPU is proud to announce a new cutting-edge program.', '2025-11-25'],
        ['EPU Hosts International Conference on Modern Policing', 'Leading experts from around the world gathered at EPU.', '2025-11-20'],
        ['Admission Open for 2026 Academic Year - Apply Now!', 'Applications are now being accepted for all programs.', '2025-11-15']
    ];

    const newsStmt = db.prepare('INSERT OR IGNORE INTO news (title, content, date) VALUES (?, ?, ?)');
    newsData.forEach(news => {
        newsStmt.run(news);
    });
    newsStmt.finalize(() => {
        console.log('✓ Sample news data inserted');
    });

    // Insert sample programs
    const programsData = [
        ['Bachelor of Science in Police Science', 'undergraduate', '4 Years', 
         'Comprehensive program covering all aspects of modern policing.', 
         'Grade 12, Min GPA 2.75, Pass entrance exam', 
         'Police Officer, Detective, Crime Analyst'],
        ['Bachelor of Laws (LLB) in Criminal Justice', 'undergraduate', '4 Years',
         'Focuses on criminal law and legal framework.',
         'Grade 12, Min GPA 2.75, Pass entrance exam',
         'Legal Advisor, Prosecutor, Criminal Justice Specialist'],
        ['Master of Science in Criminology', 'postgraduate', '2 Years',
         'Advanced study of crime patterns and prevention.',
         'Bachelor\'s degree, Min GPA 3.0',
         'Criminologist, Policy Analyst, Researcher'],
        ['Diploma in Basic Police Training', 'tvet', '1 Year',
         'Intensive training in fundamental policing skills.',
         'Grade 10/12, Physical fitness',
         'Entry-level Police Officer']
    ];

    const programStmt = db.prepare(`INSERT OR IGNORE INTO programs 
        (name, category, duration, description, requirements, career_opportunities) 
        VALUES (?, ?, ?, ?, ?, ?)`);
    programsData.forEach(program => {
        programStmt.run(program);
    });
    programStmt.finalize(() => {
        console.log('✓ Sample programs data inserted');
    });
});

// Close database
db.close((err) => {
    if (err) {
        console.error('Error closing database:', err);
        return;
    }
    console.log('\n✓ Database initialization complete!');
    console.log('Run "npm start" to start the server.');
});
