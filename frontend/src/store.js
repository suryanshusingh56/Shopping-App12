import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer';
import productDetailReducer from './reducers/productDetailReducer';
import cartReducer from './reducers/cartReducer'; 
import LoginReducer from './reducers/userReducers'
import userRegisterDetail from './reducers/registerReducer'
const store = configureStore({
  reducer: {
    productList: productReducer,
    productDetail:productDetailReducer,
    cart:cartReducer,
    userLogin:LoginReducer,
    userRegister:userRegisterDetail,
  },
});


export default store;
