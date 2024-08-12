// src/store/profileThunks.ts
import createAsyncThunkWithConfig from '../../utils/reduxThunkUtils'
import { Profile } from '../../types/profileTypes'

export const createProfile = createAsyncThunkWithConfig<Profile, Profile>(
  'profile/create',
  '/api/profile/create/'
)
