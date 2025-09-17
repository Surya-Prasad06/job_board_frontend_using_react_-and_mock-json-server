import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Css/AppliedCandidates.css'
const AppliedCandidates = () => {
  const [appliedCandidates, setAppliedCandidates] = useState([])
  const [buttonview, setButtonview] = useState(null) // track expanded candidate
  const [jobExists, setJobExists] = useState(true)
  const nav = useNavigate()
  const { id } = useParams()
  const jobId = id

  useEffect(() => {
    // ✅ check if the job posting exists
    axios
      .get(`http://localhost:5000/jobpostings/${jobId}`)
      .then((response) => {
        if (!response.data || Object.keys(response.data).length === 0) {
          setJobExists(false)
        }
      })
      .catch(() => {
        setJobExists(false)
      })

    // ✅ fetch applied candidates
    axios
      .get(`http://localhost:5000/jobapplication?jobId=${jobId}`)
      .then((response) => {
        setAppliedCandidates(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [jobId])

  const markeviewed = async (candiateid) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/applicationstatus?applicationId=${candiateid}`
      )

      if (res.data.length > 0) {
        const statusId = res.data[0].id
        await axios.put(`http://localhost:5000/applicationstatus/${statusId}`, {
          applicationId: candiateid,
          status: 'viewed',
          jobid: id,
         
        })
      } else {
        await axios.post('http://localhost:5000/applicationstatus', {
          applicationId: candiateid,
          status: 'viewed',
          jobid: id,
          
        })
      }

      // ✅ update local state correctly
      setAppliedCandidates((prev) =>
        prev.map((app) =>
          app.candiateid === candiateid ? { ...app, status: 'viewed' } : app
        )
      )
    } catch (error) {
      console.error('Error marking as viewed:', error)
    }
  }

  return (
    // <>
    //   {!jobExists ? (
    //     <h2 style={{ color: 'red' }}>no one Applied</h2>
    //   ) : appliedCandidates.length === 0 ? (
    //     <>no one Applied</>
    //   ) : (
    //     <>
    //       <h1>Applied Candidates</h1>
    //       {appliedCandidates
    //         .slice()
    //         .reverse()
    //         .map((applied) => (
    //           <div key={applied.id} style={{ marginBottom: '20px' }}>
    //             <strong>
    //               Role: <h2>{applied.role}</h2>
    //             </strong>
    //             <ul>
    //               <li>
    //                 <strong>Candidate name: </strong>
    //                 {applied.name}
    //               </li>
    //               <li>
    //                 <strong>Resume: </strong>
    //                 <embed
    //               src={applied.resume}
    //               type="application/pdf"
    //               width="600"
    //               height="400"
    //             />
    //               </li>
    //             </ul>

    //             {/* toggle candidate details */}
    //             <button
    //               onClick={() =>
    //                 setButtonview(
    //                   buttonview === applied.id ? null : applied.id
    //                 )
    //               }
    //             >
    //               {buttonview === applied.id
    //                 ? 'Hide details'
    //                 : 'View more details'}
    //             </button>

    //             {buttonview === applied.id && (
    //               <ul>
    //                 <li>
    //                   <strong>Contact Number: </strong>
    //                   {applied.number}
    //                 </li>
    //                 <li>
    //                   <strong>Skills: </strong>
    //                   <ul>
    //                     {applied.skills.map((skill, index) => (
    //                       <li key={index}>{skill}</li>
    //                     ))}
    //                   </ul>
    //                 </li>
    //                 <li>
    //                   <strong>Why Should we hire you? </strong>
    //                   <br />
    //                   {applied.message}
    //                 </li>
    //               </ul>
    //             )}

    //             {/* mark as viewed */}
    //             <button onClick={() => markeviewed(applied.candiateid)}>
    //               {applied.status === 'viewed' ? 'Viewed' : 'Mark as Viewed'}
    //             </button>
    //           </div>
    //         ))}
    //     </>
    //   )}
    // </>

    <>
  {!jobExists ? (
    <h2 className="no-applied">No one applied</h2>
  ) : appliedCandidates.length === 0 ? (
    <p className="no-applied">No one applied</p>
  ) : (
    <>
      <h1 className="applied-title">Applied Candidates</h1>
      {appliedCandidates.slice().reverse().map((applied) => (
        <div key={applied.id} className="candidate-card">
          <h3 className="candidate-role">Role: {applied.role}</h3>
          <ul className="candidate-info">
            <li>
              <strong>Candidate Name:</strong> {applied.name}
            </li>
            <li>
              <strong>Resume:</strong>
              <embed
                src={applied.resume}
                type="application/pdf"
                width="100%"
                height="300"
                className="resume-embed"
              />
            </li>
          </ul>

          <button
            className="toggle-btn"
            onClick={() =>
              setButtonview(buttonview === applied.id ? null : applied.id)
            }
          >
            {buttonview === applied.id ? 'Hide details' : 'View more details'}
          </button>

          {buttonview === applied.id && (
            <ul className="candidate-details">
              <li>
                <strong>Contact Number:</strong> {applied.number}
              </li>
              <li>
                <strong>Skills:</strong>
                <ul className="skills-list">
                  {applied.skills.map((skill, index) => (
                    <li key={index} className="skill-item">{skill}</li>
                  ))}
                </ul>
              </li>
              <li>
                <strong>Why Should we hire you?</strong>
                <p>{applied.message}</p>
              </li>
            </ul>
          )}

          <button
            className={`mark-viewed-btn ${applied.status === 'viewed' ? 'viewed' : ''}`}
            onClick={() => markeviewed(applied.candiateid)}
          >
            {applied.status === 'viewed' ? 'Viewed' : 'Mark as Viewed'}
          </button>
        </div>
      ))}
    </>
  )}
</>

  )
}

export default AppliedCandidates
