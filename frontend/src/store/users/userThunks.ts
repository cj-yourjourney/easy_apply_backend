import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { User } from '../../types/userTypes'

interface ErrorResponseData {
  detail: string
}

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: User, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users/register/', userData)
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
      return rejectWithValue('An error occurred while processing your request.')
    }
  }
)
