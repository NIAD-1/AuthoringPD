#!/bin/bash

# Move to the script's directory
cd "$(dirname "$0")" || exit 1

echo "========================================================"
echo "   STARTING SELF-AUTHORING SUITE & WALL CARD STUDIO     "
echo "   100% Offline • LocalDB Storage • Privacy First       "
echo "========================================================"

# Check if port 3000 is running
if lsof -i :3000 >/dev/null 2>&1; then
    echo "✓ App is already running on http://localhost:3000"
else
    echo "Starting local offline server..."
    npm run dev -- --host > /dev/null 2>&1 &
    sleep 2
fi

echo "Opening http://localhost:3000 in your browser..."
open "http://localhost:3000"

sleep 2
exit 0
