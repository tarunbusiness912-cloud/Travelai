import React, { useState } from 'react';
import groupService from '../../services/groupService';
import { X, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';

const InviteMemberModal = ({ isOpen, onClose, groupId, onInviteSuccess }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  if (!isOpen) return null;

  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      await groupService.inviteMemberByEmail(groupId, email.trim().toLowerCase());
      setStatus({ type: 'success', message: `Successfully added ${email} to the group!` });
      setEmail('');
      if (onInviteSuccess) onInviteSuccess();
      setTimeout(() => {
        onClose();
        setStatus({ type: null, message: '' });
      }, 2000);
    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: err.message || 'Could not find a user with that email or user is already a member.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Invite New Member</h3>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleInviteSubmit} className="p-6 space-y-4">
          <p className="text-sm text-slate-500">
            Enter the registered email address of the traveler you want to invite to this group project.
          </p>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="traveler@example.com"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>

          {/* Feedback Messages */}
          {status.type === 'error' && (
            <div className="flex items-start gap-2 bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-100">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{status.message}</span>
            </div>
          )}

          {status.type === 'success' && (
            <div className="flex items-start gap-2 bg-emerald-50 text-emerald-700 text-xs p-3 rounded-lg border border-emerald-100">
              <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
              <span>{status.message}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-xl transition shadow-md shadow-indigo-100"
            >
              {loading ? 'Inviting...' : 'Send Invitation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteMemberModal;