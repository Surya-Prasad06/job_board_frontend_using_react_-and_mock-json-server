import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginandsignuppage from './Pages/Recutriers/Loginandsignuppage';
import Organisationregusteration from './Pages/Recutriers/Organisationregusteration';
import CompanyPage from './Pages/Recutriers/CompanyPage'
import Jobposting from './Pages/Recutriers/Jobposting';
import Jobpostinglist from './Pages/Recutriers/Jobpostinglist';
import Candidatesuserloginandsignup from './Pages/Candidates/Candidatesuserloginandsignup';
import Candidateregister from './Pages/Candidates/Candidateregister';
import Recutriterprotectedroutes from './Components/Recutriterprotectedroutes';
import Canditateprotectedroutes from './Components/Canditateprotectedroutes';
import Candidateprofilepage from './Pages/Candidates/Candidateprofilepage';
import Jobpostingforcandidates from './Pages/Candidates/Jobpostingforcandidates';
import Home from './Pages/Home';
import Jobapply from './Pages/Candidates/Jobapply';
import Rectriernavbar from './Components/Rectriernavbar';
import CandidateNavbar from './Components/CandidateNavbar';
import AppliedCandidates from './Pages/Recutriers/AppliedCandidates'
import Candidateprofileupdatepage from './Pages/Candidates/Candidateprofileupdatepage';
import AppliedJobs from './Pages/Candidates/AppliedJobs';
import Updateaboutcompany from './Pages/Recutriers/Updateaboutcompany';
import { useState } from 'react';
import Text from './Components/Text';
function App() {
  const companyId = sessionStorage.getItem('companyId')
  const candiateid = sessionStorage.getItem('candiateid')
  return (
    <>

      <Router>
        {companyId ? (
          <Rectriernavbar />
        ) : candiateid ? (
          <CandidateNavbar />
        ) : null}

        <br />
        <Text />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/recutrierslogin' element={<Loginandsignuppage />} />
          <Route element={<Recutriterprotectedroutes />}>
            <Route path='/companyregisteration' element={<Organisationregusteration />} />
            <Route path='/companypage' element={<CompanyPage />} />
            <Route path='/companypage/jobposting' element={<Jobposting />} />
            <Route path='/companypage/jobposting/joblist' element={<Jobpostinglist />} />
            <Route path='/companypage/jobposting/joblist/appliedcandidates/:id' element={<AppliedCandidates />} />
            {/* recutriter updates pages */}
            <Route path='/comapanypage/updateaboutcompany' element={<Updateaboutcompany />} />


          </Route>
          {/* candidates page */}
          <Route path='/candidatesuserlogin' element={<Candidatesuserloginandsignup />} />
          <Route element={<Canditateprotectedroutes />}>
            <Route path='/candidateregister' element={<Candidateregister />} />
            <Route path='/candidateprofile/candidateupdate' element={<Candidateprofileupdatepage />} />
            <Route path='/candidateprofile' element={<Candidateprofilepage />} />
            <Route path='/candidates/joblistings' element={<Jobpostingforcandidates />} />
            <Route path='/candidates/joblistings/:id' element={<Jobapply />} />
            <Route path='/candidates/appliedjobs' element={<AppliedJobs />} />

          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
