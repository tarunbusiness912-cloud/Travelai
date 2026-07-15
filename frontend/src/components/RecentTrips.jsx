import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getTrips } from "../services/tripService";

function RecentTrips() {

  const [trips, setTrips] = useState([]);

  useEffect(() => {

    loadTrips();

  }, []);

  const loadTrips = async () => {

    const { data } = await getTrips();

    if (data) {

      setTrips(data.slice(0,5));

    }

  };

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">

          Recent Trips

        </h2>

        <Link
          to="/trips"
          className="text-blue-600 font-semibold"
        >

          View All

        </Link>

      </div>

      {trips.length === 0 ? (

        <p className="text-gray-500">

          No trips available

        </p>

      ) : (

        <div className="space-y-4">

          {trips.map((trip) => (

            <Link
              key={trip.id}
              to={`/trip/${trip.id}`}
              className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-100 transition"
            >

              <div>

                <h3 className="font-bold">

                  {trip.destination}

                </h3>

                <p className="text-gray-500 text-sm">

                  {trip.start_date}

                </p>

              </div>

              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">

                View

              </span>

            </Link>

          ))}

        </div>

      )}

    </div>

  );

}

export default RecentTrips;