const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// 1. Fetch expenses (optionally filtered by tripId query param)
router.get('/', async (req, res) => {
  try {
    const { tripId } = req.query;
    let query = supabase.from('expenses').select('*');

    if (tripId) {
      query = query.eq('trip_id', tripId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;

    // Map columns dynamically back to frontend properties
    const formattedExpenses = data.map(expense => ({
      id: expense.id,
      tripId: expense.trip_id,
      title: expense.title,
      amount: expense.amount,
      paid_by: expense.paid_by,
      category: expense.category
    }));

    res.json(formattedExpenses);
  } catch (error) {
    console.error('Supabase expense query error:', error.message);
    res.status(500).json({ error: 'Failed to retrieve expenses' });
  }
});

// 2. Add a new expense
router.post('/', async (req, res) => {
  try {
    const { tripId, title, amount, paid_by, category } = req.body;

    const { data, error } = await supabase
      .from('expenses')
      .insert([
        {
          trip_id: tripId,
          title,
          amount: parseFloat(amount),
          paid_by,
          category
        }
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Supabase expense creation error:', error.message);
    res.status(400).json({ error: 'Failed to register expense' });
  }
});

module.exports = router;