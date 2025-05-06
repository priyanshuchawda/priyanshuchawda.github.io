# PowerShell script to deploy to GitHub Pages
# This script handles the complete GitHub Pages setup and deployment process

# Set error action preference to stop on error
$ErrorActionPreference = "Stop"

Write-Host "Starting GitHub Pages deployment for priyanshutech.xyz" -ForegroundColor Blue

# Step 1: Clean and build the project
Write-Host "Step 1: Building the project..." -ForegroundColor Green

# Clean the dist directory if it exists
if (Test-Path "dist") {
    Write-Host "  Cleaning existing dist directory..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force dist
}

# Build the project
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Please fix the errors and try again." -ForegroundColor Red
    exit 1
}
Write-Host "  Build completed successfully" -ForegroundColor Green

# Step 2: Ensure CNAME file has correct domain
Write-Host "Step 2: Setting up CNAME file..." -ForegroundColor Green
$cnameContent = "priyanshutech.xyz`nwww.priyanshutech.xyz"
Set-Content -Path "dist/CNAME" -Value $cnameContent -NoNewline
Write-Host "  CNAME file created with domains: priyanshutech.xyz, www.priyanshutech.xyz" -ForegroundColor Green

# Step 3: Initialize git in the dist directory
Write-Host "Step 3: Setting up Git repository in the dist directory..." -ForegroundColor Green
Push-Location dist

# Initialize a new repository
git init
Write-Host "  Git repository initialized" -ForegroundColor Green

# Configure Git user (optional - use your information)
Write-Host "  Configuring Git user..." -ForegroundColor Yellow
$gitUser = Read-Host -Prompt "Enter your Git username (or press Enter to skip)"
$gitEmail = Read-Host -Prompt "Enter your Git email (or press Enter to skip)"

if ($gitUser) {
    git config user.name "$gitUser"
}
if ($gitEmail) {
    git config user.email "$gitEmail"
}

# Step 4: Add all files and commit
Write-Host "Step 4: Committing files..." -ForegroundColor Green
git add .
git commit -m "Deploy to GitHub Pages"
Write-Host "  Files committed to local repository" -ForegroundColor Green

# Step 5: Add remote repository and push
Write-Host "Step 5: Pushing to GitHub..." -ForegroundColor Green
$repoUrl = "https://github.com/priyanshuchawda/priyanshuchawda.github.io.git"

# Check if remote already exists
$remoteExists = git remote | Where-Object { $_ -eq "origin" }
if ($remoteExists) {
    Write-Host "  Remote 'origin' already exists. Removing it..." -ForegroundColor Yellow
    git remote remove origin
}

git remote add origin $repoUrl
Write-Host "  Remote 'origin' added: $repoUrl" -ForegroundColor Green

# Push to GitHub
Write-Host "  Pushing to GitHub Pages (main branch)..." -ForegroundColor Yellow
git push -f origin master:main
Write-Host "  Push completed" -ForegroundColor Green

# Return to the original directory
Pop-Location

Write-Host "Deployment completed!" -ForegroundColor Green
Write-Host "Your website should be live at https://priyanshutech.xyz in a few minutes." -ForegroundColor Blue
Write-Host @"

IMPORTANT NEXT STEPS:
1. In your GitHub repository settings, ensure GitHub Pages is enabled 
   (Settings > Pages > Source > set to "main" branch)
2. Verify your custom domain is configured correctly
   (Settings > Pages > Custom domain > "priyanshutech.xyz")
3. If this is the first deployment, set up your domain's DNS:
   - Add an A record pointing to GitHub Pages IPs:
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
   - Add a CNAME record from www to priyanshutech.xyz

"@ -ForegroundColor Yellow
