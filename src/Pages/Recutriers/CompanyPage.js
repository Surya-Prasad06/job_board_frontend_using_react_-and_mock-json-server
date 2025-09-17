import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
// import './Css/CompanyPage.css'
const CompanyPage = () => {
  const userId = sessionStorage.getItem('companyId');
  const [company, setCompany] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/company?companyId=${userId}`)
      .then((response) => {
        setCompany(response.data)
        console.log(response.data[0])

        sessionStorage.setItem("companywebsite", response.data[0].website);
        sessionStorage.setItem("companyName", response.data[0].companyName);
      }
      ).catch((error) => {
        console.log(error)
      }
      )
  }, [])

  return (


    // <>
    //   {company.length === 0 ? (
    //     <div className="no-company">
    //       <h2>No company profile found.</h2>
    //       <p>Please register your company details to continue.</p>
    //       <Link to="/companyregisteration" className="register-btn">
    //         Register Company
    //       </Link>
    //     </div>
    //   ) : (
    //     <>
    //       {company.slice().reverse().map((comp, index) => (
    //         <div key={index} className="company-card">
    //           <Link to={comp.website} className="company-name">{comp.companyName}</Link>
    //           <img src={comp.image} alt={comp.companyName} className="company-image" />
    //           <p className="company-about">{comp.about}</p>
    //         </div>
    //       ))}

    //       <div className="company-actions">
    //         <Link to="/comapanypage/updateaboutcompany">
    //           <button className="update-btn">Update Company Details</button>
    //         </Link>
    //         <h2>Jobs</h2>
    //         <Link to="/companypage/jobposting" className="job-link">Add Job Posting</Link><br />
    //         <Link to="/companypage/jobposting/joblist" className="job-link">Jobs Posted</Link>
    //       </div>
    //     </>
    //   )}
    // </>

    <>
  {company.length === 0 ? (
    <div className="text-center my-5">
      <h2 className="text-muted">No company profile found.</h2>
      <p>Please register your company details to continue.</p>
      <Link to="/companyregisteration" className="btn btn-primary mt-3">
        Register Company
      </Link>
    </div>
  ) : (
    <>
      <div className="container my-4">
        <div className="row g-4">
          {company.slice().reverse().map((comp, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                {/* Company Image */}
                <img
                  src={comp.image}
                  alt={comp.companyName}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "200px" }}
                />

                {/* Company Details */}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    <Link to={comp.website} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                      {comp.companyName}
                    </Link>
                  </h5>
                  <p className="card-text text-muted">{comp.about}</p>

                  <div className="mt-auto">
                    <Link to="/comapanypage/updateaboutcompany" className="btn btn-outline-primary btn-sm">
                      Update Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company Actions */}
        <div className="text-center mt-5">
          <h2 className="mb-3">Jobs</h2>
          <Link to="/companypage/jobposting" className="btn btn-success me-2">
            Add Job Posting
          </Link>
          <Link to="/companypage/jobposting/joblist" className="btn btn-outline-success">
            Jobs Posted
          </Link>
        </div>
      </div>
    </>
  )}
</>
  )
}

export default CompanyPage



