
export interface SkillsPayload {
  skills: string[]
}

export interface SkillResponse {
  skills: string[]
}


export interface SkillsState {
  skills: string[]
  loading: boolean
  error: string | null
}

export const skillInitialState: SkillsState = {
  skills: [],
  loading: false,
  error: null
}


