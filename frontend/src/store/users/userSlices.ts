import {
  userInitialState,
  UserState,
  User,
  LoginUser
} from '../../types/userTypes'

import { registerUser, loginUser } from './userThunks'
import createGenericSlice from '../../utils/reduxSliceUtils'


export const userRegisterSlice = createGenericSlice<UserState, User, User>({
  name: 'userRegister',
  initialState: userInitialState,
  thunk: registerUser
})

export const userLoginSlice = createGenericSlice<UserState, User, LoginUser>({
  name: 'userLogin',
  initialState: userInitialState,
  thunk: loginUser
})


