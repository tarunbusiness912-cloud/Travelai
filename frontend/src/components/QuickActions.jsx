import { Link } from "react-router-dom";
import {
  PlusCircle,
  Plane,
  Heart,
  User,
} from "lucide-react";

function QuickActions() {
  return (
    <div className="grid md:grid-cols-4 gap-4 mb-10">

      <Link
        to="/create-trip"
        className="bg-blue-600 text-white rounded-2xl p-6 hover:scale-105 duration-300"
      >
        <PlusCircle size={32} />
        <h2 className="mt-3 font-bold">
          Create Trip
        </h2>
      </Link>

      <Link
        to="/ai-planner"
        className="bg-purple-600 text-white rounded-2xl p-6 hover:scale-105 duration-300"
      >
        <Plane size={32} />
        <h2 className="mt-3 font-bold">
          AI Planner
        </h2>
      </Link>

      <Link
        to="/trips"
        className="bg-pink-600 text-white rounded-2xl p-6 hover:scale-105 duration-300"
      >
        <Heart size={32} />
        <h2 className="mt-3 font-bold">
          Favorites
        </h2>
      </Link>

      <Link
        to="/profile"
        className="bg-green-600 text-white rounded-2xl p-6 hover:scale-105 duration-300"
      >
        <User size={32} />
        <h2 className="mt-3 font-bold">
          Profile
        </h2>
      </Link>

    </div>
  );
}

export default QuickActions;