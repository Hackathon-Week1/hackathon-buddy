"use server";

import { z } from "zod";
import { supabaseServerClient } from "./supabase";

const ProfileSchema = z.object({
  name: z.string(),
  skills: z.string().array(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  industry: z.string().array(),
  seek: z.string().array(),
});

export async function profileAction(_: unknown, formData: FormData) {
  const object = {
    name: formData.get("name") as string,
    skills: formData.getAll("skills") as string[],
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    country: formData.get("country") as string,
    industry: formData.getAll("industry") as string[],
    seek: formData.getAll("seek") as string[],
  };
  const parsed = ProfileSchema.safeParse(object);

  if (!parsed.success) {
    const error = parsed.error.flatten();
    return {
      fieldError: {
        name: error.fieldErrors.name?.[0],
        skills: error.fieldErrors.skills?.[0],
        city: error.fieldErrors.city?.[0],
        state: error.fieldErrors.state?.[0],
        country: error.fieldErrors.country?.[0],
        industry: error.fieldErrors.industry?.[0],
        seek: error.fieldErrors.seek?.[0],
      },
    };
  }

  const { name, skills, city, state, country, industry, seek } = parsed.data;
  const location = `${city}, ${state}, ${country}`;

  const { error } = await supabaseServerClient.from("users_profile").upsert({
    name: name,
    skills: skills,
    location: location,
    industry: industry,
    seek: seek,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  return null;
}
