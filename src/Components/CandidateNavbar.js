import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
const CandidateNavbar = () => {
  const candiateid = sessionStorage.getItem("candiateid")
  const navigate = useNavigate()
  useEffect(() => {
    if (!candiateid) {
      navigate("/candidatesuserlogin");
    }
  }, [candiateid, navigate]);

  if (!candiateid) {
    return null; // Don't render navbar while redirecting
  }
  const handleRemove = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    navigate('/')

  }

  return (
    <>
      {/* Themed Navbar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 32px",
        backgroundColor: "#1976d2", // Primary theme color
        color: "white",
        fontFamily: "Roboto, sans-serif",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
      }}>

        {/* Brand */}
        <h1 style={{
          margin: 0,
          fontSize: "22px",
          fontWeight: 600,
          letterSpacing: "0.5px"
        }}>
          CareerLink
        </h1>

        {/* Links + Button */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link
            to="/candidateprofile"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "16px",
              fontWeight: 500,
              padding: "6px 10px",
              borderRadius: "4px",
              transition: "background-color 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.2)"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
          >
            Candidate Profile
          </Link>

          <Link
            to="/candidates/joblistings"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "16px",
              fontWeight: 500,
              padding: "6px 10px",
              borderRadius: "4px",
              transition: "background-color 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.2)"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
          >
            Jobs
          </Link>


          <Link
            to="/candidates/appliedjobs"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "16px",
              fontWeight: 500,
              padding: "6px 10px",
              borderRadius: "4px",
              transition: "background-color 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.2)"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
          >
            Applied jobs
          </Link>

          <button
            onClick={handleRemove}
            style={{
              backgroundColor: "#ffffff",
              color: "#1976d2",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              transition: "background-color 0.2s, box-shadow 0.2s"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#f1f1f1";
              e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#ffffff";
              e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>

  );
};
export default CandidateNavbar
