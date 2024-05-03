// userSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import { registerUser } from './userThunks'
import { userInitialState } from './userTypes'

export const userRegisterSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        // Handle pending action
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        // Handle fulfilled action
        state.loading = false
        state.user = action.payload
        // Save user info to localStorage
        localStorage.setItem('userInfo', JSON.stringify(action.payload))
      })
      .addCase(registerUser.rejected, (state, action) => {
        // Handle rejected action
        state.loading = false
        state.error = action.payload as string
      })
  }
})
