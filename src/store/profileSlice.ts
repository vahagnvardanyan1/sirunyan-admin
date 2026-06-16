import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// @ts-ignore
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (
    userData: { firstName: string; lastName: string; email: string },
    { rejectWithValue, getState }
  ) => {
    try {
      const state: any = getState();
      const token = state.auth.token;

      const response = await axios.patch(
        `${API_BASE_URL}/admin/update`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;

      const response = await axios.get(`${API_BASE_URL}/admin`, {
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

export const updateUserPhoto = createAsyncThunk(
  'profile/updateUserPhoto',
  async (
    photoData: { image: File; type: string },
    { rejectWithValue, getState }
  ) => {
    try {
      const state: any = getState();
      const token = state.auth.token;

      const formData = new FormData();
      formData.append('type', photoData.type);
      formData.append('image', photoData.image);

      const response = await axios.patch(
        `${API_BASE_URL}/admin/photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUserPhoto = createAsyncThunk(
  'profile/deleteUserPhoto',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;

      const response = await axios.delete(`${API_BASE_URL}/admin/photo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error.response.data);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: {
      firstName: '',
      lastName: '',
      email: '',
      image: '',
    },
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        // @ts-ignore
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        // @ts-ignore
        state.error = action.payload;
      })
      .addCase(updateUserPhoto.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUserPhoto.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user.image = action.payload.image; // Assuming the response contains the updated image URL
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(updateUserPhoto.rejected, (state, action) => {
        state.status = 'failed';
        // @ts-ignore
        state.error = action.payload;
      })
      .addCase(deleteUserPhoto.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteUserPhoto.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user.image = '';
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(deleteUserPhoto.rejected, (state, action) => {
        state.status = 'failed';
        // @ts-ignore
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
