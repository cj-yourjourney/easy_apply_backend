import { createSlice, PayloadAction, AsyncThunk } from '@reduxjs/toolkit'

// Base state that allows dynamic keys
interface BaseState {
  loading: boolean
  error: string | null
  [key: string]: any // Allow other dynamic fields
}

// Options for creating a generic slice
interface SliceOptions<State extends BaseState, Payload, ThunkArg> {
  name: string // Allow `name` to be any string
  initialState: State
  thunk?: AsyncThunk<Payload, ThunkArg, {}>
  extraReducers?: (builder: any) => void
}

// Generic slice creation function
function createGenericSlice<State extends BaseState, Payload, ThunkArg>({
  name,
  initialState,
  thunk,
  extraReducers
}: SliceOptions<State, Payload, ThunkArg>) {
  return createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      if (thunk) {
        builder
          .addCase(thunk.pending, (state) => {
            state.loading = true
            state.error = null
          })
          .addCase(thunk.fulfilled, (state, action: PayloadAction<Payload>) => {
            // prettier-ignore
            state.loading = false;
            // prettier-ignore
            (state as any)[name as string] = action.payload
          })
          .addCase(thunk.rejected, (state, action) => {
            state.loading = false
            state.error =
              (action.payload as { detail?: string })?.detail ||
              action.error.message ||
              'Something went wrong'
          })
      }

      if (extraReducers) {
        extraReducers(builder)
      }
    }
  })
}

export default createGenericSlice
