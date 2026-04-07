import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_API = "https://api-m.paypal.com"; // ✅ LIVE // sandbox first



// Generate Access Token
async function getPaypalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`).toString("base64");
  const { data } = await axios.post(
    `${PAYPAL_API}/v1/oauth2/token`,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return data.access_token;
}

// Create PayPal Order
app.post("/capture-paypal-order/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const accessToken = await getPaypalAccessToken();

    const { data } = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(data); // payment details
  } catch (err) {
    console.error("❌ Capture Error:", err.response?.data || err.message);
    res.status(500).json(err.response?.data || err.message);
  }
});

// Create PayPal Order
app.post("/create-paypal-order", async (req, res) => {
  try {
    const { amount, currency } = req.body;
    if (!amount) return res.status(400).json({ error: "Amount is required" });

    const accessToken = await getPaypalAccessToken();

    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency || "USD",
            value: amount.toString(),
          },
        },
      ],
    };

    const { data } = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      orderPayload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ Return order ID to frontend


  console.log("PAYPAL ORDER:", data); // 👈 MUST show { id: "..." }

 res.json({
  id: data.id
});// ✅ IMPORTANT

  } catch (err) {
    console.error("❌ Create PayPal Order Error:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

app.post("/create-razorpay-order", async (req, res) => {
  const { amount, currency } = req.body;
  const options = {
    amount: amount * 100, // in paise
    currency: currency || "INR",
    receipt: `rcpt_${Date.now()}`
  };
  const order = await razorpay.orders.create(options);
  res.json(order);
});

app.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, error: "Missing fields for verification" });
    }

    // Create the expected signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      // ✅ Signature is valid
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false, error: "Invalid signature" });
    }
  } catch (err) {
    console.error("❌ Razorpay Verify Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

/* 🔐 Generate Shiprocket Token */
const getShiprocketToken = async () => {
  try {
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD
      }
    );

    return response.data.token;

  } catch (error) {
    console.error("❌ Auth Error:", error.response?.data || error.message);
    throw new Error("Shiprocket Auth Failed");
  }
};
const cleanText = (text) => (text || "").trim();
/* 🌍 HSN MAPPING FUNCTION */
/* 🌍 HSN MAPPING FUNCTION */
const getHSN = (category) => {
  const cleanCat = (category || "").trim().toLowerCase(); // lowercase for comparison

  switch (cleanCat) {
    case "handicrafts": return "4420";
    case "fruits": return "0801";
    default: return "6109";
  }
};



/* 📦 Create Order API */
app.post("/create-order", async (req, res) => {

 
  try {
    const token = await getShiprocketToken();

    const { address, products, totalAmount } = req.body;

    // 🌍 COUNTRY ISO MAP
    const countryMap = {
      "India": "IN",
      "United States": "US",
      "United Kingdom": "GB",
      "Japan": "JP",
      "Australia": "AU",
      "Canada": "CA",
      "Germany": "DE",
      "France": "FR",
      "United Arab Emirates": "AE",
      "Saudi Arabia": "SA"
    };

    const countryName = address.country || "India";
    const countryCode = countryMap[countryName] || countryName;

    // ✅ Detect International
    const isInternational = countryCode !== "IN" ? 1 : 0;

    // 🧹 CLEAN ADDRESS
    const cleanAddress = {
      firstName: address.firstName?.trim(),
      lastName: address.lastName?.trim() || "",

      address: [
        address.addressLine1,
        address.addressLine2,
        address.landmark
      ].filter(Boolean).join(", ").trim(),

      city: address.city?.trim(),

      // State optional for international
      state: address.state?.trim() || "",

      country: countryCode,

      pincode: String(address.pinCode || address.zipCode),

      email: address.email,
      phone: address.phone
    };

     const rawPhone = String(cleanAddress.phone || "").trim().replace(/\D/g, "");

// Shiprocket format
const billingPhone = (cleanAddress.phone || "")
  .toString()
  .trim()
  .replace(/\D/g, "");
  const finalBillingPhone = isInternational ? billingPhone:`+91${billingPhone}`;
    // ✅ VALIDATION (SMART)
    if (
      !cleanAddress.firstName ||
      !cleanAddress.address ||
      !cleanAddress.city ||
      !cleanAddress.pincode ||
      !cleanAddress.country
    ) {
      return res.status(400).json({
        success: false,
        error: "Missing required address fields"
      });
    }

    console.log("📦 Sending Order:", {
      ...cleanAddress,
      isInternational
    });



    
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      {
        order_id: (isInternational ? "INT_" : "IND_") + Date.now(),
        order_date: new Date().toISOString(),

        pickup_location: "warehouse",

        // 🔥 AUTO SWITCH
        is_international: isInternational,

        billing_customer_name: cleanAddress.firstName,
        billing_last_name: cleanAddress.lastName,
        billing_address: cleanAddress.address,
        billing_city: cleanAddress.city,
        billing_pincode: cleanAddress.pincode,

        // ❗ fallback for international
        billing_state: cleanAddress.state || "NA",

        billing_country: cleanAddress.country,
        billing_email: cleanAddress.email,
    // Always convert to string and remove non-digits


// Then use in payload
billing_phone: finalBillingPhone,

        shipping_is_billing: true,

      order_items: products.map(item => {
  const cleanName = (item.name || "").trim();       // remove extra spaces
  const cleanCategory = (item.category || "").trim(); // remove extra spaces
   const hsnCode = getHSN(cleanCategory);

  console.log(`Item: ${cleanName}, Category: ${cleanCategory}, HSN: ${hsnCode}`); // debug
  return {
    name: cleanName,
    sku: item.id || "SKU001",
    units: item.quantity || 1,
    selling_price: item.price > 0 ? item.price : 1,
    hsn:hsnCode,
    category: cleanCategory
  };
}),

        payment_method: "Prepaid",
        sub_total: totalAmount > 0 ? totalAmount : 1,

        // 📦 REQUIRED
        length: 10,
        breadth: 10,
        height: 5,
        weight: 0.5
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("✅ Shiprocket Success:", response.data);

   // ✅ CHECK SHIPROCKET RESPONSE PROPERLY
if (response.data?.status !== 1) {
  console.error("❌ Shiprocket API Error:", response.data);

  return res.status(400).json({
    success: false,
    error: response.data
  });
}

// ✅ SUCCESS ONLY WHEN STATUS = 1
res.json({
  success: true,
  type: isInternational ? "International" : "Domestic",
  data: {
    order_id: response.data.order_id,
    shipment_id: response.data.shipment_id,
    awb_code: response.data.shipment_tracking[0]?.awb || "" // may be empty initially
  }
});

  } catch (error) {
  console.error("❌ Shiprocket Error:", error.response?.data || error.message);

  return res.status(400).json({
    success: false,
    error: error.response?.data || error.message
  });
}
});

// ✅ KEEP THIS OUTSIDE (top-level)
app.get("/api/track/:awb", async (req, res) => {
  try {
    const { awb } = req.params;

    const token = await getShiprocketToken(); // ✅ reuse function

    const trackRes = await axios.get(
      `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awb}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = trackRes.data;

    // ✅ HANDLE EMPTY TRACKING
    if (!data?.tracking_data || data.tracking_data.shipment_track.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tracking data available yet (Order not shipped)"
      });
    }

    res.json({
      success: true,
      data
    });

  } catch (err) {
    console.error("Tracking Error:", err.response?.data || err.message);

    res.status(500).json({
      success: false,
      error: err.response?.data || err.message
    });
  }
});

/* 🚀 Start Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});