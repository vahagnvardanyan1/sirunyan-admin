import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

interface FooterSlider {
  image: File;
}

interface SliderData {
  id: string;
  type: string;
  image: string;
}

interface FooterSliderState {
  isLoading: boolean;
  error: string | null;
  sliderData: SliderData[]; // To store fetched Slider data
}

const initialState: FooterSliderState = {
  isLoading: false,
  error: null,
  sliderData: [],
};

export const addFooterSliderImage = createAsyncThunk(
  'slider/addFooterSliderImage',
  async ({ image }: FooterSlider, { rejectWithValue, getState }) => {
    const { auth } = getState() as { auth: { token: string } };
    const token = auth.token;

    try {
      const formData = new FormData();
      formData.append('type', 'slider');
      formData.append('image', image);

      console.log("Sending image to API...");

      const response = await axios.post(`${API_BASE_URL}/slider`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API response:", response.data);

      return response.data;
    } catch (error) {
      console.error("API call failed:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchSliders = createAsyncThunk(
  'slider/fetchSliders',
  async (_, { rejectWithValue, getState }) => {
    const { auth } = getState() as { auth: { token: string } };
    const token = auth.token;

    try {
      const response = await axios.get(`${API_BASE_URL}/slider`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched Slider data:", response.data);

      return response.data;
    } catch (error) {
      console.error("API call failed:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteSliderImage = createAsyncThunk(
  'slider/deleteSliderImage',
  async (id: string, { rejectWithValue, getState }) => {
    const { auth } = getState() as { auth: { token: string } };
    const token = auth.token;

    try {
      const response = await axios.delete(`${API_BASE_URL}/slider/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Deleted Slider image:", response.data);

      return id;
    } catch (error) {
      console.error("API call failed:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const footerSliderSlice = createSlice({
  name: 'footerSlider',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFooterSliderImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFooterSliderImage.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addFooterSliderImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSliders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSliders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sliderData = action.payload;
      })
      .addCase(fetchSliders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteSliderImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSliderImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sliderData = state.sliderData.filter(slider => slider.id !== action.payload);
      })
      .addCase(deleteSliderImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default footerSliderSlice.reducer;
