
const express = require('express');
const app = express();
require('dotenv').config();

const userRoutes = require('./Routes/user.routes.js');
const expenseRoutes = require('./Routes/expense.routes.js');
const BudgetRoutes = require('./Routes/budget.routes.js');
const connectDB = require('./lib/connectDB.js');
const cors = require('cors');

const corsOptions = {
  origin: "https://expense-ease-frontend-five.vercel.app",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// API routes
app.use('/api', userRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/budget', BudgetRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to ExpenseEase API');
});

module.exports = app;
