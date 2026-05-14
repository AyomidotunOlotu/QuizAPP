import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken") || localStorage.getItem("token");
      setLoggedIn(!!token);
    } catch (e) {
      setLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav style={{
      background: "#1e1b4b",
      color: "white",
      padding: "12px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    }}>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>⚡ Tech Quiz Master</span>
      </Link>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {loggedIn ? (
          <>
            <Link to="/result" style={{
              color: "#a5b4fc",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
            }}>
              My Results
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "#4338ca",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              color: "#a5b4fc",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
            }}>
              Login
            </Link>
            <Link to="/signup" style={{
              background: "#4338ca",
              color: "white",
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
            }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
