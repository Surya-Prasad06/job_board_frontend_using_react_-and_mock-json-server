import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AppliedJobs = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [appliedJobs, setAppliedJobs] = useState([])
  const [status, setStatus] = useState([])
  const [jobPostings, setJobPostings] = useState([])

  const candidateId = sessionStorage.getItem("candiateid")

  useEffect(() => {
    axios.get(`${API_URL}/jobapplication?candiateid=${candidateId}`)
      .then((response) => {
        
        setAppliedJobs(response.data)
      })
      .catch((error) => { console.error(error) })
  }, [candidateId, API_URL])

  useEffect(() => {
    axios.get(`${API_URL}/applicationstatus?applicationId=${candidateId}`)
      .then((response) => {
        setStatus(response.data)
        
      })
      .catch((error) => { console.error(error) })
  }, [candidateId, API_URL])

  // 🔹 Fetch all job postings
  useEffect(() => {
    axios.get(`${API_URL}/jobpostings`)
      .then((response) => {
        setJobPostings(response.data)
        
      })
      .catch((error) => { console.error(error) })
  }, [API_URL])

  return (
    <>
  {appliedJobs.length > 0 ? (
    <div className="row">
      {appliedJobs
        .slice()
        .reverse()
        .map((applied) => {
          const jobExists = jobPostings.find(
            (job) => job.id === applied.jobId
          );

          const jobStatus = status.find(
            (sta) =>
              sta.jobid === applied.jobId &&
              sta.applicationId === applied.candiateid
          );

          return (
            <div key={applied.jobId} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 border-0 shadow-lg rounded-3">
                <div className="card-body d-flex flex-column">
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                   <h1 className="mb-0 fw-bold">
                    {applied.role}
                    </h1>
                    <span
                      className={
                        !jobExists
                          ? "badge bg-secondary"
                          : jobStatus
                          ? jobStatus.status === "Accepted"
                            ? "badge bg-success"
                            : jobStatus.status === "Rejected"
                            ? "badge bg-danger"
                            : "badge bg-warning text-dark"
                          : "badge bg-dark"
                      }
                    >
                      {!jobExists
                        ? "Deleted"
                        : jobStatus
                        ? jobStatus.status
                        : "Unknown"}
                    </span>
                  </div>

                  {/* Company */}
                  <p className="text-muted small mb-3">
                    <i className="bi bi-building me-1"></i> {applied.compname}
                  </p>

                  {/* Resume */}
                  <div className="mb-3">
                    <h6 className="text-muted">Uploaded Resume</h6>
                    <div className="border rounded-3 overflow-hidden" style={{ height: "250px" }}>
                      <embed
                        src={applied.resume}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto d-flex justify-content-between align-items-center pt-2 border-top">
                    
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  ) : (
    <div className="text-center py-5">
      <i className="bi bi-briefcase text-muted" style={{ fontSize: "3rem" }}></i>
      <p className="mt-3 text-muted fs-5">No applied jobs yet</p>
    </div>
  )}
</>



  )
}

export default AppliedJobs
