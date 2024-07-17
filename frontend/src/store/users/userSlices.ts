// userSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import { registerUser } from './userThunks'
import { userInitialState } from '../../types/userTypes'

export const userRegisterSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload

        localStorage.setItem('userInfo', JSON.stringify(action.payload))
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})
