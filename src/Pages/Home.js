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
    <div className="home-container">
      <h1 className="home-title">CareerLink</h1>
      <div className="link-container">
        <Link to="/recutrierslogin" className="login-link">
          <span role="img" aria-label="recruiter icon" className="login-icon">
            🧑‍💼
          </span>
          Recruiter Login
        </Link>
        <Link to="/candidatesuserlogin" className="login-link">
          <span role="img" aria-label="candidate icon" className="login-icon">
            👨‍💻
          </span>
          Candidate Login
        </Link>
      </div>
    </div>
  );
};

export default Home;