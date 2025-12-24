@echo off
echo ========================================
echo Ethiopian Police University Website
echo Setup and Run Script
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js first:
    echo 1. Go to https://nodejs.org/
    echo 2. Download and install the LTS version
    echo 3. Restart your computer
    echo 4. Run this script again
    echo.
    pause
    exit /b 1
)

echo Node.js is installed: 
node --version
echo npm version: 
npm --version
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    echo This may take a few minutes...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo.
    echo Dependencies installed successfully!
    echo.
) else (
    echo Dependencies already installed.
    echo.
)

REM Check if database exists
if not exist "epu_database.db" (
    echo Initializing database...
    echo.
    call npm run init-db
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ERROR: Failed to initialize database
        pause
        exit /b 1
    )
    echo.
) else (
    echo Database already exists.
    echo.
)

echo ========================================
echo Starting server...
echo ========================================
echo.
echo The website will be available at:
echo http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

call npm start
