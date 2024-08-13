import { createProfile } from './profileThunks'
import createGenericSlice from '../../utils/reduxSliceUtils'
import {
  profileInitialState,
  ProfileState,
  Profile
} from '../../types/profileTypes'

export const profileSlice = createGenericSlice<ProfileState, Profile, Profile>({
  name: 'profile',
  initialState: profileInitialState,
  thunk: createProfile
})
