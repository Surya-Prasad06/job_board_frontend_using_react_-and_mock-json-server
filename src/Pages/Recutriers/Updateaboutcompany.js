import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Css/Updateaboutcompany.css'
const Updateaboutcompany = () => {
  const userId = sessionStorage.getItem('companyId');
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    about: '',
    image: null,
    base64: '',
    uploaderName: '',
  });
  const [preview, setPreview] = useState(''); // for <img>
  const [compId, setCompId] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/company?companyId=${userId}`)
      .then((response) => {
        const res = Array.isArray(response.data)
          ? response.data[0]
          : response.data;

        setFormData((prev) => ({
          ...prev,
          uploaderName: res.uploaderName || '',
          companyName: res.companyName || '',
          website: res.website || '',
          about: res.about || '',
          base64: res.image
            ? res.image.startsWith('data:')
              ? res.image.split(',')[1] // remove prefix if already full data URI
              : res.image
            : '',
          companyId: res.companyId || '',
        }));

        // ✅ for preview: always ensure it has prefix
        if (res.image) {
          setPreview(
            res.image.startsWith('data:')
              ? res.image
              : `data:image/jpeg;base64,${res.image}`
          );
        }

        setCompId(res.id);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const fullBase64 = reader.result; // includes prefix
    //   const cleanBase64 = fullBase64.split(',')[1]; // without prefix

      setFormData((prev) => ({ ...prev, image: file, base64: fullBase64 }));
      setPreview(fullBase64); // ✅ use full string for preview
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      uploaderName: formData.uploaderName,
      companyName: formData.companyName,
      website: formData.website,
      about: formData.about,
      image: formData.base64, // ✅ clean base64 for backend
      companyId: userId,
    };

    axios
      .put(`http://localhost:5000/company/${compId}`, payload)
      .then((res) => {
        alert('Company details updated successfully');
        nav('/companypage');
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to upload image.');
      });
  };

  return (
//     <div className="company-registration-container">
//   <h1 className="form-title">Company Registration</h1>
//   <form onSubmit={handleSubmit} className="company-registration-form">

//     <label>Name (Uploader):</label>
//     <input
//       type="text"
//       name="uploaderName"
//       value={formData.uploaderName}
//       onChange={handleChange}
//       placeholder="Enter your name"
//       required
//     />

//     <label>Company Name:</label>
//     <input
//       type="text"
//       name="companyName"
//       value={formData.companyName}
//       onChange={handleChange}
//       placeholder="Enter company name"
//       required
//     />

//     <label>Website:</label>
//     <input
//       type="url"
//       name="website"
//       value={formData.website}
//       onChange={handleChange}
//       placeholder="https://example.com"
//     />

//     <label>About Company:</label>
//     <textarea
//       name="about"
//       value={formData.about}
//       onChange={handleChange}
//       placeholder="Brief description about company"
//     />

//     <label>Company Image:</label>
//     <input
//       type="file"
//       accept="image/*"
//       onChange={handleImageChange}
//       required={!formData.image}
//     />

//     {preview && (
//       <div className="image-preview">
//         <p>Preview:</p>
//         <img src={preview} alt="Preview" />
//       </div>
//     )}

//     <button type="submit" className="submit-btn">Submit</button>
//   </form>
// </div>
<div className="container mt-5">
  <h1 className="text-center mb-4">Company Registration</h1>
  <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-light">

    <div className="mb-3">
      <label className="form-label">Name (Uploader):</label>
      <input
        type="text"
        name="uploaderName"
        value={formData.uploaderName}
        onChange={handleChange}
        placeholder="Enter your name"
        required
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Company Name:</label>
      <input
        type="text"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        placeholder="Enter company name"
        required
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Website:</label>
      <input
        type="url"
        name="website"
        value={formData.website}
        onChange={handleChange}
        placeholder="https://example.com"
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <label className="form-label">About Company:</label>
      <textarea
        name="about"
        value={formData.about}
        onChange={handleChange}
        placeholder="Brief description about company"
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Company Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required={!formData.image}
        className="form-control"
      />
    </div>

    {preview && (
      <div className="mb-3">
        <p className="fw-bold">Preview:</p>
        <img src={preview} alt="Preview" className="img-thumbnail" style={{ maxWidth: "200px" }} />
      </div>
    )}

    <button type="submit" className="btn btn-primary w-100">Submit</button>
  </form>
</div>


  );
};

export default Updateaboutcompany;


