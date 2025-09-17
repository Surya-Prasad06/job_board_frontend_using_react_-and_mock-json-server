import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Jobpostinglist = () => {
  const [joblist, setJoblist] = useState([])
const API_URL = process.env.REACT_APP_API_URL;
  const companyId = sessionStorage.getItem("companyId")
  const nav = useNavigate()
  useEffect(() => {

    axios.get(`${API_URL}/jobpostings?companyId=${companyId}`).then((response) => {
      console.log(response.data);
      setJoblist(response.data)
    }
    ).catch((error) => {
      console.error(error);
    }
    )
  }, [API_URL])

 const handleDelete = (jobId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this job?");
  if (!confirmDelete) return; // stop if user clicks Cancel

  axios.delete(`${API_URL}/jobpostings/${jobId}`)
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
  <div className="container my-4">
    <div className="row g-4">
      {joblist.slice().reverse().map((comp) => (
        <div key={comp.id} className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              {/* Company Name */}
              <h5 className="card-title">
                <Link
                  to={comp.companywebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  {comp.companyName}
                </Link>
              </h5>

              {/* Job Role */}
              <h6 className="text-primary">{comp.role}</h6>

              {/* Job Details */}
              <p className="card-text">
                <strong>Job Description:</strong> {comp.description}
              </p>
              <p className="card-text">
                <strong>Experience:</strong> {comp.experience} months
              </p>
              <p className="card-text">
                <strong>Salary:</strong> {comp.salary} LPA
              </p>
              <p className="card-text">
                <strong>Openings:</strong> {comp.positions}
              </p>
              <p className="card-text">
                <strong>Responsibilities:</strong> {comp.responsibilites}
              </p>

              {/* Skills */}
              <p className="mb-1"><strong>Skills:</strong></p>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {comp.skills.slice().reverse().map((skill, i) => (
                  <span key={i} className="badge bg-secondary">
                    {skill}
                  </span>
                ))}
              </div>

              <p className="card-text">
                <strong>Work Type:</strong> {comp.typeofwork}
              </p>

              {/* Action Buttons */}
              <div className="mt-auto d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => nav(`/companypage/jobposting/joblist/${comp.id}`)}
                >
                  Update Job
                </button>
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={() => nav(`/companypage/jobposting/joblist/appliedcandidates/${comp.id}`)}
                >
                  Applied Candidates
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(comp.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Add New Job Posting */}
    <div className="text-center mt-5">
      <h2>Jobs</h2>
      <Link to="/companypage/jobposting" className="btn btn-primary mt-2">
        Add Job Posting
      </Link>
    </div>
  </div>
</>

  )
}

export default Jobpostinglist
