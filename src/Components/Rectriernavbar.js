
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Rectriernavbar = () => {
  const navigate = useNavigate()
  const companyId = sessionStorage.getItem("companyId");
  const handleRemove = () => {
    sessionStorage.clear();
    navigate('/')
  }
  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-body custom-navbar" data-bs-theme="dark">
        <div className="container-fluid">

          {/* Brand */}
          <Link className="navbar-brand fw-bold" to="/companypage">
            CareerLink
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#companyNavbar"
            aria-controls="companyNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links + Logout */}
          <div className="collapse navbar-collapse" id="companyNavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link custom-link" to="/companypage">
                  About Company
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link custom-link" to="/companypage/jobposting">
                  Post Job
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link custom-link" to="/companypage/jobposting/joblist">
                  Job List
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


      <style>
        {`
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

export default Rectriernavbar;
