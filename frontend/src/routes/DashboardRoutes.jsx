import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import BudgetPlanner from '../pages/dashboard/BudgetPlanner';
import Trips from '../pages/Trips';
import Expenses from '../pages/Expenses';
import Groups from '../pages/Groups';
import GroupDetails from '../pages/groups/GroupDetails';
import Wishlist from '../pages/wishlist/Wishlist';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="trips" element={<Trips />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="groups" element={<Groups />} />
        <Route path="groups/:id" element={<GroupDetails />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="budget" element={<BudgetPlanner />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;