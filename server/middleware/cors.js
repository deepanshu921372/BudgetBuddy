const cors = require('cors');

// List of allowed origins
const allowedOrigins = [
  // Local development
  'http://localhost:5173',
  'http://localhost:5174',
  // Production
  'https://budgetbuddy-lgty.onrender.com',
  'https://budgetbuddy-client.vercel.app',
  'https://budgetbuddy.vercel.app'
];

// CORS options with proper origin handling
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS: ', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = {
  cors: cors(corsOptions),
  corsOptions
}; 