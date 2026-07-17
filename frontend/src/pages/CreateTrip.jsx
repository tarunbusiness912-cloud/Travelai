import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Compass, Loader2, Sparkles, Users, Wallet } from 'lucide-react';
import toast from 'react-hot-toast';
import { createTrip } from '../services/api';

export default function CreateTrip() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: '',
    notes: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '', submit: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.destination.trim()) nextErrors.destination = 'Destination is required';
    if (!formData.startDate) nextErrors.startDate = 'Start date is required';
    if (!formData.endDate) nextErrors.endDate = 'End date is required';
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      nextErrors.endDate = 'End date cannot be before start date';
    }
    if (!formData.budget || Number(formData.budget) <= 0) nextErrors.budget = 'Add a budget above zero';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await createTrip({
        ...formData,
        travelers: Number(formData.travelers) || 1,
        budget: Number(formData.budget)
      });
      toast.success('Trip workspace created');
      navigate(`/dashboard/trips/${data.id}`);
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to create trip workspace';
      setErrors((current) => ({ ...current, submit: message }));
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <button
        onClick={() => navigate('/dashboard/trips')}
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition hover:text-amber-100"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to trips
      </button>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-2xl p-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-100">
            <Sparkles className="h-3.5 w-3.5" />
            TravelOS Planner
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white">Create a premium trip workspace</h1>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Capture the core route, dates, party size, and budget. Your itinerary, expenses, and squad state stay connected from the first save.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
            {['Instant budget ledger', 'India-first routes', 'Squad-ready', 'Live edit state'].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-3 font-semibold text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </motion.section>

        <motion.form
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          onSubmit={handleSubmit}
          className="glass-panel rounded-2xl p-6 md:p-8 space-y-5"
        >
          {errors.submit && (
            <div className="rounded-xl border border-rose-300/30 bg-rose-400/10 p-4 text-sm font-bold text-rose-100">
              {errors.submit}
            </div>
          )}

          <Field icon={Compass} label="Destination" error={errors.destination}>
            <input name="destination" value={formData.destination} onChange={handleChange} placeholder="Gokarna, Hampi, Ooty..." className="glass-input" />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field icon={Calendar} label="Start date" error={errors.startDate}>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="glass-input" />
            </Field>
            <Field icon={Calendar} label="End date" error={errors.endDate}>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="glass-input" />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field icon={Users} label="Travelers">
              <input type="number" min="1" name="travelers" value={formData.travelers} onChange={handleChange} className="glass-input" />
            </Field>
            <Field icon={Wallet} label="Budget in INR" error={errors.budget}>
              <input type="number" min="1" name="budget" value={formData.budget} onChange={handleChange} placeholder="5000" className="glass-input" />
            </Field>
          </div>

          <label className="block space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300">Notes</span>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Hostel preference, train constraints, must-visit food stops..."
              className="min-h-28 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 backdrop-blur-xl"
            />
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => navigate('/dashboard/trips')} className="rounded-xl border border-white/10 px-5 py-3 text-sm font-bold text-slate-200 hover:bg-white/5">
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-200 px-6 py-3 text-sm font-black text-slate-950 shadow-lg shadow-amber-950/20 disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Create workspace
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, error, children }) {
  return (
    <label className="block space-y-2">
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
        <Icon className="h-3.5 w-3.5 text-amber-100" />
        {label}
      </span>
      {React.cloneElement(children, {
        className: `${children.props.className || ''} w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 backdrop-blur-xl`
      })}
      {error && <span className="text-xs font-bold text-rose-200">{error}</span>}
    </label>
  );
}
