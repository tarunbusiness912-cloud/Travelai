import { supabase } from "../lib/supabase";

// Get Logged-in User Profile
export const getProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
};

// Save or Update Profile
export const saveProfile = async (profile) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      ...profile,
    });
};