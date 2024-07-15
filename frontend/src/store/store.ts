import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userRegisterSlice } from './users/userSlices'


const reducer = combineReducers({
 
  userRegister: userRegisterSlice.reducer,
})


export const store = configureStore({
  reducer: reducer,

})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

