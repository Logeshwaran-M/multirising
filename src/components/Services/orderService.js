import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

export const placeOrder = async (userId, orderData) => {
  try {

    const order = {
      ...orderData,
      orderStatus: "Pending",
      createdAt: serverTimestamp()
    };

    await addDoc(collection(db, "users", userId, "orders"), order);

    console.log("✅ Order saved successfully");

  } catch (error) {
    console.error("❌ Error placing order:", error);
  }
};