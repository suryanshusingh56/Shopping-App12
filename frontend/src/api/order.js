import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Thunks for async actions
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userDetail },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetail.token}`,
        },
      };
      const { data } = await axios.post("https://shopping-app-backend-weld-nu.vercel.app/api/orders", order, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userDetail },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetail.token}`,
        },
      };
      const { data } = await axios.get(`https://shopping-app-backend-weld-nu.vercel.app/api/orders/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const payOrder = createAsyncThunk(
  "order/payOrder",
  async ({ orderId, paymentResult }, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userDetail },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetail.token}`,
        },
      };
      const { data } = await axios.put(
        `https://shopping-app-backend-weld-nu.vercel.app/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const listMyOrders = createAsyncThunk(
  "order/listMyOrders",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userDetail },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userDetail.token}`,
        },
      };
      const { data } = await axios.get("https://shopping-app-backend-weld-nu.vercel.app/api/orders/myorders", config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);


