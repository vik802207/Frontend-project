import React from "react";
import { useNavigate } from "react-router-dom";

const boxStyles = {
  common: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    margin: "16px auto",
    cursor: "pointer",
    userSelect: "none",
    width: "220px",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#222",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "background-color 0.3s",
  },
  oval: {
    borderRadius: "50%",
    backgroundColor: "#90cdf4", // light blue
  },
  parallelogram: {
    backgroundColor: "#f6ad55", // orange
    clipPath:
      "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)", // parallelogram shape
  },
  diamond: {
    backgroundColor: "#f56565", // red
    width: "140px",
    height: "140px",
    transform: "rotate(45deg)",
    color: "#fff",
    fontWeight: "700",
    fontSize: "18px",
    userSelect: "none",
  },
  diamondText: {
    transform: "rotate(-45deg)",
  },
  rectangle: {
    backgroundColor: "#48bb78", // green
    borderRadius: "8px",
  },
};

export default function DashboardFlowchart() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        backgroundColor: "#f7fafc",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: 32, fontWeight: "700" }}>
        Authentication Flowchart
      </h1>

      {/* Start */}
      <div
        onClick={() => alert("Start of flow")}
        style={{ ...boxStyles.common, ...boxStyles.oval, marginBottom: 40 }}
      >
        Start (Oval)
      </div>

      {/* User Input */}
      <div
        onClick={() => navigate("/login")}
        style={{ ...boxStyles.common, ...boxStyles.parallelogram }}
        title="User Input: Enter Credentials"
      >
        Enter Credentials (User Input - Parallelogram)
      </div>

      {/* Decision */}
      <div
        style={{
          margin: "40px auto",
          width: "140px",
          height: "140px",
          position: "relative",
          cursor: "pointer",
        }}
        onClick={() => navigate("/mfa")}
        title="Decision Point: MFA Required?"
      >
        <div style={{ ...boxStyles.common, ...boxStyles.diamond }}>
          <div style={boxStyles.diamondText}>MFA Required?</div>
        </div>
      </div>

      {/* Backend Process */}
      <div
        onClick={() => alert("API call to verify user")}
        style={{ ...boxStyles.common, ...boxStyles.rectangle, marginTop: 40 }}
        title="Backend process: API call, validation"
      >
        API Call & Validation (Rectangle)
      </div>

      {/* End */}
      <div
        onClick={() => alert("End of flow")}
        style={{ ...boxStyles.common, ...boxStyles.oval, marginTop: 60 }}
      >
        End (Oval)
      </div>
    </div>
  );
}
