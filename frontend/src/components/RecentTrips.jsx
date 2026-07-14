function RecentTrips({ trips }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      <h2 className="text-2xl font-bold mb-5">
        Recent Trips
      </h2>

      {trips.length === 0 ? (
        <p>No Trips Yet</p>
      ) : (
        trips.slice(0, 5).map((trip) => (
          <div
            key={trip.id}
            className="border-b py-4"
          >
            <h3 className="font-semibold">
              {trip.title}
            </h3>

            <p className="text-gray-500">
              📍 {trip.destination}
            </p>
          </div>
        ))
      )}

    </div>
  );
}

export default RecentTrips;