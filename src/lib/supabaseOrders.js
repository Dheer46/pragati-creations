import { supabaseAdmin as supabase } from './supabase';

export async function saveOrderToSupabase(orderData, paymentType, sessionEmail = null) {
  try {
    const { orderId, formData, cart, amount } = orderData;
    
    // Format the date for Supabase
    const date = new Date().toISOString();

    // Format the Items array into a readable string for the legacy UI
    const itemsString = cart
      .map(item => `${item.quantity}x ${item.name} (₹${item.price})`)
      .join(', ');

    // Prepare address as a single string
    const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`;

    // Use session email if logged in, otherwise fallback to form email (guest)
    const orderEmail = sessionEmail || formData.email;

    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          order_id: orderId,
          user_email: orderEmail,
          customer_name: formData.name,
          customer_phone: formData.phone,
          address: fullAddress,
          amount: amount,
          items: itemsString,
          payment_method: paymentType,
          status: 'Processing',
          created_at: date
        }
      ]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Supabase Save Error:", error);
    return false;
  }
}

export async function getOrdersByEmail(email) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .ilike('user_email', email)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Map Supabase fields to the format expected by the frontend
    return data.map(order => ({
      date: new Date(order.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      orderId: order.order_id,
      amount: `₹${order.amount}`,
      items: order.items,
      status: order.status,
      paymentMethod: order.payment_method
    }));
  } catch (error) {
    console.error("Supabase Fetch Error:", error);
    return [];
  }
}
