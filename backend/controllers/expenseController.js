const supabase = require('../config/supabase');

exports.getExpensesByTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { data, error } = await supabase
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
    const { tripId, title, amount, paidBy, splitBetween } = req.body;

    const { data: expenseData, error: expenseError } = await supabase
      .from('expenses')
      .insert([{ trip_id: tripId, title, amount: parseFloat(amount), paid_by: paidBy }])
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

      const { error: splitError } = await supabase
        .from('expense_splits')
        .insert(splitRecords);

      if (splitError) throw splitError;
    }

    res.status(201).json({ message: 'Saved!', expense: expenseData[0] });
  } catch (error) {
    res.status(400).json({ message: 'Error saving', error: error.message });
  }
};