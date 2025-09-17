import axios from 'axios';
import React, { useState } from 'react'
import './Css/Candidateregister.css'
import { useNavigate } from 'react-router-dom';
const Candidateregister = () => {
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
    axios.post("http://localhost:5000/candidatedetails", { firstname, lastname, candiateid, email, phonenumber, skills: skills.split(",").slice().reverse().map(skill => skill.trim()), intro, profilepic: image, resume: pdfBase64, }).then((response) => {
      console.log(response.data)
      alert("successfully uploaded")
      navigate('/candidateprofile')
    }
    ).catch((error) => {
      console.error(error)

    }
    )
  }


  return (
    // <div>
    //   <form onSubmit={uploaddetails}>
    //     <label htmlFor=""> Frist Name</label>
    //     <input type="text" required value={firstname} onChange={(event) => {
    //       setFistname(event.target.value)
    //     }
    //     } /> <br />
    //     <label htmlFor="">Last Name</label>
    //     <input type="text" required value={lastname} onChange={(event) => {
    //       setLastname(event.target.value)
    //     }
    //     } /> <br />
    //     <label htmlFor="">Email</label>
    //     <input type="email" required value={email} onChange={(event) => {
    //       setEmail(event.target.value)
    //     }
    //     } /><br />
    //     <label htmlFor="">Phone Number</label>
    //     <input type="tel" pattern="[0-9]{4}[0-9]{2}[0-9]{4}" value={phonenumber} onChange={(event) => {
    //       setPhonenumber(event.target.value)
    //     }
    //     } required /><br />
    //     <label htmlFor="">skills<small style={{ fontSize: '.7rem' }}> add <strong>, </strong>to seperate the skills</small></label>

    //     <input type="text" required value={skills} onChange={(event) => {
    //       setSkills(event.target.value)
    //     }
    //     } /><br />
    //     <label htmlFor="">About Your Self</label>
    //     <textarea required value={intro} onChange={(event) => {
    //       setIntro(event.target.value)
    //     }
    //     }></textarea><br />
    //     <label>Profile Picture:</label>
    //     <input type="file" accept="image/*" onChange={profilepicturehandleImageChange} required />

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
    //     <input type="file" accept="application/pdf" onChange={resumehandlePDFChange} required />

    //     {pdfBase64 && (
    //       <div>
    //         <p>resume: {pdfName}</p>
    //         <iframe
    //           src={pdfBase64}
    //           title="PDF Preview"
    //           width="300"
    //           height="200"
    //           style={{ border: "1px solid #ccc" }}
    //         ></iframe>
    //       </div>
    //     )}

    //     <input type="submit" value="Upload Details" />
    //   </form>
    // </div>
<div className="form-container">
      <form onSubmit={uploaddetails} className="profile-form">
        <label>First Name</label>
        <input
          type="text"
          required
          value={firstname}
          onChange={(event) => setFistname(event.target.value)}
        />

        <label>Last Name</label>
        <input
          type="text"
          required
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label>Phone Number</label>
        <input
          type="tel"
          pattern="[0-9]{4}[0-9]{2}[0-9]{4}"
          value={phonenumber}
          onChange={(event) => setPhonenumber(event.target.value)}
          required
        />

        <label>
          Skills{" "}
          <small>(add <strong>,</strong> to separate skills)</small>
        </label>
        <input
          type="text"
          required
          value={skills}
          onChange={(event) => setSkills(event.target.value)}
        />

        <label>About Yourself</label>
        <textarea
          required
          value={intro}
          onChange={(event) => setIntro(event.target.value)}
        ></textarea>

        <label>Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={profilepicturehandleImageChange}
          required
        />

        {image && (
          <div className="preview-container">
            <p>Preview:</p>
            <img src={image} alt="preview" className="image-preview" />
          </div>
        )}

        <label>Resume</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={resumehandlePDFChange}
          required
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

        <input type="submit" value="Upload Details" className="submit-btn" />
      </form>
    </div>
  );
}

export default Candidateregister
