// src/pages/signup/index.tsx
"use client";
import React, { useState } from 'react';
import supabase from '../../lib/supabaseClient';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const { error: dbError } = await supabase
      .from('users')
      .insert([{ email, username }]);

    if (dbError) {
      setError(dbError.message);
      setLoading(false);
      return;
    }

    setSuccess('User registered successfully!');
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="text-black w-fit rounded-lg p-4 flex flex-col gap-4 shadow-md">
        <div className="text-center font-bold">Sign up</div>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        <form className="flex flex-col gap-6 items-center" onSubmit={handleSubmit}>
          <div className="flex flex-col text-sm gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="border border-gray-300 rounded-lg py-1 px-2 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col text-sm gap-1">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="border border-gray-300 rounded-lg py-1 px-2 text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col text-sm gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="border border-gray-300 rounded-lg py-1 px-2 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="border border-gray-300 py-1 px-2 rounded-lg bg-red-500 hover:bg-red-700 text-white duration-200"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
