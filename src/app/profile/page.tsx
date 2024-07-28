import { redirect } from "next/navigation";
import ProfileForm from "./profile-form";
import { supabaseServerClient } from "@/server/supabase";
import SignOutButton from "./sign-out-button";

export default async function ProfilePage() {
  // const {
  //   data: { user },
  // } = await supabaseServerClient.auth.getUser();

  // if (!user) {
  //   return redirect("/sign-in");
  // }
  return (
    <>
      <SignOutButton />
      <div className="flex flex-col items-center justify-center">
        <ProfileForm />
      </div>
    </>
  );
}
