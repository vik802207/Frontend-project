import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  auth,
  db,
  provider,
  signInWithPopup,
} from "../service/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import ReCAPTCHA from "react-google-recaptcha";
import "./SignupPage.css";

function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const isPasswordStrong = (pwd) =>
    pwd.length >= 8 && /[A-Z]/.test(pwd) && /\d/.test(pwd);

  const realSignup = async ({ name, email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
      createdAt: new Date(),
    });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      alert(`Welcome, ${user.displayName}!`);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Google sign-in failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isPasswordStrong(password)) {
      setError(
        "Password must be at least 8 characters long, contain an uppercase letter, and a number."
      );
      return;
    }

    if (!captchaVerified) {
      setError("Please complete the CAPTCHA verification.");
      return;
    }

    try {
      await realSignup({ name, email, password });
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-page">
      <div className="particles-bg"></div>

      <div className="signup-card">
        <h1 className="form-title">Create Your Account</h1>

        {error && <p className="msg error">{error}</p>}
        {success && <p className="msg success">{success}</p>}

        <form onSubmit={handleSubmit} className="signup-wow-form">
          <div className="input-group">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder=" "
              autoComplete="name"
            />
            <label htmlFor="name">Full Name</label>
            <span className="focus-border"></span>
          </div>

          <div className="input-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
              autoComplete="email"
            />
            <label htmlFor="email">Email Address</label>
            <span className="focus-border"></span>
          </div>

          <div className="input-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
              autoComplete="new-password"
            />
            <label htmlFor="password">Password</label>
            <span className="focus-border"></span>
          </div>

          <p className="password-hint">
            Password must be at least 8 characters, contain an uppercase letter and a number.
          </p>

          <div className="captcha-wrap">
            <ReCAPTCHA
              sitekey="6Ld4PEcrAAAAALIpiOhpygovIUBURK0ZHEi_XGA3"
              onChange={handleCaptchaChange}
            />
          </div>

          <button
            type="submit"
            disabled={!captchaVerified}
            className={`btn-signup ${captchaVerified ? "active" : "disabled"}`}
          >
            Sign Up
          </button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="btn-google-signin"
          type="button"
          aria-label="Sign in with Google"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="google-icon"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.355C34.447 33.674 29.04 38 23 38 14.715 38 8 31.285 8 23S14.715 8 23 8c3.792 0 7.292 1.43 9.9 3.762l6.982-6.982C33.593 3.47 28.563 2 23 2 11.85 2 3 10.85 3 22s8.85 20 20 20c11.116 0 19.785-8.35 19.785-20 0-1.342-.157-2.645-.374-3.917z"
            />
            <path
              fill="#FF3D00"
              d="M6.306 14.691l6.567 4.813A13.945 13.945 0 0112 23c0 1.61.344 3.14.94 4.557l-6.634 5.057C5.49 29.33 4.5 26.283 4.5 23c0-3.268 1.015-6.299 2.806-8.309z"
            />
            <path
              fill="#4CAF50"
              d="M23 44c5.388 0 10.282-1.86 14.037-4.995l-6.638-5.382A11.888 11.888 0 0123 38c-6.279 0-11.589-4.167-13.328-9.954l-6.631 5.107C8.126 40.608 15.052 44 23 44z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.355c-1.108 3.288-3.72 6.087-6.993 7.422l6.658 5.497C37.886 34.19 42 28.32 42 22c0-1.34-.157-2.645-.389-3.917z"
            />
          </svg>
          Sign in with Google
        </button>

        <p className="redirect-text">
          Already have an account?{" "}
          <Link to="/login" className="redirect-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
