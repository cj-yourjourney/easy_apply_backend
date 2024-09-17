// src/store/workExperience/workExperienceThunks.ts
import createGenericAsyncThunk from '../../utils/redux/ThunkUtils'
import {
  WorkExperiencePayload,
  WorkExperienceResponse
} from '../../types/workExperienceTypes'

// Update to match expected types
export const createWorkExperiences = createGenericAsyncThunk<
  WorkExperiencePayload[], // Payload: Array of work experience objects
  WorkExperienceResponse[] // Response: Array of work experience response objects
>('workExperiences/create', '/api/work-experiences/create/')
