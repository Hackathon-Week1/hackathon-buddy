"use server";

import { supabaseServerClient } from "./supabase";
import { redirect } from "next/navigation";

export async function signOutAction() {
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  if (!user) {
    return;
  }

  const { error } = await supabaseServerClient.auth.signOut();

  if (error) {
    return {
      error: error.message,
    };
  }

  return redirect("/sign-in");
}
