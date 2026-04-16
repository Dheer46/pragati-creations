import crypto from "crypto";
import { NextResponse } from "next/server";
import { saveOrderToSheet } from "@/lib/googleSheets";
import { sendOrderConfirmation } from "@/lib/sendEmail";

export async function POST(req) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      formData,
      cart,
      amount
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment verified, save to Google Sheets
      if (formData && cart) {
        const orderData = {
          orderId: razorpay_payment_id, // We use payment_id as the final receipt ID
          formData,
          cart,
          amount
        };
        await saveOrderToSheet(orderData, "Online");
        await sendOrderConfirmation(orderData);
      }

      return NextResponse.json({ success: true, message: "Payment verified successfully" });
    } else {
      return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 });
    }
  } catch (error) {
    console.error("Razorpay Verification Error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
