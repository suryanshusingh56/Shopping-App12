import { createSlice } from "@reduxjs/toolkit";
import { fetchUserDetail, registerUserDetail } from "../api/fetchUser";

const initialState = {
  loading: false,
  userDetail: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  error: null,
};

const userSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    login(state, action) {
      const userInfo = action.payload;
      if (userInfo) {
        console.log("User Logged in");
        state.userDetail = userInfo;
      } else {
        console.log("User not authenticated");
      }
    },
    logout(state, action) {
      state.userDetail = null;
      localStorage.removeItem("userInfo");
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        state.error = null;
      })
      .addCase(fetchUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
   
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
