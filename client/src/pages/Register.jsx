import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input type="text" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} className="border p-2 m-2" />
      <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} className="border p-2 m-2" />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} className="border p-2 m-2" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
};

export default Register;
