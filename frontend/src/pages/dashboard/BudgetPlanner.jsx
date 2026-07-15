import React from 'react';
// Steps out of pages/dashboard/ up into src/components/
import BudgetSummary from '../../components/BudgetSummary';
import RecentExpenses from '../../components/RecentExpenses';

const BudgetPlanner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Budget Matrix Planner</h1>
        <p className="text-slate-500 text-sm mt-0.5">Track, audit, and analyze dynamic travel expenditures.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BudgetSummary />
        </div>
        <div>
          <RecentExpenses />
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanner;