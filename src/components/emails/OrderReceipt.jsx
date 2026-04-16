import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const OrderReceiptEmail = ({ orderData }) => {
  const { orderId, formData, cart, amount } = orderData;
  const date = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Html>
      <Head />
      <Preview>Your Pragati Creations Order Receipt</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Pragati Creations</Heading>
          
          <Section style={messageSection}>
            <Text style={h1}>Thank you for your order, {formData.name.split(' ')[0]}!</Text>
            <Text style={text}>
              We've received your order and are getting it ready to be shipped. 
              We will notify you once it's on its way.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={detailsSection}>
            <Row>
              <Column>
                <Text style={label}>Order ID</Text>
                <Text style={value}>{orderId}</Text>
              </Column>
              <Column>
                <Text style={label}>Date</Text>
                <Text style={value}>{date}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section style={itemsSection}>
            <Heading as="h2" style={h2}>Order Summary</Heading>
            {cart.map((item) => (
              <Row key={item.id} style={itemRow}>
                <Column style={{ width: '60px' }}>
                  <Img src={item.image} width="50" height="50" style={itemImage} alt={item.name} />
                </Column>
                <Column>
                  <Text style={itemName}>{item.name}</Text>
                  <Text style={itemSubtext}>Qty: {item.quantity}</Text>
                </Column>
                <Column align="right">
                  <Text style={itemPrice}>₹{(item.price * item.quantity).toLocaleString()}</Text>
                </Column>
              </Row>
            ))}
            
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Total</Text>
              </Column>
              <Column align="right">
                <Text style={totalValue}>₹{amount.toLocaleString()}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section style={shippingSection}>
            <Heading as="h2" style={h2}>Shipping Address</Heading>
            <Text style={text}>
              {formData.name}<br />
              {formData.address},<br />
              {formData.city}, {formData.state} - {formData.pincode}<br />
              Phone: {formData.phone}
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Need help? Reply to this email or contact us at support@pragaticreations.com
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderReceiptEmail;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 0 48px",
  marginBottom: "64px",
  border: "1px solid #e6ebf1",
  borderRadius: "5px",
  maxWidth: "600px",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  textAlign: "center",
  color: "#d4af37", // Gold theme
  margin: "0 0 24px",
  fontFamily: 'serif',
};

const messageSection = {
  padding: "0 48px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.25",
  margin: "16px 0",
};

const h2 = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0 0 16px",
};

const text = {
  color: "#555",
  fontSize: "16px",
  lineHeight: "24px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "24px 0",
};

const detailsSection = {
  padding: "0 48px",
};

const label = {
  color: "#8898aa",
  fontSize: "12px",
  textTransform: "uppercase",
  margin: "0",
};

const value = {
  color: "#333",
  fontSize: "16px",
  margin: "4px 0 0",
};

const itemsSection = {
  padding: "0 48px",
};

const itemRow = {
  marginBottom: "16px",
};

const itemImage = {
  borderRadius: "4px",
  objectFit: "cover",
};

const itemName = {
  fontSize: "16px",
  color: "#333",
  margin: "0",
};

const itemSubtext = {
  fontSize: "14px",
  color: "#8898aa",
  margin: "4px 0 0",
};

const itemPrice = {
  fontSize: "16px",
  color: "#333",
  fontWeight: "500",
  margin: "0",
};

const totalRow = {
  marginTop: "24px",
  paddingTop: "24px",
  borderTop: "1px solid #e6ebf1",
};

const totalLabel = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333",
  margin: "0",
};

const totalValue = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#d4af37",
  margin: "0",
};

const shippingSection = {
  padding: "0 48px",
};

const footer = {
  padding: "0 48px",
  marginTop: "48px",
};

const footerText = {
  fontSize: "14px",
  color: "#8898aa",
  textAlign: "center",
};
