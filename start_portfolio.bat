@echo off
title Portfolio Server - Gopichand Dandimeni
color 0A

echo.
echo ========================================
echo    PORTFOLIO WEBSITE SERVER
echo    Samsani Hema Sri Latha - HSL
echo ========================================
echo.

echo 🚀 Starting Portfolio Server...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed or not in PATH
    echo 📥 Please install Python from https://python.org
    pause
    exit /b 1
)

echo ✅ Python detected
echo 🌐 Starting HTTP Server...
echo.

REM Start the Python server
python server.py

pause