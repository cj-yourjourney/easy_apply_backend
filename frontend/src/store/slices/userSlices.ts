import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export type User = {
  username: string
  email: string
  password: string
}

export type UserState = {
  user: User
  loading: boolean
  error: string | null
}

const userInitialState: UserState = {
  user: {
    username: '',
    email: '',
    password: ''
  },
  loading: false,
  error: null
}

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: User, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users/register/', userData)
      return data
    } catch (error) {
      // If there's an error, reject the promise with the error message
      return rejectWithValue((error as Error).message)
    }
  }
)

export const userRegisterSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        // loading
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        // success
        state.loading = false
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
         // Fail
         state.loading = false 
         state.error = action.payload as string 
      })
  }
})
