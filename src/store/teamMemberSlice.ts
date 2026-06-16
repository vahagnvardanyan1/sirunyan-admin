import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// @ts-ignore
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

interface TeamMember {
  id?: string;
  image: File | string;
  fullName: string;
  role: string;
  content: string;
}

interface TeamMemberState {
  isLoading: boolean;
  error: string | null;
  teamMembers: TeamMember[];
}

const initialState: TeamMemberState = {
  isLoading: false,
  error: null,
  teamMembers: [],
};

export const addTeamMember = createAsyncThunk(
  'team/addTeamMember',
  async (
    { image, fullName, role, content }: TeamMember,
    { rejectWithValue, getState }
  ) => {
    const { auth } = getState() as { auth: { token: string } };
    const token = auth.token;

    try {
      const formData = new FormData();
      formData.append('type', 'team');
      formData.append('image', image);
      formData.append('fullName', fullName);
      formData.append('role', role);
      formData.append('content', content);

      const response = await axios.post(`${API_BASE_URL}/team`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTeamMembers = createAsyncThunk(
  'team/fetchTeamMembers',
  async (_, { rejectWithValue, getState }) => {
    const { auth } = getState() as { auth: { token: string } };
    const token = auth.token;

    try {
      const response = await axios.get(`${API_BASE_URL}/team`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteTeamMember = createAsyncThunk(
  'team/deleteTeamMember',
  async (id: string, { rejectWithValue, getState }) => {
    const { auth } = getState() as { auth: { token: string } };
    const token = auth.token;

    try {
      await axios.delete(`${API_BASE_URL}/team/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return id;
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// @ts-ignore
export const updateTeamMember = createAsyncThunk(
  'team/updateTeamMember',
  async (
    // @ts-ignore
    { _id, image, fullName, role, content, type }: TeamMember,
    { rejectWithValue, getState }
  ) => {
    const { auth } = getState() as { auth: { token: string } };
    const token = auth.token;

    try {
      const formData = new FormData();
      if (type) formData.append('type', "team");
      if (image) formData.append('image', image);
      if (fullName) formData.append('fullName', fullName);
      if (role) formData.append('role', role);
      if (content) formData.append('content', content);

      const response = await axios.patch(`${API_BASE_URL}/team/${_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const teamMembersSlice = createSlice({
  name: 'teamMembers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTeamMember.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTeamMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teamMembers.push(action.payload);
      })
      .addCase(addTeamMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTeamMembers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teamMembers = action.payload;
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTeamMember.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTeamMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teamMembers = state.teamMembers.filter(member => member.id !== action.payload);
      })
      .addCase(deleteTeamMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTeamMember.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTeamMember.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.teamMembers.findIndex(member => member.id === action.payload.id);
        if (index !== -1) {
          state.teamMembers[index] = action.payload;
        }
      })
      .addCase(updateTeamMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default teamMembersSlice.reducer;
