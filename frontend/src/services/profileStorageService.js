import { supabase } from "../lib/supabase";

export const uploadProfileImage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("profile-images")
    .upload(fileName, file);

  if (error) return { error };

  const { data } = supabase.storage
    .from("profile-images")
    .getPublicUrl(fileName);

  return {
    imageUrl: data.publicUrl,
  };
};