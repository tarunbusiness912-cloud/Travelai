import { Map, Plus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RecentTrips({ trips = [], loading = false }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800">Recent Trips</h3>
        <div className="h-48 bg-white border border-slate-100 rounded-2xl animate-pulse flex items-center justify-center text-slate-400">
          Loading your active trips...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">Recent Trips</h3>
        {trips.length > 0 && (
          <button 
            onClick={() => navigate('/dashboard/trips')}
            className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors"
          >
            View All <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {trips.length === 0 ? (
        /* Onboarding Empty State Design */
        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-8 md:p-12 text-center flex flex-col items-center justify-center max-w-xl mx-auto space-y-6 shadow-sm mt-4">
          <div className="h-16 w-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 animate-bounce-slow">
            <Map className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-extrabold text-slate-900">No active trips found</h4>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Let's start planning your next adventure! Your dynamic itinerary tracking, maps, and shared budget balances will populate here.
            </p>
          </div>
          <button 
            onClick={() => navigate('/dashboard/trips/create')}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-5 py-3 text-sm font-bold shadow-sm transition-all hover:shadow"
          >
            <Plus className="h-4 w-4" /> Start Planning Trip
          </button>
        </div>
      ) : (
        /* Trip Cards Render Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-900">{trip.destination}</h4>
              <p className="text-xs text-slate-500 mt-1">{trip.dates}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
