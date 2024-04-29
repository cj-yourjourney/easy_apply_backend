import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { listJobs } from '../actions/jobActions'
import { type Job } from '../types/jobTypes'
// import './Home.css' // Import your CSS file for styling

function Home() {
  const dispatch = useAppDispatch()
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  // Fetching job list from Redux store
  const jobsList = useAppSelector((state) => state.jobList)
  const { loading, error, jobs } = jobsList

  // Dispatching action to fetch jobs when component mounts
  useEffect(() => {
    dispatch(listJobs())
  }, [dispatch])

  // Function to handle job selection
  const handleJobSelect = (job: Job) => {
    setSelectedJob(job)
  }

  return (
    <div className="container">
      <div className="left-column">
        <h2>All Jobs</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ul>
            {jobs.map((job) => (
              <li key={job.title} onClick={() => handleJobSelect(job)}>
                <div>
                  <h3>{job.title}</h3>
                  <p>{job.company_name}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="right-column">
        <h2>Job Details</h2>
        {selectedJob ? (
          <div className="job-details">
            <h3>{selectedJob.title}</h3>
            <p>Company: {selectedJob.company_name}</p>
            <p>Description: {selectedJob.description}</p>
            <a
              href={selectedJob.apply_job_link}
              target="_blank"
              rel="noreferrer"
            >
              Apply
            </a>
          </div>
        ) : (
          <p>Select a job to view details.</p>
        )}
      </div>
    </div>
  )
}

export default Home
