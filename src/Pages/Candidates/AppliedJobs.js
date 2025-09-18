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
  {/* {appliedJobs.length > 0 ? (
    appliedJobs
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
          <div key={applied.jobId} className="job-card">
            <div className="job-company">
              <strong className="job-company-label">Company</strong>
              <p className="job-company-name">{applied.compname}</p>
            </div>

            <h2 className="job-role">{applied.role}</h2>

            <div className="job-resume">
              <strong className="job-resume-label">Uploaded Resume</strong>
              <embed
                src={applied.resume}
                type="application/pdf"
                width="100%"
                height="400"
                className="job-resume-preview"
              />
            </div>

            <div className="job-status">
              <strong className="job-status-label">
                Application Status:
              </strong>
              <span
                className={
                  !jobExists
                    ? "status deleted"
                    : jobStatus
                    ? jobStatus.status === "Accepted"
                      ? "status accepted"
                      : jobStatus.status === "Rejected"
                      ? "status rejected"
                      : "status pending"
                    : "status unknown"
                }
              >
                {!jobExists
                  ? "This job posting is deleted"
                  : jobStatus
                  ? jobStatus.status
                  : "No status available"}
              </span>
            </div>
          </div>
        );
      })
  ) : (
    <p className="no-jobs">No applied jobs</p>
  )} */}
  {appliedJobs.length > 0 ? (
  appliedJobs
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
        <div key={applied.jobId} className="card mb-4 shadow-sm">
          <div className="card-body">
            
            <div className="mb-3">
              <strong className="d-block mb-1">Company</strong>
              <p className="mb-0">{applied.compname}</p>
            </div>

            <h5 className="card-title">{applied.role}</h5>

            <div className="mb-3">
              <strong className="d-block mb-2">Uploaded Resume</strong>
              <embed
                src={applied.resume}
                type="application/pdf"
                width="100%"
                height="400"
                className="border rounded"
              />
            </div>

            <div>
              <strong className="d-block mb-1">Application Status:</strong>
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
                    : "badge bg-light text-dark"
                }
              >
                {!jobExists
                  ? "This job posting is deleted"
                  : jobStatus
                  ? jobStatus.status
                  : "No status available"}
              </span>
            </div>

          </div>
        </div>
      );
    })
) : (
  <p className="text-muted text-center">No applied jobs</p>
)}

</>

  )
}

export default AppliedJobs
