# Setup GitHub Pages Repository PowerShell Script

Write-Host "Setting up your GitHub Pages repository..." -ForegroundColor Blue

# Initialize git if not already initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Green
    git init
}

# Create a .gitignore file if not exists
if (-not (Test-Path ".gitignore")) {
    Write-Host "Creating .gitignore file..." -ForegroundColor Green
    @"
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
"@ | Out-File -FilePath ".gitignore" -Encoding utf8
}

# Add all files to git
Write-Host "Adding files to git..." -ForegroundColor Green
git add .

# Create initial commit
Write-Host "Creating initial commit..." -ForegroundColor Green
git commit -m "Initial commit"

# Create the source branch
Write-Host "Creating source branch..." -ForegroundColor Green
git branch -M source

# Add the GitHub remote
Write-Host "Adding GitHub remote..." -ForegroundColor Green
git remote add origin https://github.com/priyanshuchawda/priyanshuchawda.github.io.git

# Push to the source branch
Write-Host "Pushing to the source branch..." -ForegroundColor Green
git push -u origin source

# Build the project
Write-Host "Building the project..." -ForegroundColor Green
npm run build

# Deploy using gh-pages
Write-Host "Deploying to GitHub Pages..." -ForegroundColor Green
npm run deploy

Write-Host "Setup complete! Your site is now being deployed to GitHub Pages." -ForegroundColor Blue
Write-Host "After deployment, your site will be available at: https://priyanshuchawda.github.io/" -ForegroundColor Blue
Write-Host "When your custom domain is set up, it will be available at: https://priyanshutech.xyz/" -ForegroundColor Blue
