import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// @ts-ignore
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadPortfolioImage = createAsyncThunk(
  'portfolio/uploadPortfolioImage',
  async ({ category, image }: { category: string; image: File }, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;

      const formData = new FormData();
      formData.append('type', 'portfolio');
      formData.append('image', image);

      const response = await axios.post(`${API_BASE_URL}/portfolio/${category}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchPortfolioByCategory = createAsyncThunk(
  'portfolio/fetchPortfolioByCategory',
  async (category: string, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;

      const response = await axios.get(`${API_BASE_URL}/portfolio/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePortfolioItem = createAsyncThunk(
  'portfolio/deletePortfolioItem',
  async ({ category, itemId }: { category: string; itemId: string }, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      await axios.delete(`${API_BASE_URL}/portfolio/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          imageId: itemId,
        },
      });
      return { itemId };
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error.response.data);
    }
  }
);


const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadPortfolioImage.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(uploadPortfolioImage.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(uploadPortfolioImage.rejected, (state, action) => {
        state.status = 'failed';
        // @ts-ignore
        state.error = action.payload;
      })
      .addCase(fetchPortfolioByCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPortfolioByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Assuming the payload contains an array of portfolio items
      })
      .addCase(fetchPortfolioByCategory.rejected, (state, action) => {
        state.status = 'failed';
        // @ts-ignore
        state.error = action.payload;
      })
      .addCase(deletePortfolioItem.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deletePortfolioItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((item: any) => item.id !== action.payload.itemId);
      })
      .addCase(deletePortfolioItem.rejected, (state, action) => {
        state.status = 'failed';
        // @ts-ignore
        state.error = action.payload;
      });
  },
});

export default portfolioSlice.reducer;
