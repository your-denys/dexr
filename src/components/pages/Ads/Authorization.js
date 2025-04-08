import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebaseConfig";


const Authorization = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

export { auth, Authorization };
