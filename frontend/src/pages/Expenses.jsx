import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ExpenseCard from "../components/ExpenseCard";

import {
  getExpenses,
  deleteExpense,
  getTotalExpense,
} from "../services/expenseService";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const { data, error } = await getExpenses();

    if (!error) {
      setExpenses(data || []);
    }

    const totalAmount = await getTotalExpense();
    setTotal(totalAmount);

    setLoading(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this expense?"
    );

    if (!confirmDelete) return;

    const { error } = await deleteExpense(id);

    if (error) {
      alert(error.message);
      return;
    }

    loadExpenses();
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Expense Tracker
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all your trip expenses
          </p>

        </div>

        <Link
          to="/add-expense"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          + Add Expense
        </Link>

      </div>

      <div className="bg-green-100 rounded-2xl p-6 mb-8">

        <h2 className="text-lg font-semibold">
          Total Expenses
        </h2>

        <p className="text-5xl font-bold mt-3 text-green-700">
          ₹{total}
        </p>

      </div>

      {expenses.length === 0 ? (

        <div className="text-center mt-20">

          <h2 className="text-2xl font-bold">
            No Expenses Found
          </h2>

          <p className="text-gray-500 mt-2">
            Add your first expense.
          </p>
          <Link
             to="/expenses"
            className="block py-2 px-4 hover:bg-gray-100 rounded"
          >
              💰 Expenses

           </Link>

        </div>



      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {expenses.map((expense) => (

            <ExpenseCard
              key={expense.id}
              expense={expense}
              onDelete={handleDelete}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default Expenses;