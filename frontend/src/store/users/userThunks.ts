// src/store/userThunks.ts
import createGenericAsyncThunk from '../../utils/redux/ThunkUtils'
import { LoginUser, User } from '../../types/userTypes'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const registerUser = createGenericAsyncThunk<User, User>(
  'user/register',
  '/api/users/register/'
)

export const loginUser = createGenericAsyncThunk<LoginUser, User>(
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
