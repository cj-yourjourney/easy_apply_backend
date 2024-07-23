// src/store/userThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { LoginUser, User } from '../../types/userTypes'

interface ErrorResponseData {
  detail: string
}

const createAsyncUserThunk = <T, ReturnedType>(
  actionName: string,
  url: string
) => {
  return createAsyncThunk<ReturnedType, T>(
    `user/${actionName}`,
    async (userData: T, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(url, userData)

        return data
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponseData>
          if (
            axiosError.response &&
            axiosError.response.data &&
            axiosError.response.data.detail
          ) {
            return rejectWithValue(axiosError.response.data.detail)
          }
        }
        return rejectWithValue(
          `An error occurred while processing your ${actionName} request.`
        )
      }
    }
  )
}

export const registerUser = createAsyncUserThunk<User, User>(
  'register',
  '/api/users/register/'
)
export const loginUser = createAsyncUserThunk<LoginUser, User>(
  'login',
  '/api/users/login/'
)
