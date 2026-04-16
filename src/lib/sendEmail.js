import { Resend } from 'resend';
import { OrderReceiptEmail } from '@/components/emails/OrderReceipt';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(orderData) {
  try {
    const { formData } = orderData;
    
    // IMPORTANT: Unless you have a verified domain on Resend, 
    // you can only send emails to the address you signed up with.
    // For production, you will use a custom domain.
    const fromEmail = "onboarding@resend.dev"; 
    
    const data = await resend.emails.send({
      from: `Pragati Creations <${fromEmail}>`,
      to: [formData.email], // Send to the customer
      subject: `Order Confirmation - ${orderData.orderId}`,
      react: React.createElement(OrderReceiptEmail, { orderData }),
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
