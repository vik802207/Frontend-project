import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MFAPage from "./pages/MFAPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import MfaVerificationPage from "./pages/MfaVerificationPage";
import PhoneLoginPage from "./pages/PhoneLoginPage";
import DashboardFlowchart from "./pages/DashboardFlowchart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify" element={<PhoneLoginPage/>} />
      <Route path="/dashboard" element= {<DashboardFlowchart/>} />

    </Routes>
  );
}

export default App;
