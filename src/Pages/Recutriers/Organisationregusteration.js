import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrganisationRegistration = () => {
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState('');
  const [uploaderName, setUploaderName] = useState('');
  const nav = useNavigate();

  const Id = sessionStorage.getItem('companyId')
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result); // base64 string
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    axios.post("http://localhost:5000/company", {
      uploaderName,
      companyName,
      website,
      about,
      image: base64,
      companyId: Id
    })
      .then(res => {
        alert("you have registered");
        nav('/companypage')
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to upload image.");
      });
  };

  return (
    // <div className="company-registration-container">
    //   <h1 className="form-title">Company Registration</h1>
    //   <form onSubmit={handleSubmit} className="company-registration-form">

    //     <label>Name (Uploader):</label>
    //     <input
    //       type="text"
    //       value={uploaderName}
    //       onChange={(e) => setUploaderName(e.target.value)}
    //       placeholder="Your name"
    //       required
    //     />

    //     <label>Company Name:</label>
    //     <input
    //       type="text"
    //       value={companyName}
    //       onChange={(e) => setCompanyName(e.target.value)}
    //       placeholder="Company name"
    //       required
    //     />

    //     <label>Website:</label>
    //     <input
    //       type="url"
    //       value={website}
    //       onChange={(e) => setWebsite(e.target.value)}
    //       placeholder="https://example.com"
    //     />

    //     <label>About Company:</label>
    //     <textarea
    //       value={about}
    //       onChange={(e) => setAbout(e.target.value)}
    //       placeholder="Brief description about company"
    //     />

    //     <label>Company Image:</label>
    //     <input
    //       type="file"
    //       accept="image/*"
    //       onChange={handleImageChange}
    //       required
    //     />

    //     <button type="submit" className="submit-btn">Submit</button>
    //   </form>
    // </div>


    <div className="container d-flex justify-content-center align-items-center min-vh-100">
  <div className="col-12 col-md-8 col-lg-6">
    <div className="card shadow p-4">
      <h2 className="text-center mb-4">Company Registration</h2>

      <form onSubmit={handleSubmit}>
        {/* Uploader Name */}
        <div className="mb-3">
          <label className="form-label">Name (Uploader)</label>
          <input
            type="text"
            className="form-control"
            value={uploaderName}
            onChange={(e) => setUploaderName(e.target.value)}
            placeholder="Your name"
            required
          />
        </div>

        {/* Company Name */}
        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            className="form-control"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company name"
            required
          />
        </div>

        {/* Website */}
        <div className="mb-3">
          <label className="form-label">Website</label>
          <input
            type="url"
            className="form-control"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        {/* About Company */}
        <div className="mb-3">
          <label className="form-label">About Company</label>
          <textarea
            className="form-control"
            rows="3"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Brief description about company"
          />
        </div>

        {/* Company Image */}
        <div className="mb-3">
          <label className="form-label">Company Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</div>


  );
};

export default OrganisationRegistration;
