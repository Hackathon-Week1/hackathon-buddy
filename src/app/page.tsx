import React from 'react';

const SignUpPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="text-black w-fit rounded-lg p-4 flex flex-col gap-4 shadow-md">
        <div className="text-center font-bold">Sign up</div>
        <form className="flex flex-col gap-6 items-center">
          <div className="flex flex-col text-sm gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="border border-gray-300 rounded-lg py-1 px-2 text-black"
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
            />
          </div>
          <button
            type="submit"
            className="border border-gray-300 py-1 px-2 rounded-lg bg-red-500 hover:bg-red-700 text-white duration-200">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

