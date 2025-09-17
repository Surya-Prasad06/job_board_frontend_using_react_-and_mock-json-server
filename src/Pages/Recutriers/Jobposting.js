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
        axios.post("http://localhost:5000/jobpostings", { role, description, experience, salary, positions, responsibilites, companyId, skills: skills.split(",").slice().reverse().map(skill => skill.trim()), typeofwork,username, companyName, companywebsite }).then((response) => {
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
        // <div>
        //     <h1>Job Posting </h1>
        //     <form onSubmit={jobpostingupload}>
        //         <label htmlFor="">Job role </label>
        //         <input type="text" placeholder='role' value={role} onChange={(event) => {
        //             setRole(event.target.value)
        //         }
        //         } required /> <br />
        //         <label htmlFor="">Job Description</label>
        //         <input type="text" placeholder='JD' value={description} onChange={(event) => {
        //             setDescription(event.target.value)
        //         }
        //         } required /><br />
        //         <label htmlFor="">Experience</label>
        //         <input type="number" placeholder='exp in months' value={experience} onChange={(event) => {
        //             setExperience(event.target.value)
        //         }
        //         } required /><br />
        //         <label htmlFor="">salary</label>
        //         <input type="text" placeholder='lpa' required value={salary} onChange={(event) => {
        //             setSalary(event.target.value)
        //         }
        //         } /><br />
        //         <label htmlFor="">no. of Openings</label>
        //         <input type="number" required value={positions} onChange={(event) => {
        //             setPositions(event.target.value)
        //         }
        //         } /> <br />
        //         <label htmlFor="">Responsibilites</label>
        //         <textarea name="" value={responsibilites} onChange={(event) => {
        //             setResponsibilites(event.target.value)
        //         }
        //         } id=""></textarea><br />
        //         <label htmlFor="" >Skills <small style={{ fontSize: '.7rem' }}> add <strong>, </strong>to seperate the skills</small></label>
        //         <input type="text" required value={skills} onChange={(event) => {
        //             setSkills(event.target.value)
        //         }
        //         } /><br />
        //         <label htmlFor="">type of work</label>
        //         <input type="text" required value={typeofwork} onChange={(event) => {
        //             setTypeofwork(event.target.value)
        //         }
        //         } /><br />
        //         <label htmlFor="">Location</label>
        //         <input type="text" required value={location} onChange={(event) => {
        //             setLocation(event.target.value)
        //         }
        //         } />


        //         <br />

        //         <br /><br />


        //         <input type="submit" value='add ob posting' />
        //     </form>
        // </div>

        <div className="job-posting-container">
  <h1 className="form-title">Job Posting</h1>
  <form onSubmit={jobpostingupload} className="job-posting-form">
    <label>Job Role</label>
    <input
      type="text"
      placeholder="Role"
      value={role}
      onChange={(e) => setRole(e.target.value)}
      required
    />

    <label>Job Description</label>
    <input
      type="text"
      placeholder="Job Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
    />

    <label>Experience (in months)</label>
    <input
      type="number"
      placeholder="Experience"
      value={experience}
      onChange={(e) => setExperience(e.target.value)}
      required
    />

    <label>Salary</label>
    <input
      type="text"
      placeholder="LPA"
      value={salary}
      onChange={(e) => setSalary(e.target.value)}
      required
    />

    <label>No. of Openings</label>
    <input
      type="number"
      value={positions}
      onChange={(e) => setPositions(e.target.value)}
      required
    />

    <label>Responsibilities</label>
    <textarea
      value={responsibilites}
      onChange={(e) => setResponsibilites(e.target.value)}
    />

    <label>
      Skills <small>(separate with commas)</small>
    </label>
    <input
      type="text"
      value={skills}
      onChange={(e) => setSkills(e.target.value)}
      required
    />

    <label>Type of Work</label>
    <input
      type="text"
      value={typeofwork}
      onChange={(e) => setTypeofwork(e.target.value)}
      required
    />

    <label>Location</label>
    <input
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      required
    />

    <input type="submit" value="Add Job Posting" className="submit-btn" />
  </form>
</div>

    )
}

export default Jobposting
