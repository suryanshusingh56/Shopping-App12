import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

 const fetchProductDetails=createAsyncThunk(
    'productDetails/fetchProductDetails',
    async (id)=>{
        const response=await axios.get(`https://shopping-app-backend-delta.vercel.app/api/products/${id}`);
        return response.data;
    }
);
export default fetchProductDetails;