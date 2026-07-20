const supabase = require('../config/supabase');

exports.getExpensesByTrip = async (req, res) => {
  try {
    const db = req.supabase || supabase;
    const tripId = req.params.tripId || req.query.tripId;

    if (!tripId) {
      return res.status(400).json({ message: 'tripId is required' });
    }

    const { data, error } = await db
      .from('expenses')
      .select('*')
      .eq('trip_id', tripId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error: error.message });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const db = req.supabase || supabase;
    const { tripId, title, amount, splitBetween } = req.body;
    const paidBy = req.body.paidBy || req.body.paid_by;
    const category = req.body.category || 'Others';

    if (!tripId || !title || !amount || !paidBy) {
      return res.status(400).json({ message: 'Trip, title, amount, and payer are required' });
    }

    const { data: expenseData, error: expenseError } = await db
      .from('expenses')
      .insert([{ trip_id: tripId, title, amount: parseFloat(amount), paid_by: paidBy, category }])
      .select();

    if (expenseError) throw expenseError;

    const expenseId = expenseData[0].id;

    if (splitBetween && splitBetween.length > 0) {
      const splitRecords = splitBetween.map(member => ({
        expense_id: expenseId,
        user_id: member.userId,
        amount_owed: parseFloat(member.amountOwed),
        is_paid: false
      }));

      const { error: splitError } = await db
        .from('expense_splits')
        .insert(splitRecords);

      if (splitError) throw splitError;
    }

    res.status(201).json({ message: 'Saved!', expense: expenseData[0] });
  } catch (error) {
    res.status(400).json({ message: 'Error saving', error: error.message });
  }
};
