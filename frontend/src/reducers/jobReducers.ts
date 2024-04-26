import { JOB_LIST_FAIL, JOB_LIST_REQUEST, JOB_LIST_SUCCESS } from '../constants/jobConstants';
import {JobState, JobActionTypes } from '../types/jobTypes'

const initialState: JobState = {
  jobs: [],
  loading: false,
  error: null
}

export const jobListReducer = (
  state: JobState = initialState,
  action: JobActionTypes
): JobState => {
  switch (action.type) {
    case JOB_LIST_REQUEST:
      return {...state, loading:true}
    case JOB_LIST_SUCCESS:
      return {...state, loading:false, jobs: action.payload}  
    case JOB_LIST_FAIL:
      return {...state, loading:false, error: action.payload}
  
    default:
      return state 
  }
}
