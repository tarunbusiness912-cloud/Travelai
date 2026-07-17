import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, IndianRupee, CreditCard, Plus, HelpCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function GroupDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Simulated active ledger details
  const [members] = useState(['Rahul', 'Arun', 'Sneha', 'You']);
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Hotel booking', amount: 3500, paidBy: 'You', split: 'Equally' },
    { id: 2, title: 'Local Taxi ride', amount: 900, paidBy: 'Rahul', split: 'Equally' },
    { id: 3, title: 'Lunch & snacks', amount: 1000, paidBy: 'Arun', split: 'Equally' }
  ]);

  // Settlement debt list algorithm output simulation
  const [settlements] = useState([
    { debtor: 'Sneha', creditor: 'You', amount: 1350 },
    { debtor: 'Rahul', creditor: 'You', amount: 450 }
  ]);

  const handleSettleDebt = (debtor, creditor) => {
    toast.success(`Settlement recorded between ${debtor} and ${creditor}!`);
  };

  return (
    <div className="min-h-screen bg-slate-50/30 p-4 md:p-8 space-y-6 text-slate-900">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate('/groups')}
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Groups
      </button>

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Davanagere Boys Ledger</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time splitwise calculations for your Mysuru Getaway trip.</p>
        </div>
        <button 
          onClick={() => navigate('/expenses/add')}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 text-sm font-bold shadow-sm transition-all hover:shadow cursor-pointer"
        >
          <Plus className="h-4 w-4" /> Log Group Expense
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3 Grid): Expenses Ledger list */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">Transaction Log</h3>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {expenses.map((exp) => (
                <div key={exp.id} className="p-5 flex justify-between items-center hover:bg-slate-50/40 transition-colors">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm md:text-base">{exp.title}</h4>
                    <p className="text-xs text-slate-500">
                      Paid by <span className="font-bold text-slate-700">{exp.paidBy}</span> · Split {exp.split}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-black text-slate-900">₹{exp.amount}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">INR</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Calculations & Settlements (Who owes Who) */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">Suggested Settlements</h3>
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-5">
            
            {settlements.length === 0 ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                <p className="text-sm font-bold text-slate-800">All settled up!</p>
                <p className="text-xs text-slate-550">Nobody owes anybody in this travel workspace.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {settlements.map((set, idx) => (
                  <div 
                    key={idx}
                    className="border border-slate-100 rounded-xl p-4 flex flex-col justify-between gap-3 hover:border-slate-200 transition-colors bg-slate-50/20"
                  >
                    <div className="text-sm font-medium text-slate-600">
                      <span className="font-bold text-rose-700">{set.debtor}</span> owes <span className="font-bold text-indigo-700">{set.creditor}</span>
                      <p className="text-xl font-black text-slate-900 mt-1">₹{set.amount}</p>
                    </div>

                    <button
                      onClick={() => handleSettleDebt(set.debtor, set.creditor)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-700 px-3 py-1.5 text-xs font-bold transition-all w-full cursor-pointer"
                    >
                      <CreditCard className="h-3.5 w-3.5" /> Settle Transaction
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}