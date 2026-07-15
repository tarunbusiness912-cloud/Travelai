import { supabase } from '../lib/supabase';

const wishlistService = {
  // Get all bucket list items for the active user
  getWishlist: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Authentication required');

    const { data, error } = await supabase
      .from('wishlist')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Add item to bucket list
  addToWishlist: async (itemData) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Authentication required');

    const { data, error } = await supabase
      .from('wishlist')
      .insert([{
        user_id: user.id,
        destination_name: itemData.destination_name,
        location_country: itemData.location_country,
        image_url: itemData.image_url || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
        notes: itemData.notes
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Toggle visited checkmark status
  toggleVisited: async (id, currentStatus) => {
    const { data, error } = await supabase
      .from('wishlist')
      .update({ is_visited: !currentStatus })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete wishlist item entirely
  deleteFromWishlist: async (id) => {
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};

export default wishlistService;