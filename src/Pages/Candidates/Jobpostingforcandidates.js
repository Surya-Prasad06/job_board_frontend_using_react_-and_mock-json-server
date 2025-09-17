import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Css/Jobpostingforcandidates.css'
import { Link, useNavigate } from 'react-router-dom'

const Jobpostingforcandidates = () => {
  const [jobpostings, setJobpostings] = useState([])
  const navigate = useNavigate();

  const handleApply = (id) => {
    navigate(`/candidates/joblistings/${id}`);
  };
  useEffect(() => {
    axios.get("http://localhost:5000/jobpostings").then((response) => {
      console.log(response.data)
      setJobpostings(response.data)
    }
    ).catch((error) => {
      console.error(error)
    }
    )
  }, [])

  return (
    // <>
    //   {
    //     jobpostings.slice().reverse().map((jobs, index) => (
    //       <div key={jobs.id}> 
         
    //       <h1><Link to={jobs.companywebsite}>{jobs.companyName}</Link></h1>
    //         <h1>{jobs.role}</h1>
    //         <p>{jobs.description}</p>
    //         <p>Experience:{jobs.experience}</p>
    //         <p>No. of positions:- {jobs.positions}</p>
    //         <strong>Skills:-</strong>
    //         <ul>
    //           {jobs.skills.slice().reverse().map((skill, i) => (
    //             <li key={i}>{skill}</li>
    //           )
    //           )}
    //         </ul>
    //         <button onClick={() => handleApply(jobs.id)}>Apply to this job</button>
    //       </div>
    //     )
    //     )
    //   }
    // </>

    <>
  {jobpostings.slice().reverse().map((jobs) => (
    <div key={jobs.id} className="job-card">
      <h2 className="company-name">
        <Link to={jobs.companywebsite}>{jobs.companyName}</Link>
      </h2>
      <h3 className="job-role">{jobs.role}</h3>
      <p className="job-description">{jobs.description}</p>
      <p className="job-meta">Experience: {jobs.experience}</p>
      <p className="job-meta">No. of positions: {jobs.positions}</p>

      <strong>Skills:</strong>
      <ul className="skills-list">
        {jobs.skills.slice().reverse().map((skill, i) => (
          <li key={i} className="skill-item">{skill}</li>
        ))}
      </ul>

      <button
        className="apply-btn"
        onClick={() => handleApply(jobs.id)}
      >
        Apply to this job
      </button>
    </div>
  ))}
</>

  )
}

export default Jobpostingforcandidates
