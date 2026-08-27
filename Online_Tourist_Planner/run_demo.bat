@echo off
title WanderLust Tourist Planner - Demo Launcher
echo ========================================================
echo   Starting WanderLust Online Tourist Planner Demo...
echo ========================================================
echo.

cd /d "%~dp0frontend"

if not exist "node_modules" (
    echo [1/2] Installing dependencies for the first time...
    call npm install
)

echo [2/2] Launching Development Server on http://localhost:3000 ...
call npm run dev

pause
