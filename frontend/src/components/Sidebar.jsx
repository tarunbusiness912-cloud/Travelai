import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-10">
        TravelOS
      </h1>

      <nav className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="hover:bg-slate-700 p-3 rounded"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/trips"
          className="hover:bg-slate-700 p-3 rounded"
        >
          ✈️ Trips
        </Link>

        <Link
          to="/create-trip"
          className="hover:bg-slate-700 p-3 rounded"
        >
          ➕ Create Trip
        </Link>

        <Link
          to="/profile"
          className="hover:bg-slate-700 p-3 rounded"
        >
          👤 Profile
        </Link>

      </nav>
    </div>
  );
}

export default Sidebar;