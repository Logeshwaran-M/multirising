import nodemailer from "nodemailer";

export default async function handler(req, res) {

  // ✅ CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const data = req.body;

  if (!data.email || !data.name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {

     const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    const type = data.type;

    // ✅ SAFE PRODUCT LIST
    const productList = Array.isArray(data.products)
      ? data.products.map(p => `<li>${p.name} × ${p.quantity} (₹${p.price})</li>`).join("")
      : "No products";

    // =========================
    // 📦 BULK ORDER
    // =========================
    if (type === "bulk") {

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "📦 New Bulk Order Request",
        html: `
          <h2>Bulk Order Request</h2>
          <p><b>Name:</b> ${data.name}</p>
          <p><b>Email:</b> ${data.email}</p>
          <p><b>Phone:</b> ${data.phone}</p>
          <p><b>Country:</b> ${data.country}</p>
          <p><b>Quantity:</b> ${data.quantity}</p>
          <p><b>Message:</b> ${data.message || "N/A"}</p>
        `,
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: "Bulk Request Received ✅",
        html: `
          <h2>Thank you ${data.name} 😊</h2>
          <p>Your bulk order request has been received.</p>
          <p>We will contact you soon.</p>
        `,
      });

    }

    // =========================
    // 🌍 INTERNATIONAL ORDER
    // =========================
    else if (type === "international") {

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "🌍 New International Order",
        html: `
          <h2>International Order</h2>
          <p><b>Name:</b> ${data.name}</p>
          <p><b>Email:</b> ${data.email}</p>
          <p><b>Phone:</b> ${data.phone}</p>
          <p><b>Country:</b> ${data.country}</p>

          <h3>Products:</h3>
          <ul>${productList}</ul>

          <h3>Total: ₹${data.total}</h3>
        `,
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: "Order Confirmed 🌍",
        html: `
          <h2>Thank you ${data.name} 😊</h2>
          <p>Your international order has been placed.</p>
          <p>Total: ₹${data.total}</p>
        `,
      });

    }

    // =========================
    // 🇮🇳 INDIAN ORDER
    // =========================
    else if (type === "indian") {

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "🇮🇳 New Indian Order",
        html: `
          <h2>Indian Order</h2>
          <p><b>Name:</b> ${data.name}</p>
          <p><b>Email:</b> ${data.email}</p>
          <p><b>Phone:</b> ${data.phone}</p>
          <p><b>City:</b> ${data.city}</p>
          <p><b>State:</b> ${data.state}</p>
          <p><b>Pincode:</b> ${data.pincode}</p>

          <h3>Products:</h3>
          <ul>${productList}</ul>

          <h3>Total: ₹${data.total}</h3>
        `,
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: "Order Confirmed 🇮🇳",
        html: `
          <h2>Thank you ${data.name} 🙏</h2>
          <p>Your order has been successfully placed.</p>
          <p>We will deliver soon.</p>

          <p><b>Total:</b> ₹${data.total}</p>
        `,
      });

    }
      else if (type === "contact") {

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "📧 New Contact Us Message",
        html: `
          <h2>New Contact Us Message</h2>
          <p><b>Name:</b> ${data.name}</p>
          <p><b>Email:</b> ${data.email}</p>
          <p><b>Phone:</b> ${data.phone || "N/A"}</p>
          <p><b>Message:</b> ${data.message}</p>
        `,
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: "Message Received ✅",
        html: `
          <h2>Thank you ${data.name} 😊</h2>
          <p>We have received your message and will get back to you soon.</p>
        `,
      });

    }


    // =========================
    // ❌ DEFAULT
    // =========================
    else {
      return res.status(400).json({ error: "Invalid order type" });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Email Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
