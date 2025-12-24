# Ethiopian Police University Website - Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                          │
│  (Chrome, Firefox, Safari, Edge, Mobile Browsers)           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP Requests
                     │
┌────────────────────▼────────────────────────────────────────┐
│                    EXPRESS SERVER                            │
│                   (Node.js - Port 3000)                      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              STATIC FILE SERVING                      │  │
│  │  • HTML Pages (index, about, academics, etc.)        │  │
│  │  • CSS Stylesheets                                   │  │
│  │  • JavaScript Files                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  API ENDPOINTS                        │  │
│  │  • GET  /api/news                                    │  │
│  │  • GET  /api/programs                                │  │
│  │  • POST /api/contact                                 │  │
│  │  • POST /api/applications                            │  │
│  │  • POST /api/application-status                      │  │
│  │  • GET  /api/admin/messages                          │  │
│  │  • GET  /api/admin/applications                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ SQL Queries
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   SQLite DATABASE                            │
│                  (epu_database.db)                           │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    news      │  │   programs   │  │contact_msgs  │     │
│  │              │  │              │  │              │     │
│  │ • id         │  │ • id         │  │ • id         │     │
│  │ • title      │  │ • name       │  │ • first_name │     │
│  │ • content    │  │ • category   │  │ • last_name  │     │
│  │ • date       │  │ • duration   │  │ • email      │     │
│  │ • created_at │  │ • description│  │ • subject    │     │
│  └──────────────┘  │ • requirements│  │ • message    │     │
│                    │ • careers    │  │ • status     │     │
│  ┌──────────────┐  └──────────────┘  └──────────────┘     │
│  │applications  │                                           │
│  │              │                                           │
│  │ • id         │                                           │
│  │ • app_id     │                                           │
│  │ • first_name │                                           │
│  │ • last_name  │                                           │
│  │ • email      │                                           │
│  │ • program    │                                           │
│  │ • dob        │                                           │
│  │ • status     │                                           │
│  └──────────────┘                                           │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      HTML PAGES                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  index.html          Home page with carousel & news         │
│  about.html          Mission, vision, values, leadership    │
│  academics.html      Programs with tabs & accordions        │
│  admissions.html     Requirements & status checker          │
│  contact.html        Contact form & information             │
│  admin.html          Admin dashboard                        │
│                                                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Styled by
                     │
┌────────────────────▼────────────────────────────────────────┐
│                      styles.css                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  • Reset & Base Styles                                      │
│  • Navigation (responsive hamburger menu)                   │
│  • Hero Carousel                                            │
│  • Page Layouts (Grid & Flexbox)                           │
│  • Components (cards, forms, tables)                        │
│  • Responsive Breakpoints (480px, 768px, 1200px)           │
│  • Animations & Transitions                                 │
│                                                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Interactive via
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   JavaScript Files                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  script.js           Static version (no API calls)          │
│  • Mobile navigation                                        │
│  • Carousel functionality                                   │
│  • Tabs & accordions                                        │
│  • Form validation (client-side)                           │
│  • Mock data display                                        │
│                                                              │
│  script-api.js       Dynamic version (with API)             │
│  • All features from script.js                             │
│  • API integration (fetch)                                  │
│  • Real data loading                                        │
│  • Form submission to backend                               │
│  • Application status checking                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Contact Form Submission

```
User fills form
      │
      ▼
JavaScript validates
      │
      ▼
POST /api/contact
      │
      ▼
Express server receives
      │
      ▼
Insert into contact_messages table
      │
      ▼
Return success response
      │
      ▼
Show success message to user
      │
      ▼
Admin can view in dashboard
```

### Application Status Check

```
User enters App ID + DOB
      │
      ▼
JavaScript validates
      │
      ▼
POST /api/application-status
      │
      ▼
Express server queries database
      │
      ▼
SELECT from applications table
      │
      ▼
Return application data
      │
      ▼
Display status to user
```

### Loading Programs

