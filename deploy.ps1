# GitHub Pages deployment script for priyanshutech.xyz

Write-Host "Starting GitHub Pages deployment script for priyanshutech.xyz" -ForegroundColor Blue

# Check if git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Error: git is not installed." -ForegroundColor Red
    exit 1
}

# Make sure we're in the project directory
$PROJECT_DIR = Get-Location
Write-Host "Working in directory: $PROJECT_DIR" -ForegroundColor Green

# Clean the dist directory if it exists
if (Test-Path "dist") {
    Write-Host "Cleaning existing dist directory..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force dist
}

# Build the project
Write-Host "Building project..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Please fix the errors and try again." -ForegroundColor Red
    exit 1
}

# Ensure CNAME file is present
Write-Host "Creating CNAME file..." -ForegroundColor Green
Set-Content -Path "dist/CNAME" -Value "priyanshutech.xyz"

# Initialize git repo in dist directory
Write-Host "Initializing git repository in dist directory..." -ForegroundColor Blue
Set-Location dist
git init
git add .
git commit -m "Deploy to GitHub Pages"

# Push to GitHub Pages
Write-Host "Pushing to GitHub Pages repository..." -ForegroundColor Yellow
git remote add origin https://github.com/priyanshuchawda/priyanshuchawda.github.io.git
git push -f origin main

Write-Host "Deployment completed!" -ForegroundColor Green
Write-Host "Your website should be live at https://priyanshutech.xyz in a few minutes." -ForegroundColor Blue
Write-Host "Note: You may need to configure DNS settings for your custom domain." -ForegroundColor Yellow
