#!/bin/bash
# 🚀 Deploy TyphoonHub to Vercel
# This will deploy your site and connect it to typhoonhub.ca

set -e  # Exit on error

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════════╗"
echo "║   TyphoonHub → Vercel Deployment      ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
    echo -e "${GREEN}✅ Vercel CLI installed!${NC}"
    echo ""
fi

# Check if we're in the right directory
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

echo -e "${YELLOW}📤 Step 3: Deploying to Vercel...${NC}"
echo ""
echo "Please follow the Vercel CLI prompts:"
echo "  • Set up and deploy: Y"
echo "  • Scope: Select your account"
echo "  • Link to existing project: N (first time) or Y (subsequent deploys)"
echo "  • Project name: typhoonhub"
echo "  • Directory: ./"
echo "  • Build command: npm run build"
echo "  • Output directory: out"
echo "  • Development command: npm run dev"
echo ""
read -p "Press Enter to continue with deployment..."
echo ""

vercel --prod

echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║         Deployment Complete!           ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}🎯 Next Steps:${NC}"
echo "─────────────────────────────────────────"
echo ""
echo "1. Add your custom domain in Vercel:"
echo "   • Go to your project in Vercel Dashboard"
echo "   • Settings → Domains"
echo "   • Add: typhoonhub.ca"
echo "   • Add: www.typhoonhub.ca"
echo ""
echo "2. Update DNS in Squarespace:"
echo "   • Go to: Settings → Domains → DNS Settings"
echo "   • Update A record:"
echo "     Type: A"
echo "     Host: @"
echo "     Value: 76.76.21.21"
echo ""
echo "   • Your www CNAME is already correct!"
echo "     (www → eq31feedc46dd489f.vercel-dns.com)"
echo ""
echo "3. Wait 24-48 hours for DNS propagation"
echo ""
echo -e "${GREEN}✨ Your TyphoonHub will be live at https://typhoonhub.ca!${NC}"
echo ""
