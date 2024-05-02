import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./userTypes";

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: User, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users/register/', userData)
      return data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)