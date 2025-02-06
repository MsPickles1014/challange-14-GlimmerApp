import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(form);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard"); // Redirect to a protected route
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {error && <p className="text-red-500">{error}</p>}
      <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} className="border p-2 m-2" />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} className="border p-2 m-2" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
};

export default Login;
