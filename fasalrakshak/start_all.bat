@echo off
echo ==============================================
echo ==== Starting FasalRakshak Environment =======
echo ==============================================

cd /d "%~dp0"

:: Check if node_modules exists, if not run npm install-all
if not exist "node_modules\" (
    echo Installing root dependencies...
    call npm install
)

if not exist "frontend\node_modules\" (
    echo Installing frontend dependencies...
    call npm run install-all
)

echo Starting Backend and Frontend via Concurrently...
echo Note: If there are ML services to start, they can be added here later.
call npm run dev
