import { supabase } from "../lib/supabase";

// Create Trip
export const createTrip = async (tripData) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return await supabase.from("trips").insert([
    {
      user_id: user.id,
      ...tripData,
    },
  ]);
};

// Get All Trips
export const getTrips = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return await supabase
    .from("trips")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
};

// Get One Trip
export const getTripById = async (id) => {
  return await supabase
    .from("trips")
    .select("*")
    .eq("id", id)
    .single();
};

// Update Trip
export const updateTrip = async (id, tripData) => {
  return await supabase
    .from("trips")
    .update(tripData)
    .eq("id", id);
};

// Delete Trip
export const deleteTrip = async (id) => {
  return await supabase
    .from("trips")
    .delete()
    .eq("id", id);
};

// Dashboard Count
export const getTripCount = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return await supabase
    .from("trips")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", user.id);
};

// Save AI Itinerary
export const saveItinerary = async (
  id,
  itinerary
) => {
  return await supabase
    .from("trips")
    .update({
      itinerary,
    })
    .eq("id", id);
};

// Save Cover Image
export const updateTripImage = async (
  id,
  imageUrl
) => {
  return await supabase
    .from("trips")
    .update({
      cover_image: imageUrl,
    })
    .eq("id", id);
};