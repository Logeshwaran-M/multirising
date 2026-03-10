const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Stripe = require("stripe");

admin.initializeApp();
const db = admin.firestore();

const stripe = new Stripe("YOUR_STRIPE_SECRET_KEY");

exports.createStripeSession = functions.https.onCall(async (data, context) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "International Order" },
          unit_amount: data.amount * 100,
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cart",
  });

  return { id: session.id };
});

exports.saveOrder = functions.https.onCall(async (data, context) => {
  const { type, orderData } = data;

  if (type === "indian") {
    await db.collection("indianOrders").add(orderData);
  } else {
    await db.collection("internationalOrders").add(orderData);
  }

  return { success: true };
});

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "YOUR_KEY",
  key_secret: "YOUR_SECRET",
});

exports.createRazorpayOrder = functions.https.onCall(async (data) => {
  const order = await razorpay.orders.create({
    amount: data.amount * 100,
    currency: "INR",
  });

  return order;
});