import React, { useState, useEffect } from 'react';
import expenseSplitService from '../../services/expenseSplitService';
import { X, CheckCircle, DollarSign } from 'lucide-react';

const SettleDebtModal = ({ isOpen, onClose, groupId, members, onSettlementDone }) => {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (members.length > 1) {
      setSender(members[0].profile_id);
      setReceiver(members[1].profile_id);
    }
  }, [members, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sender === receiver) {
      alert('Sender and recipient profiles must be distinct individuals.');
      return;
    }
    setLoading(true);

    try {
      await expenseSplitService.recordSettlement(groupId, {
        sender_id: sender,
        receiver_id: receiver,
        amount: parseFloat(amount)
      });
      onSettlementDone();
      onClose();
      setAmount('');
    } catch (err) {
      alert(err.message || 'Error processing debt settlement parameters');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle className="text-emerald-600" size={20} /> Record Cash Settlement
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Who Paid?</label>
            <select value={sender} onChange={(e) => setSender(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm bg-white">
              {members.map(m => (
                <option key={m.profile_id} value={m.profile_id}>{m.profiles?.full_name || m.profiles?.email}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Who Received Payment?</label>
            <select value={receiver} onChange={(e) => setReceiver(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm bg-white">
              {members.map(m => (
                <option key={m.profile_id} value={m.profile_id}>{m.profiles?.full_name || m.profiles?.email}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Amount Settled</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"><DollarSign size={16} /></span>
              <input type="number" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 rounded-xl transition shadow-md">
              {loading ? 'Recording...' : 'Complete Settlement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettleDebtModal;