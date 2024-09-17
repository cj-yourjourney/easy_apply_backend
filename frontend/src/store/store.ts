import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userLoginSlice, userRegisterSlice } from './users/userSlices'
import { profileSlice } from './profiles/profileSlices'
import { skillsSlice } from './skills/skillSlices'
import { workExperienceSlice } from './workExperience/workExperienceSlice'
const reducer = combineReducers({
  userRegister: userRegisterSlice.reducer,
  userLogin: userLoginSlice.reducer,
  profileCreate: profileSlice.reducer,
  skillCreate: skillsSlice.reducer,
  workExperienceCreate: workExperienceSlice.reducer, 
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
