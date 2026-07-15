import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getExpenses } from "../services/expenseService";

function RecentExpenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const { data, error } = await getExpenses();

    if (!error && data) {
      setExpenses(data.slice(0, 5));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Recent Expenses
        </h2>

        <Link
          to="/expenses"
          className="text-blue-600 font-semibold"
        >
          View All
        </Link>

      </div>

      {expenses.length === 0 ? (
        <p className="text-gray-500">
          No expenses found
        </p>
      ) : (
        <div className="space-y-4">

          {expenses.map((expense) => (

            <div
              key={expense.id}
              className="flex justify-between items-center border rounded-xl p-4"
            >

              <div>

                <h3 className="font-semibold">
                  {expense.title}
                </h3>

                <p className="text-gray-500 text-sm">
                  {expense.category}
                </p>

              </div>

              <div className="font-bold text-red-600">
                ₹{expense.amount}
              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default RecentExpenses;