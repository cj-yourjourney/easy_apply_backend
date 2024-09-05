import {
  userInitialState,
  UserState,
  User,
  LoginUser
} from '../../types/userTypes'

import { registerUser, loginUser, logoutUser } from './userThunks'
import createGenericSlice from '../../utils/redux/SliceUtils'

export const userRegisterSlice = createGenericSlice<UserState, User, User>({
  name: 'userRegister',
  initialState: userInitialState,
  thunk: registerUser
})

export const userLoginSlice = createGenericSlice<UserState, User, LoginUser>({
  name: 'userLogin',
  initialState: userInitialState,
  thunk: loginUser,
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state: UserState) => {
      state.user = null
      state.loading = false
      state.error = null
    })
  }
})
