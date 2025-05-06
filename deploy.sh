#!/bin/bash

# GitHub Pages deployment script for priyanshutech.xyz

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting GitHub Pages deployment script for priyanshutech.xyz${NC}"

# Check if git is installed
if ! [ -x "$(command -v git)" ]; then
  echo -e "${RED}Error: git is not installed.${NC}" >&2
  exit 1
fi

# Make sure we're in the project directory
PROJECT_DIR="$(pwd)"
echo -e "${GREEN}Working in directory: ${PROJECT_DIR}${NC}"

# Clean the dist directory if it exists
if [ -d "dist" ]; then
  echo -e "${YELLOW}Cleaning existing dist directory...${NC}"
  rm -rf dist
fi

# Build the project
echo -e "${BLUE}Building project...${NC}"
npm run build

if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed! Please fix the errors and try again.${NC}"
  exit 1
fi

# Ensure CNAME file is present
echo -e "${GREEN}Creating CNAME file...${NC}"
echo "priyanshutech.xyz" > dist/CNAME

# Initialize git repo in dist directory
echo -e "${BLUE}Initializing git repository in dist directory...${NC}"
cd dist
git init
git add .
git commit -m "Deploy to GitHub Pages"

# Push to GitHub Pages
echo -e "${YELLOW}Pushing to GitHub Pages repository...${NC}"
git remote add origin https://github.com/priyanshuchawda/priyanshuchawda.github.io.git
git push -f origin main

echo -e "${GREEN}Deployment completed!${NC}"
echo -e "${BLUE}Your website should be live at https://priyanshutech.xyz in a few minutes.${NC}"
echo -e "${YELLOW}Note: You may need to configure DNS settings for your custom domain.${NC}"
