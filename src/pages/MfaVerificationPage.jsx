import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../service/firebase";  // Firestore import

function MfaVerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!email) navigate("/login");
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Email not found. Please login again.");
      return;
    }

    try {
      const otpDocRef = doc(db, "otps", email);
      const otpDocSnap = await getDoc(otpDocRef);

      if (!otpDocSnap.exists()) {
        setError("No OTP found or it has expired. Please login again.");
        return;
      }

      const { otp: storedOtp, expiresAt } = otpDocSnap.data();

      if (Date.now() > expiresAt) {
        // OTP expired
        await deleteDoc(otpDocRef); // delete expired OTP
        setError("OTP expired. Please request a new login.");
        return;
      }

      if (otp === storedOtp) {
        // OTP valid
        await deleteDoc(otpDocRef); // clear OTP after successful verification
        setSuccess("MFA verified successfully. Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setError("Invalid OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Verification failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-center">OTP Verification</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border rounded p-3 text-center text-lg tracking-widest"
            placeholder="Enter OTP"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default MfaVerificationPage;
