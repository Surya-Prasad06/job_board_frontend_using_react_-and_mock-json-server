import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Jobpostinglist = () => {
  const [joblist, setJoblist] = useState([])

  const companyId = sessionStorage.getItem("companyId")
  const nav = useNavigate()
  useEffect(() => {

    axios.get(`http://localhost:5000/jobpostings?companyId=${companyId}`).then((response) => {
      console.log(response.data);
      setJoblist(response.data)
    }
    ).catch((error) => {
      console.error(error);
    }
    )
  }, [])

 const handleDelete = (jobId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this job?");
  if (!confirmDelete) return; // stop if user clicks Cancel

  axios.delete(`http://localhost:5000/jobpostings/${jobId}`)
    .then(() => {
      alert("Job deleted successfully!");
      setJoblist((prev) => prev.filter((job) => job.id !== jobId));
    })
    .catch((error) => {
      console.error("Error deleting job:", error);
      alert("Failed to delete job");
    });
};

  return (
    <>

      {joblist.slice().reverse().map((comp) => (

       <div key={comp.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
         <ul >
            <li><Link to={comp.companywebsite}>{comp.companyName}</Link></li>
            <li><h1>{comp.role}</h1></li>
            <li><strong>Job Description</strong>{comp.description}</li>
            <li><strong>Experience</strong>{comp.experience}</li>
            <li><strong>Salary</strong>{comp.salary}</li>
            <li><strong></strong>{comp.positions}</li>
            <li><strong></strong>{comp.responsibilites}</li>
            <li><strong>Skills</strong></li>
            <ul>
              {comp.skills.slice().reverse().map((skill, i) => (
                <li key={i}>{skill}</li>
              )
              )}</ul>
            <li>{comp.typeofwork}</li>
          </ul>

          <button onClick={
            () => {
              nav(`/companypage/jobposting/joblist/${comp.id}`)
            }
          }>Update Job</button>
          <button onClick={() => {
            nav(`/companypage/jobposting/joblist/appliedcandidates/${comp.id}`)
          }
          }>Applied Candidates</button>
          <button onClick={() => handleDelete(comp.id)}>Delete</button>
        </div>
      ))}
      <h1>Jobs </h1>
      <Link to='/companypage/jobposting'>Add Job Posting</Link>
    </>
  )
}

export default Jobpostinglist
