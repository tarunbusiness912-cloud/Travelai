import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function BudgetOverview({ total = 0, spent = 0 }) {
  const remaining = total - spent;
  const percentage = total > 0 ? Math.min((spent / total) * 100, 100) : 0;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800 tracking-tight">Budget Overview</h3>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
        
        {/* Total Budget Row */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Budget</p>
            <p className="text-3xl font-black text-slate-900 mt-1">
              ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="h-11 w-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>

        {/* Budget Grid Info */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Spent</p>
            <p className="text-lg font-black text-slate-800 mt-1">
              ₹{spent.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Remaining</p>
            <p className="text-lg font-black text-indigo-600 mt-1">
              ₹{remaining.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Modern Custom Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
            <span>{percentage.toFixed(0)}% Utilized</span>
            <span>Budget Alert Active</span>
          </div>
        </div>

      </div>
    </div>
  );
}