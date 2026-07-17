import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layouts/Sidebar';
import TopNavbar from '../components/layouts/TopNavbar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen travelos-bg overflow-hidden text-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar userName="Explorer" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
