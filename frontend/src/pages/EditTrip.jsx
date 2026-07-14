import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTripById, updateTrip } from "../services/tripService";

function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  useEffect(() => {
    loadTrip();
  }, []);

  const loadTrip = async () => {
    const { data, error } = await getTripById(id);

    if (error) {
      console.error(error);
      alert("Trip not found");
      return;
    }

    setTitle(data.title || "");
    setDestination(data.destination || "");
  };

  const handleUpdate = async (e) => {
  e.preventDefault();

  const { data, error } = await updateTrip(id, {
    title,
    destination,
  });

  console.log("Updated Data:", data);
  console.log("Error:", error);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Trip Updated Successfully");

  navigate("/trips");
};

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

      <h1 className="text-4xl font-bold mb-8">
        Edit Trip
      </h1>

      <form
        onSubmit={handleUpdate}
        className="space-y-5"
      >

        <input
          type="text"
          placeholder="Trip Title"
          className="w-full border p-3 rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Destination"
          className="w-full border p-3 rounded-lg"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Update Trip
        </button>

      </form>

    </div>
  );
}

export default EditTrip;