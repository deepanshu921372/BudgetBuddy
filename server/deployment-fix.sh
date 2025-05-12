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

echo "✅ Your BudgetBuddy server is now fixed and ready for deployment on Render.com!"
echo "🚀 The server will start automatically after this script completes." 