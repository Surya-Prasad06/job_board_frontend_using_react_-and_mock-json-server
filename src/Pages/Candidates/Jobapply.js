import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
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
const API_URL = process.env.REACT_APP_API_URL;
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
      .post(`${API_URL}/jobapplication`, applicationData)
      .then((response) => {
        alert("You have successfully applied to this position");
       
        setAlreadyApplied(true);
        setApplyJob(false);
        nav("/candidates/joblistings");
      })
      .catch((error) => console.error(error));
  };


  
  useEffect(() => {
    axios
      .get(`${API_URL}/jobpostings/${id}`)
      .then((response) => {setJobDetails(response.data); setRole(response.data.role); setCompname(response.data.companyName)}
    )
      .catch((error) => console.error(error));
  }, [id, API_URL]);

  // check if already applied
  useEffect(() => {
    axios
      .get(
        `${API_URL}/jobapplication?jobId=${id}&candiateid=${candidateId}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          setAlreadyApplied(true);
        }
      })
      .catch((error) => console.error(error));
  }, [id, candidateId, API_URL]);

  // confirm apply
  const confirmApply = () => {
    if (window.confirm("Do you want to apply?")) {
      setApplyJob(true);
    }
  };

  return (

<div className="container my-5">
  {/* Job Card */}
  <div className="card shadow p-4 mb-4">
    <h4>
      <Link
        to={jobDetails.companywebsite}
        className="text-decoration-none fw-bold text-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        {jobDetails.companyName}
      </Link>
    </h4>
    <h2 className="mb-3">{jobDetails.role}</h2>

    <p className="text-muted mb-1">Experience: {jobDetails.experience}</p>
    <p className="text-muted mb-3">No. of positions: {jobDetails.positions}</p>

    <h5>Job Description</h5>
    <p>{jobDetails.description}</p>

    <h5>Roles and Responsibilities</h5>
    <p>{jobDetails.responsibilites}</p>

    <div className="d-grid mt-3">
      <button
        type="button"
        className={`btn ${alreadyApplied ? "btn-secondary" : "btn-success"}`}
        onClick={confirmApply}
        disabled={alreadyApplied}
      >
        {alreadyApplied ? "Applied" : "Apply"}
      </button>
    </div>
  </div>

  {/* Application Form */}
  {applyJob && !alreadyApplied && (
    <div className="card shadow p-4">
      <h4 className="mb-4">Apply for this Job</h4>
      <form className="needs-validation" noValidate onSubmit={handleJobApplication}>
        
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            pattern="[0-9]{10}"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          <div className="form-text">Enter 10 digits</div>
        </div>

        {/* Skills */}
        <div className="mb-3">
          <label className="form-label">
            Skills <small>(separate with commas)</small>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Your Skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
        </div>

        {/* Resume */}
        <div className="mb-3">
          <label className="form-label">Resume (PDF)</label>
          <input
            type="file"
            className="form-control"
            accept="application/pdf"
            onChange={handleResumeUpload}
            required
          />
          {pdfBase64 && (
            <div className="mt-3">
              <p className="fw-bold">Uploaded: {pdfName}</p>
              <iframe
                src={pdfBase64}
                title="PDF Preview"
                className="w-100 border rounded"
                style={{ height: "250px" }}
              />
            </div>
          )}
        </div>

        {/* Experience */}
        <div className="mb-3">
          <label className="form-label">Experience (in months)</label>
          <input
            type="number"
            className="form-control"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </div>

        {/* Why hire you */}
        <div className="mb-3">
          <label className="form-label">Why should we hire you?</label>
          <textarea
            className="form-control"
            placeholder="Your message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Apply for this Job
          </button>
        </div>
      </form>
    </div>
  )}
</div>


  );
};

export default Jobapply;
