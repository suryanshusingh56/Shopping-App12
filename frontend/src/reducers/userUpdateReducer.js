import { createSlice } from '@reduxjs/toolkit';

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: { loading: false, success: false, error: null },
  reducers: {
    updateUserProfileRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    updateUserProfileSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    updateUserProfileFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    updateUserProfileReset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  updateUserProfileRequest,
  updateUserProfileSuccess,
  updateUserProfileFail,
  updateUserProfileReset,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
