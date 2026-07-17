import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Pencil, Plus, Search, Sparkles, Trash2, Users, Wallet } from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteTrip, getTrips } from '../services/api';

export default function Trips() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    getTrips()
      .then(({ data }) => mounted && setTrips(Array.isArray(data) ? data : []))
      .catch((err) => {
        setError(err.response?.data?.error || 'Could not load trips from server.');
        toast.error('Could not load trips');
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const filteredTrips = useMemo(
    () => trips.filter((trip) => trip.destination?.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery, trips]
  );

  const handleDelete = async (event, tripId) => {
    event.stopPropagation();
    const snapshot = trips;
    setTrips((current) => current.filter((trip) => trip.id !== tripId));
    try {
      await deleteTrip(tripId);
      toast.success('Trip deleted');
    } catch (err) {
      setTrips(snapshot);
      toast.error(err.response?.data?.error || 'Delete failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-100">
            <Sparkles className="h-3.5 w-3.5" />
            Trip Control
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white">My Trips</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            Unified workspaces for budget, route, squad, and expense operations.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/dashboard/trips/create')}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-200 px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-black/20"
        >
          <Plus className="h-4 w-4" />
          Start plan
        </motion.button>
      </div>

      <div className="glass-panel rounded-2xl p-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search destination..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 backdrop-blur-xl"
          />
        </div>
      </div>

      {loading ? (
        <TripSkeleton />
      ) : error ? (
        <div className="glass-panel rounded-2xl p-8 text-center text-rose-100">{error}</div>
      ) : filteredTrips.length === 0 ? (
        <div className="glass-panel rounded-2xl p-10 text-center">
          <p className="font-bold text-slate-200">No trip workspaces yet.</p>
          <button onClick={() => navigate('/dashboard/trips/create')} className="mt-4 text-sm font-black text-amber-100">
            Create the first one
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {filteredTrips.map((trip, index) => (
            <motion.article
              key={trip.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => navigate(`/dashboard/trips/${trip.id}`)}
              className="glass-panel group cursor-pointer rounded-2xl p-5 transition hover:border-amber-200/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-100">
                    <MapPin className="h-3.5 w-3.5" />
                    {trip.destination}
                  </p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-white">{trip.destination}</h2>
                </div>
                {trip.aiGenerated && (
                  <span className="rounded-full border border-amber-200/20 bg-amber-200/10 px-2 py-1 text-[10px] font-black text-amber-100">AI</span>
                )}
              </div>

              <p className="mt-4 min-h-10 text-sm leading-5 text-slate-300">{trip.notes || 'No notes yet.'}</p>

              <div className="mt-5 grid grid-cols-3 gap-2 text-xs font-bold text-slate-300">
                <Metric icon={Calendar} label={trip.startDate || 'Date TBD'} />
                <Metric icon={Users} label={`${trip.travelers || 1} pax`} />
                <Metric icon={Wallet} label={`Rs ${Number(trip.budget || 0).toLocaleString('en-IN')}`} />
              </div>

              <div className="mt-5 flex justify-end gap-2 border-t border-white/10 pt-4">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/dashboard/trips/${trip.id}/edit`);
                  }}
                  className="rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/10 hover:text-white"
                  aria-label="Edit trip"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={(event) => handleDelete(event, trip.id)}
                  className="rounded-lg border border-rose-300/20 p-2 text-rose-200 hover:bg-rose-400/10"
                  aria-label="Delete trip"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}

function Metric({ icon: Icon, label }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <Icon className="mb-2 h-4 w-4 text-amber-100" />
      <span>{label}</span>
    </div>
  );
}

function TripSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <div key={item} className="glass-panel rounded-2xl p-5">
          <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
          <div className="mt-5 h-8 w-44 animate-pulse rounded bg-white/10" />
          <div className="mt-5 h-16 animate-pulse rounded-xl bg-white/10" />
        </div>
      ))}
    </div>
  );
}
