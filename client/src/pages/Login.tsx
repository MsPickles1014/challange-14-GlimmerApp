import { useState, type FormEvent, type ChangeEvent } from 'react';

import Auth from '../utils/auth'; // Using Auth utility for login management
import { login } from '../api/authAPI'; // Using login function from auth API
import type { UserLogin } from '../interfaces/UserLogin';

const Login = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token); // Authenticate using Auth utility
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  return (
    <div className="bg-[#f8f1e4] min-h-screen flex items-center justify-center">
      <div className="bg-[#e0c9a6] p-8 rounded-lg shadow-2xl w-96 border-4 border-[#5a3e2b]">
        {/* Title with Historical Theme */}
        <h1 className="text-2xl font-bold font-serif text-[#5a3e2b] text-center border-b-2 border-[#5a3e2b] pb-2">
          📜 The Grand Archives 📜
        </h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-[#5a3e2b] font-serif">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginData.username || ''}
              onChange={handleChange}
              className="w-full p-2 border border-[#5a3e2b] rounded-lg bg-[#f8f1e4] text-[#5a3e2b] shadow-inner"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-[#5a3e2b] font-serif">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password || ''}
              onChange={handleChange}
              className="w-full p-2 border border-[#5a3e2b] rounded-lg bg-[#f8f1e4] text-[#5a3e2b] shadow-inner"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#8b5a2b] text-white px-4 py-2 rounded-lg w-full shadow-md hover:bg-[#6d4321] transition font-serif text-lg"
          >
            Enter the Archives
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;