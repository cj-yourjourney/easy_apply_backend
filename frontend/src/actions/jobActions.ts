import axios, { AxiosError } from 'axios'
import type { Dispatch } from 'redux'
import { Job } from '../types/jobTypes'
import {
  JOB_LIST_REQUEST,
  JOB_LIST_SUCCESS,
  JOB_LIST_FAIL
} from '../constants/jobConstants'

export const listJobs = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: JOB_LIST_REQUEST })
    const { data } = await axios.get('/api/jobs/')

    const jobListings: Job[] = data.job_listings
    // console.log(jobListings)

    dispatch({
      type: JOB_LIST_SUCCESS,
      payload: jobListings
    })
  } catch (error:any) {
    let errorMessage: string

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data.detail || 'Network Error'
    } else {
      errorMessage = error.message || 'Unknown Error'
    }

    dispatch({
      type: JOB_LIST_FAIL,
      payload: errorMessage
    })
  }
}
