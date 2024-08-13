import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userLoginSlice, userRegisterSlice } from './users/userSlices'
import { profileSlice } from './profiles/profileSlices'
const reducer = combineReducers({
  userRegister: userRegisterSlice.reducer,
  userLogin: userLoginSlice.reducer,
  profileCreate: profileSlice.reducer
})

const getUserFromLocalStorage = () => {
  const userInfo = localStorage.getItem('userInfo')
  return userInfo ? JSON.parse(userInfo) : null
}

const initialState = {
  userLogin: {
    user: getUserFromLocalStorage(),
    loading: false,
    error: null
  }
}

export const store = configureStore({
  reducer: reducer,
  preloadedState: initialState
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
