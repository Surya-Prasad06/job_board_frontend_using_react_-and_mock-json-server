import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import './Css/JobDetails.css'
const Jobapply = () => {
  const { id } = useParams(); // jobId
  const candidateId = sessionStorage.getItem("candiateid"); // from session
  const nav = useNavigate();
  const [role, setRole] = useState("");
  const [compname, setCompname] = useState("")
  // form states
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [message, setMessage] = useState("");
  const [pdfBase64, setPdfBase64] = useState("");
  const [pdfName, setPdfName] = useState("");

  // job states
  const [applyJob, setApplyJob] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [jobDetails, setJobDetails] = useState({});

  // handle PDF resume upload
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setPdfBase64(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PDF file");
    }
  };

  // submit application
  const handleJobApplication = (e) => {
    e.preventDefault();

    const applicationData = {
      name,
      jobId: id,
      resume: pdfBase64,
      number,
      skills: skills.split(",").map((s) => s.trim()),
      experience,
      message,
      candiateid: candidateId,
      role: role,
      compname : compname
    };

    axios
      .post("http://localhost:5000/jobapplication", applicationData)
      .then((response) => {
        alert("You have successfully applied to this position");
        console.log(response.data);
        setAlreadyApplied(true);
        setApplyJob(false);
        nav("/candidates/joblistings");
      })
      .catch((error) => console.error(error));
  };


  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/jobpostings/${id}`)
      .then((response) => {setJobDetails(response.data); setRole(response.data.role); setCompname(response.data.companyName)}
    )
      .catch((error) => console.error(error));
  }, [id]);

  // check if already applied
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/jobapplication?jobId=${id}&candiateid=${candidateId}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          setAlreadyApplied(true);
        }
      })
      .catch((error) => console.error(error));
  }, [id, candidateId]);

  // confirm apply
  const confirmApply = () => {
    if (window.confirm("Do you want to apply?")) {
      setApplyJob(true);
    }
  };

  return (
    // <div>
    //   <div>
    //     <Link to={jobDetails.companywebsite}>{jobDetails.companyName}</Link>
    //     <h3>
    //       Job Role: <h1>{jobDetails.role}</h1>
    //     </h3>
    //     <h4>Experience: {jobDetails.experience}</h4>
    //     <h4>No. of positions: {jobDetails.positions}</h4>
    //     <h3>Job Description</h3>
    //     <p>{jobDetails.description}</p>
    //     <h3>Roles and Responsibilities</h3>
    //     <p>{jobDetails.responsibilites}</p>

    //     <button
    //       type="button"
    //       onClick={confirmApply}
    //       disabled={alreadyApplied}
    //     >
    //       {alreadyApplied ? "Applied" : "Apply"}
    //     </button>
    //   </div>

    //   {applyJob && !alreadyApplied && (
    //     <form onSubmit={handleJobApplication}>
    //       <label>Name</label>
    //       <input
    //         type="text"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //         required
    //       />

    //       <label>Phone Number</label>
    //       <input
    //         type="tel"
    //         pattern="[0-9]{10}"
    //         value={number}
    //         onChange={(e) => setNumber(e.target.value)}
    //         required
    //       />

    //       <label>Skills</label> <small>(separate with commas)</small>
    //       <input
    //         type="text"
    //         placeholder="Your Skills"
    //         value={skills}
    //         onChange={(e) => setSkills(e.target.value)}
    //         required
    //       />

    //       <label>Resume</label>
    //       <input
    //         type="file"
    //         accept="application/pdf"
    //         onChange={handleResumeUpload}
    //         required
    //       />
    //       {pdfBase64 && (
    //         <div>
    //           <p>Uploaded: {pdfName}</p>
    //           <iframe
    //             src={pdfBase64}
    //             title="PDF Preview"
    //             width="300"
    //             height="200"
    //             style={{ border: "1px solid #ccc" }}
    //           />
    //         </div>
    //       )}

    //       <label>Experience (in months)</label>
    //       <input
    //         type="number"
    //         value={experience}
    //         onChange={(e) => setExperience(e.target.value)}
    //         required
    //       />

    //       <label>Why should we hire you?</label>
    //       <textarea
    //         placeholder="Your message"
    //         value={message}
    //         onChange={(e) => setMessage(e.target.value)}
    //         required
    //       />

    //       <input type="submit" value="Apply for this Job" />
    //     </form>
    //   )}
    // </div>

    <div className="job-details-container">
  <div className="job-card">
    <Link to={jobDetails.companywebsite} className="company-link">
      {jobDetails.companyName}
    </Link>

    <h2 className="job-role">{jobDetails.role}</h2>
    <p className="job-meta">Experience: {jobDetails.experience}</p>
    <p className="job-meta">No. of positions: {jobDetails.positions}</p>

    <h3>Job Description</h3>
    <p>{jobDetails.description}</p>

    <h3>Roles and Responsibilities</h3>
    <p>{jobDetails.responsibilites}</p>

    <button
      type="button"
      className={`apply-btn ${alreadyApplied ? "applied" : ""}`}
      onClick={confirmApply}
      disabled={alreadyApplied}
    >
      {alreadyApplied ? "Applied" : "Apply"}
    </button>
  </div>

  {applyJob && !alreadyApplied && (
    <form className="apply-form" onSubmit={handleJobApplication}>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Phone Number</label>
      <input
        type="tel"
        pattern="[0-9]{10}"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required
      />

      <label>Skills <small>(separate with commas)</small></label>
      <input
        type="text"
        placeholder="Your Skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        required
      />

      <label>Resume</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleResumeUpload}
        required
      />
      {pdfBase64 && (
        <div className="pdf-preview">
          <p>Uploaded: {pdfName}</p>
          <iframe src={pdfBase64} title="PDF Preview" width="100%" height="200" />
        </div>
      )}

      <label>Experience (in months)</label>
      <input
        type="number"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        required
      />

      <label>Why should we hire you?</label>
      <textarea
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <input type="submit" className="submit-btn" value="Apply for this Job" />
    </form>
  )}
</div>

  );
};

export default Jobapply;
