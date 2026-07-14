import { useEffect, useState } from "react";

import DashboardCard from "../components/DashboardCard";
import QuickActions from "../components/QuickActions";
import RecentTrips from "../components/RecentTrips";
import ActivityTimeline from "../components/ActivityTimeline";
import BudgetSummary from "../components/BudgetSummary";

import { Plane, Heart, Sparkles } from "lucide-react";

import {
  getTrips,
  getTripCount,
} from "../services/tripService";

import { getFavoriteCount } from "../services/favoriteService";

function Dashboard() {
  const [tripCount, setTripCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    // Total Trips
    const { count: totalTrips } = await getTripCount();
    setTripCount(totalTrips || 0);

    // Favorite Trips
    const { count: favorites } = await getFavoriteCount();
    setFavoriteCount(favorites || 0);

    // Recent Trips
    const { data } = await getTrips();

    if (data) {
      setTrips(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 p-8">

      {/* Welcome */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-gray-600 mt-2">
          Manage all your journeys from one place.
        </p>

      </div>

      {/* Quick Actions */}

      <QuickActions />

      {/* Statistics */}

      <div className="grid lg:grid-cols-3 gap-6 mt-8">

        <DashboardCard
          title="Total Trips"
          value={tripCount}
          color="bg-blue-600"
          icon={<Plane size={32} />}
        />

        <DashboardCard
          title="Favorite Trips"
          value={favoriteCount}
          color="bg-pink-600"
          icon={<Heart size={32} />}
        />

        <DashboardCard
          title="AI Plans"
          value="0"
          color="bg-purple-600"
          icon={<Sparkles size={32} />}
        />

      </div>

      {/* Bottom Section */}

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        <RecentTrips trips={trips} />

        <ActivityTimeline />

      </div>

      <div className="mt-10">

        <BudgetSummary />

      </div>

    </div>
  );
}

export default Dashboard;