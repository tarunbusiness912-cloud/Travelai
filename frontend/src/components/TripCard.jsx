import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from "../services/favoriteService";

function TripCard({ trip, onDelete }) {
  const navigate = useNavigate();

  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    checkFavorite();
  }, []);

  const checkFavorite = async () => {
    const { data } = await isFavorite(trip.id);

    if (data) {
      setFavorite(true);
    }
  };

  const handleFavorite = async () => {
    if (favorite) {
      await removeFavorite(trip.id);
      setFavorite(false);
    } else {
      await addFavorite(trip.id);
      setFavorite(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition">

      <h2 className="text-2xl font-bold">
        {trip.title}
      </h2>

      <p className="text-gray-600 mt-2">
        📍 {trip.destination}
      </p>

      <p className="mt-2">
        💰 Budget: ₹{trip.budget || 0}
      </p>

      <div className="mt-6 flex gap-3">

        <button
          onClick={() => navigate(`/edit-trip/${trip.id}`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(trip.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>

        <button
          onClick={() => navigate(`/trip/${trip.id}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          View
        </button>

        <button
          onClick={handleFavorite}
          className={`px-4 py-2 rounded-lg transition ${
            favorite
              ? "bg-pink-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {favorite ? "❤️ Favorited" : "🤍 Favorite"}
        </button>

      </div>

    </div>
  );
}

export default TripCard;