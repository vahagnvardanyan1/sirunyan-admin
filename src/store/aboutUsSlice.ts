import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Thunk to fetch "About Us" entries
export const fetchAboutUs = createAsyncThunk(
  'about/fetchAboutUs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/aboutus`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to add a new "About Us" entry
export const addAboutUsEntry = createAsyncThunk(
  'about/addAboutUsEntry',
  async ({ image, text1, text2 }, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;

      const formData = new FormData();
      formData.append('type', 'aboutus');
      formData.append('image', image);
      formData.append('text1', text1);
      formData.append('text2', text2);

      const response = await axios.post(`${API_BASE_URL}/aboutus`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const aboutSlice = createSlice({
  name: 'about',
  initialState: {
    entries: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutUs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAboutUs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload; // Assuming action.payload is an array
      })
      .addCase(fetchAboutUs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addAboutUsEntry.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addAboutUsEntry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries.push(action.payload);
      })
      .addCase(addAboutUsEntry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default aboutSlice.reducer;
