import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTrips } from "../services/tripService";
import { addExpense } from "../services/expenseService";

function AddExpense() {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const [trips, setTrips] = useState([]);

  const [form, setForm] = useState({
    trip_id: tripId || "",
    title: "",
    category: "Food",
    amount: "",
    payment_method: "Cash",
    expense_date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    const { data } = await getTrips();

    if (data) {
      setTrips(data);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await addExpense(form);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Expense Added Successfully");

    navigate("/expenses");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold mb-8">
          Add Expense
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <select
            name="trip_id"
            value={form.trip_id}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
            required
          >
            <option value="">
              Select Trip
            </option>

            {trips.map((trip) => (
              <option
                key={trip.id}
                value={trip.id}
              >
                {trip.title}
              </option>
            ))}

          </select>

          <input
            name="title"
            placeholder="Expense Title"
            className="w-full border p-3 rounded-xl"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            className="w-full border p-3 rounded-xl"
            value={form.amount}
            onChange={handleChange}
            required
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
            className="w-full border p-3 rounded-xl"
            value={form.expense_date}
            onChange={handleChange}
          />

          <textarea
            rows="4"
            name="notes"
            placeholder="Notes"
            className="w-full border p-3 rounded-xl"
            value={form.notes}
            onChange={handleChange}
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
          >
            Add Expense
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddExpense;