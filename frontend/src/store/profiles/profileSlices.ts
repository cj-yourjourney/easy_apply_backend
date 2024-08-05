import { createSlice } from '@reduxjs/toolkit'
import { createProfile } from './profileThunks'
import { ProfileState, profileInitialState } from '../../types/profileTypes'

const profileSlice = createSlice({
  name: 'profile',
  initialState: profileInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export default profileSlice
