import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Home.css";

const Home = () => {
  const nav = useNavigate();
  const candiateid = sessionStorage.getItem("candiateid");
  const companyId = sessionStorage.getItem("companyId")

  useEffect(() => {
    if (candiateid) {
      nav("/candidates/joblistings");
    } else if (companyId) {
      nav('/companypage/jobposting/joblist')
    }
  }, [candiateid, companyId, nav]);

  return (
    // <div className="home-container">
    //   <h1 className="home-title">CareerLink</h1>
    //   <div className="link-container">
    //     <Link to="/recutrierslogin" className="login-link">
    //       <span role="img" aria-label="recruiter icon" className="login-icon">
            
    //       </span>
    //       Recruiter Login
    //     </Link>
    //     <Link to="/candidatesuserlogin" className="login-link">
    //       <span role="img" aria-label="candidate icon" className="login-icon">
            
    //       </span>
    //       Candidate Login
    //     </Link>
    //   </div>
    // </div>
    <div className="container d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: "80vh" }}>
  <h1 className="display-4 mb-5">CareerLink</h1>

  <div className="d-flex flex-column flex-md-row gap-3">
    {/* Recruiter Login */}
    <Link to="/recutrierslogin" className="btn btn-primary btn-lg d-flex align-items-center justify-content-center">
      <span role="img" aria-label="recruiter icon" className="me-2">
        🧑‍💼
      </span>
      Recruiter Login
    </Link>

    {/* Candidate Login */}
    <Link to="/candidatesuserlogin" className="btn btn-success btn-lg d-flex align-items-center justify-content-center">
      <span role="img" aria-label="candidate icon" className="me-2">
        👨‍🎓
      </span>
      Candidate Login
    </Link>
  </div>
</div>

  );
};

export default Home;