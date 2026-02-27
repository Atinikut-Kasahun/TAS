@echo off
setlocal
echo ====================================================
echo   🏢 TAS AUTOMATED OFFICE SETUP (Windows 11)
echo ====================================================
echo.

:: 1. Check for Laragon
if not exist "C:\laragon\bin\php\php-8.3.30-Win32-vs16-x64\php.exe" (
    echo [ERROR] Laragon PHP 8.3 not found at C:\laragon.
    echo Please install Laragon Full first: https://laragon.org/download
    pause
    exit /b
)

:: 2. Set Paths
set PHP="C:\laragon\bin\php\php-8.3.30-Win32-vs16-x64\php.exe"
set COMPOSER="C:\laragon\bin\composer\composer.phar"

echo [1/5] Installing Backend Packages...
cd backend
%PHP% %COMPOSER% install --no-interaction

echo [2/5] Configuring Environment...
if not exist .env copy .env.example .env
%PHP% artisan key:generate

echo [3/5] Setting up SQLite Database...
:: Create empty file if not exists
if not exist database\database.sqlite type nul > database\database.sqlite
%PHP% artisan migrate:fresh --seed --force

echo [4/5] Installing Frontend Dependencies...
cd ..
call npm install

echo.
echo ====================================================
echo   ✅ SETUP COMPLETE!
echo ====================================================
echo.
echo To start the system, open two terminals and run:
echo.
echo Window 1: cd backend ; %PHP% artisan serve --port=8001
echo Window 2: npm run dev
echo.
echo Then go to: http://localhost:3000
echo.
pause
