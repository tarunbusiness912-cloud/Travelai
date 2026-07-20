// C:\PROJECTS\Travelai\backend\config\supabase.js
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

// Dynamically point to the backend/.env file relative to this file's location
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Fail gracefully with a clear log if variables are missing
if (!supabaseUrl || !supabaseKey) {
  console.error("❌ CRITICAL ERROR: SUPABASE_URL or SUPABASE_ANON_KEY is missing!");
  console.error("Current Directory:", __dirname);
  process.exit(1);
}

// Instantiate the Supabase Client
const supabase = createClient(supabaseUrl, supabaseKey);

supabase.forRequest = (req) => createClient(supabaseUrl, supabaseKey, {
  global: {
    headers: {
      Authorization: req.headers.authorization || '',
    },
  },
});

module.exports = supabase;
