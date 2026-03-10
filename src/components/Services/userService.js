import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const createUser = async (user) => {
  await setDoc(doc(db, "users", user.uid), {
    name: user.displayName,
    email: user.email,
    createdAt: new Date()
  });
};