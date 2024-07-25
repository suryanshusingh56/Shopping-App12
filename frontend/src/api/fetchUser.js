import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserDetail = createAsyncThunk(
    'userLogin/fetchUserDetail',
    async ({ email, password }, thunkAPI) => {
        const config = {
            headers: { 'Content-Type': 'application/json' }
        };
        const url = `http://localhost:8000/api/users/login`; 
        const res = await axios.post(url, { email, password }, config);
        // console.log(res.data)
        return res.data;
    }
    
);
export const registerUserDetail = createAsyncThunk(
    'userRegister/registerUserDetail',
    async ({ name,email, password }, thunkAPI) => {
        const config = {
            headers: { 'Content-Type': 'application/json' }
        };
        const url = `http://localhost:8000/api/users`; 
        const res = await axios.post(url, { name, email, password }, config);
        // console.log(res.data)
        return res.data;
    }
    
);

 
