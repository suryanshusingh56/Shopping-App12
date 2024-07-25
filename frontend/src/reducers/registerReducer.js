import { createSlice } from "@reduxjs/toolkit";
import {  registerUserDetail } from "../api/fetchUser";

const initialState = {
  loading: false,
  userDetail:null,
  error: null,
};

const registerSlice = createSlice({
  name: "userRegister",
  initialState,
  reducers: {
  
    register(state, action) {
      const userInfo = action.payload;
      if (userInfo) {
        console.log("User Registered");
        state.userDetail = userInfo;
      } else {
        console.log("User not Registered");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        state.error = null;
      })
      .addCase(registerUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { register } = registerSlice.actions;
export default registerSlice.reducer;
