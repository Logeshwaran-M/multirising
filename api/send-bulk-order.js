import nodemailer from "nodemailer";

export default async function handler(req, res) {

  // ✅ CORS FIX
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ✅ Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const data = req.body;

  if (!data.email || !data.name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Product list
    const productList = data.products
      ?.map(p => `<li>${p.name} × ${p.quantity} (₹${p.price})</li>`)
      .join("");

    // 📧 ADMIN EMAIL
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "🚀 New International Order",
      html: `
        <h2>New Order</h2>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Country:</b> ${data.country}</p>

        <h3>Products:</h3>
        <ul>${productList}</ul>

        <h3>Total: ₹${data.total}</h3>
      `,
    });

    // 📧 CUSTOMER EMAIL
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: "Order Received ✅",
      html: `
        <h2>Thank you ${data.name} 😊</h2>
        <p>Your order has been received.</p>
        <p>We will contact you shortly.</p>

        <h3>Total: ₹${data.total}</h3>

        <br/>
        <p>Regards,<br/><b>Your Brand</b></p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Email Error:", error);
    return res.status(500).json({ error: "Email failed" });
  }
}