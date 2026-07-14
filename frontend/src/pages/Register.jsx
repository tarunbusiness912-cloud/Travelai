import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

  const { error } = await signUp(email, password);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Account created successfully");
};
  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow rounded">
      <h2 className="text-3xl font-bold mb-6">Register</h2>

      <form onSubmit={handleRegister} className="space-y-4">

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-600 text-white p-3 rounded">
          Register
        </button>

      </form>
    </div>
  );
}

export default Register;