import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Jobpostingforcandidates = () => {
  const [jobpostings, setJobpostings] = useState([])
  const navigate = useNavigate();
const API_URL = process.env.REACT_APP_API_URL;

  const handleApply = (id) => {
    navigate(`/candidates/joblistings/${id}`);
  };
  useEffect(() => {
    axios.get(`${API_URL}/jobpostings`).then((response) => {
      
      setJobpostings(response.data)
    }
    ).catch((error) => {
      console.error(error)
    }
    )
  }, [API_URL])

  return (

 <div className="d-flex justify-content-center">
  <div className="w-75"> {/* Adjust width (w-50, w-75, etc.) */}
    {jobpostings.length === 0 ? (
      <div className="text-center my-5">
        <h4 className="text-muted">No Jobs Available</h4>
      </div>
    ) : (
      jobpostings.slice().reverse().map((jobs) => (
        <div
          key={jobs.id}
          className="card shadow-sm mb-4 mx-auto"
          style={{ maxWidth: "700px" }}
        >
          <div className="card-body">
            {/* Company */}
            <h4 className="card-title">
              <Link
                to={jobs.companywebsite}
                className="text-decoration-none fw-bold text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {jobs.companyName}
              </Link>
            </h4>

            {/* Role */}
            <h5 className="card-subtitle mb-2 text-dark">{jobs.role}</h5>

            {/* Description */}
            <p className="card-text">{jobs.description}</p>

            {/* Meta Info */}
            <p className="mb-1">
              <span className="fw-bold">Experience:</span> {jobs.experience}
            </p>
            <p className="mb-3">
              <span className="fw-bold">Positions:</span> {jobs.positions}
            </p>

            {/* Skills */}
            <strong>Skills:</strong>
            <ul className="list-inline mt-2">
              {jobs.skills.slice().reverse().map((skill, i) => (
                <li key={i} className="list-inline-item badge bg-secondary me-1">
                  {skill}
                </li>
              ))}
            </ul>

            {/* Apply Button */}
            <div className="d-grid mt-3">
              <button
                className="btn btn-success"
                onClick={() => handleApply(jobs.id)}
              >
                Apply to this Job
              </button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</div>




  )
}

export default Jobpostingforcandidates
