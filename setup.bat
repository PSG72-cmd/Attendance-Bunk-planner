@echo off
REM Smart Attendance Bunk Planner - Setup Script for Windows
REM This script sets up the project on Windows machines

echo.
echo ==========================================
echo Smart Attendance Bunk Planner
echo DSA Project - Windows Setup Script
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ==== ERROR ====
    echo Node.js is not installed or not in PATH
    echo.
    echo Download Node.js from: https://nodejs.org
    echo After installation, restart your terminal and try again
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js found
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo   Version: %NODE_VERSION%
echo.

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✅ npm found
echo   Version: %NPM_VERSION%
echo.

REM Check if package.json exists
if not exist "package.json" (
    echo.
    echo ==== ERROR ====
    echo package.json not found!
    echo Please run this script from the project root directory
    echo.
    pause
    exit /b 1
)

echo ✅ Project structure verified
echo.

REM Install dependencies
echo 📦 Installing dependencies...
echo This may take a few minutes...
echo.

call npm install

if %errorlevel% neq 0 (
    echo.
    echo ==== WARNING ====
    echo npm install encountered an error
    echo Try running: npm install --legacy-peer-deps
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed successfully!
echo.

echo ==========================================
echo Setup Complete! 🎉
echo ==========================================
echo.
echo Next steps:
echo.
echo 1. Start development server:
echo    npm start
echo.
echo 2. Visit in your browser:
echo    http://localhost:3000
echo.
echo 3. Read the documentation:
echo    - QUICK_START.md for quick setup
echo    - README.md for detailed guide
echo    - VIVA_PREPARATION.md for viva prep
echo.
echo 4. When ready to deploy:
echo    - Read DEPLOYMENT_GUIDE.md
echo    - Push to GitHub
echo    - Deploy to Vercel
echo.
echo Happy coding! 🚀
echo ==========================================
echo.

pause
