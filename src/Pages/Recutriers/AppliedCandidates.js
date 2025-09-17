import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const AppliedCandidates = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [appliedCandidates, setAppliedCandidates] = useState([])
  const [buttonview, setButtonview] = useState(null) // track expanded candidate
  const [jobExists, setJobExists] = useState(true)
  const nav = useNavigate()
  const { id } = useParams()
  const jobId = id

  useEffect(() => {
    // ✅ check if the job posting exists
    axios
      .get(`${API_URL}/jobpostings/${jobId}`)
      .then((response) => {
        if (!response.data || Object.keys(response.data).length === 0) {
          setJobExists(false)
        }
      })
      .catch(() => {
        setJobExists(false)
      })

    // ✅ fetch applied candidates
    axios
      .get(`${API_URL}/jobapplication?jobId=${jobId}`)
      .then((response) => {
        setAppliedCandidates(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [jobId, API_URL])

  const markeviewed = async (candiateid) => {
    try {
      const res = await axios.get(
        `${API_URL}/applicationstatus?applicationId=${candiateid}`
      )

      if (res.data.length > 0) {
        const statusId = res.data[0].id
        await axios.put(`${API_URL}/applicationstatus/${statusId}`, {
          applicationId: candiateid,
          status: 'viewed',
          jobid: id,

        })
      } else {
        await axios.post(`${API_URL}/applicationstatus`, {
          applicationId: candiateid,
          status: 'viewed',
          jobid: id,

        })
      }

      // ✅ update local state correctly
      setAppliedCandidates((prev) =>
        prev.map((app) =>
          app.candiateid === candiateid ? { ...app, status: 'viewed' } : app
        )
      )
    } catch (error) {
      console.error('Error marking as viewed:', error)
    }
  }

  return (
    <>
      {!jobExists ? (
        <h2 className="text-center text-muted my-5">No one applied</h2>
      ) : appliedCandidates.length === 0 ? (
        <p className="text-center text-muted my-5">No one applied</p>
      ) : (
        <>
          <h1 className="text-center mb-4">Applied Candidates</h1>

          <div className="container">
            <div className="row g-4">
              {appliedCandidates.slice().reverse().map((applied) => (
                <div key={applied.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <h3 className="card-title h5">Role: {applied.role}</h3>

                      <ul className="list-unstyled mb-3">
                        <li>
                          <strong>Candidate Name:</strong> {applied.name}
                        </li>
                        <li className="mt-2">
                          <strong>Resume:</strong>
                          <div className="mt-2 border rounded">
                            <embed
                              src={applied.resume}
                              type="application/pdf"
                              width="100%"
                              height="600"
                              className="w-100"
                            />
                          </div>
                        </li>
                      </ul>

                      {/* Toggle details button */}
                      <button
                        className="btn btn-sm btn-primary mb-3"
                        onClick={() =>
                          setButtonview(buttonview === applied.id ? null : applied.id)
                        }
                      >
                        {buttonview === applied.id ? 'Hide details' : 'View more details'}
                      </button>

                      {/* Candidate details */}
                      {buttonview === applied.id && (
                        <ul className="list-group list-group-flush mb-3 flex-grow-1">
                          <li className="list-group-item">
                            <strong>Contact Number:</strong> {applied.number}
                          </li>
                          <li className="list-group-item">
                            <strong>Skills:</strong>
                            <div className="mt-2 d-flex flex-wrap gap-2">
                              {applied.skills.map((skill, index) => (
                                <span key={index} className="badge bg-secondary">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </li>
                          <li className="list-group-item">
                            <strong>Why Should we hire you?</strong>
                            <p className="mt-2">{applied.message}</p>
                          </li>
                        </ul>
                      )}

                      {/* Mark as viewed */}
                      <button
                        className={`btn mt-auto ${applied.status === 'viewed'
                            ? 'btn-success'
                            : 'btn-outline-success'
                          }`}
                        onClick={() => markeviewed(applied.candiateid)}
                      >
                        {applied.status === 'viewed' ? 'Viewed' : 'Mark as Viewed'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>



  )
}

export default AppliedCandidates
