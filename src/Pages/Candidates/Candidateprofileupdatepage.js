import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Css/UpdateProfile.css'
const Candidateprofileupdatepage = () => {
  const userId = sessionStorage.getItem("candiateid");

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
      .get(`http://localhost:5000/candidatedetails?candiateid=${userId}`)
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
  }, [userId]);

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
      .put(`http://localhost:5000/candidatedetails/${profileId}`, {
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
    // <div>
    //   <form onSubmit={updateDetails}>
    //     <label>First Name:</label>
    //     <input
    //       type="text"
    //       required
    //       value={firstname}
    //       onChange={(e) => setFirstname(e.target.value)}
    //     />
    //     <br />

    //     <label>Last Name:</label>
    //     <input
    //       type="text"
    //       required
    //       value={lastname}
    //       onChange={(e) => setLastname(e.target.value)}
    //     />
    //     <br />

    //     <label>Email:</label>
    //     <input
    //       type="email"
    //       required
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <br />

    //     <label>Phone Number:</label>
    //     <input
    //       type="tel"
    //       pattern="[0-9]{4}[0-9]{2}[0-9]{4}"
    //       value={phonenumber}
    //       onChange={(e) => setPhonenumber(e.target.value)}
    //       required
    //     />
    //     <br />

    //     <label>
    //       Skills{" "}
    //       <small style={{ fontSize: ".7rem" }}>
    //         (add <strong>,</strong> to separate)
    //       </small>
    //     </label>
    //     <input
    //       type="text"
    //       required
    //       value={skills}
    //       onChange={(e) => setSkills(e.target.value)}
    //     />
    //     <br />

    //     <label>About Yourself:</label>
    //     <textarea
    //       required
    //       value={intro}
    //       onChange={(e) => setIntro(e.target.value)}
    //     ></textarea>
    //     <br />

    //     <label>Profile Picture:</label>
    //     <input
    //       type="file"
    //       accept="image/*"
    //       onChange={profilepicturehandleImageChange}
    //     />

    //     {image && (
    //       <div>
    //         <p>Preview:</p>
    //         <img
    //           src={image}
    //           alt="preview"
    //           style={{ width: "150px", border: "1px solid #ccc" }}
    //         />
    //       </div>
    //     )}

    //     <label>Resume:</label>
    //     <input
    //       type="file"
    //       accept="application/pdf"
    //       onChange={resumehandlePDFChange}
    //     />

    //     {pdfBase64 && (
    //       <div>
    //         <p>Resume: {pdfName}</p>
    //         <iframe
    //           src={pdfBase64}
    //           title="PDF Preview"
    //           width="300"
    //           height="200"
    //           style={{ border: "1px solid #ccc" }}
    //         ></iframe>
    //       </div>
    //     )}

    //     <input type="submit" value="Update Details" />
    //   </form>
    // </div>



    <div className="form-container">
      <form onSubmit={updateDetails} className="profile-form">
        <label>First Name:</label>
        <input
          type="text"
          required
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <label>Last Name:</label>
        <input
          type="text"
          required
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

        <label>Email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Phone Number:</label>
        <input
          type="tel"
          pattern="[0-9]{4}[0-9]{2}[0-9]{4}"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          required
        />

        <label>
          Skills{" "}
          <small>(add <strong>,</strong> to separate)</small>
        </label>
        <input
          type="text"
          required
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <label>About Yourself:</label>
        <textarea
          required
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
        ></textarea>

        <label>Profile Picture:</label>
        <input
          type="file"
          accept="image/*"
          onChange={profilepicturehandleImageChange}
        />

        {image && (
          <div className="preview-container">
            <p>Preview:</p>
            <img src={image} alt="preview" className="image-preview" />
          </div>
        )}

        <label>Resume:</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={resumehandlePDFChange}
        />

        {pdfBase64 && (
          <div className="preview-container">
            <p>Resume: {pdfName}</p>
            <iframe
              src={pdfBase64}
              title="PDF Preview"
              className="pdf-preview"
            ></iframe>
          </div>
        )}

        <input type="submit" value="Update Details" className="submit-btn" />
      </form>
    </div>
  );
}



export default Candidateprofileupdatepage;
