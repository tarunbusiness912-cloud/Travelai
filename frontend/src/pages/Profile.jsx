import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../services/profileService";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data } = await getProfile();

    if (data) {
      setProfile(data);
    }

    setLoading(false);
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

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-40"></div>

        <div className="px-10 pb-10">

          <div className="-mt-20 flex flex-col items-center">

            <img
              src={
                profile?.avatar_url ||
                "https://placehold.co/200x200?text=User"
              }
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg"
            />

            <h1 className="text-4xl font-bold mt-5">
              {profile?.full_name || "No Name"}
            </h1>

            <p className="text-gray-500 mt-2">
              {profile?.email}
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div className="bg-gray-100 rounded-xl p-5">
              <h3 className="font-semibold">Phone</h3>
              <p className="mt-2">
                {profile?.phone || "-"}
              </p>
            </div>

            <div className="bg-gray-100 rounded-xl p-5">
              <h3 className="font-semibold">Country</h3>
              <p className="mt-2">
                {profile?.country || "-"}
              </p>
            </div>

          </div>

          <div className="mt-8">

            <h2 className="text-2xl font-bold">
              About Me
            </h2>

            <p className="mt-4 text-gray-600 leading-8">
              {profile?.bio || "No Bio Added"}
            </p>

          </div>

          <div className="mt-10 text-center">

            <Link
              to="/edit-profile"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
            >
              Edit Profile
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;