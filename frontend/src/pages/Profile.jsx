import React, { useEffect, useState } from 'react';
import { CheckCircle2, Home, Loader2, Mail, MapPin, Save, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { getProfile, saveProfile } from '../services/profileService';

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    home_location: '',
    preferences: '',
    email: user?.email || ''
  });

  useEffect(() => {
    let mounted = true;
    getProfile()
      .then(({ data }) => {
        if (!mounted || !data) return;
        setFormData((current) => ({
          ...current,
          full_name: data.full_name || user?.name || '',
          home_location: data.home_location || '',
          preferences: Array.isArray(data.preferences) ? data.preferences.join(', ') : data.preferences || '',
          email: user?.email || data.email || ''
        }));
      })
      .catch(() => {
        setFormData((current) => ({ ...current, full_name: user?.name || '', email: user?.email || '' }));
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setSaved(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const preferences = formData.preferences
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
      await saveProfile({
        full_name: formData.full_name.trim(),
        home_location: formData.home_location.trim(),
        preferences
      });
      setSaved(true);
      toast.success('Profile updated');
    } catch (error) {
      toast.error(error.message || 'Unable to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="glass-panel rounded-2xl p-8 text-center font-bold text-slate-200">Loading profile...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="glass-panel rounded-2xl p-7">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-100">
          <User className="h-3.5 w-3.5" />
          Profile
        </span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white">Traveler settings</h1>
        <p className="mt-2 text-sm leading-6 text-slate-300">Keep your home base and travel preferences synced for smarter Indian route suggestions.</p>
      </section>

      <form onSubmit={handleSave} className="glass-panel rounded-2xl p-6 md:p-8 space-y-5">
        {saved && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-sm font-bold text-emerald-100">
            <CheckCircle2 className="h-4 w-4" />
            Profile state updated.
          </div>
        )}

        <Input icon={User} label="Full name" name="full_name" value={formData.full_name} onChange={handleChange} />
        <Input icon={Mail} label="Email" type="email" name="email" value={formData.email} disabled />
        <Input icon={Home} label="Home location" name="home_location" value={formData.home_location} onChange={handleChange} placeholder="Bengaluru, Mumbai, Pune..." />
        <label className="block space-y-2">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
            <MapPin className="h-3.5 w-3.5 text-amber-100" />
            Preferences
          </span>
          <textarea
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            placeholder="hostels, trains, beaches, vegetarian food"
            className="min-h-28 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500"
          />
        </label>

        <button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-amber-200 px-6 py-3 text-sm font-black text-slate-950 disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save profile
        </button>
      </form>
    </div>
  );
}

function Input({ icon: Icon, label, ...props }) {
  return (
    <label className="block space-y-2">
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
        <Icon className="h-3.5 w-3.5 text-amber-100" />
        {label}
      </span>
      <input {...props} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 disabled:cursor-not-allowed disabled:text-slate-500" />
    </label>
  );
}
