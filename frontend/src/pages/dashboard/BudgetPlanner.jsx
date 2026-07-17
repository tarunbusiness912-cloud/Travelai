import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Bus, IndianRupee, Send, Sparkles, UserRound, WalletCards } from 'lucide-react';

const destinations = [
  { name: 'Hampi', fit: 'heritage, solo backpacking, hostel-friendly', base: 4800 },
  { name: 'Gokarna', fit: 'beach trek, dorm stays, overnight bus access', base: 5000 },
  { name: 'Pondicherry', fit: 'cafes, walkable quarters, budget homestays', base: 6200 },
  { name: 'Ooty', fit: 'cool weather, toy train, budget lodges', base: 5800 }
];

export default function BudgetPlanner() {
  const [prompt, setPrompt] = useState('I have 3 days holiday and I am alone with 5k. Suggest a trip.');
  const parsed = useMemo(() => parseTravelPrompt(prompt), [prompt]);
  const recommendation = useMemo(() => chooseDestination(parsed), [parsed]);
  const costs = useMemo(() => buildCostPlan(parsed.budget), [parsed.budget]);

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-2xl p-7">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-100">
          <Sparkles className="h-3.5 w-3.5" />
          Conversational AI Budget Planner
        </span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white">Tell TravelOS your constraints</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
          The local rule engine parses Indian travel shorthand, budget caps, solo/group context, and trip duration into a practical route recommendation.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="glass-panel rounded-2xl p-6">
          <label className="block space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300">Natural language request</span>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              className="min-h-44 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white placeholder:text-slate-500"
              placeholder="Example: I have 3 days holiday and I am alone with 5k. Suggest a trip."
            />
          </label>
          <button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-200 px-5 py-3 text-sm font-black text-slate-950">
            <Send className="h-4 w-4" />
            Parsed live
          </button>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <ParsedCard icon={WalletCards} label="Duration" value={`${parsed.duration} days`} />
            <ParsedCard icon={UserRound} label="Party" value={parsed.partyLabel} />
            <ParsedCard icon={IndianRupee} label="Budget cap" value={`Rs ${parsed.budget.toLocaleString('en-IN')}`} />
          </div>
        </section>

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-100">Recommended route</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight text-white">{recommendation.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{recommendation.fit}</p>
            </div>
            <div className="rounded-2xl border border-amber-200/20 bg-amber-200/10 p-4 text-right">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-100">Fit score</p>
              <p className="text-3xl font-black text-white">{recommendation.score}%</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {costs.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm font-black text-white">{item.label}</p>
                <p className="mt-1 text-2xl font-black text-amber-100">Rs {item.amount.toLocaleString('en-IN')}</p>
                <p className="mt-2 text-xs leading-5 text-slate-400">{item.note}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="flex items-center gap-2 text-sm font-black text-white">
              <Bus className="h-4 w-4 text-amber-100" />
              Suggested itinerary
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Day 1 overnight train/bus arrival, hostel check-in, local breakfast. Day 2 core sights plus low-cost local transport. Day 3 sunrise stop, market meal, return sleeper.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

function parseTravelPrompt(text) {
  const lower = text.toLowerCase();
  const durationMatch = lower.match(/(\d+)\s*(day|days|d)\b/);
  const budgetMatch = lower.match(/(\d+(?:\.\d+)?)\s*(k|000|rs|₹|inr)?/i);
  const solo = /(alone|solo|single|by myself)/.test(lower);
  const peopleMatch = lower.match(/(\d+)\s*(people|persons|friends|travellers|travelers)/);

  const rawBudget = budgetMatch ? Number(budgetMatch[1]) : 5;
  const multiplier = budgetMatch?.[2] === 'k' || rawBudget < 100 ? 1000 : 1;
  const partySize = solo ? 1 : Number(peopleMatch?.[1] || 2);

  return {
    duration: Number(durationMatch?.[1] || 3),
    partySize,
    partyLabel: solo ? 'Solo traveler' : `${partySize} travelers`,
    budget: Math.max(1000, Math.round(rawBudget * multiplier))
  };
}

function chooseDestination(parsed) {
  const scored = destinations
    .map((destination) => ({
      ...destination,
      score: Math.max(68, Math.min(98, 100 - Math.abs(destination.base - parsed.budget) / 130))
    }))
    .sort((a, b) => b.score - a.score);
  return { ...scored[0], score: Math.round(scored[0].score) };
}

function buildCostPlan(budget) {
  const stay = Math.round(Math.min(1800, budget * 0.3) / 100) * 100;
  const transport = Math.round(Math.min(1800, budget * 0.24) / 100) * 100;
  const food = Math.round(Math.min(1800, budget * 0.3) / 100) * 100;
  const buffer = Math.max(300, budget - stay - transport - food);
  return [
    { label: 'Budget stay', amount: stay, note: 'Dorms, Zostels, or clean local guest houses.' },
    { label: 'Transport', amount: transport, note: 'KSRTC, sleeper train, or state bus connectors.' },
    { label: 'Food', amount: food, note: 'Local messes, shacks, and simple breakfast stops.' },
    { label: 'Buffer', amount: buffer, note: 'Autos, entry fees, rain cover, and last-mile changes.' }
  ];
}

function ParsedCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <Icon className="h-5 w-5 text-amber-100" />
      <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-1 font-black text-white">{value}</p>
    </div>
  );
}
