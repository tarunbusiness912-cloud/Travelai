import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getExpense,
  updateExpense,
} from "../services/expenseService";

function EditExpense() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    payment_method: "",
    expense_date: "",
    notes: "",
  });

  useEffect(() => {
    loadExpense();
  }, []);

  const loadExpense = async () => {

    const { data, error } = await getExpense(id);

    if (error) {
      alert(error.message);
      return;
    }

    setForm(data);

  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const { error } = await updateExpense(id, {
      title: form.title,
      amount: form.amount,
      category: form.category,
      payment_method: form.payment_method,
      expense_date: form.expense_date,
      notes: form.notes,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Expense Updated Successfully");

    navigate("/expenses");

  };

  return (

    <div className="max-w-3xl mx-auto p-6">

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold mb-8">

          Edit Expense

        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Expense Title"
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full border p-3 rounded-xl"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          >

            <option>Food</option>
            <option>Hotel</option>
            <option>Transport</option>
            <option>Fuel</option>
            <option>Shopping</option>
            <option>Entertainment</option>
            <option>Medical</option>
            <option>Emergency</option>
            <option>Other</option>

          </select>

          <select
            name="payment_method"
            value={form.payment_method}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          >

            <option>Cash</option>
            <option>UPI</option>
            <option>Credit Card</option>
            <option>Debit Card</option>

          </select>

          <input
            type="date"
            name="expense_date"
            value={form.expense_date}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            rows="4"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="w-full border p-3 rounded-xl"
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
          >

            Update Expense

          </button>

        </form>

      </div>

    </div>

  );

}

export default EditExpense;