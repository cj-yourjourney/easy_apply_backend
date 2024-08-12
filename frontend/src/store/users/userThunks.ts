// src/store/userThunks.ts
import createAsyncThunkWithConfig from '../../utils/reduxThunkUtils'
import { LoginUser, User } from '../../types/userTypes'

export const registerUser = createAsyncThunkWithConfig<User, User>(
  'user/register',
  '/api/users/register/'
)

export const loginUser = createAsyncThunkWithConfig<LoginUser, User>(
  'user/login',
  '/api/users/login/'
)
