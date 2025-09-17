import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import './Css/Jobposting.css'

const Jobposting = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username")
  const [role, setRole] = useState("");
  const [description, setDescription] = useState('')
  const [experience, setExperience] = useState('')
  const [salary, setSalary] = useState("")
  const [positions, setPositions] = useState('')
  const [location, setLocation] = useState('')
  const [typeofwork, setTypeofwork] = useState("")
  const [skills, setSkills] = useState("")
  const [responsibilites, setResponsibilites] = useState("")
  const companyId = sessionStorage.getItem("companyId")
  const companywebsite = sessionStorage.getItem("companywebsite")
  const companyName = sessionStorage.getItem("companyName")


  const jobpostingupload = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5000/jobpostings", { role, description, experience, salary, positions, responsibilites, companyId, skills: skills.split(",").slice().reverse().map(skill => skill.trim()), typeofwork, username, companyName, companywebsite }).then((response) => {
      console.log(response.data)
      alert("successfully uploaded")
      navigate('/companypage/jobposting/joblist')

    }
    ).catch((error) => {
      console.error(error);
    }
    )

  }



  return (

    // <div className="job-posting-container">
    //   <h1 className="form-title">Job Posting</h1>
    //   <form onSubmit={jobpostingupload} className="job-posting-form">
    //     <label>Job Role</label>
    //     <input
    //       type="text"
    //       placeholder="Role"
    //       value={role}
    //       onChange={(e) => setRole(e.target.value)}
    //       required
    //     />

    //     <label>Job Description</label>
    //     <input
    //       type="text"
    //       placeholder="Job Description"
    //       value={description}
    //       onChange={(e) => setDescription(e.target.value)}
    //       required
    //     />

    //     <label>Experience (in months)</label>
    //     <input
    //       type="number"
    //       placeholder="Experience"
    //       value={experience}
    //       onChange={(e) => setExperience(e.target.value)}
    //       required
    //     />

    //     <label>Salary</label>
    //     <input
    //       type="text"
    //       placeholder="LPA"
    //       value={salary}
    //       onChange={(e) => setSalary(e.target.value)}
    //       required
    //     />

    //     <label>No. of Openings</label>
    //     <input
    //       type="number"
    //       value={positions}
    //       onChange={(e) => setPositions(e.target.value)}
    //       required
    //     />

    //     <label>Responsibilities</label>
    //     <textarea
    //       value={responsibilites}
    //       onChange={(e) => setResponsibilites(e.target.value)}
    //     />

    //     <label>
    //       Skills <small>(separate with commas)</small>
    //     </label>
    //     <input
    //       type="text"
    //       value={skills}
    //       onChange={(e) => setSkills(e.target.value)}
    //       required
    //     />

    //     <label>Type of Work</label>
    //     <input
    //       type="text"
    //       value={typeofwork}
    //       onChange={(e) => setTypeofwork(e.target.value)}
    //       required
    //     />

    //     <label>Location</label>
    //     <input
    //       type="text"
    //       value={location}
    //       onChange={(e) => setLocation(e.target.value)}
    //       required
    //     />

    //     <input type="submit" value="Add Job Posting" className="submit-btn" />
    //   </form>
    // </div>

    <div className="container my-5">
  <h1 className="text-center mb-4">Job Posting</h1>

  <form onSubmit={jobpostingupload} className="card p-4 shadow-sm">
    {/* Job Role */}
    <div className="mb-3">
      <label className="form-label">Job Role</label>
      <input
        type="text"
        className="form-control"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />
    </div>

    {/* Job Description */}
    <div className="mb-3">
      <label className="form-label">Job Description</label>
      <input
        type="text"
        className="form-control"
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
    </div>

    {/* Experience */}
    <div className="mb-3">
      <label className="form-label">Experience (in months)</label>
      <input
        type="number"
        className="form-control"
        placeholder="Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        required
      />
    </div>

    {/* Salary */}
    <div className="mb-3">
      <label className="form-label">Salary</label>
      <input
        type="text"
        className="form-control"
        placeholder="LPA"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        required
      />
    </div>

    {/* Openings */}
    <div className="mb-3">
      <label className="form-label">No. of Openings</label>
      <input
        type="number"
        className="form-control"
        value={positions}
        onChange={(e) => setPositions(e.target.value)}
        required
      />
    </div>

    {/* Responsibilities */}
    <div className="mb-3">
      <label className="form-label">Responsibilities</label>
      <textarea
        className="form-control"
        rows="3"
        value={responsibilites}
        onChange={(e) => setResponsibilites(e.target.value)}
      />
    </div>

    {/* Skills */}
    <div className="mb-3">
      <label className="form-label">
        Skills <small className="text-muted">(separate with commas)</small>
      </label>
      <input
        type="text"
        className="form-control"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        required
      />
    </div>

    {/* Type of Work */}
    <div className="mb-3">
      <label className="form-label">Type of Work</label>
      <input
        type="text"
        className="form-control"
        value={typeofwork}
        onChange={(e) => setTypeofwork(e.target.value)}
        required
      />
    </div>

    {/* Location */}
    <div className="mb-3">
      <label className="form-label">Location</label>
      <input
        type="text"
        className="form-control"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
    </div>

    {/* Submit */}
    <div className="d-grid">
      <button type="submit" className="btn btn-primary">
        Add Job Posting
      </button>
    </div>
  </form>
</div>


  )
}

export default Jobposting
