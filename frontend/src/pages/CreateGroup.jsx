import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { createGroup } from '../services/api';

export default function CreateGroup() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    budget: '',
    startDate: '',
    endDate: '',
    packageType: 'squad',
    description: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await createGroup({ ...formData, budget: Number(formData.budget) || 0 });
      toast.success('Squad created');
      navigate('/dashboard/groups');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Unable to create squad');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <button onClick={() => navigate('/dashboard/groups')} className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-amber-100">
        <ArrowLeft className="h-4 w-4" />
        Back to squads
      </button>

      <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 md:p-8 space-y-5">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-100">
            <Users className="h-3.5 w-3.5" />
            Squad Builder
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-white">Create shared squad</h1>
          <p className="mt-2 text-sm text-slate-300">Post a friend group or a fixed-budget conductor package.</p>
        </div>

        <Input label="Squad name" name="name" value={formData.name} onChange={handleChange} required />
        <Input label="Destination" name="destination" value={formData.destination} onChange={handleChange} />
        <div className="grid gap-4 md:grid-cols-3">
          <Input label="Budget in INR" type="number" name="budget" value={formData.budget} onChange={handleChange} />
          <Input label="Start date" type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
          <Input label="End date" type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
        </div>

        <label className="block space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300">Package type</span>
          <select name="packageType" value={formData.packageType} onChange={handleChange} className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white">
            <option value="squad">Friend squad</option>
            <option value="conductor">Verified conductor package</option>
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300">Description</span>
          <textarea name="description" value={formData.description} onChange={handleChange} className="min-h-28 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white" />
        </label>

        <button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-amber-200 px-6 py-3 text-sm font-black text-slate-950 disabled:opacity-60">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Publish squad
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
