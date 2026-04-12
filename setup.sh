#!/usr/bin/env bash

# Smart Attendance Bunk Planner - Setup Script
# This script sets up the project on any machine

echo "=========================================="
echo "Smart Attendance Bunk Planner"
echo "DSA Project - Setup Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please download from: https://nodejs.org"
    echo "Install Node.js and try again."
    exit 1
fi

echo "✅ Node.js found: $(node -v)"
echo "✅ npm found: $(npm -v)"
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

echo "✅ Project structure verified"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo "This may take a few minutes..."
echo ""

npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed!"
    echo "Try: npm install --legacy-peer-deps"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

echo "=========================================="
echo "Setup Complete! 🎉"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Run development server:"
echo "   npm start"
echo ""
echo "2. Visit in browser:"
echo "   http://localhost:3000"
echo ""
echo "3. Read documentation:"
echo "   - QUICK_START.md (5 min read)"
echo "   - README.md (detailed guide)"
echo "   - VIVA_PREPARATION.md (interview prep)"
echo ""
echo "4. When ready to deploy:"
echo "   - Read DEPLOYMENT_GUIDE.md"
echo "   - Push to GitHub"
echo "   - Deploy to Vercel"
echo ""
echo "Good luck! 🚀"
echo "=========================================="
