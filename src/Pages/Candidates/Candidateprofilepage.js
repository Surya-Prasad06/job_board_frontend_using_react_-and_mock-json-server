import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Css/Profile.css"
const Candidateprofilepage = () => {
  const userId = sessionStorage.getItem("candiateid")
  const [profiledetails, setProfiledetails] = useState([])
  useEffect(() => {

    axios.get(`http://localhost:5000/candidatedetails?candiateid=${userId}`).then((response) => {
      console.log(response.data)
      setProfiledetails(response.data)
    }
    ).catch((error) => {
      console.error(error)
    }
    )
  }, [])

  return (
    // <>
    //   {profiledetails.length === 0 ? (
    //     <div style={{
    //       textAlign: "center",
    //       marginTop: "80px",
    //       fontFamily: "Roboto, sans-serif",
    //       padding: "40px",
    //       borderRadius: "10px",
    //       background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    //       boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
    //     }}>
    //       <h2 style={{ color: "#2c3e50", marginBottom: "10px", fontSize: "28px" }}>
    //         No profile found.
    //       </h2>
    //       <p style={{ color: "#555", marginBottom: "25px", fontSize: "18px" }}>
    //         Please register your details to continue.
    //       </p>
    //       <Link
    //         to="/candidateregister"
    //         style={{
    //           textDecoration: "none",
    //           background: "linear-gradient(45deg, #1976d2, #42a5f5)",
    //           color: "#fff",
    //           padding: "12px 24px",
    //           borderRadius: "25px",
    //           fontWeight: 600,
    //           fontSize: "16px",
    //           boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    //           transition: "all 0.3s ease"
    //         }}
    //         onMouseEnter={(e) => {
    //           e.target.style.transform = "scale(1.05)";
    //         }}
    //         onMouseLeave={(e) => {
    //           e.target.style.transform = "scale(1)";
    //         }}
    //       >
    //         Register Your Details
    //       </Link>
    //     </div>
    //   ) : (
    //     <>
    //       {profiledetails.slice().reverse().map((profile, index) => (
    //         <div
    //           key={index}
    //           style={{
    //             maxWidth: "900px",
    //             margin: "40px auto",
    //             padding: "30px",
    //             borderRadius: "16px",
    //             background: "linear-gradient(135deg, #ffffff, #f9f9f9)",
    //             boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    //             fontFamily: "Roboto, sans-serif",
    //             transition: "transform 0.3s ease"
    //           }}
    //           onMouseEnter={(e) => {
    //             e.currentTarget.style.transform = "translateY(-5px)";
    //           }}
    //           onMouseLeave={(e) => {
    //             e.currentTarget.style.transform = "translateY(0)";
    //           }}
    //         >
    //           <h2 style={{ color: "#1976d2", marginBottom: "15px", fontSize: "26px" }}>
    //             {profile.firstname} {profile.lastname}
    //           </h2>

    //           <h3 style={{ color: "#333", marginTop: "20px" }}>About You</h3>
    //           <p style={{ color: "#555", lineHeight: "1.6", fontSize: "16px" }}>
    //             {profile.intro}
    //           </p>

    //           <h3 style={{ color: "#333", marginTop: "20px" }}>Profile Picture</h3>
    //           <img
    //             src={profile.profilepic}
    //             alt="Profile"
    //             width="160"
    //             style={{
    //               borderRadius: "50%",
    //               border: "5px solid #1976d2",
    //               marginBottom: "20px",
    //               boxShadow: "0 6px 15px rgba(0,0,0,0.2)"
    //             }}
    //           />

    //           <h3 style={{ color: "#333", marginTop: "20px" }}>Resume</h3>
    //           <iframe
    //             src={profile.resume}
    //             title="Resume Preview"
    //             width="100%"
    //             height="500"
    //             style={{
    //               border: "2px solid #1976d2",
    //               borderRadius: "10px",
    //               marginBottom: "25px",
    //               boxShadow: "0 6px 15px rgba(0,0,0,0.1)"
    //             }}
    //           ></iframe>

    //           <h3 style={{ color: "#333", marginTop: "20px" }}>Skills</h3>
    //           <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
    //             {profile.skills.slice().reverse().map((skill, i) => (
    //               <span
    //                 key={i}
    //                 style={{
    //                   background: "linear-gradient(45deg, #42a5f5, #1976d2)",
    //                   color: "white",
    //                   padding: "6px 14px",
    //                   borderRadius: "20px",
    //                   fontSize: "14px",
    //                   fontWeight: 500,
    //                   boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    //                   transition: "transform 0.2s ease"
    //                 }}
    //                 onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
    //                 onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
    //               >
    //                 {skill}
    //               </span>
    //             ))}
    //           </div>
    //         </div>
    //       ))}
    //       <Link to={'/candidateprofile/candidateupdate'}>update profile</Link>
    //     </>
    //   )}
    // </>

    <>
  {profiledetails.length === 0 ? (
    <div className="profile-empty">
      <h2>No profile found.</h2>
      <p>Please register your details to continue.</p>
      <Link to="/candidateregister" className="btn-primary">
        Register Your Details
      </Link>
    </div>
  ) : (
    <>
      {profiledetails.slice().reverse().map((profile, index) => (
        <div key={index} className="profile-card">
          <h2 className="profile-name">
            {profile.firstname} {profile.lastname}
          </h2>

          <h3 className="section-title">About You</h3>
          <p className="profile-text">{profile.intro}</p>

          <h3 className="section-title">Profile Picture</h3>
          <img
            src={profile.profilepic}
            alt="Profile"
            width="160"
            className="profile-pic"
          />

          <h3 className="section-title">Resume</h3>
          <iframe
            src={profile.resume}
            title="Resume Preview"
            width="100%"
            height="500"
            className="resume-frame"
          ></iframe>

          <h3 className="section-title">Skills</h3>
          <div className="skills-container">
            {profile.skills.slice().reverse().map((skill, i) => (
              <span key={i} className="skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
      <div className="update-container">
        <Link to={"/candidateprofile/candidateupdate"} className="btn-success">
          Update Profile
        </Link>
      </div>
    </>
  )}
</>

  )
}

export default Candidateprofilepage
