import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { Profile } from '../../types/profileTypes'

interface ErrorResponseData {
  detail: string
}

export const createProfile = createAsyncThunk<Profile, Profile>(
  'profile/create',
  async (profileData: Profile, { rejectWithValue }) => {
    const userInfo = localStorage.getItem('userInfo')
    let token = ''

    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo)
      token = parsedUserInfo.access
    }

    try {
      const { data } = await axios.post('/api/profile/create/', profileData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
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
      return rejectWithValue('An error occurred while creating the profile.')
    }
  }
)
