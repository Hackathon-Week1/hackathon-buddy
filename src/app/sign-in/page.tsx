import SignIn from "./sign-in";
import { supabaseServerClient } from "@/server/supabase";
import { redirect } from "next/navigation";

export default async function Home() {
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  if (user) {
    return redirect("/profile");
  }

  return (
    <>
      <SignIn />
    </>
  );
}
