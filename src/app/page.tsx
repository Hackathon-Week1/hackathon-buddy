"use client";

import { signUpAction } from "@/server/sign-up";
import { useFormState } from "react-dom";

export default function Home() {
  const [state, signUp] = useFormState(signUpAction, null);
  return (
    <>
      <div className="text-white">Hello world!</div>
    </>
  );
}
