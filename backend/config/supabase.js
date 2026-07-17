const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ WARNING: SUPABASE_URL or SUPABASE_ANON_KEY is missing in your .env configuration!");
}

// Instantiate the Supabase Client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;