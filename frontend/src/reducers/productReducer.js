import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../api/fetchProducts' // Update the path to your thunk file


const initialState = {
  loading: false,
  products: [],
  error: null
};

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.error.message;
      });
  }
});

export default productListSlice.reducer;