```
Page loads
      │
      ▼
JavaScript calls API
      │
      ▼
GET /api/programs?category=undergraduate
      │
      ▼
Express queries database
      │
      ▼
SELECT from programs table
      │
      ▼
Return programs array
      │
      ▼
JavaScript populates accordions
      │
      ▼
User sees programs
```

## Component Hierarchy

```
Website
│
├── Navigation Bar
│   ├── Logo
│   ├── Menu Items
│   └── Hamburger (mobile)
│
├── Pages
│   │
│   ├── Home
│   │   ├── Hero Carousel
│   │   │   ├── Slides
│   │   │   ├── Navigation Buttons
│   │   │   └── Indicators
│   │   ├── About Preview
│   │   ├── Core Values Grid
│   │   └── News Ticker
│   │
│   ├── About
│   │   ├── Page Header
│   │   ├── History Section
│   │   ├── Mission & Vision Cards
│   │   ├── Values List
│   │   └── Leadership Grid
│   │
│   ├── Academics
│   │   ├── Page Header
│   │   ├── Tabs Navigation
│   │   └── Tab Panes
│   │       ├── Undergraduate Programs
│   │       │   └── Accordions
│   │       ├── Postgraduate Programs
│   │       │   └── Accordions
│   │       └── TVET Programs
│   │           └── Accordions
│   │
│   ├── Admissions
│   │   ├── Page Header
│   │   ├── Requirements Grid
│   │   ├── Status Check Form
│   │   └── Important Dates
│   │
│   ├── Contact
│   │   ├── Page Header
│   │   ├── Contact Info Cards
│   │   ├── Map Placeholder
│   │   └── Contact Form
│   │
│   └── Admin
│       ├── Dashboard Header
│       ├── Statistics Cards
│       ├── Applications Table
│       └── Messages Table
│
└── Footer
    ├── About Column
    ├── Quick Links
    └── Contact Info
```

## Technology Stack Layers

```
┌─────────────────────────────────────────┐
│         PRESENTATION LAYER              │
│  HTML5 • CSS3 • Vanilla JavaScript      │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         APPLICATION LAYER               │
│  Express.js • RESTful API • Routing     │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│           DATA LAYER                    │
│  SQLite3 • SQL Queries • Transactions   │
└─────────────────────────────────────────┘
```

## Responsive Design Breakpoints

```
Mobile First Approach:

┌──────────────────────────────────────────────────────────┐
│  Base Styles (Mobile)                                    │
│  < 480px                                                 │
│  • Single column layout                                 │
│  • Hamburger menu                                       │
│  • Stacked cards                                        │
│  • Touch-friendly buttons                               │
└──────────────────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│  Tablet Styles                                           │
│  480px - 768px                                          │
│  • Two column grids                                     │
│  • Larger touch targets                                 │
│  • Adjusted spacing                                     │
└──────────────────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│  Desktop Styles                                          │
│  > 768px                                                │
│  • Full navigation menu                                 │
│  • Multi-column layouts                                 │
│  • Hover effects                                        │
│  • Larger images                                        │
└──────────────────────────────────────────────────────────┘
```

## Security Considerations

```
Current (Development):
├── Client-side validation only
├── No authentication
├── No input sanitization
├── No rate limiting
└── SQLite (single file)

Production Requirements:
├── Server-side validation
├── Authentication & Authorization
├── Input sanitization (SQL injection prevention)
├── CSRF protection
├── Rate limiting
├── HTTPS/SSL
├── Production database (PostgreSQL/MySQL)
├── Environment variables
├── Logging & monitoring
└── Backup strategy
```

## Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────────────┐
│                    USERS                                 │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                 CDN / Load Balancer                      │
│              (CloudFlare, AWS CloudFront)                │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              Web Server Cluster                          │
│         (Multiple Node.js instances)                     │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│            Production Database                           │
│         (PostgreSQL with replication)                    │
└─────────────────────────────────────────────────────────┘
```

---

This architecture provides a solid foundation for a modern, scalable university website with room for future enhancements and production deployment.
