import { useEffect, useState } from "react";
import {
  getTrips,
  deleteTrip,
} from "../services/tripService";

import TripCard from "../components/TripCard";
import { useNavigate } from "react-router-dom";

function Trips() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const filteredTrips = trips.filter((trip) =>
  trip.title.toLowerCase().includes(search.toLowerCase())
);

  const loadTrips = async () => {
    const { data, error } = await getTrips();

    if (error) {
      console.error(error);
      return;
    }

    setTrips(data);
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const handleDelete = async (id) => {
    await deleteTrip(id);

    loadTrips();
  };

  return (
    <div>

      <h1 className="text-4xl font-bold mb-6">
        My Trips
      </h1>

      {trips.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow">
          No trips found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onDelete={handleDelete}
            />
          ))}
        </div>
        
        
      )}

      <input
        type="text"
        placeholder="Search trips..."
        className="w-full border p-3 rounded-lg mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>
  );
}

export default Trips;