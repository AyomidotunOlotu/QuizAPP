import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_BASE = "https://quizapp-fhss.onrender.com";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!isValidEmail(email)) e.email = "Please enter a valid email";
    if (!password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    setSubmitError("");
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
      if (res.data.success) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (err) {
      setSubmitError(err?.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)", width: "100%", maxWidth: "420px" }}>
        <h2 style={{ textAlign: "center", color: "#1e1b4b", marginBottom: "8px", fontSize: "24px" }}>Welcome Back</h2>
        <p style={{ textAlign: "center", color: "#64748b", marginBottom: "28px", fontSize: "14px" }}>Login to your account</p>

        {submitError && (
          <div style={{ background: "#fee2e2", color: "#dc2626", padding: "10px 14px", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" }}>
            {submitError}
          </div>
        )}

        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500", color: "#374151" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ ...inputStyle, borderColor: errors.email ? "#ef4444" : "#e2e8f0" }}
          />
          {errors.email && <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500", color: "#374151" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ ...inputStyle, borderColor: errors.password ? "#ef4444" : "#e2e8f0" }}
          />
          {errors.password && <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.password}</p>}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "13px",
            background: loading ? "#6366f1" : "#4338ca",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#64748b" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#4338ca", fontWeight: "500" }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
