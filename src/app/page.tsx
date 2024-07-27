"use client";

import { signUpAction } from "@/server/sign-up";
import { useFormState } from "react-dom";

export default function Home() {
  const [state, signUp] = useFormState(signUpAction, null);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-white w-2/5 rounded-lg p-4 flex flex-col gap-4">
          <div className="text-center font-bold">Sign up</div>
          <form action={signUp} className="flex flex-col gap-6">
            <div className="flex flex-col text-sm gap-1">
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
            <div className="flex flex-col text-sm gap-1">
              <label htmlFor="username">Confirm password</label>
              <input
                type="text"
                id="confirmPassword"
                name="confirmPassword"
                className="border border-white rounded-lg py-1 px-2 text-black"
              />
              {state?.fieldError?.confirmPassword && (
                <div className="text-red-500 text-sm">
                  {state.fieldError.confirmPassword}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="borde border-white py-1 px-2 rounded-lg bg-red-500 hover:bg-red-700 text-black duration-200">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
