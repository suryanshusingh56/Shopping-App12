import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('https://shopping-app-backend-weld-nu.vercel.app/api/products/');
    return response.data;
  }
);