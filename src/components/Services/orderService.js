import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const placeOrder = async (userId, orderData) => {
  try {
    await addDoc(collection(db, "users", userId, "orders"), {
      ...orderData,
      createdAt: serverTimestamp()
    });

    console.log("Order saved successfully");
  } catch (error) {
    console.error("Error placing order:", error);
  }
};