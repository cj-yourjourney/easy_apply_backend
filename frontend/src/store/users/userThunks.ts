import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { LoginUser, User } from '../../types/userTypes'

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
      return rejectWithValue(
        'An error occurred while processing your sign up request.'
      )
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData: LoginUser, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users/login/', userData)
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponseData>
        console.error('API Error:', axiosError.response?.data)
        if (
          axiosError.response &&
          axiosError.response.data &&
          axiosError.response.data.detail
        ) {
          return rejectWithValue(axiosError.response.data.detail)
        }
      }
      return rejectWithValue(
        'An error occured while processing your login request'
      )
    }
  }
)
