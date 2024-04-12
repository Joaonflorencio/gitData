import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  name: '',
  username: '',
  followers: 0,
  publicRepos: 0,
  avatarUrl: '',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

export const fetchUser = createAsyncThunk('user/fetchUser', async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.name = action.payload.name;
        state.username = action.payload.login;
        state.followers = action.payload.followers;
        state.publicRepos = action.payload.public_repos;
        state.avatarUrl = action.payload.avatar_url;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default userSlice.reducer;