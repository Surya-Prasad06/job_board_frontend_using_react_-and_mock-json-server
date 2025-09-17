// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

// const AppliedJobs = () => {
//   const [appliedJobs, setAppliedJobs] = useState([])
//   const [status, setStatus] = useState([])
//   const userId = sessionStorage.getItem("candiateid")
//   useEffect(() => {
//     axios.get(`http://localhost:5000/jobapplication?candiateid=${userId}`)
//       .then((response) => { console.log(response.data); setAppliedJobs(response.data) })
//       .catch((error) => { console.error(error) })
//   }, [])

//   useEffect(() => {
//     axios.get(`http://localhost:5000/applicationstatus?applicationId=${userId}`)

//       .then((response) => { setStatus(response.data); console.log(response.data) })
//       .catch((error) => { console.error(error) })
//   }, [userId])
//   return (
//     <>
//       {
//         appliedJobs.length > 0 ?
//           (<>
//             {appliedJobs.slice().reverse().map((applied) => (
//               <>

//                 <div key={applied.jobId}>
//                   <strong>Company: </strong> {applied.compname}
//                   <h1>{applied.role}</h1>
//                   <br />
//                   <strong>Uploaded resume:- </strong>
//                   <embed
//                     src={applied.resume}
//                     type="application/pdf"
//                     width="600"
//                     height="400"
//                   />
//                   <br />
//                   <strong>Status Of Your Application: </strong>
//                   {status.find((sta) => sta.jobid === applied.jobId)
//                     ? status.find((sta) => sta.jobid === applied.jobId).status
//                     : "No status available"}

//                 </div>
//               </>
//             )

//             )}
//           </>) : (<>
//             no applied Jobs
//           </>)
//       }
//     </>
//   )
// }

// export default AppliedJobs

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Css/AppliedJobs.css'
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
    //   {
    //     appliedJobs.length > 0 ?
    //       appliedJobs.slice().reverse().map((applied) => {
    //         const jobExists = jobPostings.find(job => job.id === applied.jobId)

    //         // ✅ Match status by both candidate and job
    //         const jobStatus = status.find(
    //           (sta) => sta.jobid === applied.jobId && sta.applicationId === applied.candiateid
    //         )

    //         return (
    //           <div key={applied.jobId} style={{ marginBottom: "30px" }}>
    //             <strong>Company: </strong> {applied.compname}
    //             <h1>{applied.role}</h1>
    //             <br />
    //             <strong>Uploaded resume:- </strong>
    //             <embed
    //               src={applied.resume}
    //               type="application/pdf"
    //               width="600"
    //               height="400"
    //             />
    //             <br />
    //             <strong>Status Of Your Application: </strong>
    //             {
    //               !jobExists
    //                 ? "This job posting is deleted"
    //                 : jobStatus
    //                   ? jobStatus.status
    //                   : "No status available"
    //             }
    //           </div>
    //         )
    //       })
    //       : <p>No applied jobs</p>
    //   }
    // </>
   
<>
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
  )}
</>

  )
}

export default AppliedJobs
