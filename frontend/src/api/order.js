import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://shopping-app-backend-weld-nu.vercel.app/api";

// Create Order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, { getState, rejectWithValue }) => {
    try {
      const userDetail = getState().userLogin?.userDetail;

      if (!userDetail || !userDetail.token) {
        return rejectWithValue("User not authenticated");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetail.token}`,
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
      const userDetail = getState().userLogin?.userDetail;

      if (!userDetail || !userDetail.token) {
        return rejectWithValue("User not authenticated");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userDetail.token}`,
        },
      };

      const { data } = await axios.get(`${BASE_URL}/orders/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
