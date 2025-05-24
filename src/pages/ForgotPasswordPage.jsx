import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../service/firebase";
import "./ForgotPasswordPage.css";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "If this email exists in our system, a reset link has been sent."
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="glass-card">
        <h2 className="title">Forgot Password</h2>

        {error && <p className="message error">{error}</p>}
        {message && <p className="message success">{message}</p>}

        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <input
              type="email"
              placeholder=" "
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              spellCheck={false}
              autoComplete="email"
            />
            <label className="floating-label">Email Address</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn-submit ${loading ? "disabled" : ""}`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="redirect-text">
          Remembered your password?{" "}
          <Link to="/login" className="redirect-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
