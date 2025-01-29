import { createSlice } from "@reduxjs/toolkit";
import { createOrder, payOrder, listMyOrders, getOrderDetails } from "../api/order";

const initialState = {
  loading: false,
  error: null,
  order: {},
  orders: [],
  success: false,
};

export const orderCreateSlice = createSlice({
  name: "orderCreate",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.success = false;
      state.order = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload; 
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        console.log("Order Created:", action.payload); 
        state.loading = false;
        state.order = action.payload; 
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        console.error("Order Creation Failed:", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const orderPaySlice = createSlice({
  name: "orderPay",
  initialState,
  reducers: {
    resetPay: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(payOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(payOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const orderListMySlice = createSlice({
  name: "orderListMy",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetMyOrders: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(listMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(listMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { resetOrder } = orderCreateSlice.actions;
export const { resetPay } = orderPaySlice.actions;
export const { resetMyOrders } = orderListMySlice.actions;

export const orderCreateReducer = orderCreateSlice.reducer;
export const orderDetailsReducer = orderDetailsSlice.reducer;
export const orderPayReducer = orderPaySlice.reducer;
export const orderListMyReducer = orderListMySlice.reducer;
