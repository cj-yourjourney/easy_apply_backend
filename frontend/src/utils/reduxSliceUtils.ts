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
            ;(state as any).error = action.error?.message || null
          })
      }

      if (extraReducers) {
        extraReducers(builder)
      }
    }
  })
}

export default createGenericSlice
