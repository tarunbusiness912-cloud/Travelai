import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { getTripById, updateTrip } from '../services/api';

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: '',
    notes: ''
  });

  useEffect(() => {
    getTripById(id)
      .then(({ data }) => setFormData({
        destination: data.destination || '',
        startDate: data.startDate || '',
        endDate: data.endDate || '',
        travelers: data.travelers || 1,
        budget: data.budget || '',
        notes: data.notes || ''
      }))
      .catch(() => toast.error('Trip not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await updateTrip(id, {
        ...formData,
        travelers: Number(formData.travelers) || 1,
        budget: Number(formData.budget) || 0
      });
      toast.success('Trip updated');
      navigate(`/dashboard/trips/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Unable to update trip');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="glass-panel rounded-2xl p-8 text-center font-bold text-slate-200">Loading trip editor...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <button onClick={() => navigate(`/dashboard/trips/${id}`)} className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-amber-100">
        <ArrowLeft className="h-4 w-4" />
        Back to workspace
      </button>

      <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 md:p-8 space-y-5">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Edit Trip</h1>
          <p className="mt-2 text-sm text-slate-300">Changes save through the TravelOS API and are reflected immediately on return.</p>
        </div>

        <Input label="Destination" name="destination" value={formData.destination} onChange={handleChange} required />
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
          <Input label="End Date" type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Travelers" type="number" min="1" name="travelers" value={formData.travelers} onChange={handleChange} />
          <Input label="Budget in INR" type="number" min="0" name="budget" value={formData.budget} onChange={handleChange} />
        </div>
        <label className="block space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300">Notes</span>
          <textarea name="notes" value={formData.notes} onChange={handleChange} className="min-h-28 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white" />
        </label>

        <button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-amber-200 px-6 py-3 text-sm font-black text-slate-950 disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save changes
        </button>
      </form>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300">{label}</span>
      <input {...props} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500" />
    </label>
  );
}
