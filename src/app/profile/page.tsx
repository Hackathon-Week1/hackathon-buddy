import { redirect } from "next/navigation";
import ProfileForm from "./profile-form";
import { supabaseServerClient } from "@/server/supabase";

export default async function ProfilePage() {
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ProfileForm />
    </div>
  );
}
