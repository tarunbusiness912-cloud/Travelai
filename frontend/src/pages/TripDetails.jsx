import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import {
  getTripById,
  saveItinerary,
  deleteTrip,
} from "../services/tripService";

import { generateItinerary } from "../services/aiService";
import { getCoordinates, getWeather } from "../services/weatherService";

import MapView from "../components/MapView";

import defaultImage from "../assets/default-trip.jpg";

function TripDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);

  const [weather, setWeather] = useState(null);

  const [locationName, setLocationName] = useState("");

  const [latitude, setLatitude] = useState(null);

  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    loadTrip();
  }, []);

  const loadTrip = async () => {

    const { data, error } = await getTripById(id);

    if (error) {
      console.error(error);
      return;
    }

    setTrip(data);

    loadWeather(data.destination);

  };

  const loadWeather = async (destination) => {

    try {

      const location = await getCoordinates(destination);

      setLatitude(location.latitude);

      setLongitude(location.longitude);

      setLocationName(
        `${location.name}, ${location.country}`
      );

      const currentWeather = await getWeather(
        location.latitude,
        location.longitude
      );

      setWeather(currentWeather);

    } catch (err) {

      console.error(err);

    }

  };
  const handleGenerateAI = async () => {

  const itinerary = generateItinerary(trip);

  const { error } = await saveItinerary(
    trip.id,
    itinerary
  );

  if (error) {
    alert(error.message);
    return;
  }

  setTrip({
    ...trip,
    itinerary,
  });

  alert("AI Itinerary Generated Successfully!");

};

const handleDelete = async () => {

  const ok = window.confirm(
    "Delete this trip?"
  );

  if (!ok) return;

  const { error } = await deleteTrip(trip.id);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Trip Deleted");

  navigate("/trips");

};

  const getWeatherText = (code) => {

    if (code === 0) return "☀️ Sunny";

    if (code === 1) return "🌤 Mainly Clear";

    if (code === 2) return "⛅ Partly Cloudy";

    if (code === 3) return "☁️ Cloudy";

    if (code >= 51 && code <= 67) return "🌧 Rain";

    if (code >= 71 && code <= 77) return "❄️ Snow";

    if (code >= 80 && code <= 82) return "🌦 Showers";

    if (code >= 95) return "⛈ Thunderstorm";

    return "Unknown";

  };

  if (!trip) {

    return (

      <div className="text-center mt-20 text-2xl">

        Loading...

      </div>

    );

  }

  return (

    <div className="max-w-6xl mx-auto p-6">

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <img
          src={trip.cover_image || defaultImage}
          alt={trip.title}
          className="w-full h-96 object-cover"
        />

        <div className="p-10">

          <h1 className="text-5xl font-bold">
            {trip.title}
          </h1>

          <p className="text-xl text-gray-500 mt-3">
            📍 {trip.destination}
          </p>

          {/* Weather */}

          {weather && (

            <div className="mt-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-6 shadow-xl">

              <h2 className="text-2xl font-bold mb-4">

                🌦 Current Weather

              </h2>

              <p className="text-lg">

                {locationName}

              </p>

              <div className="grid md:grid-cols-4 gap-6 mt-6">

                <div>

                  <p className="text-sm opacity-80">

                    Condition

                  </p>

                  <p className="text-xl font-bold">

                    {getWeatherText(weather.weather_code)}

                  </p>

                </div>

                <div>

                  <p className="text-sm opacity-80">

                    Temperature

                  </p>

                  <p className="text-3xl font-bold">

                    {weather.temperature_2m}°C

                  </p>

                </div>

                <div>

                  <p className="text-sm opacity-80">

                    Humidity

                  </p>

                  <p className="text-2xl font-bold">

                    {weather.relative_humidity_2m}%

                  </p>

                </div>

                <div>

                  <p className="text-sm opacity-80">

                    Wind Speed

                  </p>

                  <p className="text-2xl font-bold">

                    {weather.wind_speed_10m} km/h

                  </p>

                </div>

              </div>

            </div>

          )}

          {/* Map */}

          {latitude && longitude && (

            <div className="mt-10">

              <h2 className="text-3xl font-bold mb-5">

                🗺 Trip Location

              </h2>

              <MapView

                latitude={latitude}

                longitude={longitude}

                destination={trip.destination}

              />

            </div>

          )}

          {/* Trip Info */}

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div className="bg-gray-100 rounded-2xl p-6">

              <h3 className="font-semibold">

                Budget

              </h3>

              <p className="text-4xl font-bold mt-3">

                ₹{trip.budget}

              </p>

            </div>

            <div className="bg-gray-100 rounded-2xl p-6">

              <h3 className="font-semibold">

                Created On

              </h3>

              <p className="text-xl mt-3">

                {new Date(
                  trip.created_at
                ).toLocaleDateString()}

              </p>

            </div>

          </div>

          {/* Description */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold">

              Description

            </h2>

            <p className="mt-4 text-gray-600 leading-8">

              {trip.description ||
                "No description available."}
 
            </p>

          </div>
          {trip.itinerary && (
            <div className="mt-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold mb-5">
                🤖 AI Travel Itinerary
              </h2>
          <pre className="whitespace-pre-wrap leading-8 text-lg font-sans">
                {trip.itinerary}
          </pre>

          </div>
          )}

          {/* Buttons */}

          <div className="flex flex-wrap gap-4 mt-10">

            <Link
              to={`/edit-trip/${trip.id}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl"
            >
              ✏️ Edit Trip
            </Link>

            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
            >
              🗑 Delete
            </button>

            <button
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl"
            >
              ❤️ Favorite
            </button>

            <button
              onClick={handleGenerateAI}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              🤖 Generate AI Itinerary
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default TripDetails;