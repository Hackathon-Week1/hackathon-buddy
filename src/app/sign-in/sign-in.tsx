"use client";

import { signInAction } from "@/server/sign-in";
import { useFormState } from "react-dom";

export default function Home() {
  const [state, signIn] = useFormState(signInAction, null);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-white w-2/5 rounded-lg p-4 flex flex-col gap-4">
          <div className="text-center font-bold">Sign in</div>
          <form action={signIn} className="flex flex-col gap-6">
            <div className="flex flex-col text-sm gap-1">
              {state?.fieldError?.error && (
                <div className="text-red-500 text-sm">
                  {state.fieldError.error}
                </div>
              )}
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="border border-white rounded-lg py-1 px-2 text-black"
              />
              {state?.fieldError?.email && (
                <div className="text-red-500 text-sm">
                  {state.fieldError.email}
                </div>
              )}
            </div>
            <div className="flex flex-col text-sm gap-1">
              <label htmlFor="username">Password</label>
              <input
                type="text"
                id="password"
                name="password"
                className="border border-white rounded-lg py-1 px-2 text-black"
              />
              {state?.fieldError?.password && (
                <div className="text-red-500 text-sm">
                  {state.fieldError.password}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="borde border-white py-1 px-2 rounded-lg bg-red-500 hover:bg-red-700 text-black duration-200">
              Sign in
            </button>
          </form>
          <div>
            Do not have an account?{" "}
            <span>
              <a className="text-blue-500 hover:underline" href="/sign-up">
                Sign up
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
