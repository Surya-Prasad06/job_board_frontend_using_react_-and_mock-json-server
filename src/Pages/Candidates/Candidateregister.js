import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Candidateregister = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const candiateid = sessionStorage.getItem("candiateid")
  const [pdfBase64, setPdfBase64] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [image, setImage] = useState("");
  const [firstname, setFistname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [phonenumber, setPhonenumber] = useState("")
  const [skills, setSkills] = useState("")
  const [intro, setIntro] = useState("")
  const navigate = useNavigate()
  const resumehandlePDFChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfBase64(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PDF file");
    }
  };
  const profilepicturehandleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const uploaddetails = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/candidatedetails`, { firstname, lastname, candiateid, email, phonenumber, skills: skills.split(",").slice().reverse().map(skill => skill.trim()), intro, profilepic: image, resume: pdfBase64, }).then((response) => {
      
      alert("successfully uploaded")
      navigate('/candidateprofile')
    }
    ).catch((error) => {
      console.error(error)

    }
    )
  }


  return (
    <div className="container my-5">
  <div className="card shadow p-4">
    <h3 className="mb-4 text-center">Upload Profile Details</h3>

    <form onSubmit={uploaddetails} className="needs-validation" noValidate>
      {/* First Name */}
      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input
          type="text"
          className="form-control"
          required
          value={firstname}
          onChange={(event) => setFistname(event.target.value)}
        />
      </div>

      {/* Last Name */}
      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input
          type="text"
          className="form-control"
          required
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      {/* Phone Number */}
      <div className="mb-3">
        <label className="form-label">Phone Number</label>
        <input
          type="tel"
          className="form-control"
          pattern="[0-9]{4}[0-9]{2}[0-9]{4}"
          value={phonenumber}
          onChange={(event) => setPhonenumber(event.target.value)}
          required
        />
        <div className="form-text">Format: 0000000000</div>
      </div>

      {/* Skills */}
      <div className="mb-3">
        <label className="form-label">
          Skills <small>(separate with commas)</small>
        </label>
        <input
          type="text"
          className="form-control"
          required
          value={skills}
          onChange={(event) => setSkills(event.target.value)}
        />
      </div>

      {/* About Yourself */}
      <div className="mb-3">
        <label className="form-label">About Yourself</label>
        <textarea
          className="form-control"
          rows="4"
          required
          value={intro}
          onChange={(event) => setIntro(event.target.value)}
        ></textarea>
      </div>

      {/* Profile Picture */}
      <div className="mb-3">
        <label className="form-label">Profile Picture</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={profilepicturehandleImageChange}
          required
        />
        {image && (
          <div className="mt-3 text-center">
            <p className="fw-bold">Preview:</p>
            <img
              src={image}
              alt="preview"
              className="img-thumbnail"
              style={{ maxWidth: "200px" }}
            />
          </div>
        )}
      </div>

      {/* Resume */}
      <div className="mb-3">
        <label className="form-label">Resume (PDF)</label>
        <input
          type="file"
          className="form-control"
          accept="application/pdf"
          onChange={resumehandlePDFChange}
          required
        />
        {pdfBase64 && (
          <div className="mt-3">
            <p className="fw-bold">Resume: {pdfName}</p>
            <iframe
              src={pdfBase64}
              title="PDF Preview"
              className="w-100 border rounded"
              style={{ height: "400px" }}
            ></iframe>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="d-grid">
        <button type="submit" className="btn btn-success">
          Upload Details
        </button>
      </div>
    </form>
  </div>
</div>

  );
}

export default Candidateregister
