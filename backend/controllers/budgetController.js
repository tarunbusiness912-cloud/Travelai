const supabase = require('../config/supabase');

// @desc    Get trip budget allocations and actuals
// @route   GET /api/budgets/:tripId
exports.getTripBudget = async (req, res) => {
  try {
    const { tripId } = req.params;

    // Fetch budget items
    const { data, error } = await supabase
      .from('budget_planners')
      .select('*')
      .eq('trip_id', tripId);

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving budget details', error: error.message });
  }
};

// @desc    Upsert budget category limit
// @route   POST /api/budgets
exports.saveBudgetLimit = async (req, res) => {
  try {
    const { tripId, category, limitAmount } = req.body;

    const { data, error } = await supabase
      .from('budget_planners')
      .upsert({
        trip_id: tripId,
        category,
        limit_amount: parseFloat(limitAmount),
        updated_at: new Date()
      }, { onConflict: ['trip_id', 'category'] })
      .select();

    if (error) throw error;
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(400).json({ message: 'Error configuring budget limit', error: error.message });
  }
};