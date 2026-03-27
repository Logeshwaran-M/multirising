import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import { parsePhoneNumberFromString } from "libphonenumber-js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


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

    const countryCode = address.country || "IN";

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

    const rawPhone = String(cleanAddress.phone || "").trim();

const phoneNumber = parsePhoneNumberFromString(
  rawPhone,
  cleanAddress.country // MUST be ISO like "US", "IN"
);

if (!phoneNumber || !phoneNumber.isValid()) {
  return res.status(400).json({
    success: false,
    error: "Invalid phone number"
  });
}

const finalBillingPhone = phoneNumber.format("E.164"); 
// Example: +919876543210 / +14155552671
    // ✅ VALIDATION (SMART)
    if (finalBillingPhone.length < 8) {
  return res.status(400).json({
    success: false,
    error: "Invalid phone length"
  });
}
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
shipping_phone: finalBillingPhone,

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
  data: response.data
});

  } catch (error) {
  console.error("❌ Shiprocket Error:", error.response?.data || error.message);

  return res.status(400).json({
    success: false,
    error: error.response?.data || error.message
  });
}
});

/* 🚀 Start Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});