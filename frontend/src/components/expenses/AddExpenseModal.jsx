import React, { useState, useEffect } from 'react';
import expenseSplitService from '../../services/expenseSplitService';
import { X, DollarSign, FileText, PieChart } from 'lucide-react';

const AddExpenseModal = ({ isOpen, onClose, groupId, members, onExpenseAdded }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [splitType, setSplitType] = useState('equal');
  const [customAmounts, setCustomAmounts] = useState({});
  const [customPercentages, setCustomPercentages] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (members.length > 0) {
      setPaidBy(members[0].profile_id);
      
      const defaultShares = {};
      members.forEach(m => {
        defaultShares[m.profile_id] = '';
      });
      setCustomAmounts(defaultShares);
      setCustomPercentages(defaultShares);
    }
  }, [members, isOpen]);

  if (!isOpen) return null;

  const handleSplitValueChange = (profileId, val, type) => {
    if (type === 'custom') {
      setCustomAmounts(prev => ({ ...prev, [profileId]: val }));
    } else {
      setCustomPercentages(prev => ({ ...prev, [profileId]: val }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const parsedAmount = parseFloat(amount);
    let computedSplits = [];

    if (splitType === 'equal') {
      const share = parsedAmount / members.length;
      computedSplits = members.map(m => ({
        profile_id: m.profile_id,
        amount: share.toFixed(2),
        percentage: (100 / members.length).toFixed(2)
      }));
    } else if (splitType === 'custom') {
      let totalAssigned = 0;
      computedSplits = members.map(m => {
        const val = parseFloat(customAmounts[m.profile_id] || 0);
        totalAssigned += val;
        return { profile_id: m.profile_id, amount: val.toFixed(2) };
      });

      if (Math.abs(totalAssigned - parsedAmount) > 0.05) {
        alert(`Custom split breakdown total ($${totalAssigned}) must match overall expense sum amount ($${parsedAmount})`);
        setLoading(false);
        return;
      }
    } else if (splitType === 'percentage') {
      let totalPct = 0;
      computedSplits = members.map(m => {
        const pct = parseFloat(customPercentages[m.profile_id] || 0);
        totalPct += pct;
        const calculatedShare = (pct / 100) * parsedAmount;
        return { profile_id: m.profile_id, amount: calculatedShare.toFixed(2), percentage: pct };
      });

      if (Math.abs(totalPct - 100) > 0.01) {
        alert('Total percentages breakdown distribution must accurately sum to exactly 100%');
        setLoading(false);
        return;
      }
    }

    try {
      await expenseSplitService.addExpense(groupId, {
        amount: parsedAmount,
        description,
        paid_by: paidBy,
        split_type: splitType
      }, computedSplits);

      onExpenseAdded();
      onClose();
      setDescription('');
      setAmount('');
    } catch (err) {
      alert(err.message || 'Error creating shared expense breakdown');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-100 overflow-hidden transform transition-all max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <PieChart className="text-indigo-600" size={20} /> Add Group Expense
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Description</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"><FileText size={16} /></span>
              <input type="text" required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Resort Booking, Dinner" className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Total Amount</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"><DollarSign size={16} /></span>
                <input type="number" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Paid By</label>
              <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm bg-white">
                {members.map(m => (
                  <option key={m.profile_id} value={m.profile_id}>{m.profiles?.full_name || m.profiles?.email}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Split Strategy</label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
              {['equal', 'percentage', 'custom'].map((type) => (
                <button key={type} type="button" onClick={() => setSplitType(type)} className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition ${splitType === type ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Splitting Input Fields */}
          {splitType !== 'equal' && (
            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Split Distribution Ledger</h4>
              {members.map(m => (
                <div key={m.profile_id} className="flex items-center justify-between text-sm">
                  <span className="text-slate-700 truncate max-w-[200px] font-medium">{m.profiles?.full_name || m.profiles?.email}</span>
                  <div className="relative w-32">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400 text-xs font-bold">
                      {splitType === 'custom' ? '$' : '%'}
                    </span>
                    <input
                      type="number"
                      step="any"
                      required
                      value={splitType === 'custom' ? (customAmounts[m.profile_id] || '') : (customPercentages[m.profile_id] || '')}
                      onChange={(e) => handleSplitValueChange(m.profile_id, e.target.value, splitType)}
                      placeholder="0"
                      className="w-full pl-7 pr-3 py-1 border border-slate-200 rounded-lg text-right text-sm focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 shrink-0">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-xl transition shadow-md shadow-indigo-100">
              {loading ? 'Processing...' : 'Save Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;