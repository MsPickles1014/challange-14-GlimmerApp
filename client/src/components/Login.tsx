import React, { useState } from 'react';

interface LoginFormData {
  username: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({ username: '', password: '' });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Dummy login logic (replace with API call)
    if (formData.username === 'user' && formData.password === 'password') {
      // Simulate successful login
      console.log('Logged in successfully');
      setLoading(false);
    } else {
      setError('Invalid credentials');
      setLoading(false);
    }
  };