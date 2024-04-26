import React, { useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import { listJobs } from '../actions/jobActions'

function Home() {

    const dispatch = useAppDispatch()

    const handleJobListing = () => {
        
        dispatch(listJobs())
    }


  return (
    <>
      <div>Home</div>
      <button onClick={handleJobListing}>Job</button>
    </>
  )
}

export default Home