import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../service/firebase";
import { sendOtpToEmail } from "./sendOtpToEmail";

import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      const sent = await sendOtpToEmail(email);
      if (sent) {
        navigate("/dashboard", { state: { email } });
      } else {
        setError("Failed to send OTP, please try again.");
      }
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("User not found.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else {
        setError("Login failed. Please try again.");
      }
      console.error("Login error:", err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      alert(`Welcome back, ${user.displayName}!`);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Google sign-in failed.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Log In</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="form-footer">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <button type="submit" className="login-button">
          Log In
        </button>
      </form>

      <button type="button" onClick={handleGoogleLogin} className="google-button">
        {/* Google icon SVG */}
        <svg viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#4285F4"
            d="M533.5 278.4c0-18.6-1.5-37.2-4.7-55.3H272v104.7h147.3c-6.3 33.8-25.3 62.5-54 81.6v67h87.3c51-47 80.9-116 80.9-198z"
          />
          <path
            fill="#34A853"
            d="M272 544.3c73.4 0 135.2-24.2 180.2-65.9l-87.3-67c-24.3 16.3-55.4 26-92.9 26-71 0-131.1-47.8-152.7-112.2H27.4v70.7c44.4 87.5 134.9 148.4 244.6 148.4z"
          />
          <path
            fill="#FBBC05"
            d="M119.3 322.8c-10.6-31.4-10.6-65.2 0-96.6v-70.7H27.4c-39.3 77.9-39.3 171.8 0 249.7l91.9-70.7z"
          />
          <path
            fill="#EA4335"
            d="M272 107.7c39.9 0 75.9 13.7 104.2 40.5l78.1-78.1C406.7 24.2 344.9 0 272 0 162.3 0 71.8 60.9 27.4 148.4l91.9 70.7c21.6-64.4 81.7-112.2 152.7-112.2z"
          />
        </svg>
        Sign in with Google
      </button>

      <p className="signup-text">
        Don't have an account?{" "}
        <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}

export default LoginPage;
