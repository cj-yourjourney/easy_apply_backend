import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { User } from './userTypes'

// Define the type for the error response data
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
        // Check if it's an AxiosError
        const axiosError = error as AxiosError<ErrorResponseData>
        if (
          axiosError.response &&
          axiosError.response.data &&
          axiosError.response.data.detail
        ) {
          // If there's a detail in the error response, return it
          return rejectWithValue(axiosError.response.data.detail)
        }
      }
      // If no specific error message found, return a generic error
      return rejectWithValue('An error occurred while processing your request.')
    }
  }
)
