import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Landmark } from 'lucide-react';

const GroupBalances = ({ balances, onRecordSettlementClick }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Landmark size={18} className="text-indigo-600" /> Expense Matrix & Debts
        </h3>
        <button
          onClick={onRecordSettlementClick}
          className="text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition"
        >
          Settle Balances
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {balances.map((b) => {
          const isOwed = b.net >= 0;
          return (
            <div key={b.profile_id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-800 truncate max-w-[160px]">{b.name}</h4>
                <div className="flex gap-3 text-[11px] text-slate-400 mt-1 font-medium">
                  <span>Paid: ${b.paid.toFixed(2)}</span>
                  <span>Owed: ${b.owed.toFixed(2)}</span>
                </div>
              </div>

              <div className={`text-right flex items-center gap-1.5 font-bold text-sm ${isOwed ? 'text-emerald-600' : 'text-rose-600'}`}>
                {isOwed ? (
                  <>
                    <ArrowUpRight size={16} />
                    <span>+${b.net.toFixed(2)}</span>
                  </>
                ) : (
                  <>
                    <ArrowDownLeft size={16} />
                    <span>-${Math.abs(b.net).toFixed(2)}</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupBalances;