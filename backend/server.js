const express = require('express');
const cors = require('cors');
const supabase = require('./config/supabase');
require('dotenv').config();

const app = express(); // 1. Create the app first
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  'http://localhost:5173',
  'https://travelai-navy.vercel.app',
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
].filter(Boolean);

// 2. Middleware
app.use(cors({
  origin(origin, callback) {
    const isVercelPreview = origin && /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);

    if (!origin || allowedOrigins.includes(origin) || isVercelPreview) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json());
app.use(async (req, _res, next) => {
  req.supabase = supabase.forRequest(req);

  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (token) {
    const { data } = await supabase.auth.getUser(token);
    req.authUser = data?.user || null;
  }

  next();
});

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
