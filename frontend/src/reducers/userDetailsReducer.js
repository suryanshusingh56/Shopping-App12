import { createSlice } from '@reduxjs/toolkit';
const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: { user: {}, loading: false, error: null },
  reducers: {
    userDetailsRequest: (state) => {
      state.loading = true;
      state.error = null;  // Clear previous errors
    },
    userDetailsSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;  // Update user with the response data
    },
    userDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;  // Store error message
    },
    userDetailsReset: (state) => {
      state.user = {};  // Reset the user data
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  userDetailsReset,
} = userDetailsSlice.actions;

export default userDetailsSlice.reducer;

