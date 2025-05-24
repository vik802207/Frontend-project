/* eslint-disable react-hooks/rules-of-hooks */
import { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function MFAPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, rememberDevice } = location.state || {};

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lockTimeout, setLockTimeout] = useState(null);

  // Mock OTP for demo
  const correctOTP = "123456";

  if (!email) {
    // No email passed; redirect to login
    navigate("/login");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (locked) {
      setError("Too many failed attempts. Please try again later.");
      return;
    }

    if (otp === correctOTP) {
      alert(
        `MFA verified! Login successful. ${
          rememberDevice ? "Device remembered." : ""
        }`
      );
      // Here you could set session etc.
      navigate("/");
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setLocked(true);
        setError("Too many failed attempts. Please try again after 15 minutes.");

        // Unlock after 15 minutes
        const timeout = setTimeout(() => {
          setLocked(false);
          setAttempts(0);
          setError("");
        }, 15 * 60 * 1000); // 15 minutes

        setLockTimeout(timeout);
      } else {
        setError("Invalid code. Please try again.");
      }
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (lockTimeout) clearTimeout(lockTimeout);
    };
  }, [lockTimeout]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Multi-Factor Authentication</h2>
        <p className="mb-4 text-center text-gray-700">
          Enter the 6-digit code sent to <strong>{email}</strong>
        </p>
        {error && <p className="mb-4 text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter OTP"
            className="w-full p-3 border rounded text-center text-xl tracking-widest"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={locked}
            required
          />
          <button
            type="submit"
            className={`w-full py-3 rounded text-white ${
              locked ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } transition`}
            disabled={locked}
          >
            Verify
          </button>
        </form>

        <button
          onClick={() => alert("Resend code functionality not implemented in mock.")}
          className="mt-4 w-full text-center text-blue-600 hover:underline"
          disabled={locked}
        >
          Resend Code
        </button>
      </div>
    </div>
  );
}

export default MFAPage;
