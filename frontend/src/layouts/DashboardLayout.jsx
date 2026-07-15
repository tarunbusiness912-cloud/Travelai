import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layouts/Sidebar';
import TopNavbar from '../components/layouts/TopNavbar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar now pulled from the components/layouts folder */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar Header */}
        <TopNavbar userName="Explorer" />
        
        {/* Render space for routed paths */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;