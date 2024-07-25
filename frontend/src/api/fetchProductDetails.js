import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

 const fetchProductDetails=createAsyncThunk(
    'productDetails/fetchProductDetails',
    async (id)=>{
        const response=await axios.get(`http://localhost:8000/api/products/${id}`);
        return response.data;
    }
);
export default fetchProductDetails;