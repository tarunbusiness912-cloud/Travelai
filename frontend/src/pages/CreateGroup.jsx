import { useState } from "react";
import { useNavigate } from "react-router-dom";
import groupService from "../services/groupService";

function CreateGroup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    destination: "",
    start_date: "",
    end_date: "",
    cover_image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await groupService.createGroup(formData);
      alert("Group Created Successfully");
      navigate("/dashboard/groups");
    } catch (error) {
      alert(error.message || "Unable to create group.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">

      <div className="bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold mb-8">
          Create Travel Group
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="block mb-2 font-semibold">
              Group Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-xl p-4"
              placeholder="Goa Friends Trip"
              required
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-xl p-4"
              placeholder="Describe your travel group..."
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Destination
            </label>

            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full border rounded-xl p-4"
              placeholder="Goa"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 font-semibold">
                Start Date
              </label>

              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

            </div>

            <div>

              <label className="block mb-2 font-semibold">
                End Date
              </label>

              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

            </div>

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Cover Image URL
            </label>

            <input
              type="text"
              name="cover_image"
              value={formData.cover_image}
              onChange={handleChange}
              className="w-full border rounded-xl p-4"
              placeholder="https://..."
            />

          </div>

          <div className="pt-4">

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold"
            >
              {loading
                ? "Creating Group..."
                : "Create Group"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateGroup;
