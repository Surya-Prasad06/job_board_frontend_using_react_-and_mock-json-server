
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
  {/* Material Navbar */}
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 32px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    fontFamily: "Roboto, sans-serif"
  }}>
    
    {/* Brand */}
    <h1 style={{ 
      margin: 0, 
      fontSize: "22px", 
      fontWeight: 600, 
      color: "#1976d2",  // Material primary blue
      letterSpacing: "0.5px" 
    }}>
      CareerLink
    </h1>

    {/* Links */}
    <nav style={{ display: "flex", gap: "24px" }}>
      <Link 
        to="/companypage"
        style={{ 
          textDecoration: "none", 
          color: "#444", 
          fontSize: "16px", 
          fontWeight: 500, 
          padding: "6px 12px", 
          borderRadius: "4px", 
          transition: "background-color 0.2s" 
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(25, 118, 210, 0.1)"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
      >
        About Company
      </Link>

      <Link 
        to="/companypage/jobposting"
        style={{ 
          textDecoration: "none", 
          color: "#444", 
          fontSize: "16px", 
          fontWeight: 500, 
          padding: "6px 12px", 
          borderRadius: "4px", 
          transition: "background-color 0.2s" 
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(25, 118, 210, 0.1)"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
      >
        Post Job
      </Link>

      <Link 
        to="/companypage/jobposting/joblist"
        style={{ 
          textDecoration: "none", 
          color: "#444", 
          fontSize: "16px", 
          fontWeight: 500, 
          padding: "6px 12px", 
          borderRadius: "4px", 
          transition: "background-color 0.2s" 
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(25, 118, 210, 0.1)"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
      >
        Job List
      </Link>
    </nav>

    {/* Material Button */}
    <button 
      onClick={handleRemove} 
      style={{ 
        backgroundColor: "#1976d2",
        color: "#fff",
        padding: "8px 20px",
        border: "none",
        borderRadius: "4px",
        fontSize: "14px",
        fontWeight: 500,
        cursor: "pointer", 
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)", 
        transition: "background-color 0.2s, box-shadow 0.2s" 
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#1565c0"
        e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.25)"
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#1976d2"
        e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)"
      }}
    >
      Logout
    </button>
  </div>
</>

  );
};

export default Rectriernavbar;
