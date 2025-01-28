import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer';
import productDetailReducer from './reducers/productDetailReducer';
import cartReducer from './reducers/cartReducer'; 
import LoginReducer from './reducers/userReducers'
import userRegisterDetail from './reducers/registerReducer'
import userDetailsReducers from './reducers/userDetailsReducer'
import userUpdateReducer from './reducers/userUpdateReducer'
import { orderCreateReducer,orderPayReducer,orderListMyReducer,orderDetailsReducer
} from "./reducers/orderReducer";

const store = configureStore({
  reducer: {
    productList: productReducer,
    productDetail:productDetailReducer,
    cart:cartReducer,
    userLogin:LoginReducer,
    userRegister:userRegisterDetail,
    userDetails:userDetailsReducers,
    userUpdateProfile:userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
  },
});


export default store;
