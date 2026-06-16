import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// @ts-ignore
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

interface User {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  message: string;
  loading: boolean;
  error: string | null;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  admin: User;
  message: string;
}

export const login = createAsyncThunk<LoginResponse, LoginPayload, { rejectValue: string }>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      return response.data as LoginResponse;
    } catch (error: any) {
      const message = error.response?.data?.message || 'An error occurred';
      return rejectWithValue(message);
    }
  }
);

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null') || null,
  token: localStorage.getItem('token'),
  message: '',
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.message = '';
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        const { token, admin: user, message } = action.payload;
        state.token = token;
        state.user = user;
        state.message = message;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
