import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/dashboard/Dashboard";
import BudgetPlanner from "../pages/dashboard/BudgetPlanner";
import Trips from "../pages/Trips";
import CreateTrip from "../pages/CreateTrip";
import TripDetails from "../pages/TripDetails";
import EditTrip from "../pages/EditTrip";
import Expenses from "../pages/Expenses";
import AddExpense from "../pages/AddExpense";
import EditExpense from "../pages/EditExpense";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import Groups from "../pages/Groups";
import CreateGroup from "../pages/CreateGroup";
import GroupDetails from "../pages/groups/GroupDetails";
import Wishlist from "../pages/wishlist/Wishlist";
import NotFound from "../pages/NotFound";

function DashboardShell() {
  return <ProtectedRoute><DashboardLayout /></ProtectedRoute>;
}

function RedirectWithId({ destination }) {
  const { id } = useParams();
  return <Navigate to={`${destination}/${id}`} replace />;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <Routes location={location}>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/dashboard" element={<DashboardShell />}>
          <Route index element={<Dashboard />} />
          <Route path="trips" element={<Trips />} />
          <Route path="trips/create" element={<CreateTrip />} />
          <Route path="trips/:id" element={<TripDetails />} />
          <Route path="trips/:id/edit" element={<EditTrip />} />
          <Route path="create-trip" element={<CreateTrip />} />
          <Route path="trip/:id" element={<TripDetails />} />
          <Route path="edit-trip/:id" element={<EditTrip />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="add-expense" element={<AddExpense />} />
          <Route path="edit-expense/:id" element={<EditExpense />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="groups" element={<Groups />} />
          <Route path="groups/:id" element={<GroupDetails />} />
          <Route path="create-group" element={<CreateGroup />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="budget" element={<BudgetPlanner />} />
        </Route>

        <Route path="/trips" element={<Navigate to="/dashboard/trips" replace />} />
        <Route path="/trips/create" element={<Navigate to="/dashboard/trips/create" replace />} />
        <Route path="/trips/:id" element={<RedirectWithId destination="/dashboard/trips" />} />
        <Route path="/create-trip" element={<Navigate to="/dashboard/create-trip" replace />} />
        <Route path="/trip/:id" element={<RedirectWithId destination="/dashboard/trip" />} />
        <Route path="/edit-trip/:id" element={<RedirectWithId destination="/dashboard/edit-trip" />} />
        <Route path="/expenses" element={<Navigate to="/dashboard/expenses" replace />} />
        <Route path="/add-expense" element={<Navigate to="/dashboard/add-expense" replace />} />
        <Route path="/edit-expense/:id" element={<RedirectWithId destination="/dashboard/edit-expense" />} />
        <Route path="/profile" element={<Navigate to="/dashboard/profile" replace />} />
        <Route path="/edit-profile" element={<Navigate to="/dashboard/edit-profile" replace />} />
        <Route path="/groups" element={<Navigate to="/dashboard/groups" replace />} />
        <Route path="/group/:id" element={<RedirectWithId destination="/dashboard/groups" />} />
        <Route path="/create-group" element={<Navigate to="/dashboard/create-group" replace />} />
        <Route path="/favorites" element={<Navigate to="/dashboard/wishlist" replace />} />
        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default AppRoutes;
