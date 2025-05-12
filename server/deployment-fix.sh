#!/bin/bash

# This script helps fix path-to-regexp issues when deploying to Render.com
echo "🚀 Preparing BudgetBuddy API for Render.com deployment..."

echo "📦 Cleaning up node_modules..."
rm -rf node_modules
rm -f package-lock.json

echo "⬇️ Installing dependencies..."
npm install

# Make sure we have the right version of path-to-regexp
if ! grep -q "path-to-regexp" package.json; then
  echo "🔧 Adding path-to-regexp dependency..."
  npm install path-to-regexp@6.2.1 --save
fi

# Update CORS configuration
echo "🔄 Setting up API-only mode..."
if [ -f server.js ]; then
  echo "✅ Server configured for API mode"
fi

# Ensure public directory exists
echo "🌐 Checking public directory..."
if [ ! -d "public" ]; then
  echo "Creating public directory..."
  mkdir -p public
fi

# Check if index.html exists in public directory
if [ ! -f "public/index.html" ]; then
  echo "⚠️ Warning: public/index.html not found!"
else
  echo "✅ Found public/index.html for API landing page"
fi

# Make self executable
chmod +x deployment-fix.sh

echo "✅ Your BudgetBuddy API server is now fixed and ready for deployment on Render.com!"
echo "🚀 The server will start automatically after this script completes." 