import Navbar from "../components/Navbar";

function Profile() {
  return (
    <>
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold">
          Profile
        </h1>

        <p className="mt-4">
          User information will appear here.
        </p>
      </div>
    </>
  );
}

export default Profile;