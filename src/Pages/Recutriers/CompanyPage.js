import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Css/CompanyPage.css'
const CompanyPage = () => {
    const userId = sessionStorage.getItem('companyId');
    const [company, setCompany] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/company?companyId=${userId}`)
            .then((response) => {
                setCompany(response.data)
                console.log(response.data[0])

                sessionStorage.setItem("companywebsite", response.data[0].website);
                sessionStorage.setItem("companyName", response.data[0].companyName);
            }
            ).catch((error) => {
                console.log(error)
            }
            )
    }, [])

    return (
        // <>
        //     {company.length === 0 ? (
        //         <div>
        //             <h2>No company profile found.</h2>
        //             <p>Please register your company details to continue.</p>
        //             <Link to="/companyregisteration">Register Company</Link>
        //         </div>
        //     ) : (
        //         <>
        //             {company.slice().reverse().map((comp, index) => (
        //                 <ul key={index}>
        //                     <li><Link to={comp.website}>{comp.companyName}</Link></li>
        //                     <li><img src={comp.image} alt={comp.companyName} /></li>
        //                     <li>{comp.about}</li>
        //                 </ul>
        //             ))} 
        //             <Link to={'/comapanypage/updateaboutcompany'}>
        //             <button>update company details</button></Link>
        //             <h1>Jobs</h1>
        //             <Link to='/companypage/jobposting'>Add Job Posting</Link><br />
        //             <Link to='/companypage/jobposting/joblist'>Jobs Posted</Link>
        //         </>
        //     )}
        // </>

        <>
  {company.length === 0 ? (
    <div className="no-company">
      <h2>No company profile found.</h2>
      <p>Please register your company details to continue.</p>
      <Link to="/companyregisteration" className="register-btn">
        Register Company
      </Link>
    </div>
  ) : (
    <>
      {company.slice().reverse().map((comp, index) => (
        <div key={index} className="company-card">
          <Link to={comp.website} className="company-name">{comp.companyName}</Link>
          <img src={comp.image} alt={comp.companyName} className="company-image" />
          <p className="company-about">{comp.about}</p>
        </div>
      ))}

      <div className="company-actions">
        <Link to="/comapanypage/updateaboutcompany">
          <button className="update-btn">Update Company Details</button>
        </Link>
        <h2>Jobs</h2>
        <Link to="/companypage/jobposting" className="job-link">Add Job Posting</Link><br />
        <Link to="/companypage/jobposting/joblist" className="job-link">Jobs Posted</Link>
      </div>
    </>
  )}
</>

    )
}

export default CompanyPage



