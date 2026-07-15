import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getProfile,
  saveProfile,
} from "../services/profileService";

import { uploadProfileImage } from "../services/profileStorageService";

function EditProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data, error } = await getProfile();

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    if (data) {
      setFullName(data.full_name || "");
      setPhone(data.phone || "");
      setCountry(data.country || "");
      setBio(data.bio || "");
      setAvatarUrl(data.avatar_url || "");
    }

    setLoading(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const { imageUrl, error } =
      await uploadProfileImage(file);

    if (error) {
      alert(error.message);
      return;
    }

    setAvatarUrl(imageUrl);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setSaving(true);

    const { error } = await saveProfile({
      full_name: fullName,
      phone,
      country,
      bio,
      avatar_url: avatarUrl,
    });

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profile Updated Successfully");

    navigate("/profile");
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 h-40"></div>

        <div className="-mt-20 flex flex-col items-center">

          <img
            src={
              avatarUrl ||
              "https://placehold.co/200x200?text=User"
            }
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-xl"
          />

          <input
            type="file"
            accept="image/*"
            className="mt-5"
            onChange={handleImageUpload}
          />

        </div>

        <div className="p-10">

          <h1 className="text-4xl font-bold text-center mb-10">
            Edit Profile
          </h1>

          <form
            onSubmit={handleSave}
            className="space-y-6"
          >

            <div>

              <label className="font-semibold block mb-2">
                Full Name
              </label>

              <input
                type="text"
                className="w-full border rounded-xl p-3"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
              />

            </div>

            <div>

              <label className="font-semibold block mb-2">
                Phone Number
              </label>

              <input
                type="text"
                className="w-full border rounded-xl p-3"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />

            </div>

            <div>

              <label className="font-semibold block mb-2">
                Country
              </label>

              <input
                type="text"
                className="w-full border rounded-xl p-3"
                value={country}
                onChange={(e) =>
                  setCountry(e.target.value)
                }
              />

            </div>

            <div>

              <label className="font-semibold block mb-2">
                About Me
              </label>

              <textarea
                rows="5"
                className="w-full border rounded-xl p-3"
                value={bio}
                onChange={(e) =>
                  setBio(e.target.value)
                }
              />

            </div>

            <div className="flex gap-4 pt-4">

              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditProfile;