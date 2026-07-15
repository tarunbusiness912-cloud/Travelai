import { supabase } from "../lib/supabase";

// Add Expense
export const addExpense = async (expense) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return await supabase.from("expenses").insert([
    {
      ...expense,
      user_id: user.id,
    },
  ]);
};

// Get All Expenses
export const getExpenses = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return await supabase
    .from("expenses")
    .select(`
      *,
      trips (
        title
      )
    `)
    .eq("user_id", user.id)
    .order("expense_date", {
      ascending: false,
    });
};

// Get Expense
export const getExpense = async (id) => {
  return await supabase
    .from("expenses")
    .select("*")
    .eq("id", id)
    .single();
};

// Update
export const updateExpense = async (
  id,
  expense
) => {
  return await supabase
    .from("expenses")
    .update(expense)
    .eq("id", id);
};

// Delete
export const deleteExpense = async (id) => {
  return await supabase
    .from("expenses")
    .delete()
    .eq("id", id);
};

// Total Expense
export const getTotalExpense = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("expenses")
    .select("amount")
    .eq("user_id", user.id);

  const total =
    data?.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    ) || 0;

  return total;
};