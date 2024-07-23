import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginUser, registerUser } from './userThunks'
import { userInitialState, User } from '../../types/userTypes'

const createUserSlice = (
  name: string,
  thunk: ReturnType<typeof createAsyncThunk<User, any>>
) => {
  return createSlice({
    name,
    initialState: userInitialState,
    reducers: {
      logout: (state) => {
        state.user = { username: '', email: '', password: '' }
        localStorage.removeItem('userInfo')
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.loading = true
          state.error = null
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.loading = false
          state.user = action.payload

          localStorage.setItem('userInfo', JSON.stringify(action.payload))
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload as string
        })
    }
  })
}

export const userRegisterSlice = createUserSlice('userRegister', registerUser)
export const userLoginSlice = createUserSlice('userLogin', loginUser)


export const { logout } = userRegisterSlice.actions