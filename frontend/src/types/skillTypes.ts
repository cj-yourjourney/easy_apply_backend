
export interface SkillsPayload {
  skills: string[]
}

export interface SkillResponse {
  message: string
}


export interface SkillsState {
  skills: string[]
  loading: boolean
  error: string | null
  success: boolean
}

export const skillInitialState: SkillsState = {
  skills: [],
  loading: false,
  error: null,
  success: false 
}


