# Installing Node.js on Windows

## Step 1: Download Node.js

1. Go to: **https://nodejs.org/**
2. Download the **LTS (Long Term Support)** version
3. Choose the Windows Installer (.msi) - 64-bit

## Step 2: Install Node.js

1. Run the downloaded installer
2. Click "Next" through the installation wizard
3. Accept the license agreement
4. Keep the default installation path
5. Make sure "Add to PATH" is checked
6. Click "Install"
7. Wait for installation to complete
8. Click "Finish"

## Step 3: Verify Installation

1. Open a **NEW** Command Prompt or PowerShell window
2. Type: `node --version`
3. You should see something like: `v20.x.x`
4. Type: `npm --version`
5. You should see something like: `10.x.x`

## Step 4: Install Project Dependencies

Once Node.js is installed:

1. Open Command Prompt or PowerShell
2. Navigate to the project folder:
   ```
   cd "C:\Users\Administrator\Epu project"
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Initialize database:
   ```
   npm run init-db
   ```
5. Start the server:
   ```
   npm start
   ```

## Alternative: Using the Batch File

After installing Node.js, simply double-click:
- **setup-and-run.bat** - This will install dependencies, setup database, and start server

## Troubleshooting

### "npm is not recognized"
- Make sure you opened a NEW terminal window after installing Node.js
- Restart your computer if needed
- Check if Node.js is in your PATH environment variable

### Installation Fails
- Run Command Prompt or PowerShell as Administrator
- Try: `npm cache clean --force`
- Then: `npm install` again

### Port 3000 Already in Use
- Another application is using port 3000
- Edit `server.js` and change `const PORT = 3000;` to another port like `3001`

## Quick Start After Installation

```bash
# Install dependencies
npm install

# Setup database
npm run init-db

# Start server
npm start
```

Then open: **http://localhost:3000**

---

Need help? Check SERVER_SETUP.md for detailed documentation.
