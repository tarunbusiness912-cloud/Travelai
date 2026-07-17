import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Receipt, 
  Tag, 
  User, 
  Loader2, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { addExpense, getTrips } from '../services/api';

export default function AddExpense() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedTripId = searchParams.get('tripId') || '';

  const [trips, setTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    tripId: preselectedTripId,
    title: '',
    amount: '',
    paid_by: '',
    category: 'Food'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTripsList = async () => {
      try {
        const response = await getTrips();
        setTrips(response.data || []);
      } catch (err) {
        console.error('Failed to load trips for dropdown:', err);
      } finally {
        setLoadingTrips(false);
      }
    };
    fetchTripsList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.tripId) newErrors.tripId = 'Please select an active trip';
    if (!formData.title.trim()) newErrors.title = 'Expense description is required';
    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than zero';
    }
    if (!formData.paid_by.trim()) newErrors.paid_by = 'Please specify who paid';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const payload = {
        tripId: formData.tripId,
        title: formData.title.trim(),
        amount: parseFloat(formData.amount),
        paid_by: formData.paid_by.trim(),
        category: formData.category
      };

      await addExpense(payload);
      setSuccess(true);
      
      // Navigate back to the corresponding trip workspace after a brief delay
      setTimeout(() => {
        navigate(`/trip/${formData.tripId}`);
      }, 1500);
    } catch (err) {
      console.error('Failed to save expense:', err);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to record expense. Please verify connection and try again.'
      }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 space-y-8 text-slate-900 font-sans">
      
      {/* Top Back Row */}
      <div className="flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Go Back
        </button>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Banner */}
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
            <Receipt className="h-3.5 w-3.5" /> Budget Tracking
          </span>
          <h1 className="text-3xl font-black tracking-tight text-slate-800">Record an Expense</h1>
          <p className="text-slate-500 text-sm font-medium">
            Log transportation, dining, lodging, or split bills instantly to maintain clean balance sheets.
          </p>
        </div>

        {/* Core Form Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
          
          {success && (
            <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-sm font-bold flex items-center gap-2 animate-fade-in">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              Expense saved successfully! Redirecting...
            </div>
          )}

          {errors.submit && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-sm font-semibold">
              {errors.submit}
            </div>
          )}

          {/* Associated Trip Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800">Assign to Trip</label>
            {loadingTrips ? (
              <div className="h-12 w-full rounded-xl bg-slate-50 border border-slate-200 flex items-center px-4">
                <Loader2 className="h-4 w-4 animate-spin text-slate-400 mr-2" />
                <span className="text-xs font-semibold text-slate-400">Fetching live travel logs...</span>
              </div>
            ) : (
              <select
                name="tripId"
                value={formData.tripId}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 focus:bg-white text-slate-800 font-semibold focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all ${
                  errors.tripId ? 'border-rose-300' : 'border-slate-200'
                }`}
              >
                <option value="">Select an active journey...</option>
                {trips.map(trip => (
                  <option key={trip.id} value={trip.id}>
                    {trip.destination} ({trip.startDate})
                  </option>
                ))}
              </select>
            )}
            {errors.tripId && <p className="text-xs font-bold text-rose-600">{errors.tripId}</p>}
          </div>

          {/* Expense Title */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800">What was this expense for?</label>
            <div className="relative">
              <HelpCircle className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Dinner at beachfront cafe, Cabin rental"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-slate-50/50 focus:bg-white text-slate-800 font-medium placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all ${
                  errors.title ? 'border-rose-300' : 'border-slate-200'
                }`}
              />
            </div>
            {errors.title && <p className="text-xs font-bold text-rose-600">{errors.title}</p>}
          </div>

          {/* Amount & Paid By Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-800">Amount Paid (₹)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 focus:bg-white text-slate-800 font-medium placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all ${
                  errors.amount ? 'border-rose-300' : 'border-slate-200'
                }`}
              />
              {errors.amount && <p className="text-xs font-bold text-rose-600">{errors.amount}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-800">Who Paid?</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  name="paid_by"
                  value={formData.paid_by}
                  onChange={handleChange}
                  placeholder="e.g. Rohan, Me"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-slate-50/50 focus:bg-white text-slate-800 font-medium placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all ${
                    errors.paid_by ? 'border-rose-300' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.paid_by && <p className="text-xs font-bold text-rose-600">{errors.paid_by}</p>}
            </div>
          </div>

          {/* Category Selector */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800">Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Food', 'Travel', 'Lodging', 'Others'].map((cat) => {
                const isSelected = formData.category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-indigo-50 border-indigo-250 text-indigo-700 font-extrabold' 
                        : 'border-slate-200 bg-slate-50/50 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              disabled={submitting}
              onClick={() => navigate(-1)}
              className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || success}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-100 hover:shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Save Expense
                </>
              )}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}