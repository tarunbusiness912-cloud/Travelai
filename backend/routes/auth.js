const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// 1. User Registration / Signup API
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All registration parameters are required.' });
  }

  try {
    // Register user using Supabase standard GoTrue authorization module
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name } // store additional user meta metadata inside raw_user_meta_data
      }
    });

    if (error) throw error;

    res.status(201).json({
      id: data.user.id,
      name: data.user.user_metadata.full_name,
      email: data.user.email,
      token: data.session?.access_token
    });
  } catch (err) {
    console.error('Supabase Registration Error:', err.message);
    res.status(400).json({ message: err.message });
  }
});

// 2. User Sign In / Login API
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email address and password inputs required.' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    res.json({
      id: data.user.id,
      name: data.user.user_metadata.full_name || 'Travel Companion',
      email: data.user.email,
      token: data.session.access_token
    });
  } catch (err) {
    console.error('Supabase Authentication Sign In Error:', err.message);
    res.status(401).json({ message: 'Invalid credentials or failed sign-in transaction.' });
  }
});

module.exports = router;