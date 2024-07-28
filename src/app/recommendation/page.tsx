import FindPeople from "./find-people";
import { supabaseServerClient } from "@/server/supabase";
import { redirect } from "next/navigation";

export default async function RecommendationPage() {
  // const {
  //   data: { user },
  // } = await supabaseServerClient.auth.getUser();

  // if (!user) {
  //   return redirect("/sign-in");
  // }
  return (
    <div className="flex flex-col items-center mt-40 justify-around">
      <div className="text-white">Find people like you!</div>
      <FindPeople />
    </div>
  );
}
