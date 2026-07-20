import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Receipt, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  Calendar,
  Briefcase,
  Wallet,
  Coins
} from 'lucide-react';
import { getTrips } from '../../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real trip data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTrips();
        setTrips(response.data || []);
      } catch (error) {
        console.error("Dashboard failed to fetch live trips:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Budget calculations based on active trips
  const stats = {
    totalBudget: trips.reduce((sum, trip) => sum + (Number(trip.budget) || 0), 0),
    totalSpent: 1200, // Kept static until backend expense calculation logic is added
    activeTripsCount: trips.length,
    netGroupBalance: 200 // Kept static until backend group settlement calculations are live
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 space-y-8 text-slate-900 font-sans">
      
      {/* 1. BRAND WELCOME BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white p-6 md:p-10 rounded-3xl shadow-xl shadow-indigo-950/10 border border-indigo-800/30">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 space-y-4 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-indigo-200 backdrop-blur-md border border-white/5">
            <Sparkles className="h-3.5 w-3.5 text-amber-300 fill-amber-300" /> Welcome to TravelAI
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">Your Travel Workspace</h1>
          
          {/* User Onboarding Intro */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Where to next?</h2>
            <p className="text-indigo-200/90 text-sm md:text-base font-medium leading-relaxed">
              Use our AI Trip Planner to build custom itineraries, manage split budgets with friends, and save your dream destinations.
            </p>
          </div>

          <div className="pt-2">
            <button 
              onClick={() => navigate('/dashboard/trips/create')}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white hover:bg-indigo-50 text-indigo-950 px-6 py-3.5 text-sm font-extrabold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-indigo-600 fill-indigo-600" /> Plan a New Trip with AI
            </button>
          </div>
        </div>
      </div>

      {/* 2. ACCESSIBLE BUDGET OVERVIEW & STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 text-slate-400 mb-2">
            <Briefcase className="h-5 w-5 text-indigo-500" />
            <p className="text-xs font-bold uppercase tracking-wider">Active Trips</p>
          </div>
          <p className="text-3xl font-black text-slate-800 mt-1">{loading ? '...' : stats.activeTripsCount}</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 text-slate-400 mb-2">
            <Wallet className="h-5 w-5 text-indigo-500" />
            <p className="text-xs font-bold uppercase tracking-wider">Total Budget</p>
          </div>
          <p className="text-3xl font-black text-slate-800 mt-1">₹{stats.totalBudget.toLocaleString()}</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 text-slate-400 mb-2">
            <Coins className="h-5 w-5 text-indigo-500" />
            <p className="text-xs font-bold uppercase tracking-wider">Amount Spent</p>
          </div>
          <p className="text-3xl font-black text-slate-800 mt-1">₹{stats.totalSpent.toLocaleString()}</p>
        </div>

        <div className={`border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all ${
          stats.netGroupBalance >= 0 
            ? 'bg-emerald-50/40 border-emerald-100' 
            : 'bg-rose-50/40 border-rose-100'
        }`}>
          <div className="flex items-center gap-3 text-slate-400 mb-2">
            <TrendingUp className={`h-5 w-5 ${stats.netGroupBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`} />
            <p className="text-xs font-bold uppercase tracking-wider">Net Group Balance</p>
          </div>
          <p className={`text-3xl font-black mt-1 ${stats.netGroupBalance >= 0 ? 'text-emerald-900' : 'text-rose-900'}`}>
            {stats.netGroupBalance >= 0 ? `+₹${stats.netGroupBalance}` : `-₹${Math.abs(stats.netGroupBalance)}`}
          </p>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Trips (Dynamic Feed) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Recent Trips</h2>
            <button 
              onClick={() => navigate('/dashboard/trips')}
              className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              See all <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-500 shadow-sm">
              <div className="animate-pulse flex flex-col items-center space-y-4">
                <div className="rounded-full bg-slate-100 h-12 w-12"></div>
                <div className="h-4 bg-slate-100 rounded w-1/3"></div>
              </div>
            </div>
          ) : trips.length === 0 ? (
            
            /* 4. PREMIUM EMPTY STATE CARD */
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-8 md:p-12 text-center shadow-sm flex flex-col items-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50/60 flex items-center justify-center border border-indigo-100/50">
                <Compass className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="space-y-2 max-w-sm">
                <h3 className="font-bold text-slate-800 text-lg">No active trips found</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Let's start planning your next journey! Use our workspace tools to plot routes, build itineraries, and organize details.
                </p>
              </div>
              <button 
                onClick={() => navigate('/dashboard/trips/create')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-sm font-bold shadow-md shadow-indigo-100 transition-all cursor-pointer"
              >
                Plan My First Trip
              </button>
            </div>

          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trips.map((trip) => (
                <div 
                  key={trip.id}
                  onClick={() => navigate(`/dashboard/trips/${trip.id}`)}
                  className="group bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{trip.destination}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 font-semibold">
                      <Calendar className="h-4 w-4 text-slate-400" /> {trip.startDate} - {trip.endDate}
                    </p>
                  </div>
                  
                  <div className="space-y-2 pt-2 border-t border-slate-50">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>Budget Allocations</span>
                      <span className="text-indigo-600">₹{(Number(trip.budget) || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Unified Brand Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Quick Actions</h2>
          
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-3">
            {[
              { 
                label: 'Record Expense', 
                desc: 'Log a dynamic individual or split payment.', 
                icon: Receipt, 
                path: '/dashboard/add-expense' 
              },
              { 
                label: 'Create Billing Group', 
                desc: 'Group together with trip members.', 
                icon: Users, 
                path: '/dashboard/create-group' 
              },
              { 
                label: 'Settlements Sheet', 
                desc: 'View real-time outstanding balances.', 
                icon: TrendingUp, 
                path: '/dashboard/groups' 
              }
            ].map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className="w-full flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50/80 text-left transition-all border border-transparent hover:border-slate-100 group cursor-pointer"
              >
                {/* Brand Cohesive Tints: Unified Indigo Theme */}
                <div className="h-12 w-12 shrink-0 rounded-xl bg-indigo-50/60 border border-indigo-100/50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200">
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{action.label}</p>
                  <p className="text-xs font-semibold text-slate-400 tracking-wide">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
