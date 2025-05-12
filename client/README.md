# BudgetBuddy Client

Frontend React application for BudgetBuddy personal finance tracker.

## Deployment on Netlify

### Quick Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/deepanshu921372/BudgetBuddy)

### Manual Deployment Steps

1. Push your code to GitHub
2. Log in to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Select your repository
5. Configure the build settings:
   - Branch to deploy: `main` (or your preferred branch)
   - Base directory: `client` (important!)
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Environment Variables

Set these environment variables in the Netlify dashboard:

- `VITE_API_URL`: URL of your backend API (e.g., `https://budgetbuddy-lgty.onrender.com`)

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Backend API

This is the frontend client for BudgetBuddy. The backend API should be deployed separately (e.g., on Render.com).

- API Repository: Same repository, in the `server` directory
- API URL: [https://budgetbuddy-lgty.onrender.com](https://budgetbuddy-lgty.onrender.com)

## Features

- User authentication (login/signup)
- Budget tracking and management
- Expense and income tracking
- Categorized spending reports
- Interactive dashboards and analytics
