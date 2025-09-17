import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Candidateprofileupdatepage = () => {
  const userId = sessionStorage.getItem("candiateid");
const API_URL = process.env.REACT_APP_API_URL;
  const [profileId, setProfileId] = useState(null); // <-- json-server ID
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [skills, setSkills] = useState("");
  const [intro, setIntro] = useState("");
  const [image, setImage] = useState("");
  const [pdfBase64, setPdfBase64] = useState("");
  const [pdfName, setPdfName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/candidatedetails?candiateid=${userId}`)
      .then((response) => {
        if (response.data.length > 0) {
          const profile = response.data[0];
          setProfileId(profile.id);

          setFirstname(profile.firstname || "");
          setLastname(profile.lastname || "");
          setEmail(profile.email || "");
          setPhonenumber(profile.phonenumber || "");
          setSkills(profile.skills ? profile.skills.join(", ") : "");
          setIntro(profile.intro || "");
          setImage(profile.profilepic || "");
          setPdfBase64(profile.resume || "");
          setPdfName("Existing Resume");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId, API_URL]);

  // Handle Resume Upload
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

  // Handle Profile Picture Upload
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

  // Handle form submit (update details)
  const updateDetails = (e) => {
    e.preventDefault();

    if (!profileId) {
      alert("Profile ID not found, please try again.");
      return;
    }

    axios
      .put(`${API_URL}/candidatedetails/${profileId}`, {
        candiateid: userId, // keep candiateid for future lookups
        firstname,
        lastname,
        email,
        phonenumber,
        skills: skills.split(",").slice().reverse().map((s) => s.trim()),
        intro,
        profilepic: image,
        resume: pdfBase64,
      })
      .then((response) => {
        console.log(response.data);
        alert("Profile updated successfully!");
        sessionStorage.setItem(
          "candidateDetails",
          JSON.stringify(response.data)
        );
        navigate("/candidateprofile");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to update profile");
      });
  };

  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <h3 className="mb-4 text-center">Update Profile</h3>
        <form onSubmit={updateDetails} className="needs-validation" noValidate>
          {/* First Name */}
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
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
              onChange={(e) => setLastname(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPhonenumber(e.target.value)}
              required
            />
            <div className="form-text">Format: 0000 00 0000</div>
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
              onChange={(e) => setSkills(e.target.value)}
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
              onChange={(e) => setIntro(e.target.value)}
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
            <button type="submit" className="btn btn-primary">
              Update Details
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}



export default Candidateprofileupdatepage;
