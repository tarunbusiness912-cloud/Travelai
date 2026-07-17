import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Bus, Calendar, Car, CloudSun, Plane, Plus, Receipt, Train, Wallet } from 'lucide-react';
import { getExpenses, getTripById } from '../services/api';

const routeOptions = [
  { mode: 'Train', icon: Train, provider: 'IRCTC', time: '8-12 hrs', cost: 1200, link: 'https://www.irctc.co.in/' },
  { mode: 'Bus', icon: Bus, provider: 'RedBus / KSRTC', time: '7-10 hrs', cost: 1600, link: 'https://www.redbus.in/' },
  { mode: 'Cab', icon: Car, provider: 'Outstation cab', time: '5-7 hrs', cost: 7200, link: 'https://www.olacabs.com/outstation' },
  { mode: 'Flight', icon: Plane, provider: 'Domestic airlines', time: '1-3 hrs', cost: 5200, link: 'https://www.google.com/travel/flights' }
];

export default function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    Promise.all([getTripById(id), getExpenses(id).catch(() => ({ data: [] }))])
      .then(([tripRes, expenseRes]) => {
        if (!mounted) return;
        setTrip(tripRes.data);
        setExpenses(Array.isArray(expenseRes.data) ? expenseRes.data : []);
      })
      .catch((err) => setError(err.response?.data?.error || 'Trip workspace could not be found.'))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [id]);

  const stats = useMemo(() => {
    const totalSpent = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
    const budget = Number(trip?.budget || 0);
    return {
      totalSpent,
      budget,
      remaining: budget - totalSpent,
      percent: Math.min((totalSpent / (budget || 1)) * 100, 100)
    };
  }, [expenses, trip]);

  if (loading) return <DetailSkeleton />;

  if (error || !trip) {
    return (
      <div className="glass-panel mx-auto max-w-xl rounded-2xl p-8 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-rose-200" />
        <p className="mt-4 font-bold text-slate-200">{error || 'Trip not found'}</p>
        <button onClick={() => navigate('/dashboard/trips')} className="mt-5 rounded-xl bg-amber-200 px-4 py-3 text-sm font-black text-slate-950">
          Return to trips
        </button>
      </div>
    );
  }

  const crowd = getCrowdIndex(trip.startDate);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button onClick={() => navigate('/dashboard/trips')} className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-amber-100">
          <ArrowLeft className="h-4 w-4" />
          Back to trips
        </button>
        <div className="flex gap-2">
          <button onClick={() => navigate(`/dashboard/trips/${trip.id}/edit`)} className="rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-200 hover:bg-white/5">
            Edit
          </button>
          <button onClick={() => navigate(`/dashboard/add-expense?tripId=${trip.id}`)} className="inline-flex items-center gap-2 rounded-xl bg-amber-200 px-4 py-3 text-sm font-black text-slate-950">
            <Plus className="h-4 w-4" />
            Add expense
          </button>
        </div>
      </div>

      <section className="glass-panel rounded-2xl p-7">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-100">
          <Calendar className="h-4 w-4" />
          {trip.startDate || 'TBD'} to {trip.endDate || 'TBD'}
        </p>
        <h1 className="mt-3 text-5xl font-black tracking-tight text-white">{trip.destination}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">{trip.notes || 'A fresh TravelOS workspace ready for planning.'}</p>
      </section>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <MoneyCard title="Assigned Budget" amount={stats.budget} tone="text-white" />
        <MoneyCard title="Total Expenses" amount={stats.totalSpent} tone="text-rose-100" />
        <MoneyCard title="Remaining" amount={stats.remaining} tone={stats.remaining >= 0 ? 'text-emerald-100' : 'text-rose-100'} />
      </div>

      <section className="glass-panel rounded-2xl p-6">
        <div className="flex justify-between text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
          <span>Budget Utilization</span>
          <span className={stats.percent > 85 ? 'text-rose-200' : 'text-amber-100'}>{stats.percent.toFixed(0)}%</span>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
          <motion.div initial={{ width: 0 }} animate={{ width: `${stats.percent}%` }} className="h-full rounded-full bg-amber-200" />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.85fr]">
        <section className="glass-panel rounded-2xl p-6">
          <h2 className="flex items-center gap-2 text-xl font-black text-white">
            <Train className="h-5 w-5 text-amber-100" />
            Multi-modal route finder
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {routeOptions.map((option) => (
              <a key={option.mode} href={option.link} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-amber-200/30">
                <option.icon className="h-5 w-5 text-amber-100" />
                <div className="mt-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-black text-white">{option.mode}</p>
                    <p className="text-xs font-semibold text-slate-400">{option.provider}</p>
                  </div>
                  <p className="text-right text-sm font-black text-amber-100">Rs {option.cost.toLocaleString('en-IN')}</p>
                </div>
                <p className="mt-3 text-xs font-bold text-slate-300">{option.time}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-2xl p-6">
          <h2 className="flex items-center gap-2 text-xl font-black text-white">
            <CloudSun className="h-5 w-5 text-amber-100" />
            Crowd and weather predictor
          </h2>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-5">
            <p className={`text-3xl font-black ${crowd.color}`}>{crowd.label}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{crowd.copy}</p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm font-bold">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-emerald-100">Best day: Tuesday</div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-rose-100">Peak rush: 5-9 PM</div>
          </div>
        </section>
      </div>

      <section className="glass-panel rounded-2xl p-6">
        <h2 className="flex items-center gap-2 text-xl font-black text-white">
          <Receipt className="h-5 w-5 text-amber-100" />
          Transactions
        </h2>
        {expenses.length === 0 ? (
          <div className="mt-5 rounded-xl border border-dashed border-white/15 p-8 text-center text-sm font-bold text-slate-400">
            No expenses logged yet.
          </div>
        ) : (
          <div className="mt-5 divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between gap-4 bg-white/5 p-4">
                <div>
                  <p className="font-bold text-white">{expense.title}</p>
                  <p className="text-xs font-semibold text-slate-400">{expense.category || 'General'}</p>
                </div>
                <p className="font-black text-amber-100">Rs {Number(expense.amount || 0).toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function MoneyCard({ title, amount, tone }) {
  return (
    <div className="glass-panel rounded-2xl p-6">
      <Wallet className="h-5 w-5 text-amber-100" />
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{title}</p>
      <p className={`mt-2 text-3xl font-black ${tone}`}>Rs {Number(amount || 0).toLocaleString('en-IN')}</p>
    </div>
  );
}

function getCrowdIndex(dateValue) {
  const day = dateValue ? new Date(dateValue).getDay() : new Date().getDay();
  if ([0, 6].includes(day)) {
    return {
      label: 'High crowd',
      color: 'text-rose-100',
      copy: 'Weekend starts are usually packed. Book trains and stays early, and avoid evening arrivals near popular hubs.'
    };
  }
  if ([5, 1].includes(day)) {
    return {
      label: 'Medium crowd',
      color: 'text-amber-100',
      copy: 'Shoulder-day traffic is manageable, but buses and cabs may surge around office commute windows.'
    };
  }
  return {
    label: 'Best day to travel',
    color: 'text-emerald-100',
    copy: 'Weekday movement should be calmer with better fares and easier check-ins.'
  };
}

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="glass-panel h-52 animate-pulse rounded-2xl" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {[0, 1, 2].map((item) => <div key={item} className="glass-panel h-32 animate-pulse rounded-2xl" />)}
      </div>
      <div className="glass-panel h-80 animate-pulse rounded-2xl" />
    </div>
  );
}
