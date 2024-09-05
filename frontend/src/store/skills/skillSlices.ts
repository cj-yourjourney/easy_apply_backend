import createGenericSlice from '../../utils/redux/SliceUtils'
import { createUserSkills } from './skillThunks'
import {
  skillInitialState,
  SkillsState,
  SkillResponse,
  SkillsPayload
} from '../../types/skillTypes'

export const skillsSlice = createGenericSlice<
  SkillsState,
  SkillResponse,
  SkillsPayload
>({
  name: 'skills',
  initialState: skillInitialState,
  thunk: createUserSkills
})
