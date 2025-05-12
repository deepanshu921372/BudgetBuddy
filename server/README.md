# BudgetBuddy API Server

Backend API server for the BudgetBuddy personal finance application, optimized for deployment on Render.com.

## API-Only Mode

This server is configured in API-only mode, which means:
- It serves only the REST API endpoints, not the frontend
- The frontend should be deployed separately (e.g., on Vercel, Netlify)
- CORS is configured to allow requests from authorized origins

## Deployment on Render.com

### Quick Deploy

The easiest way to deploy is to use the **Deploy to Render** button below:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

### Manual Deployment Steps

1. Fork or clone this repository
2. Sign up for a [Render account](https://render.com)
3. Create a new **Web Service** on Render
4. Connect your GitHub repository
5. Use the following settings:
   - **Name**: budget-buddy-api (or your preferred name)
   - **Environment**: Node
   - **Build Command**: `chmod +x deployment-fix.sh && ./deployment-fix.sh`
   - **Start Command**: `node server.js`
   - **Plan**: Free

### Environment Variables

Set these environment variables in the Render dashboard:

- `NODE_ENV`: `production`
- `PORT`: `10000` (Render will automatically use its assigned port)
- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key
- `JWT_EXPIRE`: `30d` (or your preferred token expiration)
- `CLIENT_URL`: URL where your frontend is deployed (e.g., `https://budgetbuddy.vercel.app`)

### Health Checks

The API includes a health check endpoint at `/api/health` which Render uses to monitor the application's status.

## Local Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

## API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get current user

### Transaction Routes
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Add a transaction
- `DELETE /api/transactions/:id` - Delete a transaction
- `GET /api/transactions/analytics` - Get transaction analytics

### Category Routes
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Add a category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category 