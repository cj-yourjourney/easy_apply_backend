import { createProfile } from './profileThunks'
import createGenericSlice from '../../utils/redux/SliceUtils'
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
