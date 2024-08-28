// src/store/skillThunks.ts
import createAsyncThunkWithConfig from '../../utils/reduxThunkUtils'
import { SkillsPayload, SkillResponse} from '../../types/skillTypes'


export const createUserSkills = createAsyncThunkWithConfig<
  SkillsPayload,
  SkillResponse
>('skills/create', '/api/skills/create/')
