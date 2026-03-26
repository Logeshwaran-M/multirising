import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

export const placeOrder = async (userId, orderData) => {
  try {
    const order = {
      ...orderData,
      orderStatus: "Pending",
      createdAt: serverTimestamp()
    };

    // 1️⃣ Save to Firebase
    const docRef = await addDoc(
      collection(db, "users", userId, "orders"),
      order
    );

    console.log("✅ Order saved:", docRef.id);

    // 2️⃣ Send to backend (Shiprocket)
    const response = await fetch("https://multirising-1.onrender.com/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        orderId: docRef.id,
        userId,
        ...orderData
      })
    });

    const result = await response.json();

    console.log("🚚 Shiprocket response:", result);

  } catch (error) {
    console.error("❌ Error placing order:", error);
  }
};
