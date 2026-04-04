@echo off
echo ==============================================
echo ==== FasalRakshak AI Service Setup      ====
echo ==============================================

cd /d "%~dp0"

:: Check for existing venv
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing Requirements... (This might take a while for TensorFlow)
pip install -r requirements.txt

echo ✅ AI Service dependencies installed.
echo To start: python main.py
pause
