import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function saveOrderToSheet(orderData, paymentType) {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // handle formatting
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

    await doc.loadInfo(); // loads document properties and worksheets
    
    // Validate we have the required sheets
    const sheet = doc.sheetsByTitle[paymentType]; // Either 'Online' or 'COD'
    
    if (!sheet) {
      console.error(`Sheet with title "${paymentType}" not found!`);
      return false;
    }

    // Format the date
    const date = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Ensure headers exist (if empty, we set them based on our data structure)
    try {
      await sheet.setHeaderRow([
        'Date', 'Order ID', 'Name', 'Email', 'Phone', 'Address', 'Total Amount', 'Items'
      ]);
    } catch (e) {
      // Ignored if headers are already set or sheet contains data
    }

    // Format the Items array into a readable string
    const itemsString = orderData.cart
      .map(item => `${item.quantity}x ${item.name} (₹${item.price})`)
      .join(', ');

    // Add row
    await sheet.addRow({
      'Date': date,
      'Order ID': orderData.orderId,
      'Name': orderData.formData.name,
      'Email': orderData.formData.email,
      'Phone': orderData.formData.phone,
      'Address': `${orderData.formData.address}, ${orderData.formData.city}, ${orderData.formData.state} - ${orderData.formData.pincode}`,
      'Total Amount': `₹${orderData.amount}`,
      'Items': itemsString,
    });

    return true;
  } catch (error) {
    console.error("Google Sheets Error:", error);
    return false;
  }
}

export async function getOrdersByEmail(email) {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    let allOrders = [];

    // Helper to extract orders from a specific sheet
    const extractOrders = async (sheetObj, paymentMethod) => {
      if (!sheetObj) return;
      const rows = await sheetObj.getRows();
      rows.forEach(row => {
        // Headers: Date, Order ID, Name, Email, Phone, Address, Total Amount, Items
        const rowEmail = row.get('Email');
        if (rowEmail && rowEmail.toLowerCase() === email.toLowerCase()) {
          allOrders.push({
            date: row.get('Date'),
            orderId: row.get('Order ID'),
            amount: row.get('Total Amount'),
            items: row.get('Items'),
            status: "Processing",
            paymentMethod: paymentMethod
          });
        }
      });
    };

    // Check 'Online' and 'COD' sheets
    await extractOrders(doc.sheetsByTitle['Online'], 'Online');
    await extractOrders(doc.sheetsByTitle['COD'], 'COD');

    // Sort mostly descending based on date. As parsing "en-IN" localestring back to Date might be complex,
    // we return them directly, usually sheets append to bottom so reverse is latest first.
    return allOrders.reverse();

  } catch (error) {
    console.error("Google Sheets Error fetching orders:", error);
    return [];
  }
}
