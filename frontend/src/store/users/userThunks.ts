// src/store/userThunks.ts
import createAsyncThunkWithConfig from '../../utils/reduxThunkUtils'
import { LoginUser, User } from '../../types/userTypes'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const registerUser = createAsyncThunkWithConfig<User, User>(
  'user/register',
  '/api/users/register/'
)

export const loginUser = createAsyncThunkWithConfig<LoginUser, User>(
  'user/login',
  '/api/users/login/'
)

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    localStorage.removeItem('userInfo')

    return null
  }
)
