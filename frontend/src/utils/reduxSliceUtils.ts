import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AsyncThunk
} from '@reduxjs/toolkit'

interface SliceOptions<State, Payload, ThunkArg> {
  name: string
  initialState: State
  thunk?: AsyncThunk<Payload, ThunkArg, {}>
  extraReducers?: (builder: any) => void
}

function createGenericSlice<State, Payload, ThunkArg>({
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
            ;(state as any).loading = true
            ;(state as any).error = null
          })
          .addCase(thunk.fulfilled, (state, action: PayloadAction<Payload>) => {
            ;(state as any).loading = false
            ;(state as any)[name] = action.payload
          })
          .addCase(thunk.rejected, (state, action) => {
            ;(state as any).loading = false

            // Explicitly type the payload as having a 'detail' property
            const errorMessage =
              (action.payload as { detail?: string })?.detail || // Simplified error extraction
              action.error.message ||
              'Something went wrong'
            ;(state as any).error = errorMessage
          })
      }

      if (extraReducers) {
        extraReducers(builder)
      }
    }
  })
}

export default createGenericSlice
