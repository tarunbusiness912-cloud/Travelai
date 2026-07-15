import { Link } from "react-router-dom";

function ExpenseCard({
  expense,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex justify-between">

        <div>

          <h2 className="text-xl font-bold">
            {expense.title}
          </h2>

          <p className="text-gray-500">
            {expense.category}
          </p>

        </div>

        <div className="text-right">

          <p className="text-2xl font-bold text-green-600">
            ₹{expense.amount}
          </p>

          <p className="text-sm text-gray-500">
            {expense.expense_date}
          </p>

        </div>

      </div>

      <div className="mt-4">

        <p className="text-gray-600">
          {expense.notes}
        </p>

      </div>

      <div className="flex gap-3 mt-6">

        <Link
          to={`/edit-expense/${expense.id}`}
          className="bg-yellow-500 text-white px-5 py-2 rounded-lg"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(expense.id)}
          className="bg-red-600 text-white px-5 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default ExpenseCard;