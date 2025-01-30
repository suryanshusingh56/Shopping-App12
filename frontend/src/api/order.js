import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://shopping-app-backend-weld-nu.vercel.app/api";

// Create Order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`${BASE_URL}/orders`, order, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get Order Details
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`${BASE_URL}/orders/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Pay Order
export const payOrder = createAsyncThunk(
  "order/payOrder",
  async ({ orderId, paymentResult }, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// List My Orders
export const listMyOrders = createAsyncThunk(
  "order/listMyOrders",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`${BASE_URL}/orders/myorders`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
