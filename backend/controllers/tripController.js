let trips = [];

const getTrips = (req, res) => {
  res.json(trips);
};

const createTrip = (req, res) => {
  const { title, destination } = req.body;

  if (!title || !destination) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newTrip = {
    id: Date.now(),
    title,
    destination,
  };

  trips.push(newTrip);

  res.json({ message: "Trip created", trip: newTrip });
};

const deleteTrip = (req, res) => {
  const { id } = req.params;

  trips = trips.filter(trip => trip.id != id);

  res.json({ message: "Trip deleted" });
};

module.exports = {
  getTrips,
  createTrip,
  deleteTrip,
};