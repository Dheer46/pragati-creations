import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { saveOrderToSupabase } from "@/lib/supabaseOrders";
import { sendOrderConfirmation } from "@/lib/sendEmail";

export async function POST(req) {
  try {
    const { formData, cart, amount } = await req.json();
    const session = await getServerSession(authOptions);

    if (!formData || !cart || !amount) {
      return NextResponse.json({ error: "Missing required order data" }, { status: 400 });
    }

    // Generate a unique COD order ID
    const orderId = `COD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const orderData = {
      orderId,
      formData,
      cart,
      amount
    };

    // Save to Supabase with session email if available
    await saveOrderToSupabase(orderData, "COD", session?.user?.email);

    // Send email to customer
    await sendOrderConfirmation(orderData);

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("COD Checkout Error:", error);
    return NextResponse.json({ error: "Failed to process COD order" }, { status: 500 });
  }
}
