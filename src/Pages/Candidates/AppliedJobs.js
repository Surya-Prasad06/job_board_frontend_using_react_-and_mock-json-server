import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Css/AppliedJobs.css'
import { Link } from 'react-router-dom'
const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([])
  const [status, setStatus] = useState([])
  const [jobPostings, setJobPostings] = useState([])

  const candidateId = sessionStorage.getItem("candiateid")

  useEffect(() => {
    axios.get(`http://localhost:5000/jobapplication?candiateid=${candidateId}`)
      .then((response) => {
        console.log("Applied jobs:", response.data)
        setAppliedJobs(response.data)
      })
      .catch((error) => { console.error(error) })
  }, [candidateId])

  useEffect(() => {
    axios.get(`http://localhost:5000/applicationstatus?applicationId=${candidateId}`)
      .then((response) => {
        setStatus(response.data)
        console.log("Application status:", response.data)
      })
      .catch((error) => { console.error(error) })
  }, [candidateId])

  // 🔹 Fetch all job postings
  useEffect(() => {
    axios.get("http://localhost:5000/jobpostings")
      .then((response) => {
        setJobPostings(response.data)
        console.log("Job postings:", response.data)
      })
      .catch((error) => { console.error(error) })
  }, [])

  return (

    // <>
    //   {appliedJobs.length > 0 ? (
    //     appliedJobs
    //       .slice()
    //       .reverse()
    //       .map((applied) => {
    //         const jobExists = jobPostings.find(
    //           (job) => job.id === applied.jobId
    //         );

    //         const jobStatus = status.find(
    //           (sta) =>
    //             sta.jobid === applied.jobId &&
    //             sta.applicationId === applied.candiateid
    //         );

    //         return (
    //           <div key={applied.jobId} className="job-card">
    //             <div className="job-company">
    //               <strong className="job-company-label">Company</strong>
    //               <p className="job-company-name">{applied.compname}</p>
    //             </div>

    //             <h2 className="job-role">{applied.role}</h2>

    //             <div className="job-resume">
    //               <strong className="job-resume-label">Uploaded Resume</strong>
    //               <embed
    //                 src={applied.resume}
    //                 type="application/pdf"
    //                 width="100%"
    //                 height="400"
    //                 className="job-resume-preview"
    //               />
    //             </div>

    //             <div className="job-status">
    //               <strong className="job-status-label">
    //                 Application Status:
    //               </strong>
    //               <span
    //                 className={
    //                   !jobExists
    //                     ? "status deleted"
    //                     : jobStatus
    //                       ? jobStatus.status === "Accepted"
    //                         ? "status accepted"
    //                         : jobStatus.status === "Rejected"
    //                           ? "status rejected"
    //                           : "status pending"
    //                       : "status unknown"
    //                 }
    //               >
    //                 {!jobExists
    //                   ? "This job posting is deleted"
    //                   : jobStatus
    //                     ? jobStatus.status
    //                     : "No status available"}
    //               </span>
    //             </div>
    //           </div>
    //         );
    //       })
    //   ) : (
    //     <p className="no-jobs">No applied jobs</p>
    //   )}
    // </>
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
