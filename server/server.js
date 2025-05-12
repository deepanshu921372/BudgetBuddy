const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { cors } = require('./middleware/cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/api/users');
const transactionRoutes = require('./routes/api/transactions');
const categoryRoutes = require('./routes/api/categories');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: false // Disabled for simplicity in development
}));
app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint for Render.com
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'BudgetBuddy API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories', categoryRoutes);

// Root API endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'BudgetBuddy API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      transactions: '/api/transactions',
      categories: '/api/categories',
      health: '/api/health'
    }
  });
});

app.post('/api/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Log to help with debugging
  console.log('Received email request:', { name, email, subject });
  
  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: 'budgettbuddy@gmail.com',
    subject: `New Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1));
});