import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const CompanyPage = () => {
  const userId = sessionStorage.getItem('companyId');const API_URL = process.env.REACT_APP_API_URL;
  const [company, setCompany] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/company?companyId=${userId}`)
      .then((response) => {
        setCompany(response.data)
        

        sessionStorage.setItem("companywebsite", response.data[0].website);
        sessionStorage.setItem("companyName", response.data[0].companyName);
      }
      ).catch((error) => {
        console.log(error)
      }
      )
  }, [API_URL])

  return (



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



