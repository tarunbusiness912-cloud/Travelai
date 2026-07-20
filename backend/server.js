const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express(); // 1. Create the app first
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
].filter(Boolean);

// 2. Middleware
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json());

// 3. Routes
app.use('/api/auth', require('./routes/auth')); // 👈 Added this line to hook up registration and login!
app.use('/api/trips', require('./routes/tripRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/groups', require('./routes/groups'));
app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use('/api/budgets', require('./routes/budgetRoutes'));

// 4. Base Route
app.get('/', (req, res) => {
  res.send('TravelAI Backend is up and running with Supabase!');
});

// 5. Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
