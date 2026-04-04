@echo off
echo ==============================================
echo ==== Start FasalRakshak Local AI Engine ====
echo ==============================================

cd /d "%~dp0"

echo Starting AI Server on Port 8080 using FasalRakshak Python environment...
"C:\Users\dhvan\AppData\Local\Programs\Python\Python311\python.exe" main.py
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to start Python AI Server.
)
pause
