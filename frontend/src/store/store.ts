import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { jobListReducer } from '../reducers/jobReducers'



const reducer = combineReducers({
  jobList: jobListReducer
})


export const store = configureStore({
  reducer: reducer,

})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

