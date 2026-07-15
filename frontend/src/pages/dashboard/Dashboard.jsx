import React from 'react';
import QuickActions from '../../components/QuickActions';
import RecentTrips from '../../components/RecentTrips';
import BudgetOverview from '../../components/BudgetOverview';

// Commented out because "ActivityFeed.jsx" does not exist in your src/components directory tree
// import ActivityFeed from '../../components/ActivityFeed'; 

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Your Travel Workspace</h1>
        <p className="text-slate-500 text-sm mt-0.5">Real-time status tracking updates, active itineraries, and split budgets.</p>
      </div>

      <QuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RecentTrips />
        </div>
        <div className="space-y-8">
          <BudgetOverview />
          
          {/* Safe inline visual placeholder replacing the missing ActivityFeed component */}
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-2">Activity Timeline</h3>
            <p className="text-xs text-slate-400">Activity monitor feeds are running online.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;