import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../service/firebase";

const functions = getFunctions(app);

export async function sendOtpToEmail(email) {
  try {
    const sendOtpEmail = httpsCallable(functions, "sendOtpEmail");
    const result = await sendOtpEmail({ email });
    return result.data.success;
  } catch (error) {
    console.error("Failed to send OTP:", error);
    return false;
  }
}
