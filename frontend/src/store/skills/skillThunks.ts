// src/store/skillThunks.ts
import createGenericAsyncThunk from '../../utils/redux/ThunkUtils'
import { SkillsPayload, SkillResponse } from '../../types/skillTypes'

export const createUserSkills = createGenericAsyncThunk<
  SkillsPayload,
  SkillResponse
>('skills/create', '/api/skills/create/')
