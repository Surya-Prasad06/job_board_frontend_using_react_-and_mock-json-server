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
    //     <div className="profile-empty">
    //       <h2>No profile found.</h2>
    //       <p>Please register your details to continue.</p>
    //       <Link to="/candidateregister" className="btn-primary">
    //         Register Your Details
    //       </Link>
    //     </div>
    //   ) : (
    //     <>
    //       {profiledetails.slice().reverse().map((profile, index) => (
    //         <div key={index} className="profile-card">
    //           <h2 className="profile-name">
    //             {profile.firstname} {profile.lastname}
    //           </h2>

    //           <h3 className="section-title">About You</h3>
    //           <p className="profile-text">{profile.intro}</p>

    //           <h3 className="section-title">Profile Picture</h3>
    //           <img
    //             src={profile.profilepic}
    //             alt="Profile"
    //             width="160"
    //             className="profile-pic"
    //           />

    //           <h3 className="section-title">Resume</h3>
    //           <iframe
    //             src={profile.resume}
    //             title="Resume Preview"
    //             width="100%"
    //             height="500"
    //             className="resume-frame"
    //           ></iframe>

    //           <h3 className="section-title">Skills</h3>
    //           <div className="skills-container">
    //             {profile.skills.slice().reverse().map((skill, i) => (
    //               <span key={i} className="skill-badge">
    //                 {skill}
    //               </span>
    //             ))}
    //           </div>
    //         </div>
    //       ))}
    //       <div className="update-container">
    //         <Link to={"/candidateprofile/candidateupdate"} className="btn-success">
    //           Update Profile
    //         </Link>
    //       </div>
    //     </>
    //   )}
    // </>
<>
  {profiledetails.length === 0 ? (
    <div className="text-center py-5">
      <h2 className="text-muted">No profile found</h2>
      <p className="text-secondary">Please register your details to continue.</p>
      <Link to="/candidateregister" className="btn btn-primary mt-3">
        <i className="bi bi-person-plus me-2"></i> Register Your Details
      </Link>
    </div>
  ) : (
    <>
      {profiledetails
        .slice()
        .reverse()
        .map((profile, index) => (
          <div
            key={index}
            className="card mb-4 shadow-lg border-0 rounded-3 overflow-hidden"
          >
            <div className="card-body">
              {/* Name */}
              <div className="d-flex align-items-center mb-3">
                <img
                  src={profile.profilepic}
                  alt="Profile"
                  className="rounded-circle border border-3 border-primary me-3"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <div>
                  <h3 className="mb-0 fw-bold">
                    {profile.firstname} {profile.lastname}
                  </h3>
                  <p className="text-muted mb-0">Candidate Profile</p>
                </div>
              </div>

              {/* About Section */}
              <h5 className="text-uppercase text-primary fw-bold mt-4 mb-2">
                About You
              </h5>
              <p className="text-secondary">{profile.intro}</p>

              {/* Resume */}
              <h5 className="text-uppercase text-primary fw-bold mt-4 mb-2">
                Resume
              </h5>
              <div className="border rounded p-2 mb-3" style={{ height: "600px" }}>
                <iframe
                  src={profile.resume}
                  title="Resume Preview"
                  width="100%"
                  height="600"
                  className="border-0"
                ></iframe>
              </div>

              {/* Skills */}
              <h5 className="text-uppercase text-primary fw-bold mt-4 mb-2">
                Skills
              </h5>
              <div className="d-flex flex-wrap gap-2">
                {profile.skills
                  .slice()
                  .reverse()
                  .map((skill, i) => (
                    <span key={i} className="badge bg-info text-dark fs-6">
                      {skill}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        ))}

      {/* Update Button */}
      <div className="text-center my-4">
        <Link
          to="/candidateprofile/candidateupdate"
          className="btn btn-success btn-lg px-4"
        >
          <i className="bi bi-pencil-square me-2"></i> Update Profile
        </Link>
      </div>
    </>
  )}
</>


  )
}

export default Candidateprofilepage
