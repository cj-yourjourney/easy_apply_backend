// src/types/workExperienceTypes.ts

export interface WorkExperiencePayload {
  job_title: string
  company_name: string
  start_year: number
  end_year?: number
  job_description: string
}

export interface WorkExperienceResponse {
  id: number
  job_title: string
  company_name: string
  start_year: number
  end_year?: number
  job_description: string
}

export interface WorkExperienceState {
  workExperiences: WorkExperienceResponse[]
  loading: boolean
  error: string | null
}

export const workExperienceInitialState: WorkExperienceState = {
  workExperiences: [],
  loading: false,
  error: null
}
