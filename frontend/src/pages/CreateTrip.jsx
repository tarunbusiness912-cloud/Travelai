import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTrip } from "../services/tripService";
import { uploadTripImage } from "../services/storageService";
import ImageUploader from "../components/ImageUploader";

function CreateTrip() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let imageUrl = "";

    // Upload image first
    if (image) {
      const { data, error } = await uploadTripImage(image);

      if (error) {
        setLoading(false);
        alert(error.message || "Image upload failed");
        return;
      }

      imageUrl = data;
    }

    // Save trip
    const { error } = await createTrip({
      title,
      destination,
      budget,
      description,
      cover_image: imageUrl,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Trip Created Successfully");

    navigate("/trips");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex justify-center items-center p-6">

      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-10">

        <h1 className="text-4xl font-bold text-center mb-8">
          ✈️ Create New Trip
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Trip Title */}

          <div>
            <label className="font-semibold">
              Trip Title
            </label>

            <input
              type="text"
              placeholder="Summer Vacation"
              className="w-full mt-2 border rounded-xl p-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Destination */}

          <div>
            <label className="font-semibold">
              Destination
            </label>

            <input
              type="text"
              placeholder="Goa"
              className="w-full mt-2 border rounded-xl p-4"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>

          {/* Budget */}

          <div>
            <label className="font-semibold">
              Budget
            </label>

            <input
              type="number"
              placeholder="25000"
              className="w-full mt-2 border rounded-xl p-4"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>

          {/* Description */}

          <div>
            <label className="font-semibold">
              Description
            </label>

            <textarea
              rows="4"
              placeholder="Write about your trip..."
              className="w-full mt-2 border rounded-xl p-4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Upload Image */}

          <div>
            <label className="font-semibold block mb-2">
              Trip Cover Image
            </label>

            <ImageUploader
              onImageSelect={(file) => setImage(file)}
            />
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-4 rounded-xl transition"
          >
            {loading ? "Creating Trip..." : "Create Trip"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateTrip;