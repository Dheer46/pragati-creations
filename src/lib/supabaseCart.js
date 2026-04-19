import { supabaseAdmin as supabase } from './supabase';

/**
 * Fetches the persistent cart for a user from Supabase.
 */
export async function getCartByEmail(email) {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .ilike('user_email', email);

    if (error) throw error;
    
    // Map DB items to the format expected by the frontend cart state
    return data.map(item => ({
      id: item.product_id,
      name: item.name,
      price: parseFloat(item.price),
      image: item.image,
      quantity: item.quantity
    }));
  } catch (error) {
    console.error("Supabase Get Cart Error:", error);
    return [];
  }
}

/**
 * Syncs the current local cart items to Supabase for the given user.
 * This function handles adding/updating/deleting by calculating the difference
 * or simply overwriting for simplicity (overwriting is safer for small carts).
 */
export async function syncCartToSupabase(email, items) {
  try {
    // 1. Delete existing items for this user to perform a clean sync
    const { error: deleteError } = await supabase
      .from('cart_items')
      .delete()
      .ilike('user_email', email);

    if (deleteError) throw deleteError;

    if (items.length === 0) return true;

    // 2. Insert new items
    const dbItems = items.map(item => ({
      user_email: email,
      product_id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity
    }));

    const { error: insertError } = await supabase
      .from('cart_items')
      .insert(dbItems);

    if (insertError) throw insertError;
    return true;
  } catch (error) {
    console.error("Supabase Sync Cart Error:", error);
    return false;
  }
}

/**
 * Clears the user's cart in Supabase after a successful checkout.
 */
export async function clearUserCart(email) {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .ilike('user_email', email);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Supabase Clear Cart Error:", error);
    return false;
  }
}
