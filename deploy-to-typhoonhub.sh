#!/bin/bash
# 🚀 TyphoonHub Deployment Script
# This script builds and prepares your site for deployment

set -e  # Exit on error

echo "🎬 TyphoonHub Deployment Script"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found!${NC}"
    echo "Please run this script from the project root directory."
    exit 1
fi

echo -e "${BLUE}📦 Step 1: Installing dependencies...${NC}"
npm install

echo ""
echo -e "${BLUE}🔨 Step 2: Building production site...${NC}"
npm run build

echo ""
echo -e "${GREEN}✅ Build completed successfully!${NC}"
echo ""
echo "📂 Your static site is ready in the 'out' folder"
echo ""
echo "🚀 Next Steps:"
echo "─────────────"
echo ""
echo "Option 1 - Firebase Hosting (Recommended):"
echo "  1. Install Firebase CLI: npm install -g firebase-tools"
echo "  2. Login: firebase login"
echo "  3. Deploy: firebase deploy --only hosting"
echo ""
echo "Option 2 - Vercel:"
echo "  1. Install Vercel CLI: npm install -g vercel"
echo "  2. Deploy: vercel --prod"
echo ""
echo "Option 3 - GitHub Actions:"
echo "  1. Go to: https://github.com/Selorm4321/typhoonhub/actions"
echo "  2. Click 'Run workflow'"
echo "  3. Select branch and deploy"
echo ""
echo "Option 4 - Manual Upload:"
echo "  Upload the 'out' folder contents to your hosting provider"
echo ""
echo -e "${GREEN}🎉 Ready to deploy to typhoonhub.ca!${NC}"
