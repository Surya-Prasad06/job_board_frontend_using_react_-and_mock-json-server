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
    return null;
  }
  const handleRemove = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    navigate('/')

  }

  return (
    // <>
    //   {/* Themed Navbar */}
    //   <div className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">

    //     {/* Brand */}
    //     <h1 style={{color:"white"}}>
    //       CareerLink
    //     </h1>

    //     {/* Links + Button */}
    //     <div >
    //       <Link to="/candidateprofile">
    //         Candidate Profile
    //       </Link>

    //       <Link to="/candidates/joblistings">
    //         Jobs
    //       </Link>


    //       <Link to="/candidates/appliedjobs"  >
    //         Applied jobs
    //       </Link>

    //       <button
    //         onClick={handleRemove}
    //       >
    //         Logout
    //       </button>
    //     </div>
    //   </div>
    // </>
<>
  {/* Themed Navbar */}
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-body custom-navbar" data-bs-theme="dark">
    <div className="container-fluid">
      
      {/* Brand */}
      <Link className="navbar-brand fw-bold" to="/">
        CareerLink
      </Link>

      {/* Toggler (for mobile view) */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Links + Button */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link custom-link" to="/candidateprofile">
              Candidate Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-link" to="/candidates/joblistings">
              Jobs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-link" to="/candidates/appliedjobs">
              Applied Jobs
            </Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-outline-light ms-2 custom-btn" onClick={handleRemove}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  {/* Custom CSS */}
  <style>
    {`
      /* Instead of forcing navbar height, use padding for taller look */
      .custom-navbar {
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
      .custom-link {
        transition: color 0.3s ease, transform 0.2s ease;
      }
      .custom-link:hover {
        color: #0d6efd !important; /* Bootstrap primary blue */
        transform: translateY(-2px);
      }
      .custom-btn {
        transition: all 0.3s ease;
      }
      .custom-btn:hover {
        background-color: #0d6efd;
        color: white;
        border-color: #0d6efd;
        transform: scale(1.05);
      }
    `}
  </style>
</>




  );
};
export default CandidateNavbar
