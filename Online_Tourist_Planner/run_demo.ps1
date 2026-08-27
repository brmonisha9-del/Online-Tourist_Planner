# WanderLust Tourist Planner - PowerShell Demo Runner
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Starting WanderLust Online Tourist Planner Demo...  " -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

$frontendPath = Join-Path $PSScriptRoot "frontend"
Set-Location $frontendPath

if (-not (Test-Path "node_modules")) {
    Write-Host "[1/2] Installing dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host "[2/2] Launching Vite development server (will open http://localhost:3000)..." -ForegroundColor Green
npm run dev
