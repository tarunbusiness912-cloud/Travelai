const express = require('express');
const supabase = require('../config/supabase');

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return res.status(404).json({ error: 'Profile not found' });
      throw error;
    }

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Unable to load profile' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const payload = {
      id: req.params.id,
      full_name: req.body.fullName || req.body.full_name || null,
      preferences: req.body.preferences || null,
      home_location: req.body.homeLocation || req.body.home_location || null,
      phone: req.body.phone || null,
      country: req.body.country || null,
      bio: req.body.bio || null,
      avatar_url: req.body.avatarUrl || req.body.avatar_url || null,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('profiles')
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Unable to update profile' });
  }
});

module.exports = router;
