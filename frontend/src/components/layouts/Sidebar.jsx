import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Compass, DollarSign, Users, Briefcase, LogOut, WalletCards } from 'lucide-react';
import { logoutUser } from '../../services/authService';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const links = [
    { to: '/dashboard', icon: Home, label: 'Overview' },
    { to: '/dashboard/trips', icon: Compass, label: 'My Trips' },
    { to: '/dashboard/budget', icon: WalletCards, label: 'AI Planner' },
    { to: '/dashboard/expenses', icon: DollarSign, label: 'Expenses' },
    { to: '/dashboard/groups', icon: Users, label: 'Groups' },
    { to: '/dashboard/wishlist', icon: Briefcase, label: 'Wishlist' },
  ];

  const handleSignOut = async () => {
    setIsSigningOut(true);
    const { error } = await logoutUser();
    setIsSigningOut(false);

    if (error) {
      alert(error.message || 'Unable to sign out.');
      return;
    }

    navigate('/login', { replace: true });
  };

  return (
    <aside className="w-64 bg-slate-950/55 text-slate-300 flex flex-col h-full border-r border-white/10 shrink-0 backdrop-blur-xl">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="h-9 w-9 rounded-xl bg-amber-200 text-slate-950 flex items-center justify-center font-black">T</div>
        <div>
          <span className="text-white font-black tracking-tight text-lg">TravelOS</span>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-100/70">India</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  isActive ? 'bg-white/10 text-white shadow-md shadow-black/20 border border-white/10' : 'hover:bg-white/5 hover:text-slate-100 border border-transparent'
                }`
              }
            >
              <Icon size={18} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button onClick={handleSignOut} disabled={isSigningOut} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-rose-400 hover:bg-rose-500/10 rounded-xl transition disabled:opacity-60">
          <LogOut size={18} />
          {isSigningOut ? 'Signing Out...' : 'Sign Out'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
