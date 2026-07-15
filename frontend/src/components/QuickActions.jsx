import { Link } from "react-router-dom";
import {
  PlusCircle,
  Wallet,
  Plane,
  User,
  Heart,
  Users,
} from "lucide-react";

function QuickActions() {
  const actions = [
    {
      title: "Create Trip",
      icon: <Plane size={30} />,
      color: "bg-blue-600",
      link: "/create-trip",
    },
    {
      title: "Add Expense",
      icon: <Wallet size={30} />,
      color: "bg-green-600",
      link: "/add-expense",
    },
    {
      title: "My Trips",
      icon: <PlusCircle size={30} />,
      color: "bg-purple-600",
      link: "/trips",
    },
    {
      title: "Profile",
      icon: <User size={30} />,
      color: "bg-orange-500",
      link: "/profile",
    },
    {
      title: "Wishlist",
      icon: <Heart size={30} />,
      color: "bg-pink-600",
      link: "/favorites",
    },
    {
      title: "Groups",
      icon: <Users size={30} />,
      color: "bg-cyan-600",
      link: "/groups",
    },
  ];

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-5">

        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.link}
            className={`${action.color} rounded-2xl p-6 text-white hover:scale-105 transition`}
          >
            <div className="flex justify-center mb-4">
              {action.icon}
            </div>

            <h3 className="text-center font-semibold">
              {action.title}
            </h3>
          </Link>
        ))}

      </div>

    </div>
  );
}

export default QuickActions;