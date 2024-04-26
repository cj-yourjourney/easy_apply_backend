import axios from 'axios'
import {
  JOB_LIST_REQUEST,
  JOB_LIST_SUCCESS,
  JOB_LIST_FAIL
} from '../constants/jobConstants'
import { type Dispatch } from 'redux'

export const listJobs = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: JOB_LIST_REQUEST })
    const { data } = await axios.get('/api/jobs/')

    // console.log(data)
    const jobListings = data.job_listings
    console.log(jobListings)

    dispatch({
      type: JOB_LIST_SUCCESS,
      payload: jobListings
    })
  } catch (error: any) {
    const errorMessage =
      error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
    dispatch({
      type: JOB_LIST_FAIL,
      payload: errorMessage
    })
  }
}
