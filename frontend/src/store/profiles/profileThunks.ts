// src/store/profileThunks.ts
import createGenericAsyncThunk from '../../utils/redux/ThunkUtils'
import { Profile } from '../../types/profileTypes'

export const createProfile = createGenericAsyncThunk<Profile, Profile>(
  'profile/create',
  '/api/profile/create/'
)
