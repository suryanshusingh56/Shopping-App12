import { createSlice } from "@reduxjs/toolkit";
import fetchProductDetails from '../api/fetchProductDetails'

const initialState = {
    loading: false,
    product: {},
    error: null,
  };
  

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: [],
    extraReducers: (builder) => {
      builder
        .addCase(fetchProductDetails.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchProductDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.product = action.payload;
          state.error = null;
        })
        .addCase(fetchProductDetails.rejected, (state, action) => {
          state.loading = false;
          state.product = [];
          state.error = action.error.message;
        });
    },
  });
  

export default productDetailSlice.reducer;