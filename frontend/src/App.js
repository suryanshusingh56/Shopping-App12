import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductDetails from './screens/ProductDetails';
import CartScreen from './screens/CartScreen';
// import products from './products.js';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen'; 
import ShippingScreen from './screens/ShippingScreen';
import { useDispatch } from "react-redux";
import { getTotals } from "./reducers/cartReducer";
import CODConfirmationScreen from "./screens/CODConfirmationScreen"
import React, { useEffect } from "react";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch]);
  return (
    <Router>
      <Header />
      <main className="my-3">
        <Container>
          {/* <h1>Shopping App</h1> */}
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/order/cod/:id" element={<CODConfirmationScreen />} />
            <Route path="/order/:id" element={<OrderScreen/>} />
            <Route path="/login" element={<LoginScreen/>} />
            <Route path="/payment" element={<PaymentScreen/>} />
            <Route path="/placeorder" element={<PlaceOrderScreen/>} />
            <Route path="/shipping" element={<ShippingScreen/>} />
            <Route path="/profile" element={<ProfileScreen/>} />
            <Route path="/register" element={<RegisterScreen/>} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart/" element={<CartScreen />} />
          </Routes>

        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
