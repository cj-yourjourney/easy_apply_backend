import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

interface ErrorResponseData {
  detail: string
}

const createGenericAsyncThunk = <T, ReturnedType>(
  actionName: string,
  url: string
) => {
  return createAsyncThunk<ReturnedType, T>(
    actionName,
    async (payload: T, { rejectWithValue }) => {
      const token = getAuthToken()
      const config = createConfig(token)

      try {
        const response = await axios.post(url, payload, config)
        return response.data
      } catch (error) {
        return handleError(error, actionName, rejectWithValue)
      }
    }
  )
}

// Function to get the token from localStorage
const getAuthToken = (): string => {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    const parsedUserInfo = JSON.parse(userInfo)
    return parsedUserInfo.token || ''
  }
  return ''
}

// Function to create the configuration object
const createConfig = (token: string) => ({
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
})

// Function to handle errors
const handleError = (
  error: unknown,
  actionName: string,
  rejectWithValue: (value: { detail: string }) => any
) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponseData>;
    if (
      axiosError.response &&
      axiosError.response.data &&
      axiosError.response.data.detail
    ) {
      return rejectWithValue({ detail: axiosError.response.data.detail });
    }
  }
  return rejectWithValue({
    detail: `An error occurred while processing your ${actionName} request.`
  });
};


export default createGenericAsyncThunk
