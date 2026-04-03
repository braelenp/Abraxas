@echo off
REM Raido Project Setup Script for Windows
REM Installs dependencies and prepares the development environment

echo.
echo 🚀 Raido - The Swift Provider
echo Setting up development environment...
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✓ Node.js version: %NODE_VERSION%
echo ✓ npm version: %NPM_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ✓ Dependencies installed
echo.

REM Create .env.local if it doesn't exist
if not exist ".env.local" (
    echo 📝 Creating .env.local from .env.example...
    copy .env.example .env.local
    echo ✓ Created .env.local (review and update as needed)
    echo.
)

echo ✅ Setup complete!
echo.
echo Next steps:
echo   1. npm run dev       - Start development server
echo   2. Open http://localhost:3000 in your browser
echo.
echo For more information, see DEVELOPMENT.md
echo.
echo The Swift Provider awaits... ◆
echo.
pause
