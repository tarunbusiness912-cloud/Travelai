import { supabase } from "../lib/supabase";

export const uploadTripImage = async (file) => {
  if (!file) return { data: null, error: "No file selected" };

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("trip-images")
    .upload(fileName, file);

  if (error) {
    return { data: null, error };
  }

  const { data } = supabase.storage
    .from("trip-images")
    .getPublicUrl(fileName);

  return {
    data: data.publicUrl,
    error: null,
  };
};