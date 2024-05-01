import { JOB_LIST_REQUEST, JOB_LIST_SUCCESS, JOB_LIST_FAIL, JOB_ADD_REQUEST, JOB_ADD_SUCCESS } from "../constants/jobConstants"


export type Job = {
    title: string 
    company_name: string
    description: string 
    apply_job_link: string 
}

export type JobState = {
  jobs: Job[]
  loading: boolean
  error: string | null 
}


export type JobListRequestAction = {
  type: typeof JOB_LIST_REQUEST
}

export type JobListSuccessAction = {
  type: typeof JOB_LIST_SUCCESS
  payload: Job[] 
}

export type JobListFailAction = {
  type: typeof JOB_LIST_FAIL
  payload: string 
}

export type JobListActionTypes =
  | JobListRequestAction
  | JobListSuccessAction
  | JobListFailAction

