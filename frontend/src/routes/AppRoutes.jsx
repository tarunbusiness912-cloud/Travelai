import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Trips from "../pages/Trips";
import CreateTrip from "../pages/CreateTrip";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import EditTrip from "../pages/EditTrip";
import TripDetails from "../pages/TripDetails";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= PROTECTED DASHBOARD ROUTES ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Trips />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-trip"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CreateTrip />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/trip/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <TripDetails />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= 404 ROUTE ================= */}

        <Route
          path="*"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />
        <Route
          path="/edit-trip/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EditTrip />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;