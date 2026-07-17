import React from 'react';
import { Plus, Receipt, Users, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'New Trip',
      icon: Plus,
      path: '/trips/create',
      bgClass: 'bg-indigo-50 hover:bg-indigo-100/80 border-indigo-100/80',
      iconClass: 'bg-indigo-100 text-indigo-700',
      textClass: 'text-indigo-950'
    },
    {
      label: 'Add Expense',
      icon: Receipt,
      path: '/expenses/add',
      bgClass: 'bg-purple-50 hover:bg-purple-100/80 border-purple-100/80',
      iconClass: 'bg-purple-100 text-purple-700',
      textClass: 'text-purple-950'
    },
    {
      label: 'Group Split',
      icon: Users,
      path: '/groups/create',
      bgClass: 'bg-violet-50 hover:bg-violet-100/80 border-violet-100/80',
      iconClass: 'bg-violet-100 text-violet-700',
      textClass: 'text-violet-950'
    },
    {
      label: 'Explore AI',
      icon: Compass,
      path: '/wishlist',
      bgClass: 'bg-slate-50 hover:bg-slate-100 border-slate-200/80',
      iconClass: 'bg-slate-200 text-slate-700',
      textClass: 'text-slate-900'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800 tracking-tight">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => navigate(action.path)}
            className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-200 group ${action.bgClass}`}
          >
            <div className={`p-3 rounded-xl transition-transform duration-200 group-hover:scale-110 ${action.iconClass}`}>
              <action.icon className="h-5 w-5" />
            </div>
            <span className={`mt-3 text-sm font-bold tracking-wide ${action.textClass}`}>
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}