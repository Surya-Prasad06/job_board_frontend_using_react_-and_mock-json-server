import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Css/Organisationregusteration.css'
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
        // <div>
        //     <h1>Company Registration</h1>
        //     <form onSubmit={handleSubmit}>
        //         <label>Name (Uploader):</label><br />
        //         <input type="text" value={uploaderName} onChange={(e) => setUploaderName(e.target.value)} required /><br /><br />

        //         <label>Company Name:</label><br />
        //         <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required /><br /><br />

        //         <label>Website:</label><br />
        //         <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} /><br /><br />

        //         <label>About Company:</label><br />
        //         <textarea value={about} onChange={(e) => setAbout(e.target.value)} /><br /><br />

        //         <label>Company image:</label><br />
        //         <input type="file" accept="image/*" onChange={handleImageChange} required /><br /><br />

        //         <button type="submit">Submit</button>
        //     </form>
        // </div>
        <div className="company-registration-container">
  <h1 className="form-title">Company Registration</h1>
  <form onSubmit={handleSubmit} className="company-registration-form">
    
    <label>Name (Uploader):</label>
    <input
      type="text"
      value={uploaderName}
      onChange={(e) => setUploaderName(e.target.value)}
      placeholder="Your name"
      required
    />

    <label>Company Name:</label>
    <input
      type="text"
      value={companyName}
      onChange={(e) => setCompanyName(e.target.value)}
      placeholder="Company name"
      required
    />

    <label>Website:</label>
    <input
      type="url"
      value={website}
      onChange={(e) => setWebsite(e.target.value)}
      placeholder="https://example.com"
    />

    <label>About Company:</label>
    <textarea
      value={about}
      onChange={(e) => setAbout(e.target.value)}
      placeholder="Brief description about company"
    />

    <label>Company Image:</label>
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      required
    />

    <button type="submit" className="submit-btn">Submit</button>
  </form>
</div>

    );
};

export default OrganisationRegistration;
