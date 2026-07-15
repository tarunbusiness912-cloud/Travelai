import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../services/authService";

function ResetPassword() {

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    const { error } =
      await updatePassword(password);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password Updated Successfully");

    navigate("/login");
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Reset Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-3 rounded-lg"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Update Password
          </button>

        </form>

      </div>

    </div>

  );
}

export default ResetPassword;