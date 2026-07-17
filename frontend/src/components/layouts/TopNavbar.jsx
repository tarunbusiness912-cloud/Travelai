import React from 'react';
// Step up ONCE (../) out of layouts/ to reach components/, then into notifications/
import NotificationDropdown from '../notification/NotificationsDropdown.jsx';

const TopNavbar = ({ userAvatar, userName }) => {
  return (
    <header className="h-16 border-b border-white/10 bg-slate-950/35 text-slate-100 flex items-center justify-between px-8 sticky top-0 z-40 w-full backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-bold capitalize">Unified Travel Workspace</h2>
      </div>

      <div className="flex items-center gap-4">
        <NotificationDropdown />
        
        <div className="h-6 w-px bg-white/10" />
        
        <div className="flex items-center gap-2">
          {userAvatar ? (
            <img src={userAvatar} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-amber-200 text-slate-950 font-bold flex items-center justify-center text-xs">
              {userName?.charAt(0).toUpperCase() || 'E'}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
