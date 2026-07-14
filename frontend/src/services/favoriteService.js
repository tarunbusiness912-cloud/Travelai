import { supabase } from "../lib/supabase";

// Add Favorite
export const addFavorite = async (tripId) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return await supabase
    .from("favorites")
    .insert([
      {
        user_id: user.id,
        trip_id: tripId,
      },
    ]);
};

// Remove Favorite
export const removeFavorite = async (tripId) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user.id)
    .eq("trip_id", tripId);
};

// Get All Favorites
export const getFavorites = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id);
};

// Check Favorite
export const isFavorite = async (tripId) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id)
    .eq("trip_id", tripId)
    .maybeSingle();
};

// Favorite Count
export const getFavoriteCount = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return await supabase
    .from("favorites")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", user.id);
};