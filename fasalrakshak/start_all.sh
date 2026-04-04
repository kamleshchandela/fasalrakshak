#!/bin/bash
echo "=============================================="
echo "==== Starting FasalRakshak Environment ======="
echo "=============================================="

# Navigate to the script's directory
cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing root dependencies..."
    npm install
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm run install-all
fi

echo "Starting Backend and Frontend via Concurrently..."
echo "Note: If there are ML services to start, they can be added here later."
npm run dev
