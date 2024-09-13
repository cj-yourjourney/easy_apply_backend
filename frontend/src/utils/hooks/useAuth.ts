// src/hooks/useAuth.ts
import { useAppDispatch } from "../../store/hooks"
import { AsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export function useAuth() {
  const dispatch = useAppDispatch()

  const handleAuthSubmit = async <T>(
    formData: T,
    authThunk: AsyncThunk<any, T, any>,
    onSuccess: (payload: any) => void,
    onError?: (error: any) => void // Explicitly type the `error` parameter
  ) => {
    const resultAction = (await dispatch(
      authThunk(formData)
    )) as PayloadAction<any>

    if (authThunk.fulfilled.match(resultAction)) {
           onSuccess(resultAction.payload) 
    } else {
      onError?.(resultAction.payload)
    }
  }

  return { handleAuthSubmit }
}
