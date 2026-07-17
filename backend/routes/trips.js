const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// 1. Fetch all saved trips
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Map database snake_case fields to your React application format
    const formattedTrips = data.map(trip => ({
      id: trip.id,
      destination: trip.destination,
      startDate: trip.start_date,
      endDate: trip.end_date,
      budget: trip.budget,
      aiGenerated: trip.ai_generated,
      aiPrompt: trip.ai_prompt
    }));

    res.json(formattedTrips);
  } catch (error) {
    console.error('Supabase query error:', error.message);
    res.status(500).json({ error: 'Failed to retrieve journeys from Supabase' });
  }
});

// 2. Fetch single trip by ID
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Journey workspace not found' });
      }
      throw error;
    }

    res.json({
      id: data.id,
      destination: data.destination,
      startDate: data.start_date,
      endDate: data.end_date,
      budget: data.budget,
      aiGenerated: data.ai_generated,
      aiPrompt: data.ai_prompt
    });
  } catch (error) {
    console.error('Supabase fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch journey details' });
  }
});

// 3. Register a new journey
router.post('/', async (req, res) => {
  try {
    const { destination, startDate, endDate, budget, aiGenerated, aiPrompt } = req.body;
    
    const { data, error } = await supabase
      .from('trips')
      .insert([
        {
          destination,
          start_date: startDate,
          end_date: endDate,
          budget: parseFloat(budget) || 0,
          ai_generated: aiGenerated || false,
          ai_prompt: aiPrompt || null
        }
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Supabase insert error:', error.message);
    res.status(400).json({ error: 'Failed to save trip entry to Supabase' });
  }
});

module.exports = router;