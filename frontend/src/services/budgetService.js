import { supabase } from '../lib/supabase';

const budgetService = {
  // Fetch limits alongside calculated real-time aggregated expenses
  getBudgetProgress: async (groupId = null) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Authentication required');

    let query = supabase.from('budgets').select('*');
    if (groupId) {
      query = query.eq('group_id', groupId);
    } else {
      query = query.eq('user_id', user.id);
    }

    const { data: budgets, error: budgetError } = await query;
    if (budgetError) throw budgetError;

    // Fetch matching calculated actual spend values to pair up progress percentages
    let expenseQuery = supabase.from(groupId ? 'group_expenses' : 'expenses').select('*');
    if (groupId) {
      expenseQuery = expenseQuery.eq('group_id', groupId);
    } else {
      expenseQuery = expenseQuery.eq('user_id', user.id);
    }

    const { data: expenses, error: expError } = await expenseQuery;
    if (expError) throw expError;

    // Aggregate values dynamically per category
    return budgets.map(budget => {
      const actualSpend = expenses
        .filter(e => e.category?.toLowerCase() === budget.category?.toLowerCase() || 
                     (groupId && budget.category === 'Group Total')) 
        .reduce((sum, current) => sum + parseFloat(current.amount), 0);

      return {
        ...budget,
        actual_spend: actualSpend,
        progress_percentage: Math.min((actualSpend / budget.amount_limit) * 100, 100).toFixed(1)
      };
    });
  },

  // Create a budget configuration category
  createBudget: async (budgetData) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Authentication required');

    const payload = {
      category: budgetData.category,
      amount_limit: parseFloat(budgetData.amount_limit)
    };

    if (budgetData.group_id) {
      payload.group_id = budgetData.group_id;
    } else {
      payload.user_id = user.id;
    }

    const { data, error } = await supabase
      .from('budgets')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

export default budgetService;