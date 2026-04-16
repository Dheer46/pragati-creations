import { NextResponse } from "next/server";
import { saveOrderToSheet } from "@/lib/googleSheets";
import { sendOrderConfirmation } from "@/lib/sendEmail";

export async function POST(req) {
  try {
    const { formData, cart, amount } = await req.json();

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

    // Save to Google Sheets in the background (or wait for it)
    await saveOrderToSheet(orderData, "COD");

    // Send email to customer
    await sendOrderConfirmation(orderData);

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("COD Checkout Error:", error);
    return NextResponse.json({ error: "Failed to process COD order" }, { status: 500 });
  }
}
