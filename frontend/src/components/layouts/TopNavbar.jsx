import React from 'react';
// Step up ONCE (../) out of layouts/ to reach components/, then into notifications/
import NotificationDropdown from '../notification/NotificationsDropdown.jsx';

const TopNavbar = ({ userAvatar, userName }) => {
  return (
    <header className="h-16 border-b border-slate-100 bg-white flex items-center justify-between px-8 sticky top-0 z-40 w-full">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-bold text-slate-700 capitalize">Workspace Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <NotificationDropdown />
        
        <div className="h-6 w-px bg-slate-200" />
        
        <div className="flex items-center gap-2">
          {userAvatar ? (
            <img src={userAvatar} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
              {userName?.charAt(0).toUpperCase() || 'E'}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
