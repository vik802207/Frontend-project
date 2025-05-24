import { useState } from "react";
import { auth } from "../service/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function PhoneLoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState("");

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        handleSendOTP();
      }
    });
  };

  const handleSendOTP = async () => {
    setMessage("");
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setMessage("OTP sent to your phone.");
    } catch (err) {
      setMessage("Failed to send OTP: " + err.message);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await confirmationResult.confirm(otp);
      setMessage("Phone verified. Redirecting...");
      // Navigate to dashboard or home
    } catch (err) {
      setMessage("Invalid OTP.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login with Phone</h2>
      <input
        type="tel"
        placeholder="+91XXXXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button onClick={handleSendOTP} className="bg-blue-600 text-white p-2 w-full mb-4">
        Send OTP
      </button>

      {confirmationResult && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <button onClick={handleVerifyOTP} className="bg-green-600 text-white p-2 w-full">
            Verify OTP
          </button>
        </>
      )}

      <div id="recaptcha-container"></div>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}

export default PhoneLoginPage;
