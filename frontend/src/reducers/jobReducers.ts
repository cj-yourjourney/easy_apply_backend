import {
  JOB_LIST_FAIL,
  JOB_LIST_REQUEST,
  JOB_LIST_SUCCESS,
  JOB_ADD_REQUEST,
  JOB_ADD_SUCCESS,
  JOB_ADD_FAIL
} from '../constants/jobConstants'
import { JobState, JobListActionTypes, Job } from '../types/jobTypes'


const initialState: JobState = {
  jobs: [],
  loading: false,
  error: null
}

export const jobListReducer = (
  state: JobState = initialState,
  action: JobListActionTypes
): JobState => {
  switch (action.type) {
    case JOB_LIST_REQUEST:
      return { ...state, loading: true }
    case JOB_LIST_SUCCESS:
      return { ...state, loading: false, jobs: action.payload }
    case JOB_LIST_FAIL:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
