# Set up GitHub Pages Repository

# This script will help set up your project for GitHub Pages username.github.io deployment
# It will create a proper branch structure with source and main branches

# Colors for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up your GitHub Pages repository...${NC}"

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
  echo -e "${GREEN}Initializing git repository...${NC}"
  git init
fi

# Create a .gitignore file if not exists
if [ ! -f ".gitignore" ]; then
  echo -e "${GREEN}Creating .gitignore file...${NC}"
  cat > .gitignore << EOL
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
EOL
fi

# Add all files to git
echo -e "${GREEN}Adding files to git...${NC}"
git add .

# Create initial commit
echo -e "${GREEN}Creating initial commit...${NC}"
git commit -m "Initial commit"

# Create the source branch
echo -e "${GREEN}Creating source branch...${NC}"
git branch -M source

# Add the GitHub remote
echo -e "${GREEN}Adding GitHub remote...${NC}"
git remote add origin https://github.com/priyanshuchawda/priyanshuchawda.github.io.git

# Push to the source branch
echo -e "${GREEN}Pushing to the source branch...${NC}"
git push -u origin source

# Build the project
echo -e "${GREEN}Building the project...${NC}"
npm run build

# Deploy using gh-pages
echo -e "${GREEN}Deploying to GitHub Pages...${NC}"
npm run deploy

echo -e "${BLUE}Setup complete! Your site is now being deployed to GitHub Pages.${NC}"
echo -e "${BLUE}After deployment, your site will be available at: https://priyanshuchawda.github.io/${NC}"
echo -e "${BLUE}When your custom domain is set up, it will be available at: https://priyanshutech.xyz/${NC}"
