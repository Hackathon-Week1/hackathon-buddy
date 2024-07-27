import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    const { data, error } = await supabase.from('users').insert([
      { email, username, password }
    ]);

    if (error) {
      console.error('Error signing up:', error);
    } else {
      console.log('User signed up:', data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="text-black w-fit rounded-lg p-4 flex flex-col gap-4 shadow-md">
        <div className="text-center font-bold text-lg">Sign up</div>
        <form onSubmit={handleSignUp} className="flex flex-col gap-6 items-center">
          <div className="flex flex-col text-sm gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
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
              autoComplete="username"
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
              autoComplete="new-password"
              required
              className="border border-gray-300 rounded-lg py-1 px-2 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="border border-gray-300 py-2 px-4 rounded-lg bg-red-500 hover:bg-red-700 text-white duration-200">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
