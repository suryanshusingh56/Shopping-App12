import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    userDetailsRequest,
    userDetailsSuccess,
    userDetailsFail,
  } from '../reducers/userDetailsReducer';

import {
    updateUserProfileRequest,
    updateUserProfileSuccess,
    updateUserProfileFail,
} from '../reducers/userUpdateReducer';

export const fetchUserDetail = createAsyncThunk(
    'userLogin/fetchUserDetail',
    async ({ email, password }, thunkAPI) => {
        const config = {
            headers: { 'Content-Type': 'application/json' }
        };
        const url = `https://shopping-app-backend-weld-nu.vercel.app/api/users/login`; 
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
        const url = `https://shopping-app-backend-weld-nu.vercel.app/api/users`; 
        const res = await axios.post(url, { name, email, password }, config);
        // console.log(res.data)
        return res.data;
    }
    
);

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDetailsRequest());

    const { userLogin: { userDetail } } = getState();

    if (!userDetail || !userDetail.token) {
      throw new Error('No token found, please log in again.');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userDetail.token}`,
      },
    };

    // Log the response to check if the data is being received
    const { data } = await axios.get(`https://shopping-app-backend-weld-nu.vercel.app/api/users/${id}`, config);
    console.log('User Details Response:', data);  // <-- Log here
    
    dispatch(userDetailsSuccess(data));  // Dispatch the success action

  } catch (error) {
    console.error('Error fetching user details:', error);  // Log error
    dispatch(
      userDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};


export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(updateUserProfileRequest());

    const {
      userLogin: { userDetail },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userDetail.token}`,
      },
    };

    const { data } = await axios.put('https://shopping-app-backend-weld-nu.vercel.app/api/users/profile', user, config);

    dispatch(updateUserProfileSuccess(data));
  } catch (error) {
    dispatch(
      updateUserProfileFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};



 
